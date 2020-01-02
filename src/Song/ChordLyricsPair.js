import React from 'react'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'

import { scales } from '../ChangeKey/scales'

export default function ChordLyricsPair({
  item,
  chordsInLine,
  keyCounter,
  chankgeKeyDirection,
}) {
  let chord
  keyCounter === 0
    ? (chord = item.chords)
    : (chord = transposeChord(item.chords, keyCounter, chankgeKeyDirection))
  return (
    <ChordLyricsWrapper item={item} chordsInLine={chordsInLine}>
      {chordsInLine && <Chord>{chord}</Chord>}
      <Lyrics>{item.lyrics}</Lyrics>
    </ChordLyricsWrapper>
  )

  function transposeChord(chord, keyCounter, chankgeKeyDirection) {
    const chordLength = chord.length
    let transposedChord
    if (chordLength === 1) {
      const chordIndex = scales.flat.findIndex(
        arrayChord => chord === arrayChord
      )
      transposedChord = transposePlainChord(
        keyCounter,
        chankgeKeyDirection,
        chordIndex
      )
    } else if (chordLength === 2) {
      if (chord[1] === 'm') {
        const chordIndex = scales.flat.findIndex(
          arrayChord => chord[0] === arrayChord
        )
        const transposedChordStart = transposePlainChord(
          keyCounter,
          chankgeKeyDirection,
          chordIndex
        )
        transposedChord = transposedChordStart + 'm'
      } else if (chord[1] === '#') {
        const chordIndex = scales.sharp.findIndex(
          arrayChord => chord === arrayChord
        )
        transposedChord = transposePlainChord(
          keyCounter,
          chankgeKeyDirection,
          chordIndex
        )
      } else if (chord[1] === 'b') {
        const chordIndex = scales.flat.findIndex(
          arrayChord => chord === arrayChord
        )
        transposedChord = transposePlainChord(
          keyCounter,
          chankgeKeyDirection,
          chordIndex
        )
      }
    }
    return transposedChord
  }

  function transposePlainChord(keyCounter, chankgeKeyDirection, chordIndex) {
    let transposeIndex = (chordIndex + keyCounter) % 12
    while (transposeIndex < 0) {
      transposeIndex = transposeIndex + 12
    }
    if (chankgeKeyDirection === 'up') {
      return scales.sharp[transposeIndex]
    } else {
      return scales.flat[transposeIndex]
    }
  }
}

const ChordLyricsWrapper = styled.div`
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
  keyCounter: PropTypes.number,
  chankgeKeyDirection: PropTypes.string,
}
