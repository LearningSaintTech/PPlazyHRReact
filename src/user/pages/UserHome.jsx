import React, { useState, useEffect } from "react";
import UserSidebar from "../components/UserSideBar";
import UserHeader from "../components/UserHeader";
import {clockInAPI} from "../../commonComponent/Api"

const CustomClock = () => {
    const [time, setTime] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            setTime(now.toLocaleTimeString("en-US", { hour12: false }));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return <span>{time}</span>;
};

const UserHome = () => {
    const [isClockedIn, setIsClockedIn] = useState(() =>
        JSON.parse(localStorage.getItem("isClockedIn")) || false
    );
    const [isClockedOut, setIsClockedOut] = useState(() =>
        JSON.parse(localStorage.getItem("isClockedOut")) || false
    );
    const [clockInTime, setClockInTime] = useState(() =>
        localStorage.getItem("clockInTime") || "00:00:00 AM"
    );
    const [clockOutTime, setClockOutTime] = useState(() =>
        localStorage.getItem("clockOutTime") || "00:00:00 AM"
    );
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        localStorage.setItem("isClockedIn", JSON.stringify(isClockedIn));
        localStorage.setItem("isClockedOut", JSON.stringify(isClockedOut));
        localStorage.setItem("clockInTime", clockInTime);
        localStorage.setItem("clockOutTime", clockOutTime);
    }, [isClockedIn, isClockedOut, clockInTime, clockOutTime]);

    useEffect(() => {
        if (isClockedIn && !isClockedOut) {
            const interval = setInterval(() => {
                const startTime = parseInt(localStorage.getItem("clockInStartTime"));
                const currentTime = Math.floor(Date.now() / 1000);
                setTimer(currentTime - startTime);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [isClockedIn, isClockedOut]);

    const handleClockIn = async (userId) => {
        const today = new Date().toISOString().split("T")[0];
        const lastClockInDate = localStorage.getItem("clockInDate");
    
        if (!lastClockInDate || lastClockInDate !== today) {
            try {
                const now = new Date();
                const startTime = Math.floor(Date.now() / 1000);
    
                // Call the clockInAPI
                const response = await clockInAPI(userId);
    
                // If the API call is successful, update local storage and state
                localStorage.setItem("clockInStartTime", startTime);
                localStorage.setItem("clockInDate", today);
    
                setIsClockedIn(true);
                setIsClockedOut(false);
                setClockInTime(now.toLocaleTimeString("en-US"));
    
                alert("Clocked in successfully!");
                console.log("Clock-In API Response:", response);
            } catch (error) {
                console.error("Error during clock-in:", error);
                alert(`Clock-in failed: ${error.message}`);
            }
        } else {
            alert("You have already clocked in today.");
        }
    };

    const handleClockOut = () => {
        const confirmLogout = window.confirm(
            "You'll be logged out for the whole day. Do you want to proceed?"
        );
        if (confirmLogout && isClockedIn && !isClockedOut) {
            setIsClockedOut(true);
            setIsClockedIn(false);
            const now = new Date();
            setClockOutTime(now.toLocaleTimeString("en-US"));
        }
    };
// localStorage.clear();
    const formatTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs.toString().padStart(2, "0")}:${mins
            .toString()
            .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    return (
        <div className="flex h-screen bg-white">
            {/* Sidebar with fixed position */}
            <div className="w-64 fixed h-full border-r border-gray-200">
                <UserSidebar />
            </div>

            {/* Main content with increased spacing */}
            <div className="flex-1 pl-72">  {/* Changed from pl-64 to pl-72 for more space */}
                <div className="border-b border-gray-200">  {/* Added border for visual separation */}
                    <div className="ml-6">  {/* Added margin to header content */}
                        <UserHeader />
                    </div>
                </div>
                <div className="p-8">  {/* Increased padding from p-6 to p-8 */}
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-lg">
                                Welcome back, <span className="text-blue-600">Aditya</span>
                            </h1>
                            <p className="text-gray-600">
                                Tue, <CustomClock /> AM
                            </p>
                        </div>

                        {/* Main content grid */}
                        <div className="grid grid-cols-2 gap-6">
                            {/* Left Column */}
                            <div className="space-y-4">
                                {/* Clock In/Out buttons row */}
                                <div className="flex gap-4">
                                    <div
                                        className={`flex-1 ${isClockedIn ? "bg-gray-100" : "bg-blue-600"
                                            } text-white p-4 rounded-lg cursor-pointer`}
                                        onClick={handleClockIn}
                                    >
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h2 className="text-lg font-medium">Clock In</h2>
                                                <p>{clockInTime}</p>
                                            </div>
                                            <svg className="w-6 h-6 transform rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div
                                        className={`flex-1 ${isClockedOut || !isClockedIn ? "bg-gray-100" : "bg-green-600"
                                            } text-white p-4 rounded-lg cursor-pointer`}
                                        onClick={handleClockOut}
                                    >
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h2 className="text-lg font-medium">Clock Out</h2>
                                                <p>{clockOutTime}</p>
                                            </div>
                                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Total Absent box */}
                                <div className="bg-red-600 text-white p-4 rounded-lg">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h2 className="text-lg font-medium">Total Absent</h2>
                                            <p className="text-sm">1Dec,2024 - 31Dec,2024</p>
                                        </div>
                                        <div className="text-4xl font-bold">06</div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Working Hours */}
                            <div className="bg-gray-100 p-4 rounded-lg flex flex-col justify-center items-center h-full">
                                <h2 className="text-gray-600 mb-2">Working Hours</h2>
                                <p className="text-5xl font-bold">{formatTime(timer)}</p>
                            </div>
                        </div>
                    </div>

                    {/* Events and Calendar section */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white rounded-lg shadow p-4">
                            <h2 className="text-lg font-medium mb-4">Events</h2>
                            <div className="space-y-3">
                                <div className="p-4 bg-white border rounded-lg">Event 1</div>
                                <div className="p-4 bg-white border rounded-lg">Event 2</div>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow p-4">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-medium">Dec 2024</h2>
                                <div className="flex gap-2">
                                    <button className="p-1">&lt;</button>
                                    <button className="p-1">&gt;</button>
                                </div>
                            </div>
                            <table className="w-full">
                                <thead>
                                    <tr>
                                        <th className="p-2 text-sm font-medium">Mo</th>
                                        <th className="p-2 text-sm font-medium">Tu</th>
                                        <th className="p-2 text-sm font-medium">We</th>
                                        <th className="p-2 text-sm font-medium">Th</th>
                                        <th className="p-2 text-sm font-medium">Fr</th>
                                        <th className="p-2 text-sm font-medium">Sa</th>
                                        <th className="p-2 text-sm font-medium">Su</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[...Array(5)].map((_, weekIndex) => (
                                        <tr key={weekIndex}>
                                            {[...Array(7)].map((_, dayIndex) => {
                                                const day = weekIndex * 7 + dayIndex + 1;
                                                const isToday = day === 19;
                                                return (
                                                    <td
                                                        key={dayIndex}
                                                        className={`p-2 text-center ${isToday ? "bg-blue-600 text-white rounded-lg" : ""
                                                            } ${day > 31 ? "text-gray-300" : ""}`}
                                                    >
                                                        {day <= 31 ? day : day - 31}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserHome;