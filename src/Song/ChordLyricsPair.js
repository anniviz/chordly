import React from 'react'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'

import { scales } from '../ChangeKey/scales'

export default function ChordLyricsPair({
  item,
  chordsInLine,
  keyCounter,
  changeKeyDirection,
  activeSetlist,
  song,
}) {
  let chord
  keyCounter === 0
    ? (chord = item.chords)
    : (chord = transposeChord(item.chords))
  return (
    <ChordLyricsWrapper>
      {chordsInLine && <Chord>{chord}</Chord>}
      <Lyrics>{item.lyrics}</Lyrics>
    </ChordLyricsWrapper>
  )

  function transposeChord(chord) {
    const chordLength = chord.length
    let transposedChord
    if (chordLength > 0) {
      if (chord.includes('/')) {
        const chordSplit = chord.indexOf('/')
        const chordWithoutBass = chord.substring(0, chordSplit)
        const bass = chord.substring(chordSplit + 1)
        const transposedChordWithoutBass = transposePlainChord(chordWithoutBass)
        const transposedBass = transposePlainChord(bass)
        transposedChord = transposedChordWithoutBass + '/' + transposedBass
      } else {
        transposedChord = transposePlainChord(chord)
      }
    }
    return transposedChord
  }

  function transposePlainChord(chord) {
    let transposedChord
    let chordIndex
    let transposedChordStart
    if (chord[1] === '#') {
      chordIndex = scales.sharp.findIndex(
        arrayChord => chord.substring(0, 2) === arrayChord
      )
    } else if (chord[1] === 'b') {
      chordIndex = scales.flat.findIndex(
        arrayChord => chord.substring(0, 2) === arrayChord
      )
    } else {
      chordIndex = scales.flat.findIndex(arrayChord => chord[0] === arrayChord)
    }

    let transposeIndex = (chordIndex + keyCounter) % 12
    while (transposeIndex < 0) {
      transposeIndex = transposeIndex + 12
    }
    if (changeKeyDirection === 'up') {
      transposedChordStart = scales.sharp[transposeIndex]
    } else {
      transposedChordStart = scales.flat[transposeIndex]
    }

    if (chord[1] === 'b' || chord[1] === '#') {
      transposedChord = transposedChordStart + chord.substring(2)
    } else {
      transposedChord = transposedChordStart + chord.substring(1)
    }

    return transposedChord
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
  changeKeyDirection: PropTypes.string,
  song: PropTypes.object,
}
