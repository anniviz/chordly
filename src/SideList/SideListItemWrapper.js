import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

import SongListItem from './SongListItem'
import SetlistItem from './SetlistItem'
import AddSetlist from '../forms/AddSetlist'
import { dimensions } from '../common/dimensions'

function SideListItemWrapper({
  songs,
  setlists,
  setSetlists,
  setlistSongs,
  setSetlistSongs,
  setSearchInput,
  sideListType,
  swipeIndex,
  setSwipeIndex,
  showSearchField,
  fuzzySearchResult,
  handleChangeIndex,
  setlistsIsLoading,
  setSideListType,
  setActiveSetlist,
  activeSetlist,
  setSetlistsIsLoading,
  sideListTitle,
  setSideListTitle,
  activeSetlistIndex,
}) {
  let sideListContent
  handleSideListType()

  return <SideListContainer>{sideListContent}</SideListContainer>

  function handleIsSongsShown(songs) {
    const songList = showSearchField ? fuzzySearchResult : songs
    if (songs) {
      sideListContent = (
        <SideListItemWrapperStyled>
          {songList.map(song => (
            <SongListItem
              key={song._id}
              index={findSongIndex(song._id)}
              sideListType={sideListType}
              song={song}
              swipeIndex={swipeIndex}
              handleChangeIndex={handleChangeIndex}
              setlistSongs={setlistSongs}
              setSetlistSongs={setSetlistSongs}
              setSearchInput={setSearchInput}
            />
          ))}
        </SideListItemWrapperStyled>
      )
    } else {
      sideListContent = 'no song'
    }
  }

  function handleIsSetListsShown(setlists) {
    const setlistList = showSearchField ? fuzzySearchResult : setlists
    if (setlists) {
      sideListContent = (
        <SideListItemWrapperStyled>
          {setlistsIsLoading
            ? 'loading...'
            : setlistList.map(setlist => (
                <SetlistItem
                  key={setlist._id}
                  setlist={setlist}
                  sideListType={sideListType}
                  setSideListType={setSideListType}
                  setActiveSetlist={setActiveSetlist}
                  activeSetlist={activeSetlist}
                  setSwipeIndex={setSwipeIndex}
                  setSetlistSongs={setSetlistSongs}
                />
              ))}
        </SideListItemWrapperStyled>
      )
    } else {
      sideListContent = 'no setlists'
    }
  }

  function handleIsAddSetlistShown() {
    sideListContent = (
      <AddSetlist
        setSideListType={setSideListType}
        setSetlists={setSetlists}
        setSetlistsIsLoading={setSetlistsIsLoading}
      />
    )
  }

  function handleSideListType() {
    if (sideListType === 'allSongs') {
      handleIsSongsShown(songs)
      sideListTitle === 'All Songs' || setSideListTitle('All Songs')
    } else if (sideListType === 'setlists') {
      handleIsSetListsShown(setlists)
      sideListTitle === 'All Sets' || setSideListTitle('All Sets')
    } else if (sideListType === 'singleSetlist') {
      handleIsSongsShown(setlists[activeSetlistIndex].songs)
      sideListTitle === setlists[activeSetlistIndex].setlistName ||
        setSideListTitle(setlists[activeSetlistIndex].setlistName)
    } else if (sideListType === 'addSetlist') {
      handleIsAddSetlistShown()
      sideListTitle === 'Add Set' || setSideListTitle('Add Set')
    } else if (sideListType === 'addSongToSetlist') {
      handleIsSongsShown(songs)
      sideListTitle === 'Add Song to Set' || setSideListTitle('Add Song to Set')
    }
  }

  function findSongIndex(songID) {
    const songList =
      sideListType === 'singleSetlist'
        ? setlists[activeSetlistIndex].songs
        : songs
    return songList.findIndex(song => song._id === songID)
  }
}

const SideListItemWrapperStyled = styled.ul`
  heigh: 100%;
  list-style: none;
  padding: 0;
`

const SideListContainer = styled.div`
  align-self: stretch;
  padding: ${dimensions.sideListPadding + 'px'};
  height: 100%;
  overflow: auto;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`

SideListItemWrapperStyled.propTypes = {
  songs: PropTypes.array,
  swipeIndex: PropTypes.number,
  setSwipeIndex: PropTypes.func,
  handleChangeIndex: PropTypes.func,
  setlists: PropTypes.array,
  activeSetlist: PropTypes.string,
  setActiveSetlist: PropTypes.func,
  setlistsIsLoading: PropTypes.bool,
  isSideListShown: PropTypes.bool,
  sideListType: PropTypes.string,
  setSideListType: PropTypes.func,
  setSetlists: PropTypes.func,
  setlistSongs: PropTypes.array,
  setSetlistSongs: PropTypes.func,
  setKeyCounter: PropTypes.func,
  setSearchInput: PropTypes.func,
  showSearchField: PropTypes.bool,
  fuzzySearchResult: PropTypes.array,
  setSetlistsIsLoading: PropTypes.func,
  sideListTitle: PropTypes.string,
  setSideListTitle: PropTypes.func,
  activeSetlistIndex: PropTypes.number,
}

export default React.memo(SideListItemWrapper)
