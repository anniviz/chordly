import React, { useState } from 'react'
import SwipeableViews from 'react-swipeable-views'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Layout from './common/Layout'
import TitleList from './TitleList/TitleList'
import Song from './Song/Song'
import AddSong from './forms/AddSong'
import ListButton from './navigation/ListButton'

import useSongs from './hooks/useSongs'

function App() {
  const { songs, isLoading, swipeIndex, setSwipeIndex } = useSongs()

  const [isAllSongsShown, setIsAllSongsShown] = useState(false)
  let isAListShown = false
  isAllSongsShown ? (isAListShown = true) : (isAListShown = false)

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
                        isAListShown={isAListShown}
                      />
                    ))
                  : 'no song'}
              </SwipeableViews>
            )}
            <TitleList
              songs={songs}
              swipeIndex={swipeIndex}
              handleChangeIndex={index => handleChangeIndex(index)}
              isAllSongsShown={isAllSongsShown}
            ></TitleList>
            <ListButton
              onClick={toggleAllSongs}
              isAllSongsShown={isAllSongsShown}
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

  function toggleAllSongs() {
    setIsAllSongsShown(!isAllSongsShown)
  }

  function handleChangeIndex(index) {
    setSwipeIndex(index)
  }
}

export default App
