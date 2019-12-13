import React from 'react'
import { useSpring, animated } from 'react-spring'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import { Link } from 'react-router-dom'

import TitleListItem from './SideListItem'

export default function TitleList({
  songs,
  swipeIndex,
  handleChangeIndex,
  isSideListShown,
}) {
  const AnimatedSideListWrapperBorder = animated(SideListWrapperBorder)
  const flyIn = useSpring({
    width: isSideListShown ? '192px' : '0px',
    opacity: isSideListShown ? 1 : 0,
  })

  return (
    <AnimatedSideListWrapperBorder
      isSideListShown={isSideListShown}
      style={flyIn}
    >
      <SideListWrapper isSideListShown={isSideListShown}>
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
      </SideListWrapper>
      <ListMenu>
        <MenuItem style={{ borderRadius: '0 0 0 12px' }}>
          <img
            className="setlist-icon"
            alt="setlist"
            src={require('../icons/clipboard-list.svg')}
          />
        </MenuItem>
        <MenuItem>
          <img
            className="all-songs-icon"
            alt="all songs"
            src={require('../icons/queue-music.svg')}
          />
        </MenuItem>
        <Link to="/AddSong">
          <MenuItem style={{ borderRadius: '0 0 12px 0' }}>
            <img
              className="add-icon"
              alt="add"
              src={require('../icons/add-box.svg')}
            />
          </MenuItem>
        </Link>
      </ListMenu>
    </AnimatedSideListWrapperBorder>
  )
}

const SideListWrapper = styled.ul`
  justify-self: stretch;
  align-self: center;
  list-style: none;
  padding: var(--titlePadding);
  height: 100%;
  border-radius: 12px 12px 0 0;
  background: #3f4a6d;
  background-clip: padding-box;
  overflow: scroll;
  padding-bottom: 72px;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`

const SideListWrapperBorder = styled.div`
  display: grid;
  grid-template-rows: auto 48px;
  justify-items: stretch;
  border-radius: 12px;
  padding: 2px;
  height: calc(100vh - 120px);
  background: linear-gradient(60deg, #feb79c, #fd5da1);
  position: fixed;
  top: 30px;
  left: 20px;
`

const ListMenu = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: stretch;
  background: #3f4a6d;
  border-radius: 0 0 12px 12px;
`

const MenuItem = styled.div`
  height: 100%;
  display: grid;
  align-content: center;
  justify-content: center;
  border: 1px solid #707070;
  background: #3f4a6d;
`

TitleList.propTypes = {
  songs: PropTypes.array.isRequired,
  swipeIndex: PropTypes.number.isRequired,
  handleChangeIndex: PropTypes.func.isRequired,
  isSideListShown: PropTypes.bool.isRequired,
}
