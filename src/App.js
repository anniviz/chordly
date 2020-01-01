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
import useKeyChange from './hooks/useKeyChange'
import ChangeKeyButton from './navigation/ChangeKeyButton'

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

  const { keyCounter, setKeyCounter } = useKeyChange()

  let swipeableViewContent
  if (sideListType === 'singleSetlist') {
    const activeSetlistID = setlists.findIndex(
      setlist => setlist._id === activeSetlist
    )
    handleSwipeableView(setlists[activeSetlistID].songs)
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
            ></ChangeKeyButton>
            <ChangeKeyButton
              direction="down"
              handleKeyChangeClick={() => handleKeyChangeClick('down')}
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
              />
            ))
          : 'no song'}
      </SwipeableViews>
    )
  }

  function handleKeyChangeClick(direction) {
    direction === 'up'
      ? setKeyCounter(keyCounter + 1)
      : setKeyCounter(keyCounter - 1)
  }
}
