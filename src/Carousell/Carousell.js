import React from 'react'
import styled from 'styled-components/macro'
import { useSwipeable } from 'react-swipeable'

import {
  Wrapper,
  CarouselContainer,
  CarouselSlot,
  SlideButton,
  PREV,
  NEXT,
} from './carouselComponents'

const getOrder = ({ index, pos, numItems }) => {
  return index - pos < 0 ? numItems - Math.abs(index - pos) : index - pos
}
const initialState = { pos: 0, sliding: false, dir: NEXT }

// export default function Carousel({ props })
const Carousel = props => {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  const numItems = React.Children.count(props.children)

  function slide(dir) {
    dispatch({ type: dir, numItems })
    setTimeout(() => {
      dispatch({ type: 'stopSliding' })
    }, 50)
  }
  const handlers = useSwipeable({
    onSwipedLeft: () => slide(NEXT),
    onSwipedRight: () => slide(PREV),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  })
  return (
    <SongWrapper {...handlers}>
      <Wrapper>
        <CarouselContainer dir={state.dir} sliding={state.sliding}>
          {React.Children.map(props.children, (child, index) => (
            <CarouselSlot
              key={index}
              order={getOrder({ index: index, pos: state.pos, numItems })}
            >
              {child}
            </CarouselSlot>
          ))}
        </CarouselContainer>
      </Wrapper>
      <SlideButton onClick={() => slide(PREV)} float="left">
        Prev
      </SlideButton>
      <SlideButton onClick={() => slide(NEXT)} float="right">
        Next
      </SlideButton>
    </SongWrapper>
  )
}

function reducer(state, { type, numItems }) {
  switch (type) {
    case 'reset':
      return initialState
    case PREV:
      return {
        ...state,
        dir: PREV,
        sliding: true,
        pos: state.pos === 0 ? numItems - 1 : state.pos - 1,
      }
    case NEXT:
      return {
        ...state,
        dir: NEXT,
        sliding: true,
        pos: state.pos === numItems - 1 ? 0 : state.pos + 1,
      }
    case 'stopSliding':
      return { ...state, sliding: false }
    default:
      return state
  }
}

const SongWrapper = styled.section`
  grid-column: 3 / end;
  padding: 12px;
  /* margin-top: 10%; */
  margin-left: 12px;
  overflow: scroll;
`

export default Carousel
