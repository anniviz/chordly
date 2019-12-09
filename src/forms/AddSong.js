import React, { useState } from 'react'
import styled from 'styled-components'

import Layout from '../common/Layout'

export default function AddSong() {
  return (
    <Layout>
      <AddForm method="post">
        <label htmlFor="newSong"></label>
        <SongTextArea />
      </AddForm>
    </Layout>
  )
}

const AddForm = styled.form`
  padding: var(--standardPadding);
`

const SongTextArea = styled.textarea`
  background: #3f496d;
  border-radius: 12px;
  border: solid 1px #fd5ca1;
`
