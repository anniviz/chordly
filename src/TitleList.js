import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import TitleListItem from './TitleListItem'

export default function TitleList({ songs }) {
  return (
    <TitleWrapper>
      {songs.map((song, index) => (
        <TitleListItem key={index} title={song.title} />
      ))}
    </TitleWrapper>
  )
}

const TitleWrapper = styled.ul`
  position: relative;
  list-style: none;
  padding: 10px;
  width: 35%;
  height: 80%;
  border-radius: 12px;
  border: 4px solid transparent;
  position: absolute;
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
    margin: -4px; /* !importanté */
    border-radius: inherit; /* !importanté */
    background: linear-gradient(60deg, #feb79c, #fd5da1);
  }
`

//const TitleListItem = styled.li``

TitleList.propTypes = {
  songs: PropTypes.array.isRequired,
}
