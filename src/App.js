import React, { useState } from 'react'

import Layout from './Layout'
import TitleList from './TitleList'
import Song from './Song'

import songs from './songsShort.json'

function App() {
  const songsAlphabetically = songs
    .slice(0)
    .sort((a, b) => (a.title > b.title ? 1 : -1))

  const [displayedSong, setDisplayedSong] = useState(songsAlphabetically[0])
  return (
    <Layout>
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
