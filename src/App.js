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

function App() {
  const { songs, isLoading, swipeIndex, setSwipeIndex } = useSongs()
  const { isSideListShown, setIsSideListShown } = useSideLists()

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Layout>
            {isLoading ? (
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
            )}
            <SideList
              songs={songs}
              swipeIndex={swipeIndex}
              handleChangeIndex={index => handleChangeIndex(index)}
              isSideListShown={isSideListShown}
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
}

export default App
