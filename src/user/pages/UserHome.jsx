// App.jsx
import React, { useState, useEffect } from "react";

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

const Dashboard = () => {
    const [isClockedIn, setIsClockedIn] = useState(() =>
        JSON.parse(localStorage.getItem("isClockedIn")) || false
    );
    const [isClockedOut, setIsClockedOut] = useState(() =>
        JSON.parse(localStorage.getItem("isClockedOut")) || false
    );
    const [clockInTime, setClockInTime] = useState(() =>
        localStorage.getItem("clockInTime") || "00:00:00"
    );
    const [clockOutTime, setClockOutTime] = useState(() =>
        localStorage.getItem("clockOutTime") || "00:00:00"
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

    const handleClockIn = () => {
        const today = new Date().toISOString().split("T")[0]; // Current date (YYYY-MM-DD)
        const lastClockInDate = localStorage.getItem("clockInDate");

        if (!lastClockInDate || lastClockInDate !== today) {
            const now = new Date();
            const startTime = Math.floor(Date.now() / 1000); // Store in seconds
            localStorage.setItem("clockInStartTime", startTime);
            localStorage.setItem("clockInDate", today); // Save today's date

            setIsClockedIn(true);
            setIsClockedOut(false);
            setClockInTime(now.toLocaleTimeString("en-US", { hour12: false }));
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
            setClockOutTime(now.toLocaleTimeString("en-US", { hour12: false }));
        }
    };

    const formatTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs.toString().padStart(2, "0")}:${mins
            .toString()
            .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="bg-white shadow rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-xl font-semibold">
                        Welcome back, <span className="text-blue-500">Aditya</span>
                    </h1>
                    <p className="text-gray-500">
                        Tue, <CustomClock />
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    <div
                        className={`${isClockedIn ? "bg-gray-300" : "bg-blue-500 cursor-pointer"
                            } text-white p-4 rounded-lg shadow`}
                        onClick={handleClockIn}
                    >
                        <h2 className="text-lg font-semibold">Clock In</h2>
                        <p className="text-2xl">{clockInTime}</p>
                    </div>
                    <div
                        className={`${isClockedOut || !isClockedIn
                                ? "bg-gray-300"
                                : "bg-green-500 cursor-pointer"
                            } text-white p-4 rounded-lg shadow`}
                        onClick={handleClockOut}
                    >
                        <h2 className="text-lg font-semibold">Clock Out</h2>
                        <p className="text-2xl">{clockOutTime}</p>
                    </div>
                    <div className="bg-red-500 text-white p-4 rounded-lg shadow">
                        <h2 className="text-lg font-semibold">Total Absent</h2>
                        <p>1 Dec, 2024 - 31 Dec, 2024</p>
                    </div>
                    <div className="bg-gray-50 text-gray-800 p-4 rounded-lg shadow flex flex-col items-center">
                        <h2 className="text-lg font-semibold">Working Hours</h2>
                        <p className="text-3xl font-bold">{formatTime(timer)}</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="bg-white shadow p-4 rounded-lg">
                        <h2 className="text-lg font-semibold mb-2">Events</h2>
                        <div className="space-y-2">
                            <div className="p-2 bg-gray-100 rounded-lg shadow">Event 1</div>
                            <div className="p-2 bg-gray-100 rounded-lg shadow">Event 2</div>
                        </div>
                    </div>
                    <div className="bg-white shadow p-4 rounded-lg">
                        <h2 className="text-lg font-semibold mb-2">Calendar</h2>
                        <div className="overflow-hidden">
                            <Calendar />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Calendar = () => {
    return (
        <table className="table-auto w-full border border-gray-200 rounded-lg">
            <thead>
                <tr>
                    {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
                        <th
                            key={day}
                            className="py-2 px-1 text-center bg-gray-50 border-b"
                        >
                            {day}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {[...Array(5)].map((_, rowIndex) => (
                    <tr key={rowIndex}>
                        {[...Array(7)].map((_, colIndex) => (
                            <td
                                key={colIndex}
                                className={`py-2 px-1 text-center border ${rowIndex === 2 && colIndex === 4
                                        ? "bg-blue-500 text-white"
                                        : "bg-white"
                                    }`}
                            >
                                {rowIndex * 7 + colIndex + 1 <= 31
                                    ? rowIndex * 7 + colIndex + 1
                                    : ""}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Dashboard;
