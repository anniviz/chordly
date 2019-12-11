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

    const chordSheet = `
  {title:Awesome God}
{artist:.Misc. Gospel}

Strophe 1:
[Em]Oh when He rolls up his sleeves he ain't just puttin' on the ritz,
Our [Am]God is an [D]awesome [Em]God.
There is [Em]thunder in his footsteps and lightning in his fists,
Our [Am]God is an [D]awesome [Em]God.

And the [C]Lord, he wasn't joking when He kicked 'em out of Eden.
It [D]wasn't for no reason that He shed his blood.
His ret[C]urn is very soon and so you'd [C/A]better be be[C/E]lievin' that
Our [Am]God is an [D]awesome [Em]God.

Chorus:
Our [C]God is an [G]awesome God, he r[D]eigns from [Em]heaven above
with [C]wisdom, p[G]ow'r and love, our [Am]God is an [D]awesome [Em]God

Strophe 2:
And when the sky was starless in the void of the night,
Our God is an awesome God.
He spoke into the darkness and created the light,
Our God is an awesome God.

And judgment and wrath He poured out on Sodom.
Mercy and grace He gave us at the cross.
I hope that we have not too quickly forgotten that
Our God is an awesome God `.substring(1)

    const parser = new ChordSheetJS.ChordProParser()
    const song = parser.parse(chordSheet)

    const form = event.target
    const songtarget = form.song.value
    console.log(songtarget)
    const songObj = parser.parse(songtarget)

    //const formatter = new ChordSheetJS.HtmlTableFormatter()
    const formatter = new ChordSheetJS.TextFormatter()
    // const formatter = new ChordSheetJS.HtmlDivFormatter()
    formatter.format(songObj)

    console.log(song)
    console.log(songObj)

    //     console.log(song)
    //     const songOb = new ChordSheetJS.ChordProParser().parse(chordSheet)
    //     const songObject = parser.parse(chordSheet)
    //     const songO = parser.parse(song)
    //     console.log(songObject)
    //     // console.log(songO)
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
