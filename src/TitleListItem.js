import React from 'react'
import styled from 'styled-components/macro'

export default function TitleListItem({ title }) {
  return <TitleListItemStyled>{title}</TitleListItemStyled>
}

const TitleListItemStyled = styled.li`
  padding: 10px 0;
`
