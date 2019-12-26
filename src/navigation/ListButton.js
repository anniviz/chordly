import React from 'react'
import styled from 'styled-components/macro'

import arrowLeft from '../icons/arrow-left.svg'

export default function ListButton() {
  return (
    <ListButtonWrapper>
      <img src={arrowLeft} alt="" />
    </ListButtonWrapper>
  )
}

const ListButtonWrapper = styled.button`
  display: grid;
  align-content: center;
  justify-content: center;
  height: 48px;
  width: 48px;
  background: #3f4a6d;
  border: #feb79c solid 2px;
  border-radius: 12px;
  margin: 0;
  cursor: default;
  position: fixed;
  top: 10px;
  right: 20px;
`
