import React from 'react'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'

import ChordLyricsPair from './ChordLyricsPair'

export default function Song({ song, isAListShown }) {
  return (
    <SongWrapper isAListShown={isAListShown}>
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
                  />
                ))}
            </Line>
          )
        })}
      </LyricsWrapper>
    </SongWrapper>
  )

  function isLineMetadata(items) {
    return items.some(item => item._name)
  }

  function areChordsInLine(items) {
    return items.some(item => item.chords)
  }
}

const SongWrapper = styled.section`
  grid-column: 3 / end;
  padding: 12px;
  margin-top: 10%;
  overflow: scroll;
`

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

Song.propTypes = {
  song: PropTypes.object.isRequired,
  isAListShown: PropTypes.bool.isRequired,
}
