import React from 'react'
import styled from 'styled-components/macro'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useSpring, animated } from 'react-spring'

import clipboardList from '../icons/clipboard-list.svg'
import queueMusic from '../icons/queue-music.svg'
import addBox from '../icons/add-box.svg'
import save from '../icons/save-icon-orange.svg'
import close from '../icons/close-icon-orange.svg'
import { dimensions } from '../common/dimensions'

function ListMenu({
  sideListType,
  setSideListType,
  setSwipeIndex,
  handleSaveSongsToSetlist,
  setActiveSetlist,
  setKeyCounter,
}) {
  let addContent
  handleAddButton()

  let menuContent
  handleMenuContent()

  const AnimatedIndicator = animated(Indicator)
  const swap = useSpring({
    config: { mass: 1000 },
    left:
      sideListType === 'allSongs'
        ? ((dimensions.sideListWidth - 4) / 3 / 2) * 3 - 4 + 'px'
        : (dimensions.sideListWidth - 4) / 3 / 2 - 4 + 'px',
    // height: sideListType === 'allSongs' ? '8px' : '20px',
  })

  return (
    <ListMenuStyled sideListType={sideListType}>
      <AnimatedIndicator style={swap} />
      {menuContent}
    </ListMenuStyled>
  )

  function handleAddButton() {
    if (sideListType === 'allSongs') {
      addContent = (
        <Link to="/AddSong">
          <MenuItem style={{ borderRadius: '0 0 12px 0' }}>
            +{/* <img className="add-icon" alt="add" src={addBox} /> */}
          </MenuItem>
        </Link>
      )
    } else if (
      sideListType === 'singleSetlist' ||
      sideListType === 'setlists'
    ) {
      addContent = (
        <MenuItem
          onClick={() =>
            sideListType === 'singleSetlist'
              ? setSideListType('addSongToSetlist')
              : setSideListType('addSetlist')
          }
          style={{ borderRadius: '0 0 12px 0' }}
        >
          +{/* <img className="add-icon" alt="add" src={addBox} /> */}
        </MenuItem>
      )
    }
  }

  function handleMenuContent() {
    if (sideListType === 'addSongToSetlist') {
      menuContent = (
        <>
          <MenuItem
            style={{ borderRadius: '0 0 0 12px' }}
            onClick={handleSaveSongsToSetlist}
          >
            <img className="save-icon" alt="save" src={save} />
          </MenuItem>
          <MenuItem
            style={{ borderRadius: '0 0 12px 0' }}
            onClick={() => setSideListType('singleSetlist')}
          >
            <img className="close-icon" alt="close" src={close} />
          </MenuItem>
        </>
      )
    } else if (sideListType !== ('addSetlist' || 'addSongToSetlist')) {
      menuContent = (
        <>
          <MenuItem
            style={{ borderRadius: '0 0 0 12px' }}
            onClick={handleSetlistsClick}
          >
            Sets
            {/* <img className="setlist-icon" alt="setlist" src={clipboardList} /> */}
          </MenuItem>
          <MenuItem onClick={handleAllSongsClick}>
            Songs
            {/* <img className="all-songs-icon" alt="all songs" src={queueMusic} /> */}
          </MenuItem>
          {addContent}
        </>
      )
    }
  }

  function handleAllSongsClick() {
    setSideListType('allSongs')
    setSwipeIndex(0)
    setActiveSetlist('')
    setKeyCounter(0)
  }

  function handleSetlistsClick() {
    setSideListType('setlists')
    setActiveSetlist('')
  }
}

const ListMenuStyled = styled.div`
  position: relative;
  flex-grow: 0;
  display: grid;
  grid-template-columns: ${props =>
    props.sideListType === 'addSongToSetlist' ? '1fr 1fr' : '1fr 1fr 1fr'};
  justify-items: stretch;
  background: linear-gradient(60deg, #feb79c, #fd5da1);
  border-radius: 0 0 12px 12px;
`

const MenuItem = styled.div`
  color: #3f4a6d;
  height: 100%;
  display: grid;
  align-content: center;
  justify-content: center;
  border: 1px solid #707070;
  /* background: #3f4a6d; */
  cursor: default;
  height: 48px;
`

const Indicator = styled.div`
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #3f4a6d;
  top: 8px;
  left: ${(dimensions.sideListWidth - 4) / 3 / 2 - 4 + 'px'};
`

ListMenu.propTypes = {
  sideListType: PropTypes.string.isRequired,
  setSideListType: PropTypes.func.isRequired,
  setSwipeIndex: PropTypes.func.isRequired,
  handleSaveSongsToSetlist: PropTypes.func.isRequired,
  setActiveSetlist: PropTypes.func,
  setKeyCounter: PropTypes.func,
}

export default React.memo(ListMenu)
