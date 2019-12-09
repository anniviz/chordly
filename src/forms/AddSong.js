import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import SmallButton from '../common/SmallButton'

import saveIcon from '../icons/saveIcon.png'
import cancelIcon from '../icons/cancelIcon.png'

export default function AddSong() {
  return (
    <>
      <AddForm method="post">
        <label htmlFor="newSong"></label>
        <SongTextArea placeholder="Enter your song in ChordPro-Format" />
      </AddForm>
      <ButtonWrapper>
        <Link to="/">
          <SmallButton>
            <img src={saveIcon} alt="" />
          </SmallButton>
        </Link>
        <SmallButton>
          <img src={cancelIcon} alt="" />
        </SmallButton>
      </ButtonWrapper>
    </>
  )
}

const AddForm = styled.form`
  padding: var(--standardPadding);
`

const SongTextArea = styled.textarea`
  background: #3f496d;
  height: calc(100vh - 100px);
  width: calc(100vw - 40px);
  border-radius: 12px;
  border: solid 1px #fd5ca1;
  padding: var(--standardPadding);

  ::-webkit-input-placeholder {
    font-family: 'Nunito', sans-serif;
    font-size: 1.1em;
    color: #929ec5;
  }
  ::-moz-placeholder {
    font-family: 'Nunito', sans-serif;
    font-size: 1.1em;
    color: #929ec5;
  }
  :-ms-input-placeholder {
    font-family: 'Nunito', sans-serif;
    font-size: 1.1em;
    color: #929ec5;
  }
  :-moz-placeholder {
    font-family: 'Nunito', sans-serif;
    font-size: 1.1em;
    color: #929ec5;
  }
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
`
