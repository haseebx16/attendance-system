"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import { useAuth } from "../Components/useAuth";
import { useRouter } from "next/navigation";
import { font } from "../Components/font/font";

const Page = () => {
  useAuth("Admin");
  const router = useRouter();
  const today = new Date().toLocaleDateString();
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    const storedAttendance = JSON.parse(localStorage.getItem("attendance")) || [];
    setAttendance(storedAttendance);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/");
  };

  return (
    <div className={`${font.className} bg-gradient-to-br from-sky-900 to-green-900 min-h-screen`}>
      <Navbar />
      <div className="flex text-white justify-between p-8">
        <h1 className="text-4xl">Welcome Admin!</h1>
        <button
          className="bg-emerald-500 px-6 py-2 rounded-xl hover:bg-emerald-600 transition-colors"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      <div className="mx-8 bg-white/10 backdrop-blur-lg rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl text-white">Attendance Sheet</h2>
          <p className="text-white">Date: {today}</p>
        </div>

        <div className="overflow-x-auto">
          {attendance.length === 0 ? (
            <p className="text-white text-center py-4">No attendance records found.</p>
          ) : (
            <table className="w-full text-white">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="py-3 px-4 text-left">User</th>
                  <th className="py-3 px-4 text-left">Date</th>
                  <th className="py-3 px-4 text-left">Time</th>
                </tr>
              </thead>
              <tbody>
                {attendance.map((entry, index) => (
                  <tr key={index} className="border-b border-white/10">
                    <td className="py-3 px-4">{entry.user}</td>
                    <td className="py-3 px-4">{entry.date}</td>
                    <td className="py-3 px-4">{entry.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
