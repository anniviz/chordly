import React from 'react'
import styled from 'styled-components/macro'

export default function Song({ title, artist, text }) {
  return (
    <SongStyled>
      <h2>{title}</h2>
      <h3>{artist}</h3>
      <p>{text}</p>
    </SongStyled>
  )
}

const SongStyled = styled.section`
  margin: 10px;
  word-wrap: break-word;
  white-space: pre-line;
  padding: 20px;
`
