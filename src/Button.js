import styled from 'styled-components/macro'

export default styled.button`
  background: #3f4a6d;
  color: #fefefe;
  font-size: 1em;
  padding: 8px;
  width: 100%;
  height: 40px;
  border-radius: 12px;
  border: 4px solid transparent;
  position: relative;
  background-clip: padding-box;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    margin: -4px;
    border-radius: inherit;
    background: linear-gradient(60deg, #feb79c, #fd5da1);
  }
`
