import React from 'react'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'

export default function ChordLyricsPair({ item, chordsInLine }) {
  return (
    <ChordLyricsWrapper item={item} chordsInLine={chordsInLine}>
      {chordsInLine && <Chord>{item.chords}</Chord>}
      <Lyrics>{item.lyrics}</Lyrics>
    </ChordLyricsWrapper>
  )
}

const ChordLyricsWrapper = styled.div`
  /* margin-right: 4px; */
  display: flex;
  flex-direction: column;
`

const Chord = styled.div`
  height: 1em;
  margin: 4px;
  color: #939fc2;
`

const Lyrics = styled.div`
  color: #fefefe;
  margin-bottom: 4px;
  line-height: 1.5;
  white-space: pre-wrap;
`

ChordLyricsPair.propTypes = {
  item: PropTypes.object.isRequired,
  chordsInLine: PropTypes.bool.isRequired,
}
