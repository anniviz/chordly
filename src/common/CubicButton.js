import React from 'react'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'

import { dimensions } from '../common/dimensions'

export default function CubicButton({ positionTop, positionRight }) {
  return (
    <CubicButtonStyled
      positionTop={positionTop}
      positionRight={positionRight}
    />
  )
}

const CubicButtonStyled = styled.button`
  display: grid;
  align-content: center;
  justify-content: center;
  height: ${dimensions.cubicButtonExtent + 'px'};
  width: ${dimensions.cubicButtonExtent + 'px'};
  background: #3f4a6d;
  border: #feb79c solid 2px;
  border-radius: 12px;
  margin: 0;
  cursor: default;
  position: fixed;
  top: ${props => props.positionTop};
  right: ${props => props.positionRight};
`

CubicButton.propTypes = {
  positionTop: PropTypes.string,
  positionRight: PropTypes.string,
}
