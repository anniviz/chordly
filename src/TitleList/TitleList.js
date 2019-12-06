import React from 'react'
import { useSpring, animated } from 'react-spring'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

import TitleListItem from './TitleListItem'

export default function TitleList({
  songs,
  swipeIndex,
  handleChangeIndex,
  isAllSongsShown,
}) {
  const AnimatedTitleWrapperBorder = animated(TitleWrapperBorder)
  const flyIn = useSpring({
    opacity: isAllSongsShown ? 1 : 0,
  })

  return (
    <AnimatedTitleWrapperBorder isAllSongsShown={isAllSongsShown} style={flyIn}>
      <TitleWrapper isAllSongsShown={isAllSongsShown}>
        {songs.map((song, index) => {
          return highlightSelectedTitle(
            song,
            swipeIndex,
            index,
            handleChangeIndex
          )
        })}
      </TitleWrapper>
    </AnimatedTitleWrapperBorder>
  )

  function highlightSelectedTitle(song, swipeIndex, index, handleChangeIndex) {
    if (song.index === swipeIndex) {
      return (
        <TitleListItem
          key={song._id}
          song={song}
          index={index}
          selected={true}
          handleChangeIndex={index => handleChangeIndex(index)}
        />
      )
    } else {
      return (
        <TitleListItem
          key={song._id}
          song={song}
          index={index}
          selected={false}
          handleChangeIndex={index => handleChangeIndex(index)}
        />
      )
    }
  }
}

const TitleWrapper = styled.ul`
  justify-self: stretch;
  align-self: center;
  list-style: none;
  padding: 10px;
  height: 100%;
  border-radius: 12px;
  background: #3f4a6d;
  background-clip: padding-box;
`

const TitleWrapperBorder = styled.div`
  justify-self: stretch;
  align-self: center;
  list-style: none;
  border-radius: 12px;
  padding: 2px;
  height: 90%;
  background: linear-gradient(60deg, #feb79c, #fd5da1);
`

TitleList.propTypes = {
  songs: PropTypes.array.isRequired,
  // displayedSong: PropTypes.object,
  // setDisplayedSong: PropTypes.func.isRequired,
  isAllSongsShown: PropTypes.bool.isRequired,
}
