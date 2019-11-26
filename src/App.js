import React from 'react'

import Layout from './Layout'
import TitleList from './TitleList'
import Song from './Song'

import songs from './songsShort.json'

function App() {
  const titles = []
  songs.forEach(song => {
    titles.push(song.title)
  })
  const titlesAlphabetically = titles.sort()
  return (
    <Layout>
      <TitleList titles={titlesAlphabetically}></TitleList>
    </Layout>
  )
}

export default App
