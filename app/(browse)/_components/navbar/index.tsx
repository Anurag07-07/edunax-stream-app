import React from 'react'
import { Logo } from './logo'
import Search from './Search'
import Actions from './Actions'

const Navbar = () => {
  return (
    <nav className='
      fixed top-0 w-full h-[68px] z-[49]
      navbar-glass
      px-4 lg:px-6
      flex justify-between items-center
    '>
      <Logo />
      <Search />
      <Actions />
    </nav>
  )
}

export default Navbar