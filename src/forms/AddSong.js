import React, { useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'
import ChordSheetJS from 'chordsheetjs'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

import { postSong } from '../services'

import SaveCancelButtons from './SaveCancelButtons'

export default function AddSong() {
  const textareaRef = useRef(null)
  useEffect(() => {
    textareaRef.current.focus()
  })

  const history = useHistory()

  const placeholderText = `

Enter your song in ChordPro-Format like in the example. A title is mandatory.
  
Example:

{title: Swing Low Sweet Chariot}
{artist: Wallis Willis}

{start_of_chorus}
Swing [D]low, sweet [G]chari[D]ot,
Comin’ for to carry me [A7]home.
Swing [D7]low, sweet [G]chari[D]ot,
Comin’ for to [A7]carry me [D]home.
{end_of_chorus}

I [D]looked over Jordan, and [G]what did I [D]see,
Comin’ for to carry me [A7]home.
A [D]band of angels [G]comin’ after [D]me,
Comin’ for to [A7]carry me [D]home.

{comment: Chorus}`

  return (
    <form onSubmit={createSong}>
      <FormWrapper>
        <TextAreaWrapper>
          <SongTextArea
            ref={textareaRef}
            name="song"
            placeholder={placeholderText}
          />
        </TextAreaWrapper>
        <SaveCancelButtons handleCancelClick={handleCancelClick} />
      </FormWrapper>
    </form>
  )

  function createSong(event) {
    event.preventDefault()

    const parser = new ChordSheetJS.ChordProParser()

    const form = event.target
    const song = form.song.value

    try {
      if (song.includes('{title:')) {
        const songObject = parser.parse(song)

        const formatter = new ChordSheetJS.TextFormatter()
        formatter.format(songObject)

        postSong(songObject)
        event.target.reset()

        confirmAlert({
          title: 'You saved a song!',
          message:
            'Your song is now in the db. Do you want to add another Song or go back to the main page?',
          buttons: [
            {
              label: 'add another song',
            },
            {
              label: 'go back',
              onClick: () => (window.location.href = '/'),
            },
          ],
        })
      } else {
        confirmAlert({
          title: 'Something is missing',
          message:
            'You have to enter at least a title like {title: songtitle} in the textfield',
          buttons: [
            {
              label: 'ok',
            },
          ],
        })
      }
    } catch {
      confirmAlert({
        title: 'Error',
        message:
          'Something is wrong in your song. Check if all brackets ar closed properly',
        buttons: [
          {
            label: 'ok',
          },
        ],
      })
    }
  }

  function handleCancelClick() {
    confirmAlert({
      title: 'go back to main page',
      message:
        'Do you really want to go back to the main page? Your new song will not be saved',
      buttons: [
        {
          label: 'yes',
          onClick: () => history.goBack(),
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
    font-family: monospace;
    font-size: 1.1rem;
    color: #929ec5;
  }
  ::-moz-placeholder {
    font-family: monospace;
    font-size: 1.1rem;
    color: #929ec5;
  }
  :-ms-input-placeholder {
    font-family: monospace;
    font-size: 1.1em;
    color: #929ec5;
  }
  :-moz-placeholder {
    font-family: monospace;
    font-size: 1.1em;
    color: #929ec5;
  }
`
