import React from 'react'
import PropTypes from 'prop-types'
import { useSpring, animated } from 'react-spring'

import arrowLeft from '../icons/arrow-left.svg'
import { dimensions } from '../common/dimensions'
import CubicButton from '../common/CubicButton'

export default function ListButton({ toggleSideList, isSideListShown }) {
  const imgAnimation = useSpring({
    transform: isSideListShown ? 'scaleX(-1)' : 'scaleX(1)',
    margin: '6px',
  })

  return (
    <CubicButton
      onClick={toggleSideList}
      style={{
        top: dimensions.listButtonTop + 'px',
        right: dimensions.listButtonRight + 'px',
      }}
    >
      <animated.img src={arrowLeft} alt="" style={imgAnimation} />
    </CubicButton>
  )
}

ListButton.propTypes = {
  toggleSideList: PropTypes.func,
  isSideListShown: PropTypes.bool,
}
