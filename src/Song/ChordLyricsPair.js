import React from 'react'
import styled from 'styled-components/macro'

export default function ChordLyricsPair({ item, chordsInLine }) {
  return (
    <ChordLyricsWrapper item={item} chordsInLine={chordsInLine}>
      {chordsInLine && <Chord>{item.chords}</Chord>}
      <Lyrics>{item.lyrics}</Lyrics>
    </ChordLyricsWrapper>
  )
}

const ChordLyricsWrapper = styled.div`
  margin-right: 4px;
  display: flex;
  flex-direction: column;
`

const Chord = styled.div`
  height: 1.5em;
  color: #939fc2;
`

const Lyrics = styled.div`
  height: 1.5em;
  color: #fefefe;
`
