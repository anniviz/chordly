import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import TitleListItem from './TitleListItem'

export default function TitleList({
  songs,
  displayedSong,
  setDisplayedSong,
  isAllSongsShown,
}) {
  return (
    <TitleWrapper isAllSongsShown={isAllSongsShown}>
      {songs.map((song, index) => {
        return highlightSelectedTitle(
          song,
          displayedSong,
          index,
          setDisplayedSong
        )
      })}
    </TitleWrapper>
  )

  function highlightSelectedTitle(
    song,
    displayedSong,
    index,
    setDisplayedSong
  ) {
    if (song === displayedSong) {
      return (
        <TitleListItem
          key={index}
          song={song}
          selected={true}
          setDisplayedSong={setDisplayedSong}
        />
      )
    } else {
      return (
        <TitleListItem
          key={index}
          song={song}
          selected={false}
          setDisplayedSong={setDisplayedSong}
        />
      )
    }
  }
}

const TitleWrapper = styled.ul`
  display: ${props => (props.isAllSongsShown ? 'block' : 'none')};
  justify-self: stretch;
  align-self: center;
  list-style: none;
  padding: 10px;
  width: 100%;
  height: 90%;
  border-radius: 12px;
  border: 2px solid transparent;
  position: relative;
  background: #3f4a6d;
  background-clip: padding-box;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    margin: -2px;
    border-radius: inherit;
    background: linear-gradient(60deg, #feb79c, #fd5da1);
  }
`

//const TitleListItem = styled.li``

TitleList.propTypes = {
  songs: PropTypes.array.isRequired,
  displayedSong: PropTypes.object.isRequired,
  setDisplayedSong: PropTypes.func.isRequired,
}
