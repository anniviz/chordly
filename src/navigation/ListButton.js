import React from 'react'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'
import { useSpring, animated } from 'react-spring'

import arrowLeft from '../icons/arrow-left.svg'

export default function ListButton({ toggleSideList, isSideListShown }) {
  //transform: rotate(45deg)
  const imgAnimation = useSpring({
    transform: isSideListShown ? 'scaleX(-1)' : 'scaleX(1)',
  })

  return (
    <ListButtonWrapper toggleSideList={toggleSideList}>
      <animated.img
        src={arrowLeft}
        alt=""
        onClick={toggleSideList}
        style={imgAnimation}
      />
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

ListButtonWrapper.propTypes = {
  toggleSideList: PropTypes.func.isRequired,
}
