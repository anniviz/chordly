import React, { useEffect } from 'react'
import { useSpring, animated } from 'react-spring'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

import ListMenu from './ListMenu'
import SideListTitle from './SideListTitle'
import InputField from '../forms/InputField'
import { dimensions } from '../common/dimensions'

import useSetlists from '../hooks/useSetlists'
import useSideLists from '../hooks/useSideLists'
import useSongs from '../hooks/useSongs'
import { patchSetlist } from '../services.js'

import search from '../icons/search-blue.svg'
import SideListItemWrapper from './SideListItemWrapper'

function SideList({
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
    setSearchInput('')
  }, [sideListType, swipeIndex])

  useEffect(() => {
    setShowSearchField(false)
  }, [sideListType, isSideListShown])

  const activeSetlistIndex = setlists.findIndex(
    setlist => setlist._id === activeSetlist
  )

  useEffect(() => {
    if (sideListType === 'singleSetlist') {
      setFuzzySearchResult(
        setlists[activeSetlistIndex].songs.filter(song =>
          findFuzzyMatch(song.optimizedMetaData.title, searchInput)
        )
      )
    } else if (sideListType === 'setlists') {
      setFuzzySearchResult(
        setlists.filter(setlist =>
          findFuzzyMatch(setlist.setlistName, searchInput)
        )
      )
    } else {
      setFuzzySearchResult(
        songs.filter(song =>
          findFuzzyMatch(song.optimizedMetaData.title, searchInput)
        )
      )
    }
  }, [searchInput, sideListType, songs, setlists])

  const AnimatedSideListWrapperBorder = animated(SideListContainer)
  const flyIn = useSpring({
    width: isSideListShown ? dimensions.sideListWidth + 'px' : '0px',
    opacity: isSideListShown ? 1 : 0,
  })

  return (
    <AnimatedSideListWrapperBorder style={flyIn}>
      <SideListWrapperBorder>
        <SideListWrapper>
          <SideListTitleWrapper>
            <SideListTitle>{sideListTitle}</SideListTitle>
            {sideListType === 'addSetlist' || (
              <img
                className="search-icon"
                alt="search"
                src={search}
                style={{ padding: '10px', height: '36px' }}
                onClick={() => setShowSearchField(!showSearchField)}
              />
            )}
          </SideListTitleWrapper>
          <ItemSearchWrapper>
            {showSearchField && (
              <InputField
                value={searchInput}
                autoFocus
                onChange={event => setSearchInput(event.target.value)}
                style={{ margin: dimensions.sideListPadding + 'px' }}
              />
            )}
            <SideListItemWrapper
              songs={songs}
              setlists={setlists}
              setSetlists={setSetlists}
              setlistSongs={setlistSongs}
              setSetlistSongs={setSetlistSongs}
              setSearchInput={setSearchInput}
              sideListType={sideListType}
              swipeIndex={swipeIndex}
              setSwipeIndex={setSwipeIndex}
              showSearchField={showSearchField}
              fuzzySearchResult={fuzzySearchResult}
              handleChangeIndex={handleChangeIndex}
              setlistsIsLoading={setlistsIsLoading}
              setSideListType={setSideListType}
              setActiveSetlist={setActiveSetlist}
              activeSetlist={activeSetlist}
              setSetlistsIsLoading={setSetlistsIsLoading}
              sideListTitle={sideListTitle}
              setSideListTitle={setSideListTitle}
              activeSetlistIndex={activeSetlistIndex}
            />
          </ItemSearchWrapper>
          <ListMenu
            sideListType={sideListType}
            setSideListType={setSideListType}
            setSwipeIndex={setSwipeIndex}
            activeSetlist={activeSetlist}
            setActiveSetlist={setActiveSetlist}
            setSetlists={setSetlists}
            setlists={setlists}
            handleSaveSongsToSetlist={handleSaveSongsToSetlist}
            setKeyCounter={setKeyCounter}
          />
        </SideListWrapper>
      </SideListWrapperBorder>
    </AnimatedSideListWrapperBorder>
  )

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

  function findFuzzyMatch(songTitle, searchInput) {
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
}

const ItemSearchWrapper = styled.div`
  flex-grow: 1;
  overflow: scroll;
  align-self: stretch;
  list-style: none;
  align-self: stretch;
  border-radius: 12px;
  background: #3f4a6d;
  background-clip: padding-box;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`

const SideListContainer = styled.div`
  align-self: flex-start;
  margin-top: ${2 * dimensions.listButtonTop +
    dimensions.cubicButtonExtent +
    'px'};
  margin-bottom: ${2 * dimensions.listButtonTop +
    dimensions.cubicButtonExtent +
    'px'};
  margin-right: ${dimensions.changeKeyButtonRight + 'px'};
  overflow: hidden;
`

const SideListWrapperBorder = styled.div`
  border-radius: 12px;
  padding: 2px;
  height: ${window.innerHeight -
    (4 * dimensions.listButtonTop + 2 * dimensions.cubicButtonExtent) +
    'px'};

  background: linear-gradient(60deg, #feb79c, #fd5da1);
  overflow: hidden;
`

const SideListTitleWrapper = styled.div`
  flex-grow: 0;
  display: grid;
  grid-template-columns: auto 40px;
  height: min-content;
`

const SideListWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: stretch;
  flex-direction: column;
  border-radius: 12px;
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

export default React.memo(SideList)
