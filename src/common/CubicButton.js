import styled from 'styled-components/macro'

import { dimensions } from '../common/dimensions'

const CubicButton = styled.button`
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
  color: #fb5ba0;
  font-size: 24px;
`

export default CubicButton
