import React, { useEffect } from 'react'
import styled from 'styled-components/macro'
import SwipeableViews from 'react-swipeable-views'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Layout from './common/Layout'
import SideList from './SideList/SideList'
import Song from './Song/Song'
import AddSong from './forms/AddSong'
import ListButton from './navigation/ListButton'
import ChangeKeyButton from './ChangeKey/ChangeKeyButton'

import useSongs from './hooks/useSongs'
import useSideLists from './hooks/useSideLists'
import useSetlists from './hooks/useSetlists'
import useKeyChange from './hooks/useKeyChange'

export default function App() {
  const { songs, isLoading, swipeIndex, setSwipeIndex } = useSongs()
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

  const {
    keyCounter,
    setKeyCounter,
    changeKeyDirection,
    setChangeKeyDirection,
  } = useKeyChange()

  useEffect(() => {
    setKeyCounter(0)
  }, [swipeIndex])

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
            <SwipeContainer>{swipeableViewContent}</SwipeContainer>

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
    console.log('>>', songs)

    return (swipeableViewContent = isLoading ? (
      'Loading ...'
    ) : (
      <SwipeableViews
        index={swipeIndex}
        onChangeIndex={handleChangeIndex}
        enableMouseEvents
        animateTransitions={true}
      >
        {songs.length > 0 ? (
          songs.map(song => (
            <Song
              key={song._id}
              song={song}
              keyCounter={keyCounter}
              changeKeyDirection={changeKeyDirection}
            />
          ))
        ) : (
          <EmptySong>no song</EmptySong>
        )}
      </SwipeableViews>
    ))
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

const SwipeContainer = styled.div`
  align-self: flex-start;
  overflow: visible;
`

const EmptySong = styled.div`
  height: 100vh;
  width: 100vh;
  align-self: flex-start;
`
