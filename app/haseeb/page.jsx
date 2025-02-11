"use client";

import React from 'react'
import Navbar from '../Components/Navbar'
import { useAuth } from '../Components/useAuth';
import { useRouter } from 'next/navigation';
import { font } from '../Components/font/font';

const page = () => {

    useAuth('Haseeb');
      const router = useRouter();
      
      const handleLogout = () => {
        localStorage.removeItem('user');
        router.push('/');
      };

  return (
    <div className={`${font.className} bg-gradient-to-br from-sky-900 to-green-900 h-screen`}>
        <Navbar/>
        <div className='flex text-white justify-between p-8'>
            <h1 className='text-4xl '>Welcome Abdul Haseeb !</h1>
            <button className='bg-emerald-500 px-6 py-2 rounded-xl' onClick={handleLogout}>Logout</button>
        </div>
    </div>
  )
}

export default page