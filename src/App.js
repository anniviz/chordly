import React, { useState } from 'react'
import SwipeableViews from 'react-swipeable-views'

import Layout from './common/Layout'
import TitleList from './TitleList/TitleList'
import Song from './Song/Song'

import useSongs from './hooks/useSongs'
import ListButton from './navigation/ListButton'

function App() {
  const { songs, isLoading, swipeIndex, setSwipeIndex } = useSongs()

  const [isAllSongsShown, setIsAllSongsShown] = useState(false)
  let isAListShown = false
  isAllSongsShown ? (isAListShown = true) : (isAListShown = false)

  return (
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
          {songs.map(song => (
            <Song key={song._id} song={song} isAListShown={isAListShown} />
          ))}
        </SwipeableViews>
      )}
      <TitleList
        songs={songs}
        swipeIndex={swipeIndex}
        handleChangeIndex={index => handleChangeIndex(index)}
        isAllSongsShown={isAllSongsShown}
      ></TitleList>
      <ListButton onClick={toggleAllSongs} isAllSongsShown={isAllSongsShown}>
        All Songs
      </ListButton>
    </Layout>
  )

  function toggleAllSongs() {
    setIsAllSongsShown(!isAllSongsShown)
  }

  function handleChangeIndex(index) {
    setSwipeIndex(index)
  }
}

export default App
