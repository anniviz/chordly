import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import TitleListItem from './TitleListItem'

export default function TitleList({ songs, displayedSong, setDisplayedSong }) {
  return (
    <TitleWrapper>
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
  grid-column: 1 / 2;
  justify-self: stretch;
  list-style: none;
  padding: 10px;
  width: 100%;
  height: 80%;
  border-radius: 12px;
  border: 4px solid transparent;
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
    margin: -4px;
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
