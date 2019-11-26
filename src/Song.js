import React from 'react'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'

export default function Song({ title, artist, lyrics }) {
  return (
    <SongStyled>
      <h2>{title}</h2>
      <h3>{artist}</h3>
      <p>{lyrics}</p>
    </SongStyled>
  )
}

const SongStyled = styled.section`
  grid-column-start: 2;
  margin: 10px;
  white-space: pre-line;
  padding: 20px;
`

Song.propTypes = {
  title: PropTypes.string.isRequired,
  artist: PropTypes.string,
  lyrics: PropTypes.string.isRequired,
}
