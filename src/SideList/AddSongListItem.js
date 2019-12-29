import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

export default function AddSongListItem({ song }) {
  return (
    <AddSongListItemStyled onClick={() => handleSongClick(song)}>
      {song.optimizedMetaData.title}
    </AddSongListItemStyled>
  )

  function handleSongClick(song) {}
}

const AddSongListItemStyled = styled.li`
  color: #FEFEFE;
  /* font-weight: ${props =>
    props.index === props.swipeIndex ? 'bold' : 'regular'}; */
  padding: 10px 0;
  cursor: default;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`

AddSongListItem.propTypes = {
  song: PropTypes.object.isRequired,
}
