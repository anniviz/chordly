import React from 'react'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'
import { useSpring, animated } from 'react-spring'

import arrowLeft from '../icons/arrow-left.svg'
import { dimensions } from '../common/dimensions'

export default function ListButton({ toggleSideList, isSideListShown }) {
  const imgAnimation = useSpring({
    transform: isSideListShown ? 'scaleX(-1)' : 'scaleX(1)',
  })

  return (
    <ListButtonWrapper onClick={toggleSideList}>
      <animated.img src={arrowLeft} alt="" style={imgAnimation} />
    </ListButtonWrapper>
  )
}

const ListButtonWrapper = styled.button`
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
  right: ${dimensions.listButtonRight + 'px'};
`

ListButtonWrapper.propTypes = {
  toggleSideList: PropTypes.func,
  isSideListShown: PropTypes.bool,
}
