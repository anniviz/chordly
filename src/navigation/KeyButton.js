import React from 'react'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'

import key from '../icons/key-icon-pink.svg'
import { dimensions } from '../common/dimensions'

export default function KeyButton({ toggleKeyChange }) {
  return (
    <KeyButtonWrapper onClick={toggleKeyChange}>
      <img src={key} alt="" />
    </KeyButtonWrapper>
  )
}

const KeyButtonWrapper = styled.button`
  display: grid;
  align-content: center;
  justify-content: center;
  height: ${dimensions.listButtonHeight + 'px'};
  width: ${dimensions.listButtonWidth + 'px'};
  background: #3f4a6d;
  border: #feb79c solid 2px;
  border-radius: 12px;
  margin: 0;
  cursor: default;
  position: fixed;
  top: ${dimensions.listButtonTop + 'px'};
  right: ${2 * dimensions.listButtonRight + dimensions.listButtonWidth + 'px'};
`

KeyButtonWrapper.propTypes = {
  toggleSideList: PropTypes.func,
}
