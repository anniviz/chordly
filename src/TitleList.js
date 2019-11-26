import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

export default function TitleList({ titles }) {
  return (
    <TitleWrapper>
      {titles.map((title, index) => (
        <li key={index}>{title}</li>
      ))}
    </TitleWrapper>
  )
}

const TitleWrapper = styled.ul`
  list-style: none;
  padding: 10px;
  width: 35%;
  height: 80%;
  border-radius: 12px;
  border: 4px solid white;
  position: absolute;
`

//const TitleListItem = styled.li``

TitleList.propTypes = {
  titles: PropTypes.array.isRequired,
}
