import styled from 'styled-components/macro'

export default styled.button`
  display: grid;
  align-content: center;
  justify-content: center;
  height: var(--mainButtonHeight);
  width: var(--mainButtonWidth);
  background: radial-gradient(#feb79c, #fd5ea1);
  color: #5b6689;
  font-size: 16px;
  font-weight: 200;
  border: none;
  border-radius: 50%;
  padding: var(--standardPadding);
  margin: 0;
  cursor: default;
  position: fixed;
  bottom: var(--mainButtonBottom);
  left: var(--mainButtonLeft);
`
