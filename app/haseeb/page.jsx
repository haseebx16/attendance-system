"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { useAuth } from "../Components/useAuth";
import { useRouter } from "next/navigation";
import { font } from "../Components/font/font";

const Page = () => {
  useAuth("Haseeb");
  const router = useRouter();
  const [attendance, setAttendance] = useState([]);
  const [markedToday, setMarkedToday] = useState(false);

  useEffect(() => {
    const storedAttendance = JSON.parse(localStorage.getItem("attendance")) || [];
    setAttendance(storedAttendance);

    const today = new Date().toISOString().split("T")[0];
    setMarkedToday(storedAttendance.some((entry) => entry.date === today));
  }, []);

  const isWithinOfficeHours = () => {
    const now = new Date();
    const pkTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Karachi" }));
    const hours = pkTime.getHours();
    
    return (hours >= 21 || hours < 6);
  };

  const markAttendance = () => {
    if (!isWithinOfficeHours()) {
      alert("Attendance can only be marked between 9 PM and 6 AM (Pakistan time).");
      return;
    }
    if (markedToday) {
      alert("Attendance already marked for today.");
      return;
    }

    const newEntry = {
      date: new Date().toISOString().split("T")[0],
      time: new Date().toLocaleTimeString("en-US", { timeZone: "Asia/Karachi" }),
    };

    const updatedAttendance = [...attendance, newEntry];
    setAttendance(updatedAttendance);
    localStorage.setItem("attendance", JSON.stringify(updatedAttendance));
    setMarkedToday(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/");
  };

  return (
    <div className={`${font.className} bg-gradient-to-br from-sky-900 to-green-900 h-screen`}>
      <Navbar />
      <div className="flex text-white justify-between p-8">
        <h1 className="text-4xl">Welcome Abdul Haseeb!</h1>
        <button
          className="bg-blue-500 px-6 py-2 rounded-xl disabled:bg-gray-500"
          onClick={markAttendance}
          disabled={markedToday}
        >
          {markedToday ? "Attendance Marked" : "Mark Attendance"}
        </button>
        <button className="bg-emerald-500 px-6 py-2 rounded-xl" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="p-8 text-white">

        <h2 className="text-2xl mt-6">Attendance History</h2>
        <ul className="mt-2">
          {attendance.length === 0 ? (
            <p>No attendance records found.</p>
          ) : (
            attendance.map((entry, index) => (
              <li key={index} className="mt-1">
                📅 {entry.date} - ⏰ {entry.time}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default Page;
