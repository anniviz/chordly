import React from 'react'
import PropTypes from 'prop-types'

import { dimensions } from '../common/dimensions'
import CubicButton from '../common/CubicButton'

export default function ChangeKeyButton({ direction }) {
  const buttonBottom =
    direction === 'up'
      ? 2 * dimensions.changeKeyButtonBottom +
        dimensions.cubicButtonExtent +
        'px'
      : dimensions.changeKeyButtonBottom + 'px'
  return (
    <CubicButton
      style={{
        bottom: buttonBottom,
        right: dimensions.changeKeyButtonRight + 'px',
      }}
    >
      {direction === 'up' ? '♯' : '♭'}
    </CubicButton>
  )
}

ChangeKeyButton.propTypes = {
  toggleSideList: PropTypes.func,
  isSideListShown: PropTypes.bool,
}
