import React from 'react'
import { font } from './font/font'

const Login = () => {
  return (
    <div className={` ${font.className} h-screen text-white flex justify-center flex-col items-center w-full bg-gradient-to-br from-sky-900 to-green-950`}>
        <h1 className='text-5xl '>Login</h1>
        <div className='backdrop-blur-lg bg-white/20 border-white/30 border p-12 flex flex-col mt-4 rounded-xl'>
            <h2 className='text-md text-center text-green-400'>Tech Haven</h2>
            <h2 className='text-2xl'>Attendance Tracker</h2>
            <label htmlFor="user" className='mt-4'>User Name :</label>
            <input name='user' type='text' className='rounded-md p-1 text-black bg-gray-300'/>
            <label htmlFor="pass" className='mt-4'>Password :</label>
            <input name='pass' type='password' className='rounded-md p-1 text-black bg-gray-300'/>
            <button className='w-full rounded-xl bg-gradient-to-br from-sky-900 hover:from-emerald-500 hover:to-emerald-700 transition-all duration-400 to-green-950 py-2 mt-8'>Login</button>
        </div>
    </div>
  )
}

export default Login