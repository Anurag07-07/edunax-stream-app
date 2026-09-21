import React from 'react'
import Wrapper from './wrapper'
import Toogle from './Toogle'
import Navigation from './Navigation'

export const Sidebar = () => {
  return (
    <Wrapper>
      <Toogle></Toogle>
      <Navigation></Navigation>
    </Wrapper>
  )
}