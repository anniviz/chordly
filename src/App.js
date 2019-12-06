import React, { useState } from 'react'
import { useSpring, animated } from 'react-spring'
import SwipeableViews from 'react-swipeable-views'

import Layout from './common/Layout'
import TitleList from './TitleList/TitleList'
import Song from './Song/Song'
import SidebarItem from './SidebarItem'
import Sidebar from './Sidebar'
import GradientText from './common/GradientText'

import useSongs from './hooks/useSongs'

function App() {
  const { songs, isLoading, swipeIndex, setSwipeIndex } = useSongs()

  const [isAllSongsShown, setIsAllSongsShown] = useState(false)
  let isAListShown = false
  isAllSongsShown ? (isAListShown = true) : (isAListShown = false)

  const AnimatedLayout = animated(Layout)
  const animateLayout = useSpring({
    gridTemplateColumns: isAllSongsShown ? '60px 25% auto' : '60px 0% auto',
  })

  return (
    <AnimatedLayout style={animateLayout}>
      <Sidebar>
        <SidebarItem></SidebarItem>
        <SidebarItem></SidebarItem>
        <SidebarItem onClick={toggleAllSongs} isAllSongsShown={isAllSongsShown}>
          {isAllSongsShown ? (
            <p>All Songs </p>
          ) : (
            <GradientText>All Songs</GradientText>
          )}
        </SidebarItem>
      </Sidebar>
      <TitleList
        songs={songs}
        swipeIndex={swipeIndex}
        handleChangeIndex={index => handleChangeIndex(index)}
        isAllSongsShown={isAllSongsShown}
      ></TitleList>
      {isLoading ? (
        'Loading ...'
      ) : (
        <SwipeableViews
          index={swipeIndex}
          onChangeIndex={handleChangeIndex}
          enableMouseEvents
        >
          {songs.map(song => (
            <Song key={song._id} song={song} isAListShown={isAListShown} />
          ))}
        </SwipeableViews>
      )}
    </AnimatedLayout>
  )

  function toggleAllSongs() {
    setIsAllSongsShown(!isAllSongsShown)
  }

  function handleChangeIndex(index) {
    setSwipeIndex(index)
  }
}

export default App
