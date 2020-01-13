import React from 'react'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'

import ChordLyricsPair from './ChordLyricsPair'

function SongContent({ song, keyCounter, changeKeyDirection }) {
  return (
    <>
      <SongTitle>{song.optimizedMetaData.title}</SongTitle>
      {song.optimizedMetaData.artist && (
        <SongArtist>{song.optimizedMetaData.artist}</SongArtist>
      )}
      <LyricsWrapper>
        {song.lines.map((line, index) => {
          const chordsInLine = areChordsInLine(line.items)
          return (
            <Line key={index}>
              {isLineMetadata(line.items) ||
                line.items.map((item, index) => (
                  <ChordLyricsPair
                    key={index}
                    item={item}
                    chordsInLine={chordsInLine}
                    keyCounter={keyCounter}
                    changeKeyDirection={changeKeyDirection}
                  />
                ))}
            </Line>
          )
        })}
      </LyricsWrapper>
    </>
  )

  function isLineMetadata(items) {
    return items.some(item => item._name)
  }

  function areChordsInLine(items) {
    return items.some(item => item.chords)
  }
}

const SongTitle = styled.h1`
  font-size: 1.5rem;
  color: #fefefe;
  margin: 12px 0;
`

const SongArtist = styled.h2`
  font-size: 1rem;
  color: #fefefe;
`

const LyricsWrapper = styled.div`
  margin-top: 20px;
`

const Line = styled.div`
  display: flex;
  flex-wrap: wrap;
`

SongContent.propTypes = {
  song: PropTypes.object,
  keyCounter: PropTypes.number,
  changeKeyDirection: PropTypes.string,
}

export default React.memo(SongContent)
