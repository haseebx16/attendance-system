"use client";
import React, { useState } from 'react'
import Navbar from '../Components/Navbar'
import { useAuth } from '../Components/useAuth';
import { useRouter } from 'next/navigation';
import { font } from '../Components/font/font';

const Page = () => {
    useAuth('Admin');
    const router = useRouter();
    const today = new Date().toLocaleDateString();
    const [attendance, setAttendance] = useState([
        { id: 1, name: "John Doe", status: "present", time: "9:00 AM" },
        { id: 2, name: "Jane Smith", status: "absent", time: "-" },
        { id: 3, name: "Mike Johnson", status: "present", time: "8:45 AM" },
        { id: 4, name: "Sarah Williams", status: "pending", time: "-" },
    ]);

    const handleAttendance = (id, status) => {
        const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setAttendance(attendance.map(student => 
            student.id === id ? { ...student, status: status, time: status === 'present' ? currentTime : '-' } : student
        ));
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        router.push('/');
    };

    return (
        <div className={`${font.className} bg-gradient-to-br from-sky-900 to-green-900 min-h-screen`}>
            <Navbar/>
            <div className='flex text-white justify-between p-8'>
                <h1 className='text-4xl'>Welcome Zayn Abbas !</h1>
                <button className='bg-emerald-500 px-6 py-2 rounded-xl hover:bg-emerald-600 transition-colors' 
                        onClick={handleLogout}>Logout</button>
            </div>
            <div className='mx-8 bg-white/10 backdrop-blur-lg rounded-xl p-6'>
                <div className='flex justify-between items-center mb-6'>
                    <h2 className='text-2xl text-white'>Attendance Sheet</h2>
                    <p className='text-white'>Date: {today}</p>
                </div>
                
                <div className='overflow-x-auto'>
                    <table className='w-full text-white'>
                        <thead>
                            <tr className='border-b border-white/20'>
                                <th className='py-3 px-4 text-left'>Name</th>
                                <th className='py-3 px-4 text-left'>Status</th>
                                <th className='py-3 px-4 text-left'>Time</th>
                                <th className='py-3 px-4 text-left'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attendance.map((student) => (
                                <tr key={student.id} className='border-b border-white/10'>
                                    <td className='py-3 px-4'>{student.name}</td>
                                    <td className='py-3 px-4'>
                                        <span className={`px-2 py-1 rounded-full text-sm ${
                                            student.status === 'present' ? 'bg-green-500/20 text-green-300' :
                                            student.status === 'absent' ? 'bg-red-500/20 text-red-300' :
                                            'bg-yellow-500/20 text-yellow-300'
                                        }`}>
                                            {student.status}
                                        </span>
                                    </td>
                                    <td className='py-3 px-4'>{student.time}</td>
                                    <td className='py-3 px-4'>
                                        <div className='flex gap-2'>
                                            <button 
                                                onClick={() => handleAttendance(student.id, 'present')}
                                                className='px-3 py-1 bg-green-500 rounded-lg hover:bg-green-600 transition-colors'>
                                                Present
                                            </button>
                                            <button 
                                                onClick={() => handleAttendance(student.id, 'absent')}
                                                className='px-3 py-1 bg-red-500 rounded-lg hover:bg-red-600 transition-colors'>
                                                Absent
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Page