import React from 'react'
import styled from 'styled-components/macro'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import clipboardList from '../icons/clipboard-list.svg'
import queueMusic from '../icons/queue-music.svg'
import addBox from '../icons/add-box.svg'

export default function ListMenu({
  sideListType,
  setSideListType,
  setSwipeIndex,
  handleSaveSongsToSetlist,
}) {
  let addContent
  handleAddButton()

  let menuContent
  handleMenuContent()

  return <ListMenuStyled>{menuContent}</ListMenuStyled>

  function handleAddButton() {
    if (sideListType === 'allSongs') {
      addContent = (
        <Link to="/AddSong">
          <MenuItem style={{ borderRadius: '0 0 12px 0' }}>
            <img className="add-icon" alt="add" src={addBox} />
          </MenuItem>
        </Link>
      )
    } else if (sideListType === 'singleSetlist') {
      addContent = (
        <MenuItem
          onClick={() => setSideListType('addSongToSetlist')}
          style={{ borderRadius: '0 0 12px 0' }}
        >
          <img className="add-icon" alt="add" src={addBox} />
        </MenuItem>
      )
    } else if (sideListType === 'setlists') {
      addContent = (
        <MenuItem
          onClick={() => setSideListType('addSetlist')}
          style={{ borderRadius: '0 0 12px 0' }}
        >
          <img className="add-icon" alt="add" src={addBox} />
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
            save
          </MenuItem>
          <MenuItem></MenuItem>
          <MenuItem
            style={{ borderRadius: '0 0 12px 0' }}
            onClick={() => setSideListType('singleSetlist')}
          >
            cancel
          </MenuItem>
        </>
      )
    } else if (sideListType !== ('addSetlist' || 'addSongToSetlist')) {
      menuContent = (
        <>
          <MenuItem
            style={{ borderRadius: '0 0 0 12px' }}
            onClick={() => setSideListType('setlists')}
          >
            <img className="setlist-icon" alt="setlist" src={clipboardList} />
          </MenuItem>
          <MenuItem onClick={handleAllSongsClick}>
            <img className="all-songs-icon" alt="all songs" src={queueMusic} />
          </MenuItem>
          {addContent}
        </>
      )
    }
  }

  function handleAllSongsClick() {
    setSideListType('allSongs')
    setSwipeIndex(0)
  }
}

const ListMenuStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: stretch;
  background: #3f4a6d;
  border-radius: 0 0 12px 12px;
`

const MenuItem = styled.div`
  color: #fe8d8d;
  height: 100%;
  display: grid;
  align-content: center;
  justify-content: center;
  border: 1px solid #707070;
  background: #3f4a6d;
  cursor: default;
`

ListMenu.propTypes = {
  sideListType: PropTypes.string.isRequired,
  setSideListType: PropTypes.func.isRequired,
  setSwipeIndex: PropTypes.func.isRequired,
  handleSaveSongsToSetlist: PropTypes.func.isRequired,
}
