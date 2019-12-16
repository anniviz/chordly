import React from 'react'
import PropTypes, { func } from 'prop-types'
import styled from 'styled-components/macro'

import { getSongIndex } from '../common/Functions'

export default function SetlistItem({
  songs,
  setlist,
  isSetListsShown,
  isASetListShown,
  setActiveSetlist,
  setIsSetListsShown,
  setIsASetListShown,
  setSwipeIndex,
  setlistSwipeIndices,
  setSetlistSwipeIndices,
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
    console.log(setlistSwipeIndices)
    setlist.songs.map(setlistSong => {
      setSetlistSwipeIndices([
        ...setlistSwipeIndices,
        getSongIndex(songs, setlistSong),
      ])
      // setlistSwipeIndices
      //   ? setSetlistSwipeIndices(
      //       setlistSwipeIndices.push(getSongIndex(songs, setlistSong))
      //     )
      //   : setSetlistSwipeIndices([getSongIndex(songs, setlistSong)])
    })
    setSetlistSwipeIndices()
    setSwipeIndex(getSongIndex(songs, setlist.songs[0]))
    setActiveSetlist(id)
    setIsSetListsShown(false)
    setIsASetListShown(true)
    console.log(setlistSwipeIndices)
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
