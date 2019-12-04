import React, { useState, useEffect } from 'react'
import { useSpring, animated } from 'react-spring'

import Layout from './common/Layout'
import TitleList from './TitleList/TitleList'
import Song from './Song/Song'
import SidebarItem from './SidebarItem'
import Sidebar from './Sidebar'
import GradientText from './common/GradientText'

import songs from './songsParsed.json'

import { getSongs } from './services'

function App() {
  const [songsDB, setSongsDB] = useState([])

  // useEffect(() => {
  //   // This is called every change
  // })

  useEffect(() => {
    getSongs()
      .then(setSongsDB)
      .catch(err => {
        console.error(err)
      })
    // This is called once
  }, [])

  // const songsAlphabetically = songsDB
  //   .slice()
  //   .sort((a, b) =>
  //     a.optimizedMetaData.title > b.optimizedMetaData.title ? 1 : -1
  //   )

  useEffect(() => {
    setDisplayedSong(songsDB[0])
  }, [songsDB])

  // console.log('songsAlphabetically')
  // console.log(songsAlphabetically)

  const [displayedSong, setDisplayedSong] = useState(songsDB[0])
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
        songs={songsDB}
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
