import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

export default function TitleListItem({
  song,
  index,
  swipeIndex,
  handleChangeIndex,
}) {
  return (
    <TitleListItemStyled
      index={index}
      onClick={() => handleChangeIndex(index)}
      swipeIndex={swipeIndex}
    >
      {song.optimizedMetaData.title}
    </TitleListItemStyled>
  )
}

const TitleListItemStyled = styled.li`
  color: ${props => (props.index === props.swipeIndex ? '#FE8D8D' : '#FEFEFE')};
  font-weight: ${props =>
    props.index === props.swipeIndex ? 'bold' : 'regular'};
  padding: 10px 0;
  cursor: default;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`

TitleListItem.propTypes = {
  song: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  swipeIndex: PropTypes.number.isRequired,
  handleChangeIndex: PropTypes.func.isRequired,
}
