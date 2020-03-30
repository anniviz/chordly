import React from 'react'
import PropTypes from 'prop-types'
import { useSpring, animated } from 'react-spring'

import { dimensions } from '../common/dimensions'
import CubicButton from '../common/CubicButton'

export default function ChangeKeyButton({
  direction,
  handleKeyChangeClick,
  keyCounter,
  isSideListShown,
}) {
  let buttonColorUp, buttonColorDown
  if (keyCounter > 0) {
    buttonColorUp = '#fb5ba0'
    buttonColorDown = '#fefefe'
  } else if (keyCounter < 0) {
    buttonColorUp = '#fefefe'
    buttonColorDown = '#fb5ba0'
  } else {
    buttonColorUp = '#fefefe'
    buttonColorDown = '#fefefe'
  }

  const AnimatedCubicButton = animated(CubicButton)
  const buttonPositionUp = useSpring({
    bottom: isSideListShown
      ? dimensions.changeKeyButtonBottom + 'px'
      : 2 * dimensions.changeKeyButtonBottom +
        dimensions.cubicButtonExtent +
        'px',
    right: isSideListShown
      ? 2 * dimensions.changeKeyButtonRight +
        dimensions.cubicButtonExtent +
        'px'
      : dimensions.changeKeyButtonRight + 'px',
    color: buttonColorUp,
  })

  const buttonPositionDown = useSpring({
    bottom: dimensions.changeKeyButtonBottom + 'px',
    right: isSideListShown
      ? 3 * dimensions.changeKeyButtonRight +
        2 * dimensions.cubicButtonExtent +
        'px'
      : dimensions.changeKeyButtonRight + 'px',
    color: buttonColorDown,
  })

  const buttonPositionAnimation =
    direction === 'up' ? buttonPositionUp : buttonPositionDown

  return (
    <AnimatedCubicButton
      onClick={handleKeyChangeClick}
      style={buttonPositionAnimation}
    >
      {direction === 'up' ? '♯' : '♭'}
    </AnimatedCubicButton>
  )
}

ChangeKeyButton.propTypes = {
  toggleSideList: PropTypes.func,
  isSideListShown: PropTypes.bool,
  keyCounter: PropTypes.number,
}
