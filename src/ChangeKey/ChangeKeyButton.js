import React from 'react'
import PropTypes from 'prop-types'

import { dimensions } from '../common/dimensions'
import CubicButton from '../common/CubicButton'

export default function ChangeKeyButton({
  direction,
  handleKeyChangeClick,
  keyCounter,
}) {
  let buttonColorUp, buttoncolorDown
  if (keyCounter > 0) {
    buttonColorUp = '#fb5ba0'
    buttoncolorDown = '#fefefe'
  } else if (keyCounter < 0) {
    buttonColorUp = '#fefefe'
    buttoncolorDown = '#fb5ba0'
  } else {
    buttonColorUp = '#fefefe'
    buttoncolorDown = '#fefefe'
  }

  let buttonBottom, buttonColor
  if (direction === 'up') {
    buttonBottom =
      2 * dimensions.changeKeyButtonBottom + dimensions.cubicButtonExtent + 'px'
    buttonColor = buttonColorUp
  } else {
    buttonBottom = dimensions.changeKeyButtonBottom + 'px'
    buttonColor = buttoncolorDown
  }

  return (
    <CubicButton
      onClick={handleKeyChangeClick}
      style={{
        bottom: buttonBottom,
        right: dimensions.changeKeyButtonRight + 'px',
        color: buttonColor,
      }}
    >
      {direction === 'up' ? '♯' : '♭'}
    </CubicButton>
  )
}

ChangeKeyButton.propTypes = {
  toggleSideList: PropTypes.func,
  isSideListShown: PropTypes.bool,
  keyCounter: PropTypes.number,
}
