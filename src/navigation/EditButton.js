import React from 'react'
import { useSpring, animated } from 'react-spring'
import PropTypes from 'prop-types'

import { dimensions } from '../common/dimensions'
import CubicButton from '../common/CubicButton'

export default function EditButton({ isSideListShown }) {
  const AnimatedCubicButton = animated(CubicButton)
  const swap = useSpring({
    bottom: isSideListShown
      ? dimensions.changeKeyButtonBottom + 'px'
      : 2 * dimensions.changeKeyButtonBottom +
        dimensions.cubicButtonExtent +
        'px',
    right: dimensions.changeKeyButtonRight + 'px',
  })

  return <AnimatedCubicButton style={swap}></AnimatedCubicButton>
}
