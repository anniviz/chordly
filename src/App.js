import React, { useState } from 'react'
import { useSpring, animated } from 'react-spring'

import Layout from './common/Layout'
import TitleList from './TitleList/TitleList'
import Song from './Song/Song'
import SidebarItem from './SidebarItem'
import Sidebar from './Sidebar'
import GradientText from './common/GradientText'

import songs from './songsParsed.json'

function App() {
  const songsAlphabetically = songs
    .slice(0)
    .sort((a, b) =>
      a.optimizedMetaData.title > b.optimizedMetaData.title ? 1 : -1
    )

  const [displayedSong, setDisplayedSong] = useState(songsAlphabetically[0])
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
        <SidebarItem>
          <GradientText>{/* Current Set List */}</GradientText>
        </SidebarItem>
        <SidebarItem>
          <GradientText>{/* Set Lists */}</GradientText>
        </SidebarItem>
        <SidebarItem onClick={toggleAllSongs} isAllSongsShown={isAllSongsShown}>
          {isAllSongsShown ? (
            <p>All Songs </p>
          ) : (
            <GradientText>All Songs</GradientText>
          )}
        </SidebarItem>
      </Sidebar>
      <TitleList
        songs={songsAlphabetically}
        displayedSong={displayedSong}
        setDisplayedSong={setDisplayedSong}
        isAllSongsShown={isAllSongsShown}
      ></TitleList>
      <Song song={displayedSong} isAListShown={isAListShown} />
    </AnimatedLayout>
  )

  function toggleAllSongs() {
    setIsAllSongsShown(!isAllSongsShown)
  }
}

export default App
