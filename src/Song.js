import React from 'react'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'

export default function Song({ song, isAListShown }) {
  return (
    <SongStyled isAListShown={isAListShown}>
      <h1>{song.optimizedMetaData.title}</h1>
      {song.optimizedMetaData.artist && (
        <h2>{song.optimizedMetaData.artist}</h2>
      )}
      {song.lines.map((line, index) => (
        <Line key={index}>
          {line.items.map((item, index) => (
            <CordLyricsPair key={index}>
              <Chord>{item.chords}</Chord>
              <Lyrics>{item.lyrics}</Lyrics>
            </CordLyricsPair>
          ))}
        </Line>
      ))}
    </SongStyled>
  )
}

const SongStyled = styled.section`
  grid-column: ${props => (props.isAListShown ? '3 / end' : '2 / end')};
  white-space: pre-line;
  padding: 12px;
  margin-top: 10%;
`

const Line = styled.div`
  display: flex;
  flex-direction: row;
`

const CordLyricsPair = styled.div`
  display: flex;
  flex-direction: column;
`

const Chord = styled.div`
  height: 1.5em;
  color: #10ddd0;
`

const Lyrics = styled.div`
  height: 1.5em;
  color: #11b7bc;
`

Song.propTypes = {
  song: PropTypes.object.isRequired,
  isAListShown: PropTypes.bool.isRequired,
}
