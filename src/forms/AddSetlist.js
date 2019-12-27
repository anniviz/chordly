import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { confirmAlert } from 'react-confirm-alert'
import moment from 'moment'

import { postSetlist } from '../services'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import '../additionalStyles/datepicker.scss'

import SaveCancelButtons from './SaveCancelButtons'
import { dimensions } from '../common/dimensions'

export default function AddSetlist({ setSideListType }) {
  const [startDate, setStartDate] = useState(new Date())

  return (
    <form onSubmit={createSetlist}>
      <InputWrapper>
        <Fieldset>
          <label htmlFor="setlist-name">Setlist title</label>
          <InputField name="setlistName" id="setlist-name" />
        </Fieldset>
        <Fieldset>
          <label>due date</label>
          <DatePicker
            selected={startDate}
            onChange={date => setStartDate(date)}
            popperClassName="some-custom-class"
            popperPlacement="top-end"
            popperModifiers={{
              offset: {
                enabled: true,
                offset: '5px, 10px',
              },
              preventOverflow: {
                enabled: true,
                escapeWithReference: false,
                boundariesElement: 'viewport',
              },
            }}
            showPopperArrow={false}
            // shouldCloseOnSelect={false}
            name="dueDate"
          />
        </Fieldset>
      </InputWrapper>
      <SaveCancelButtons handleCancelClick={handleCancelClick} />
    </form>
  )

  function createSetlist(event) {
    event.preventDefault()

    const form = event.target
    const formData = new FormData(form)
    const data = Object.fromEntries(formData)
    var day = moment(data.dueDate, 'MM/DD/YYYY')
    const dueDate = day.toDate()
    const setlist = { ...data, dueDate: dueDate, createtAt: new Date() }

    console.log(setlist)

    if (setlist.setlistName !== '') {
      postSetlist(setlist)
      setSideListType('setlists')
    } else {
      confirmAlert({
        title: 'Something is missing',
        message: 'You have to enter a title',
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
  margin-bottom: 40px;
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
