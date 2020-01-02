import React, { useEffect } from 'react'
import SwipeableViews from 'react-swipeable-views'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Layout from './common/Layout'
import SideList from './SideList/SideList'
import Song from './Song/Song'
import AddSong from './forms/AddSong'
import ListButton from './navigation/ListButton'

import useSongs from './hooks/useSongs'
import useSideLists from './hooks/useSideLists'
import useSetlists from './hooks/useSetlists'
import ChangeKeyButton from './ChangeKey/ChangeKeyButton'

export default function App() {
  const {
    songs,
    isLoading,
    swipeIndex,
    setSwipeIndex,
    keyCounter,
    setKeyCounter,
    changeKeyDirection,
    setChangeKeyDirection,
  } = useSongs()
  const {
    isSideListShown,
    setIsSideListShown,
    sideListType,
    setSideListType,
  } = useSideLists()
  const {
    setlists,
    setSetlists,
    activeSetlist,
    setActiveSetlist,
  } = useSetlists()

  if (activeSetlist) {
    const keyChangeObject = loadKeyCounterFromStorage()
    const objectKey = createObjectKey()
    if (objectKey) {
      keyCounter === keyChangeObject[objectKey] ||
        (keyChangeObject[objectKey] &&
          setKeyCounter(keyChangeObject[objectKey]))
    }
  }

  let swipeableViewContent
  if (sideListType === 'singleSetlist') {
    const activeSetlistIndex = setlists.findIndex(
      setlist => setlist._id === activeSetlist
    )
    handleSwipeableView(setlists[activeSetlistIndex].songs)
  } else {
    handleSwipeableView(songs)
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Layout>
            {swipeableViewContent}
            <ListButton
              toggleSideList={toggleSideList}
              isSideListShown={isSideListShown}
            />
            <SideList
              songs={songs}
              swipeIndex={swipeIndex}
              handleChangeIndex={index => handleChangeIndex(index)}
              setlists={setlists}
              activeSetlist={activeSetlist}
              setActiveSetlist={setActiveSetlist}
              isSideListShown={isSideListShown}
              sideListType={sideListType}
              setSideListType={setSideListType}
              setSwipeIndex={setSwipeIndex}
              setSetlists={setSetlists}
              setKeyCounter={setKeyCounter}
            ></SideList>
            <ChangeKeyButton
              direction="up"
              handleKeyChangeClick={() => handleKeyChangeClick('up')}
              keyCounter={keyCounter}
              setChangeKeyDirection={setChangeKeyDirection}
              isSideListShown={isSideListShown}
            ></ChangeKeyButton>
            <ChangeKeyButton
              direction="down"
              handleKeyChangeClick={() => handleKeyChangeClick('down')}
              keyCounter={keyCounter}
              setChangeKeyDirection={setChangeKeyDirection}
              isSideListShown={isSideListShown}
            ></ChangeKeyButton>
          </Layout>
        </Route>
      </Switch>
      <Switch>
        <Route exact path="/AddSong">
          <AddSong />
        </Route>
      </Switch>
    </Router>
  )

  function toggleSideList() {
    setIsSideListShown(!isSideListShown)
  }

  function handleChangeIndex(index) {
    setSwipeIndex(index)
  }

  function handleSwipeableView(songs) {
    swipeableViewContent = isLoading ? (
      'Loading ...'
    ) : (
      <SwipeableViews
        index={swipeIndex}
        onChangeIndex={handleChangeIndex}
        enableMouseEvents
        animateTransitions={false}
      >
        {songs
          ? songs.map(song => (
              <Song
                key={song._id}
                song={song}
                isSideListShown={isSideListShown}
                keyCounter={keyCounter}
                changeKeyDirection={changeKeyDirection}
              />
            ))
          : 'no song'}
      </SwipeableViews>
    )
  }

  function handleKeyChangeClick(direction) {
    if (activeSetlist) {
      let keyChangeObject = loadKeyCounterFromStorage()
      const objectKey = createObjectKey()
      if (objectKey) {
        direction === 'up'
          ? (keyChangeObject = {
              ...keyChangeObject,
              [objectKey]: keyCounter + 1,
            })
          : (keyChangeObject = {
              ...keyChangeObject,
              [objectKey]: keyCounter - 1,
            })
        localStorage.setItem(
          'keyChangeCounter',
          JSON.stringify(keyChangeObject)
        )
      }
    }
    if (direction === 'up') {
      setKeyCounter(keyCounter + 1)
      setChangeKeyDirection('up')
    } else {
      setKeyCounter(keyCounter - 1)
      setChangeKeyDirection('down')
    }
  }

  function loadKeyCounterFromStorage() {
    return localStorage.getItem('keyChangeCounter')
      ? JSON.parse(localStorage.getItem('keyChangeCounter'))
      : {}
  }

  function createObjectKey() {
    const activeSetlistIndex = setlists.findIndex(
      setlist => setlist._id === activeSetlist
    )
    if (setlists[activeSetlistIndex].songs[swipeIndex]) {
      const activeSong = setlists[activeSetlistIndex].songs[swipeIndex]._id
      return `${activeSetlist}-${activeSong}`
    } else {
      return undefined
    }
  }
}
