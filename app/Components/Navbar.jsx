import React from 'react'
import { font } from './font/font'

const Navbar = () => {
  return (
    <div className={`${font.className} w-full shadow-green-400 shadow-xl flex justify-center items-center text-white text-3xl bg-gradient-to-br from-sky-900 to-green-900 h-24`}>
        <p className='text-center text-xl md:text-3xl'>Tech Haven Marketing LLC Attendance</p>
    </div>
  )
}

export default Navbar