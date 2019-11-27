import styled from 'styled-components/macro'

export default styled.li`
  list-style: none;
  display: grid;
  align-content: center;
  justify-content: center;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  transform: rotate(180deg);
  height: 100%;
  width: 100%;
  background: ${props =>
    props.isAllSongsShown
      ? 'linear-gradient(#fd5da1, #feb79c)'
      : 'linear-gradient(#3f4a6d, #5b6689)'};
  color: #5b6689;
  font-size: 22px;
  font-weight: 200;
  padding: 8px;
  border: none;
  padding: 0;
  margin: 0;
  cursor: default;
`
