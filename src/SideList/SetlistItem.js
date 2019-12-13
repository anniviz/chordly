import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

export default function SetlistItem({ setlist }) {
  return <SetlistItemStyled>{setlist.setlistName}</SetlistItemStyled>
}

const SetlistItemStyled = styled.li`
  color: #fefefe;
  font-weight: regular;
  padding: 10px 0;
  cursor: default;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`

SetlistItem.propTypes = {
  setlist: PropTypes.object.isRequired,
}
