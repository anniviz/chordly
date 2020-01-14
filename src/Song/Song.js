import React from 'react'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'

import SongContent from './SongContent'
import ChordLyricsPair from './ChordLyricsPair'
import { dimensions } from '../common/dimensions'

function Song({ song, keyCounter, changeKeyDirection }) {
  // console.log('song', song)
  // console.log('keyCounter', keyCounter)
  // console.log('changeKeyDirection', changeKeyDirection)
  console.log('foo')
  return (
    <ScrollContainer>
      <SongWrapper>
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
      </SongWrapper>
    </ScrollContainer>
  )

  function isLineMetadata(items) {
    return items.some(item => item._name)
  }

  function areChordsInLine(items) {
    return items.some(item => item.chords)
  }
}

const ScrollContainer = styled.div`
  height: 100vh;
  overflow: scroll;
  align-self: flex-start;
`

const SongWrapper = styled.section`
  /* height: 100vh; */
  /* align-self: flex-start; */
  padding: ${dimensions.standardPadding + 'px'};
  padding-bottom: 100px;
  /* overflow: scroll; */
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
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
  song: PropTypes.object,
  isSideListShown: PropTypes.bool.isRequired,
  keyCounter: PropTypes.number,
  changeKeyDirection: PropTypes.string,
}

export default React.memo(Song)
// export default Song
