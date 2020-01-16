import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import SwipeableViews from 'react-swipeable-views'

import Song from './Song/Song'

function SwipeContainer({
  songs,
  sideListType,
  setlists,
  activeSetlist,
  isLoading,
  swipeIndex,
  handleChangeIndex,
  keyCounter,
  changeKeyDirection,
}) {
  let swipeableViewContent
  if (sideListType === 'singleSetlist') {
    const activeSetlistIndex = setlists.findIndex(
      setlist => setlist._id === activeSetlist
    )
    handleSwipeableView(setlists[activeSetlistIndex].songs)
  } else {
    handleSwipeableView(songs)
  }

  return <SwipeContainerStyled>{swipeableViewContent}</SwipeContainerStyled>

  function handleSwipeableView(songs) {
    swipeableViewContent = isLoading ? (
      'Loading ...'
    ) : (
      <SwipeableViews
        index={swipeIndex}
        onChangeIndex={handleChangeIndex}
        enableMouseEvents
        animateTransitions={true}
      >
        {songs.length > 0 ? (
          songs.map(song => (
            <Song
              key={song._id}
              song={song}
              keyCounter={keyCounter}
              changeKeyDirection={changeKeyDirection}
            />
          ))
        ) : (
          <EmptySong>no song</EmptySong>
        )}
      </SwipeableViews>
    )
  }
}

const SwipeContainerStyled = styled.div`
  align-self: flex-start;
  overflow: visible;
`

const EmptySong = styled.div`
  height: 100vh;
  width: 100vh;
  align-self: flex-start;
`

export default React.memo(SwipeContainer)
