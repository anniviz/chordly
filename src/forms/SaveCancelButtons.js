import React from 'react'
import styled from 'styled-components/macro'

import SmallButton from '../common/SmallButton'
import saveIcon from '../icons/saveIcon.png'
import cancelIcon from '../icons/cancelIcon.png'

export default function SaveCancelButtons({ handleCancelClick }) {
  return (
    <ButtonWrapper>
      <SmallButton type="submit">
        <img src={saveIcon} alt="" />
      </SmallButton>
      <SmallButton type="button" onClick={handleCancelClick}>
        <img src={cancelIcon} alt="" />
      </SmallButton>
    </ButtonWrapper>
  )
}

const ButtonWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`

// export default ButtonWrapper
