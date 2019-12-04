import React, { useState, useEffect } from 'react'
import { useSpring, animated } from 'react-spring'

import Layout from './common/Layout'
import TitleList from './TitleList/TitleList'
import Song from './Song/Song'
import SidebarItem from './SidebarItem'
import Sidebar from './Sidebar'
import GradientText from './common/GradientText'

import { getSongs } from './services'
import useSongs from './hooks/useSongs'

function App() {
  const { songs, setSongs, isLoading } = useSongs()
  // const [songsDB, setSongsDB] = useState([])

  useEffect(() => {
    getSongs()
      .then(setSongs)
      .catch(err => {
        console.error(err)
      })
    // This is called once
  }, [])

  useEffect(() => {
    setDisplayedSong(songs[0])
  }, [songs])

  // console.log('songsAlphabetically')
  // console.log(songsAlphabetically)

  const [displayedSong, setDisplayedSong] = useState(songs[0])
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
        displayedSong={displayedSong}
        setDisplayedSong={setDisplayedSong}
        isAllSongsShown={isAllSongsShown}
      ></TitleList>
      {displayedSong ? (
        <Song song={displayedSong} isAListShown={isAListShown} />
      ) : (
        'Loading ...'
      )}
    </AnimatedLayout>
  )

  function toggleAllSongs() {
    setIsAllSongsShown(!isAllSongsShown)
  }
}

export default App
