import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { Link } from 'react-router-dom'
import ChordSheetJS from 'chordsheetjs'

import { postSong } from '../services'
// import useSongs from './hooks/useSongs'

import SmallButton from '../common/SmallButton'

import saveIcon from '../icons/saveIcon.png'
import cancelIcon from '../icons/cancelIcon.png'

export default function AddSong() {
  //   const { songs, setSongs } = useSongs()
  // const parser = new ChordSheetJS.ChordProParser()

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

  //   this.el.addEventListener('submit', event => {
  //     event.preventDefault()
  //     const dataList = new FormData(this.el)
  //     const data = Object.fromEntries(dataList)
  //     this.editingId ? this.onEdit({ ...data, id: this.editingId }) : this.onSubmit(data)
  //     this.el.reset()
  //     this.el.title.focus()
  //     this.editingId = null
  //   })

  function handleSubmit() {
    // addSong({
    //   ...newSpot,
    //   routes: { boulder: newRoute },
    // })
  }

  function addSong(song) {
    postSong(song)
    console.log(song)
  }

  //   function createSpot(event) {
  //     event.preventDefault()
  //     const form = event.target
  //     const formData = new FormData(form)
  //     const data = Object.fromEntries(formData)
  //     const location = [Number(data.locationLong), Number(data.locationLat)]
  //     setNewSpot({
  //       name: data.name,
  //       location: location,
  //       isBookmarked: false,
  //       mainImage: image,
  //     })
  //     setSecondForm(true)
  //     form.reset()
  //   }
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
