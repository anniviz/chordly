import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

export default function SetlistItem({
  setlist,
  isSetListsShown,
  isASetListShown,
  setActiveSetlist,
  setIsSetListsShown,
  setIsASetListShown,
  setSwipeIndex,
}) {
  return (
    <SetlistItemStyled
      onClick={() => handleSetlistItemClick(setlist._id)}
      isASetListShown={isASetListShown}
      isSetListsShown={isSetListsShown}
    >
      {setlist.setlistName}
    </SetlistItemStyled>
  )

  function handleSetlistItemClick(id) {
    setActiveSetlist(id)
    setIsSetListsShown(false)
    setIsASetListShown(true)
    setSwipeIndex(0)
  }
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
  isSetListsShown: PropTypes.bool.isRequired,
  isASetListShown: PropTypes.bool.isRequired,
  setActiveSetlist: PropTypes.func.isRequired,
  setIsSetListsShown: PropTypes.func.isRequired,
  setIsASetListShown: PropTypes.func.isRequired,
  setSwipeIndex: PropTypes.func.isRequired,
}
