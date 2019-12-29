import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

export default function SetlistItem({
  setlist,
  setSideListType,
  setActiveSetlist,
  setSwipeIndex,
  setSetlistSongs,
}) {
  return (
    <SetlistItemStyled onClick={() => handleSetlistItemClick(setlist._id)}>
      {setlist.setlistName}
    </SetlistItemStyled>
  )

  async function handleSetlistItemClick(id) {
    setActiveSetlist(id)
    setSwipeIndex(0)
    let songsArray = []
    setlist.songs.map(song => (songsArray = [...songsArray, song._id]))
    setSetlistSongs([...songsArray])
    console.log(songsArray)
    setSideListType('singleSetlist')
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
  setSideListType: PropTypes.func.isRequired,
  setActiveSetlist: PropTypes.func.isRequired,
  setSwipeIndex: PropTypes.func.isRequired,
}
