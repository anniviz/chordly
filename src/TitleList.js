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
  list-style: none;
  padding: 10px;
  width: 35%;
  height: 80%;
  border-radius: 12px;
  border: 4px solid white;
  position: absolute;
`

//const TitleListItem = styled.li``

TitleList.propTypes = {
  songs: PropTypes.array.isRequired,
}
