import React, { useState } from 'react'
import styled from 'styled-components'

export default function AddSong() {
  return (
    <AddForm method="post">
      <label htmlFor="newSong"></label>
      <SongTextArea />
    </AddForm>
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
`
