import React from 'react'
import { useSpring, animated } from 'react-spring'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import { Link } from 'react-router-dom'

import SongListItem from './SongListItem'
import SetlistItem from './SetlistItem'
import AddSetlist from '../forms/AddSetlist'
import { dimensions } from '../common/dimensions'

import clipboardList from '../icons/clipboard-list.svg'
import queueMusic from '../icons/queue-music.svg'
import addBox from '../icons/add-box.svg'

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
}) {
  let sideListContent
  let addContent
  if (sideListType === 'allSongs') {
    handleIsSongsShown(songs)
  } else if (sideListType === 'setlists') {
    handleIsSetListsShown(setlists)
  } else if (sideListType === 'singleSetlist') {
    const index = setlists.findIndex(setlist => setlist._id === activeSetlist)
    handleIsSongsShown(setlists[index].songs)
  } else if (sideListType === 'addSetlist') {
    handleIsAddSetlistShown()
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
      {sideListType !== 'addSetlist' ? (
        <ListMenu>
          <MenuItem
            style={{ borderRadius: '0 0 0 12px' }}
            onClick={handleSetlistClick}
          >
            <img className="setlist-icon" alt="setlist" src={clipboardList} />
          </MenuItem>
          <MenuItem onClick={handleAllSongsClick}>
            <img className="all-songs-icon" alt="all songs" src={queueMusic} />
          </MenuItem>
          {addContent}
        </ListMenu>
      ) : (
        <ListMenu />
      )}
    </AnimatedSideListWrapperBorder>
  )

  function handleSetlistClick() {
    setSideListType('setlists')
  }

  function handleAllSongsClick() {
    setSideListType('allSongs')
    setSwipeIndex(0)
  }

  function handleIsSongsShown(songs) {
    if (songs) {
      sideListContent = songs.map((song, index) => (
        <SongListItem
          key={song._id}
          song={song}
          index={index}
          swipeIndex={swipeIndex}
          handleChangeIndex={index => handleChangeIndex(index)}
        />
      ))
    } else {
      sideListContent = 'no song'
    }
    addContent = (
      <Link to="/AddSong">
        <MenuItem style={{ borderRadius: '0 0 12px 0' }}>
          <img className="add-icon" alt="add" src={addBox} />
        </MenuItem>
      </Link>
    )
  }

  function handleIsSetListsShown(setlists) {
    if (setlists) {
      sideListContent = setlists.map(setlist => (
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

    addContent = (
      <MenuItem
        onClick={() => setSideListType('addSetlist')}
        style={{ borderRadius: '0 0 12px 0' }}
      >
        <img className="add-icon" alt="add" src={addBox} />
      </MenuItem>
    )
  }

  function handleIsAddSetlistShown() {
    sideListContent = <AddSetlist></AddSetlist>
  }
}

const SideListWrapper = styled.ul`
  justify-self: stretch;
  align-self: center;
  list-style: none;
  padding: ${dimensions.titlePadding + 'px'};
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

const ListMenu = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: stretch;
  background: #3f4a6d;
  border-radius: 0 0 12px 12px;
`

const MenuItem = styled.div`
  height: 100%;
  display: grid;
  align-content: center;
  justify-content: center;
  border: 1px solid #707070;
  background: #3f4a6d;
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
}
