import React, { useState } from 'react'
import { useSpring, animated } from 'react-spring'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

import SongListItem from './SongListItem'
import AddSongListItem from './AddSongListItem'
import SetlistItem from './SetlistItem'
import AddSetlist from '../forms/AddSetlist'
import ListMenu from './ListMenu'
import { dimensions } from '../common/dimensions'

export default function SideList({
  songs,
  swipeIndex,
  handleChangeIndex,
  setlists,
  activeSetlist,
  setActiveSetlist,
  isSideListShown,
  setSwipeIndex,
  sideListType,
  setSideListType,
  setSetlists,
  setlistsIsLoading,
  setSetlistsIsLoading,
}) {
  const { setlistSongs, setSetlistSongs } = useState([])

  let sideListContent
  if (sideListType === 'allSongs') {
    handleIsSongsShown(songs)
  } else if (sideListType === 'setlists') {
    handleIsSetListsShown(setlists)
  } else if (sideListType === 'singleSetlist') {
    const index = setlists.findIndex(setlist => setlist._id === activeSetlist)
    handleIsSongsShown(setlists[index].songs)
  } else if (sideListType === 'addSetlist') {
    handleIsAddSetlistShown()
  } else if (sideListType === 'addSongToSetlist') {
    handleIsSongsShown(songs)
  }

  const AnimatedSideListWrapperBorder = animated(SideListWrapperBorder)
  const flyIn = useSpring({
    width: isSideListShown ? dimensions.sideListWidth + 'px' : '0px',
    opacity: isSideListShown ? 1 : 0,
  })

  return (
    <AnimatedSideListWrapperBorder
      isSideListShown={isSideListShown}
      style={flyIn}
    >
      <SideListWrapper isSideListShown={isSideListShown}>
        {sideListContent}
      </SideListWrapper>
      <ListMenu
        sideListType={sideListType}
        setSideListType={setSideListType}
        setSwipeIndex={setSwipeIndex}
      />
    </AnimatedSideListWrapperBorder>
  )

  function handleIsSongsShown(songs) {
    if (songs) {
      sideListContent = songs.map((song, index) => (
        <SongListItem
          key={song._id}
          sideListType={sideListType}
          song={song}
          index={index}
          swipeIndex={swipeIndex}
          handleChangeIndex={index => handleChangeIndex(index)}
        />
      ))
    } else {
      sideListContent = 'no song'
    }
  }

  function handleIsSetListsShown(setlists) {
    if (setlists) {
      sideListContent = setlistsIsLoading
        ? 'loading...'
        : setlists.map(setlist => (
            <SetlistItem
              key={setlist._id}
              setlist={setlist}
              sideListType={sideListType}
              setSideListType={setSideListType}
              setActiveSetlist={setActiveSetlist}
              activeSetlist={activeSetlist}
              setSwipeIndex={setSwipeIndex}
            />
          ))
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
}

const SideListWrapper = styled.ul`
  justify-self: stretch;
  align-self: center;
  list-style: none;
  padding: ${dimensions.sideListPadding + 'px'};
  height: 100%;
  border-radius: 12px 12px 0 0;
  background: #3f4a6d;
  background-clip: padding-box;
  overflow: scroll;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`

const SideListWrapperBorder = styled.div`
  display: grid;
  grid-template-rows: auto 48px;
  justify-items: stretch;
  border-radius: 12px;
  padding: 2px;
  height: calc(
    100vh -
      ${2 * dimensions.listButtonTop +
        dimensions.listButtonHeight +
        dimensions.standardPadding +
        'px'}
  );
  background: linear-gradient(60deg, #feb79c, #fd5da1);
  position: fixed;
  top: ${2 * dimensions.listButtonTop + dimensions.listButtonHeight + 'px'};
  right: ${dimensions.standardPadding + 'px'};
`

SideList.propTypes = {
  songs: PropTypes.array,
  swipeIndex: PropTypes.number.isRequired,
  handleChangeIndex: PropTypes.func.isRequired,
  setlists: PropTypes.array,
  activeSetlist: PropTypes.string,
  setActiveSetlist: PropTypes.func.isRequired,
  isSideListShown: PropTypes.bool.isRequired,
  sideListType: PropTypes.string.isRequired,
  setSideListType: PropTypes.func.isRequired,
  setSwipeIndex: PropTypes.func.isRequired,
  setlistsIsLoading: PropTypes.bool,
  setSetlistsIsLoading: PropTypes.func,
}
