import React, { useState } from 'react'
import Layout from './Layout'
import TitleList from './TitleList'
import Song from './Song'

import songs from './songsShort.json'
import SidebarItem from './SidebarItem'
import Sidebar from './Sidebar'
import GradientText from './GradientText'

function App() {
  const songsAlphabetically = songs
    .slice(0)
    .sort((a, b) => (a.title > b.title ? 1 : -1))

  const [displayedSong, setDisplayedSong] = useState(songsAlphabetically[0])
  const [isAllSongsShown, setIsAllSongsShown] = useState(false)
  let isAListShown = false
  isAllSongsShown ? (isAListShown = true) : (isAListShown = false)

  return (
    <Layout>
      <Sidebar>
        <SidebarItem listType="currentList">
          <GradientText>Current Set List</GradientText>
        </SidebarItem>
        <SidebarItem listType="setLists">
          <GradientText>Set Lists</GradientText>
        </SidebarItem>
        <SidebarItem
          listType="allSongs"
          onClick={toggleAllSongs}
          isAllSongsShown={isAllSongsShown}
        >
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
      <Song {...displayedSong} isAListShown={isAListShown} />
    </Layout>
  )

  function toggleAllSongs() {
    setIsAllSongsShown(!isAllSongsShown)
  }
}

export default App
