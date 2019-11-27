import React, { useState } from 'react'

import Layout from './Layout'
import TitleList from './TitleList'
import Song from './Song'

import songs from './songsShort.json'
import SidebarItem from './SidebarItem'
import TitleListWrapper from './TitleListWrapper'
import Sidebar from './Sidebar'
import GradientText from './GradientText'

function App() {
  const songsAlphabetically = songs
    .slice(0)
    .sort((a, b) => (a.title > b.title ? 1 : -1))

  const [displayedSong, setDisplayedSong] = useState(songsAlphabetically[0])
  const [isTitleListShown, setIsTitleListShown] = useState(false)

  return (
    <Layout>
      <Sidebar>
        <SidebarItem>
          <GradientText>Current Set List</GradientText>
        </SidebarItem>
        <SidebarItem>
          <GradientText>Set Lists</GradientText>
        </SidebarItem>
        <SidebarItem>
          <GradientText>All Songs</GradientText>
        </SidebarItem>
      </Sidebar>
      <TitleList
        songs={songsAlphabetically}
        displayedSong={displayedSong}
        setDisplayedSong={setDisplayedSong}
      ></TitleList>
      <Song {...displayedSong} />
    </Layout>
  )
}

export default App
