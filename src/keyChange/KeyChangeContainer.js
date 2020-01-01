import React from 'react'
import styled from 'styled-components/macro'

import { dimensions } from '../common/dimensions'

export default function KeyChangeContainer() {
  return (
    <KeyChangeBorder>
      <KeyChangeWrapper></KeyChangeWrapper>
    </KeyChangeBorder>
  )
}

const KeyChangeWrapper = styled.div`
  justify-self: stretch;
  align-self: center;
  padding: ${dimensions.sideListPadding + 'px'};
  height: 100%;
  border-radius: 12px;
  background: #3f4a6d;
  background-clip: padding-box;
`

const KeyChangeBorder = styled.div`
  z-index: 3;
  display: grid;
  justify-items: stretch;
  border-radius: 12px;
  padding: 2px;
  height: 200px;
  width: 200px;
  background: linear-gradient(60deg, #feb79c, #fd5da1);
  position: fixed;
  top: ${2 * dimensions.listButtonTop + 'px'};
  right: ${2 * dimensions.standardPadding + dimensions.sideListWidth + 'px'};
`
