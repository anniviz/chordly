import styled from 'styled-components/macro'

export const NEXT = 'NEXT'
export const PREV = 'PREV'

export const CarouselContainer = styled.div`
  display: flex;
  transition: ${props => (props.sliding ? 'none' : 'transform 1s ease')};
  transform: ${props => {
    if (!props.sliding) return 'translateX(-100%)'
    if (props.dir === PREV) return 'translateX(calc(2 * (-80% - 20px)))'
    return 'translateX(0%)'
  }};
`

export const Wrapper = styled.div`
  overflow: hidden;
`

export const CarouselSlot = styled.div`
  flex: 1 0;
  flex-basis: 100%;
  /* margin-right: 20px; */
  order: ${props => props.order};
`

export const SlideButton = styled.button`
  color: #fefefe;
  font-size: 16px;
  font-weight: 100;
  padding: 10px;
  background-color: #fd5da1;
  border: 1px solid white;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
  margin-top: 20px;
  text-decoration: none;
  float: ${props => props.float};

  &:active {
    position: relative;
    top: 1px;
  }
  &:focus {
    outline: 0;
  }
`
