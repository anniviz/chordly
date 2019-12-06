import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

export default function TitleListItem({
  song,
  index,
  selected,
  handleChangeIndex,
}) {
  return (
    <TitleListItemStyled
      selected={selected}
      onClick={() => handleChangeIndex(index)}
    >
      {song.optimizedMetaData.title}
    </TitleListItemStyled>
  )
}

const TitleListItemStyled = styled.li`
  color: ${props => (props.selected ? '#FE8D8D' : '#FEFEFE')};
  font-weight: ${props => (props.selected ? 'bold' : 'regular')};
  padding: 10px 0;
  cursor: default;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`

TitleListItem.propTypes = {
  song: PropTypes.object.isRequired,
  selected: PropTypes.bool.isRequired,
  // setDisplayedSong: PropTypes.func.isRequired,
}
