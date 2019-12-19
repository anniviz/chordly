import React, { useEffect, useRef } from 'react'
import styled from 'styled-components/macro'
import ChordSheetJS from 'chordsheetjs'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

import { postSong } from '../services'

import SmallButton from '../common/SmallButton'

import saveIcon from '../icons/saveIcon.png'
import cancelIcon from '../icons/cancelIcon.png'

export default function AddSong() {
  const textareaRef = useRef(null)
  useEffect(() => {
    textareaRef.current.focus()
  })
  return (
    <form onSubmit={createSong}>
      <FormWrapper>
        <TextAreaWrapper>
          <SongTextArea
            ref={textareaRef}
            name="song"
            placeholder="Enter your song in ChordPro-Format"
          />
        </TextAreaWrapper>
        <ButtonWrapper>
          <SmallButton type="submit">
            <img src={saveIcon} alt="" />
          </SmallButton>
          <SmallButton type="button" onClick={handleCancelClick}>
            <img src={cancelIcon} alt="" />
          </SmallButton>
        </ButtonWrapper>
      </FormWrapper>
    </form>
  )

  function createSong(event) {
    event.preventDefault()

    const parser = new ChordSheetJS.ChordProParser()

    const form = event.target
    const song = form.song.value
    const songObject = parser.parse(song)

    const formatter = new ChordSheetJS.TextFormatter()
    formatter.format(songObject)

    postSong(songObject)
    event.target.reset()

    confirmAlert({
      title: 'you saved a song!',
      message: 'your song is now in the db',
      buttons: [
        {
          label: 'ok',
        },
      ],
    })
  }

  function handleCancelClick() {
    confirmAlert({
      title: 'go back to main page',
      message:
        'Do you really want to go back to the main page? Your new song will not be saved',
      buttons: [
        {
          label: 'yes',
          onClick: () => (window.location.href = '/'),
        },
        {
          label: 'no',
        },
      ],
    })
  }
}

const FormWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`

const TextAreaWrapper = styled.div`
  padding: var(--standardPadding);
  padding-bottom: 0;
`

const SongTextArea = styled.textarea`
  background: #3f496d;
  color: #fefefe;
  font-family: monospace;
  font-size: 1.1rem;
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
