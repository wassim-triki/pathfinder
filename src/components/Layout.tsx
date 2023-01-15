import React from 'react'
import Grid from './Grid'
import Menu from './Menu'

const Layout = () => {
  return (
    <div className='grid grid-cols-5 border-2x border-white w-full'>
      <Grid rows={20} cols={37} />
      <Menu />
    </div>
  )
}

export default Layout
