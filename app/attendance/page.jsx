"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { useRouter } from "next/navigation";
import { font } from "../Components/font/font";
import { supabase } from "../utils/supabaseClient";
import { getUser } from "../utils/auth";

const AttendancePage = () => {
  const router = useRouter();
  const [attendance, setAttendance] = useState([]);
  const [markedToday, setMarkedToday] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const loggedInUser = await getUser();
      if (!loggedInUser) {
        router.push("/");
        return;
      }
      setUser(loggedInUser);
      fetchAttendance(loggedInUser.id);
    }
    fetchUser();
  }, []);

  const fetchAttendance = async (userId) => {
    const { data, error } = await supabase
      .from("attendance")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      console.error("Error fetching attendance:", error);
      return;
    }

    setAttendance(data);

    const today = new Date().toISOString().split("T")[0];
    setMarkedToday(data.some((entry) => entry.date === today));
  };

  const isWithinOfficeHours = () => {
    const now = new Date();
    const pkTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Karachi" }));
    const hours = pkTime.getHours();
    return hours >= 21 || hours < 6;
  };

  const markAttendance = async () => {
    if (!user) {
      alert("Please log in first.");
      return;
    }
    if (!isWithinOfficeHours()) {
      alert("Attendance can only be marked between 9 PM and 6 AM (Pakistan time).");
      return;
    }
    if (markedToday) {
      alert("Attendance already marked for today.");
      return;
    }

    const newEntry = {
      user_id: user.id,
      username: user.username,
      date: new Date().toISOString().split("T")[0],
      time: new Date().toLocaleTimeString("en-US", { timeZone: "Asia/Karachi" }),
    };

    const { error } = await supabase.from("attendance").insert([newEntry]);

    if (error) {
      console.error("Error marking attendance:", error);
      return;
    }

    setAttendance([...attendance, newEntry]);
    setMarkedToday(true);
  };

  return (
    <div className={`${font.className} bg-gradient-to-br from-sky-900 to-green-900 h-screen`}>
      <Navbar />
      <div className="flex text-white justify-between p-8">
        <h1 className="text-4xl">Welcome {user?.username || "User"}!</h1>
        <button className="bg-emerald-500 px-6 py-2 rounded-xl" onClick={() => supabase.auth.signOut()}>
          Logout
        </button>
      </div>

      <div className="p-8 text-white">
        <button
          className="bg-blue-500 px-6 py-2 rounded-xl disabled:bg-gray-500"
          onClick={markAttendance}
          disabled={markedToday}
        >
          {markedToday ? "Attendance Marked" : "Mark Attendance"}
        </button>

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

export default AttendancePage;
