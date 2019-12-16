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

function App() {
  const { songs, isLoading, swipeIndex, setSwipeIndex } = useSongs()
  const {
    isSideListShown,
    setIsSideListShown,
    isAllSongsShown,
    setIsAllSongsShown,
    isSetListsShown,
    setIsSetListsShown,
    isASetListShown,
    setIsASetListShown,
  } = useSideLists()
  const { setlists, activeSetlist, setActiveSetlist } = useSetlists()

  let swipeableViewContent
  if (isASetListShown) {
    const activeSetlistID = setlists.findIndex(
      setlist => setlist._id === activeSetlist
    )
    handleSwipeableViewsWithSetlist(setlists[activeSetlistID])
  } else {
    handleSwipeableViewWithAllSongs(songs)
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
              isAllSongsShown={isAllSongsShown}
              setIsAllSongsShown={setIsAllSongsShown}
              isSetListsShown={isSetListsShown}
              setIsSetListsShown={setIsSetListsShown}
              isASetListShown={isASetListShown}
              setIsASetListShown={setIsASetListShown}
              setSwipeIndex={setSwipeIndex}
            ></SideList>
            <ListButton
              onClick={toggleSideList}
              isSideListShown={isSideListShown}
            >
              All Songs
            </ListButton>
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

  function handleSwipeableViewsWithSetlist(setlist) {
    swipeableViewContent = (
      <SwipeableViews
        index={swipeIndex}
        onChangeIndex={handleChangeIndex}
        enableMouseEvents
        animateTransitions={false}
      >
        {setlist.songs
          ? setlist.songs.map(song => (
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

  function handleSwipeableViewWithAllSongs(songs) {
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

export default App
