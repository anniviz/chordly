import React from 'react'
import styled from 'styled-components/macro'
import { Link } from 'react-router-dom'

import SmallButton from '../common/SmallButton'

import saveIcon from '../icons/saveIcon.png'
import cancelIcon from '../icons/cancelIcon.png'

export default function AddSong() {
  return (
    <FormWrapper>
      <AddForm method="post">
        <label htmlFor="newSong"></label>
        <SongTextArea placeholder="Enter your song in ChordPro-Format" />
      </AddForm>
      <ButtonWrapper>
        <Link>
          <SmallButton>
            <img src={saveIcon} alt="" />
          </SmallButton>
        </Link>
        <Link to="/">
          <SmallButton>
            <img src={cancelIcon} alt="" />
          </SmallButton>
        </Link>
      </ButtonWrapper>
    </FormWrapper>
  )
}

const FormWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`

const AddForm = styled.form`
  padding: var(--standardPadding);
  padding-bottom: 0;
`

const SongTextArea = styled.textarea`
  background: #3f496d;
  color: #fefefe;
  font-family: 'Nunito', sans-serif;
  font-size: 1.4rem;
  height: calc(100vh - 150px);
  width: calc(100vw - 40px);
  border-radius: 12px;
  border: solid 1px #fd5ca1;
  padding: var(--standardPadding);
  overflow: scroll;
  scrollbar-width: auto;
  ::-webkit-scrollbar {
    display: auto;
  }

  ::-webkit-input-placeholder {
    font-family: 'Nunito', sans-serif;
    font-size: 1.1rem;
    color: #929ec5;
  }
  ::-moz-placeholder {
    font-family: 'Nunito', sans-serif;
    font-size: 1.1rem;
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
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`
