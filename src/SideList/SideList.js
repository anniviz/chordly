import React from 'react'
import { useSpring, animated } from 'react-spring'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import { Link } from 'react-router-dom'

import SongListItem from './SongListItem'
import SetlistItem from './SetlistItem'

export default function SideList({
  songs,
  swipeIndex,
  handleChangeIndex,
  setlists,
  activeSetlist,
  setActiveSetlist,
  isSideListShown,
  isAllSongsShown,
  setIsAllSongsShown,
  isSetListsShown,
  setIsSetListsShown,
  isASetListShown,
  setIsASetListShown,
}) {
  let sideListContent
  if (isAllSongsShown) {
    handleIsAllSongsShown(songs)
  } else if (isSetListsShown) {
    handleIsSetListsShown(setlists)
    console.log('func', isSetListsShown)
  } else if (isASetListShown) {
    console.log('>>>', activeSetlist)
    const index = setlists.findIndex(setlist => setlist._id === activeSetlist)
    handleIsASetListShown(setlists[index])
  }

  const AnimatedSideListWrapperBorder = animated(SideListWrapperBorder)
  const flyIn = useSpring({
    width: isSideListShown ? '192px' : '0px',
    opacity: isSideListShown ? 1 : 0,
  })

  console.log('render')

  return (
    <AnimatedSideListWrapperBorder
      isSideListShown={isSideListShown}
      style={flyIn}
    >
      <SideListWrapper isSideListShown={isSideListShown}>
        {sideListContent}
      </SideListWrapper>
      <ListMenu>
        <MenuItem
          style={{ borderRadius: '0 0 0 12px' }}
          onClick={handleSetlistClick}
        >
          <img
            className="setlist-icon"
            alt="setlist"
            src={require('../icons/clipboard-list.svg')}
          />
        </MenuItem>
        <MenuItem onClick={handleAllSongsClick}>
          <img
            className="all-songs-icon"
            alt="all songs"
            src={require('../icons/queue-music.svg')}
          />
        </MenuItem>
        <Link to="/AddSong">
          <MenuItem style={{ borderRadius: '0 0 12px 0' }}>
            <img
              className="add-icon"
              alt="add"
              src={require('../icons/add-box.svg')}
            />
          </MenuItem>
        </Link>
      </ListMenu>
    </AnimatedSideListWrapperBorder>
  )

  function handleSetlistClick() {
    setIsSetListsShown(true)
    setIsAllSongsShown(false)
    setIsASetListShown(false)
  }

  function handleAllSongsClick() {
    setIsAllSongsShown(true)
    setIsSetListsShown(false)
    setIsASetListShown(false)
  }

  function handleIsAllSongsShown(songs) {
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
  }

  function handleIsSetListsShown(setlists) {
    if (setlists) {
      sideListContent = setlists.map(setlist => (
        <SetlistItem
          key={setlist._id}
          setlist={setlist}
          isASetListShown={isASetListShown}
          isSetListsShown={isSetListsShown}
          setActiveSetlist={setActiveSetlist}
          setIsSetListsShown={setIsSetListsShown}
          setIsASetListShown={setIsASetListShown}
          activeSetlist={activeSetlist}
        />
      ))
    } else {
      sideListContent = 'no setlists'
    }
  }

  function handleIsASetListShown(setlist) {
    console.log('foo')
    if (setlist.songs) {
      setlist.songs.map((song, index) => (
        <SongListItem
          key={song._id}
          song={song}
          index={index}
          swipeIndex={swipeIndex}
          handleChangeIndex={index => handleChangeIndex(index)}
        />
      ))
    } else {
      sideListContent = 'no songs'
    }
  }
}

const SideListWrapper = styled.ul`
  justify-self: stretch;
  align-self: center;
  list-style: none;
  padding: var(--titlePadding);
  height: 100%;
  border-radius: 12px 12px 0 0;
  background: #3f4a6d;
  background-clip: padding-box;
  overflow: scroll;
  padding-bottom: 72px;

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
  height: calc(100vh - 120px);
  background: linear-gradient(60deg, #feb79c, #fd5da1);
  position: fixed;
  top: 30px;
  left: 20px;
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
  songs: PropTypes.array.isRequired,
  swipeIndex: PropTypes.number.isRequired,
  handleChangeIndex: PropTypes.func.isRequired,
  isSideListShown: PropTypes.bool.isRequired,
}
