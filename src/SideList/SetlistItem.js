import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

import useSetlists from '../hooks/useSetlists'
import useSideLists from '../hooks/useSideLists'

export default function SetlistItem({ setlist }) {
  const { activeSetlist, setActiveSetlist } = useSetlists()
  const {
    setIsASetListShown,
    setIsSetListsShown,
    isASetListsShown,
  } = useSideLists()

  return (
    <SetlistItemStyled onClick={() => handleSetlistItemClick(setlist._id)}>
      {setlist.setlistName}
    </SetlistItemStyled>
  )

  function handleSetlistItemClick(id) {
    setActiveSetlist(id)
    setIsSetListsShown(false)
    setIsASetListShown(true)
    console.log(id)
    console.log(activeSetlist)
    console.log('>', isASetListsShown)
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
}
