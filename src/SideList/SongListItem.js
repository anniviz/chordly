import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

export default function SongListItem({
  sideListType,
  song,
  index,
  swipeIndex,
  handleChangeIndex,
  setlistSongs,
  setSetlistSongs,
}) {
  let songInSetlist = false
  if (sideListType === 'addSongToSetlist') {
    songInSetlist = setlistSongs.includes(song._id)
  }
  return sideListType === 'addSongToSetlist' ? (
    <SongListItemAddToSetlist
      songInSetlist={songInSetlist}
      setSetlistSongs={setSetlistSongs}
      onClick={handleSongClick}
    >
      {song.optimizedMetaData.title}
    </SongListItemAddToSetlist>
  ) : (
    <SongListItemDefault
      index={index}
      onClick={() => handleChangeIndex(index)}
      swipeIndex={swipeIndex}
    >
      {song.optimizedMetaData.title}
    </SongListItemDefault>
  )

  function handleSongClick() {
    if (songInSetlist) {
    } else {
      setSetlistSongs([...setlistSongs, song._id])
    }
    console.log(setlistSongs)
  }
}

const SongListItemDefault = styled.li`
  color: ${props => (props.index === props.swipeIndex ? '#FE8D8D' : '#FEFEFE')};
  font-weight: ${props =>
    props.index === props.swipeIndex ? 'bold' : 'regular'};

  padding: 10px 0;
  cursor: default;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`

const SongListItemAddToSetlist = styled.li`
  color: ${props => (props.songInSetlist ? '#FE8D8D' : '#FEFEFE')};
  /* color: #fefefe; */
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
