import React from 'react'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'

import { dimensions } from '../common/dimensions'

export default function InputField({ onInput }) {
  return (
    <SearchbarStyled>
      {/* <label htmlFor="searchbar">search</label> */}
      <input id="searchbar" onInput={onInput} />
    </SearchbarStyled>
    // <InputFieldStyled onInput={onInput} />
  )
}

const InputFieldStyled = styled.input`
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

const SearchbarStyled = styled.div`
  display: flex;
  padding: 4px;
  width: 320px;
  height: 4rem;
  margin: 12px auto;
  border: 4px solid var(--gradientcolordark);
  border-radius: 12px;
  background: var(--white);
  input {
    background: var(--white);
    border: none;
    border-radius: 12px;
    width: 100%;
    margin-left: 4px;
  }
  label {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

InputField.propTypes = {
  onInput: PropTypes.func.isRequired,
}
