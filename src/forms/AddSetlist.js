import React from 'react'
import styled from 'styled-components/macro'
import { confirmAlert } from 'react-confirm-alert'

import SaveCancelButtons from './SaveCancelButtons'
import { dimensions } from '../common/dimensions'

export default function AddSetlist({ setSideListType }) {
  return (
    <form>
      <InputWrapper>
        <Fieldset>
          <label>Setlist title</label>
          <InputField></InputField>
        </Fieldset>
        <Fieldset>
          <label>due date</label>
          <InputField></InputField>
        </Fieldset>
      </InputWrapper>
      <SaveCancelButtons handleCancelClick={handleCancelClick} />
    </form>
  )

  function handleCancelClick() {
    confirmAlert({
      title: 'go back',
      message:
        'Do you really want to go back? Your new setlist will not be saved',
      buttons: [
        {
          label: 'yes',
          onClick: () => setSideListType('setlists'),
        },
        {
          label: 'no',
        },
      ],
    })
  }
}

const InputWrapper = styled.div`
  margin-bottom: 20px;
`

const Fieldset = styled.fieldset`
  border: none;
  padding: 4px;
`

const InputField = styled.input`
  background: #939dc5;
  font-size: 1.1rem;
  color: #fefefe;
  border: none;
  width: ${dimensions.sideListWidth - 3 * dimensions.sideListPadding + 'px'};
  height: 2em;
  border-radius: 4px;
  padding: 4px;
  margin: 12px 0;
`
