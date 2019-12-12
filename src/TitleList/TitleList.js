import React from 'react'
import { useSpring, animated } from 'react-spring'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import { Link } from 'react-router-dom'

import TitleListItem from './TitleListItem'
import SmallButton from '../common/SmallButton'

import addIcon from '../icons/addIcon.png'

export default function TitleList({
  songs,
  swipeIndex,
  handleChangeIndex,
  isAllSongsShown,
}) {
  const AnimatedTitleWrapperBorder = animated(TitleWrapperBorder)
  const flyIn = useSpring({
    width: isAllSongsShown ? '180px' : '0px',
    opacity: isAllSongsShown ? 1 : 0,
  })

  return (
    <AnimatedTitleWrapperBorder isAllSongsShown={isAllSongsShown} style={flyIn}>
      <TitleWrapper isAllSongsShown={isAllSongsShown}>
        {songs
          ? songs.map((song, index) => (
              <TitleListItem
                key={song._id}
                song={song}
                index={index}
                swipeIndex={swipeIndex}
                handleChangeIndex={index => handleChangeIndex(index)}
              />
            ))
          : 'no song'}
      </TitleWrapper>
      <Link to="/AddSong">
        <SmallButton
          style={{ position: 'absolute', bottom: '12px', left: '66px' }}
        >
          <img src={addIcon} alt="" />
        </SmallButton>
      </Link>
    </AnimatedTitleWrapperBorder>
  )
}

const TitleWrapper = styled.ul`
  justify-self: stretch;
  align-self: center;
  list-style: none;
  padding: var(--titlePadding);
  height: 100%;
  border-radius: 12px;
  background: #3f4a6d;
  background-clip: padding-box;
  overflow: scroll;
  padding-bottom: 72px;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`

const TitleWrapperBorder = styled.div`
  list-style: none;
  border-radius: 12px;
  padding: 2px;
  width: var(--listWidth);
  height: calc(100vh - 120px);
  background: linear-gradient(60deg, #feb79c, #fd5da1);
  position: fixed;
  top: 30px;
  left: 20px;
`

TitleList.propTypes = {
  songs: PropTypes.array.isRequired,
  swipeIndex: PropTypes.number.isRequired,
  handleChangeIndex: PropTypes.func.isRequired,
  isAllSongsShown: PropTypes.bool.isRequired,
}
