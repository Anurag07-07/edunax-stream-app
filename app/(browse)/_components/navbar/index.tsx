import React from 'react'
import { Logo } from './logo'
import Search from './Search'
import Actions from './Actions'

const Navbar = () => {
  return (
    <nav className='
      fixed top-3 left-3 right-3 lg:left-6 lg:right-6 h-[60px] z-[49]
      navbar-glass rounded-2xl border border-white/10
      px-3 lg:px-5
      flex justify-between items-center
      shadow-[0_18px_60px_rgba(0,0,0,0.28)]
    '>
      <Logo />
      <Search />
      <Actions />
    </nav>
  )
}

export default Navbar