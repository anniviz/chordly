import React from 'react'

import Layout from './Layout'
import TitleList from './TitleList'
import Song from './Song'

import songs from './songsShort.json'

function App() {
  const songsAlphabetically = songs
    .slice(0)
    .sort((a, b) => (a.title > b.title ? 1 : -1))

  return (
    <Layout>
      <TitleList songs={songsAlphabetically}></TitleList>
    </Layout>
  )
}

export default App
