import React from 'react'
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
    setchangeKeyDirection,
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
  console.log('swipeindex', swipeIndex, 'keycounter', keyCounter)

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
            ></SideList>
            <ChangeKeyButton
              direction="up"
              handleKeyChangeClick={() => handleKeyChangeClick('up')}
              keyCounter={keyCounter}
              setchangeKeyDirection={setchangeKeyDirection}
            ></ChangeKeyButton>
            <ChangeKeyButton
              direction="down"
              handleKeyChangeClick={() => handleKeyChangeClick('down')}
              keyCounter={keyCounter}
              setchangeKeyDirection={setchangeKeyDirection}
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
                activeSetlist={activeSetlist}
              />
            ))
          : 'no song'}
      </SwipeableViews>
    )
  }

  function handleKeyChangeClick(direction) {
    if (activeSetlist) {
      let keyChangeObject = localStorage.getItem('keyChangeCounter')
        ? JSON.parse(localStorage.getItem('keyChangeCounter'))
        : {}
      const activeSetlistIndex = setlists.findIndex(
        setlist => setlist._id === activeSetlist
      )
      const activeSong = setlists[activeSetlistIndex].songs[swipeIndex]._id
      const objectKey = `${activeSetlist}-${activeSong}`
      console.log(keyChangeObject[objectKey])
      keyChangeObject[objectKey]
        ? keyChangeCounting(direction, keyChangeObject[objectKey])
        : keyChangeCounting(direction, keyCounter)
      keyChangeObject = {
        ...keyChangeObject,
        [objectKey]: keyCounter,
      }
      localStorage.setItem('keyChangeCounter', JSON.stringify(keyChangeObject))
    } else {
      keyChangeCounting(direction, keyCounter)
    }
  }

  function keyChangeCounting(direction, counter) {
    if (direction === 'up') {
      setKeyCounter(counter + 1)
      setchangeKeyDirection('up')
    } else {
      setKeyCounter(counter - 1)
      setchangeKeyDirection('down')
    }
  }
}
