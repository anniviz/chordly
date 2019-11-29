import React from 'react'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'

import ChordLyricsPair from './ChordLyricsPair'

export default function Song({ song, isAListShown }) {
  return (
    <SongStyled isAListShown={isAListShown}>
      <SongTitle>{song.optimizedMetaData.title}</SongTitle>
      {song.optimizedMetaData.artist && (
        <SongArtist>{song.optimizedMetaData.artist}</SongArtist>
      )}
      <LyricsContainer>
        {song.lines.map((line, index) => (
          <Line key={index}>
            {isLineMetadata(line.items) ||
              (areChordsInLine(line.items)
                ? line.items.map((item, index) => (
                    <ChordLyricsPair
                      key={index}
                      item={item}
                      chordsInLine={true}
                    />
                  ))
                : line.items.map((item, index) => (
                    <ChordLyricsPair
                      key={index}
                      item={item}
                      chordsInLine={false}
                    />
                  )))}
          </Line>
        ))}
      </LyricsContainer>
    </SongStyled>
  )

  function isLineMetadata(items) {
    let isMetadata = false
    items.forEach(item => item._name && (isMetadata = true))
    return isMetadata
  }

  function areChordsInLine(items) {
    let isChords = false
    items.forEach(item => item.chords !== '' && (isChords = true))
    return isChords
  }
}

const SongStyled = styled.section`
  grid-column: ${props => (props.isAListShown ? '3 / end' : '2 / end')};
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
  color: #939fc2;
`

const LyricsContainer = styled.div`
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
