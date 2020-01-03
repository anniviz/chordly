import React from 'react'
import PropTypes from 'prop-types'
import search from '../icons/search-blue.svg'
import InputField from '../forms/InputField'

export default function SearchForm({ onInput }) {
  return ()
      <InputField id="input-field" onInput={onInput}></InputField>
  )
}

SearchForm.propTypes = {
  onInput: PropTypes.func.isRequired,
}
