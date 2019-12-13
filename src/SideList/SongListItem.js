import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

export default function SongListItem({
  song,
  index,
  swipeIndex,
  handleChangeIndex,
}) {
  return (
    <SongListItemStyled
      index={index}
      onClick={() => handleChangeIndex(index)}
      swipeIndex={swipeIndex}
    >
      {song.optimizedMetaData.title}
    </SongListItemStyled>
  )
}

const SongListItemStyled = styled.li`
  color: ${props => (props.index === props.swipeIndex ? '#FE8D8D' : '#FEFEFE')};
  font-weight: ${props =>
    props.index === props.swipeIndex ? 'bold' : 'regular'};
  padding: 10px 0;
  cursor: default;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`

SongListItem.propTypes = {
  song: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  swipeIndex: PropTypes.number.isRequired,
  handleChangeIndex: PropTypes.func.isRequired,
}
