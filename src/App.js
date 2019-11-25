import React from 'react'
import SongContainer from './SongContainer'
import Song from './Song'

import songData from './songs.json'
import Seperator from './Seperator'

function App() {
  const songs = songData
  return (
    <div className="App">
      <SongContainer>
        {songs.map((song, index) => (
          <>
            <Song
              key={index}
              title={song.title}
              artist={song.artist}
              lyrics={song.lyrics}
            ></Song>
            <Seperator />
          </>
        ))}
      </SongContainer>
    </div>
  )
}

export default App
