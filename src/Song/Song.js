import React from 'react'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'
import { useSpring, animated } from 'react-spring'

import SongContent from './SongContent'
import { dimensions } from '../common/dimensions'

function Song({ song, isSideListShown, keyCounter, changeKeyDirection }) {
  const AnimatedSongWrapper = animated(SongWrapper)
  const songAnimation = useSpring({
    paddingRight: isSideListShown
      ? dimensions.sideListWidth + 2 * dimensions.standardPadding + 'px'
      : dimensions.standardPadding + 'px',
  })
  return (
    <AnimatedSongWrapper style={songAnimation}>
      <SongContent
        song={song}
        keyCounter={keyCounter}
        changeKeyDirection={changeKeyDirection}
      ></SongContent>
    </AnimatedSongWrapper>
  )
}

const SongWrapper = styled.section`
  padding: ${dimensions.standardPadding + 'px'};
  overflow: scroll;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`

Song.propTypes = {
  song: PropTypes.object,
  isSideListShown: PropTypes.bool.isRequired,
  keyCounter: PropTypes.number,
  changeKeyDirection: PropTypes.string,
}

export default React.memo(Song)
