import React from 'react'
import SongContainer from './SongContainer'
import Song from './Song'

import songs from './songs.json'
import Seperator from './Seperator'

function App() {
  return (
    <div className="App">
      <SongContainer>
        {songs.map((song, index) => (
          <>
            <Song key={index} {...song}></Song>
            <Seperator />
          </>
        ))}
      </SongContainer>
    </div>
  )
}

export default App
