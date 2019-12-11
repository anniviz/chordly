import React from 'react'
import styled from 'styled-components/macro'
import { Link } from 'react-router-dom'
import ChordSheetJS from 'chordsheetjs'

import { postSong } from '../services'

import SmallButton from '../common/SmallButton'

import saveIcon from '../icons/saveIcon.png'
import cancelIcon from '../icons/cancelIcon.png'

export default function AddSong() {
  return (
    <form onSubmit={createSong}>
      <FormWrapper>
        <TextAreaWrapper>
          <SongTextArea
            name="song"
            placeholder="Enter your song in ChordPro-Format"
          />
        </TextAreaWrapper>
        <ButtonWrapper>
          <SmallButton type="submit">
            <img src={saveIcon} alt="" />
          </SmallButton>
          <Link to="/">
            <SmallButton>
              <img src={cancelIcon} alt="" />
            </SmallButton>
          </Link>
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

    console.log(songObject)
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
