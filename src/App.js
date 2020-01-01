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
import KeyButton from './navigation/KeyButton'

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
            <ListButton
              toggleSideList={toggleSideList}
              isSideListShown={isSideListShown}
            />
            <KeyButton toggleKeyChange={toggleKeyChange} />
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

  function toggleKeyChange() {}

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
}
