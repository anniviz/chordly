import React from 'react'
import { useSpring, animated } from 'react-spring'
import PropTypes from 'prop-types'

import edit from '../icons/edit.svg'
import { dimensions } from '../common/dimensions'
import CubicButton from '../common/CubicButton'

export default function EditButton({ isSideListShown }) {
  const AnimatedCubicButton = animated(CubicButton)
  const swap = useSpring({
    bottom: isSideListShown
      ? dimensions.changeKeyButtonBottom + 'px'
      : 3 * dimensions.changeKeyButtonBottom +
        2 * dimensions.cubicButtonExtent +
        'px',
    right: dimensions.changeKeyButtonRight + 'px',
  })

  return (
    <AnimatedCubicButton style={swap}>
      <img src={edit} alt="" height="20px" />
    </AnimatedCubicButton>
  )
}

EditButton.propTypes = {
  isSideListShown: PropTypes.bool,
}
