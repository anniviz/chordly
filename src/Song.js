import React from 'react'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'

export default function Song({ title, artist, lyrics, isAListShown }) {
  return (
    <SongStyled isAListShown={isAListShown}>
      <h2>{title}</h2>
      <h3>{artist}</h3>
      <p>{lyrics}</p>
    </SongStyled>
  )
}

const SongStyled = styled.section`
  grid-column: ${props => (props.isAListShown ? '3 / end' : '2 / end')};
  white-space: pre-line;
  padding: 12px;
  margin-top: 10%;
`

Song.propTypes = {
  title: PropTypes.string.isRequired,
  artist: PropTypes.string,
  lyrics: PropTypes.string.isRequired,
}
