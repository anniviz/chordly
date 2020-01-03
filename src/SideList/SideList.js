import React, { useEffect } from 'react'
import { useSpring, animated } from 'react-spring'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

import SongListItem from './SongListItem'
import SetlistItem from './SetlistItem'
import AddSetlist from '../forms/AddSetlist'
import ListMenu from './ListMenu'
import SideListTitle from './SideListTitle'
import InputField from '../forms/InputField'
import { dimensions } from '../common/dimensions'

import useSetlists from '../hooks/useSetlists'
import useSideLists from '../hooks/useSideLists'
import useSongs from '../hooks/useSongs'
import { patchSetlist } from '../services.js'

import search from '../icons/search-blue.svg'

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
  setKeyCounter,
}) {
  const {
    setlistsIsLoading,
    setSetlistsIsLoading,
    setlistSongs,
    setSetlistSongs,
  } = useSetlists()
  const {
    sideListTitle,
    setSideListTitle,
    showSearchField,
    setShowSearchField,
    searchInput,
    setSearchInput,
  } = useSideLists()
  const { fuzzySearchResult, setFuzzySearchResult } = useSongs()

  useEffect(() => {
    setFuzzySearchResult(
      songs.filter(song =>
        fuzzy_match(song.optimizedMetaData.title, searchInput)
      )
    )
  }, [searchInput, songs])

  let sideListContent
  if (sideListType === 'allSongs') {
    handleIsSongsShown(songs)
    sideListTitle === 'All Songs' || setSideListTitle('All Songs')
  } else if (sideListType === 'setlists') {
    handleIsSetListsShown(setlists)
    sideListTitle === 'All Sets' || setSideListTitle('All Sets')
  } else if (sideListType === 'singleSetlist') {
    const index = setlists.findIndex(setlist => setlist._id === activeSetlist)
    handleIsSongsShown(setlists[index].songs)
    sideListTitle === setlists[index].setlistName ||
      setSideListTitle(setlists[index].setlistName)
  } else if (sideListType === 'addSetlist') {
    handleIsAddSetlistShown()
    sideListTitle === 'Add Set' || setSideListTitle('Add Set')
  } else if (sideListType === 'addSongToSetlist') {
    handleIsSongsShown(songs)
    sideListTitle === 'Add Song to Set' || setSideListTitle('Add Song to Set')
  }

  const AnimatedSideListWrapperBorder = animated(SideListWrapperBorder)
  const flyIn = useSpring({
    width: isSideListShown ? dimensions.sideListWidth + 'px' : '0px',
    opacity: isSideListShown ? 1 : 0,
  })
  return (
    <AnimatedSideListWrapperBorder style={flyIn}>
      <SideListTitleWrapper>
        <SideListTitle>{sideListTitle}</SideListTitle>
        {sideListType === 'addSetlist' ? (
          <></>
        ) : (
          <img
            className="search-icon"
            alt="search"
            src={search}
            style={{ padding: '10px', height: '36px' }}
            onClick={() => setShowSearchField(!showSearchField)}
          />
        )}
      </SideListTitleWrapper>
      <SideListWrapper>
        {showSearchField && (
          <InputField
            value={searchInput}
            autoFocus
            onChange={event => setSearchInput(event.target.value)}
          ></InputField>
        )}
        {sideListContent}
      </SideListWrapper>
      <ListMenu
        sideListType={sideListType}
        setSideListType={setSideListType}
        setSwipeIndex={setSwipeIndex}
        activeSetlist={activeSetlist}
        setActiveSetlist={setActiveSetlist}
        setSetlists={setSetlists}
        setlists={setlists}
        setlistSongs={setlistSongs}
        handleSaveSongsToSetlist={handleSaveSongsToSetlist}
        setKeyCounter={setKeyCounter}
      />
    </AnimatedSideListWrapperBorder>
  )

  function handleIsSongsShown(songs) {
    if (songs) {
      sideListContent = fuzzySearchResult.map((song, index) => (
        <SongListItem
          key={song._id}
          sideListType={sideListType}
          song={song}
          index={index}
          swipeIndex={swipeIndex}
          handleChangeIndex={index => handleChangeIndex(index)}
          setlistSongs={setlistSongs}
          setSetlistSongs={setSetlistSongs}
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
              setSetlistSongs={setSetlistSongs}
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

  async function handleSaveSongsToSetlist() {
    const index = setlists.findIndex(setlist => setlist._id === activeSetlist)
    await patchSetlist({ _id: activeSetlist, songs: setlistSongs }).then(
      changedSetlist => {
        setSetlists([
          ...setlists.slice(0, index),
          changedSetlist,
          ...setlists.slice(index + 1),
        ])
      }
    )

    setSideListType('singleSetlist')
  }

  function fuzzy_match(songTitle, searchInput) {
    let search = searchInput.replace(/ /g, '').toLowerCase()
    let name = songTitle.replace(/ /g, '').toLowerCase()
    const tokens = name.split('')
    let search_position = 0

    tokens.forEach(i => {
      if (i === search[search_position]) {
        search_position += 1
        if (search_position >= search.length) {
          return false
        }
      }
    })

    if (search_position !== search.length) {
      return ''
    }
    return tokens.join('')
  }

  function handleinput(event) {
    event.preventDefault()
    setSearchInput(event.target.value)
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
  overflow-y: scroll;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`

const SideListWrapperBorder = styled.div`
  display: grid;
  grid-template-rows: min-content auto 48px;
  justify-items: stretch;
  border-radius: 12px;
  padding: 2px;
  height: calc(
    100vh -
      ${4 * dimensions.listButtonTop + 2 * dimensions.cubicButtonExtent + 'px'}
  );
  background: linear-gradient(60deg, #feb79c, #fd5da1);
  position: fixed;
  top: ${2 * dimensions.listButtonTop + dimensions.cubicButtonExtent + 'px'};
  right: ${dimensions.changeKeyButtonRight + 'px'};
`

const SideListTitleWrapper = styled.div`
  display: grid;
  grid-template-columns: auto 40px;
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
  setSetlists: PropTypes.func.isRequired,
  setKeyCounter: PropTypes.func,
}
