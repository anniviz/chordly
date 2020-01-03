import styled from 'styled-components/macro'

import { dimensions } from '../common/dimensions'

const InputField = styled.input`
  background: #939dc5;
  font-size: 1.1rem;
  color: #fefefe;
  border: none;
  width: ${dimensions.sideListWidth - 3 * dimensions.sideListPadding + 'px'};
  height: 2em;
  border-radius: 4px;
  padding: 4px;
  margin: 12px 0;
`

export default InputField
