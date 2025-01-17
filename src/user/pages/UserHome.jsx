import React, { useState, useEffect } from "react";
import { clockInAPI, clockOutAPI } from "../../commonComponent/Api";
import UserSidebar from "../components/UserSideBar";
import UserHeader from "../components/UserHeader";
import { useSelector } from "react-redux";

const CustomClock = () => {
    const [time, setTime] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            setTime(now.toLocaleTimeString("en-US", { hour12: false }));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return time;
};

const Dashboard = () => {
    // State initialization with localStorage
    
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
    const [currentTime, setCurrentTime] = useState({
        day: "Tue",
        time: "00:00:00",
        period: "AM"
    });

    // Calendar state
    const [currentDate, setCurrentDate] = useState(new Date());

    // Update current time
    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const day = now.toLocaleDateString('en-US', { weekday: 'short' });
            const time = now.toLocaleTimeString();
            const period = time.slice(-2);
            setCurrentTime({
                day,
                time: time.slice(0, -3),
                period
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    // Persist state to localStorage
    useEffect(() => {
        localStorage.setItem("isClockedIn", JSON.stringify(isClockedIn));
        localStorage.setItem("isClockedOut", JSON.stringify(isClockedOut));
        localStorage.setItem("clockInTime", clockInTime);
        localStorage.setItem("clockOutTime", clockOutTime);
    }, [isClockedIn, isClockedOut, clockInTime, clockOutTime]);

    // Timer effect
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

    const handleClockIn = async (confirm) => {
        if (confirm) return;

        const userData = localStorage.getItem('userData');
        const parsedUserData = JSON.parse(userData);
        const userId = parsedUserData.id;
        const today = new Date().toISOString().split("T")[0];
        const lastClockInDate = localStorage.getItem("clockInDate");

        if (!lastClockInDate || lastClockInDate !== today) {
            try {
                const now = new Date();
                const startTime = Math.floor(Date.now() / 1000);

                const response = await clockInAPI(userId);

                localStorage.setItem("clockInStartTime", startTime);
                localStorage.setItem("clockInDate", today);

                setIsClockedIn(true);
                setIsClockedOut(false);
                setClockInTime(now.toLocaleTimeString("en-US"));

                alert("Clocked in successfully!");
                localStorage.setItem("clockingId", response.id);
            } catch (error) {
                console.error("Error during clock-in:", error);
                alert(`Clock-in failed: ${error.message}`);
            }
        } else {
            alert("You have already clocked in today.");
        }
    };

    const handleClockOut = async (confirm) => {
        if (confirm) return;

        const confirmLogout = window.confirm(
            "You'll be logged out for the whole day. Do you want to proceed?"
        );

        if (confirmLogout && isClockedIn && !isClockedOut) {
            try {
                const clockingId = localStorage.getItem("clockingId");
                const response = await clockOutAPI(clockingId);

                setIsClockedOut(true);
                setIsClockedIn(false);

                const now = new Date();
                setClockOutTime(now.toLocaleTimeString("en-US"));

                alert('Clocked out successfully!');
            } catch (error) {
                console.error('Error during clock-out:', error);
                alert('Failed to clock out. Please try again.');
            }
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

    // Calendar navigation functions
    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    // Calendar helper functions
    const getDaysInMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
        return firstDay === 0 ? 6 : firstDay - 1; // Adjust for Monday start
    };

    // Generate calendar days
    const generateCalendarDays = () => {
        const daysInMonth = getDaysInMonth(currentDate);
        const firstDay = getFirstDayOfMonth(currentDate);
        const days = [];

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < firstDay; i++) {
            days.push("");
        }

        // Add the days of the month
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(i);
        }

        return days;
    };

    // Format month and year
    const formatMonthYear = (date) => {
        return date.toLocaleString('default', { month: 'short', year: 'numeric' });
    };

    // Check if a date is today
    const isToday = (day) => {
        const today = new Date();
        return day === today.getDate() &&
            currentDate.getMonth() === today.getMonth() &&
            currentDate.getFullYear() === today.getFullYear();
    };

    const dashboardData = {
        name: "Aditya",
        absenceData: {
            dateRange: "1Dec,2024 - 31Dec,2024",
            count: 6
        },
        events: ["Event 1", "Event 2"],
        calendar: {
            month: "Dec",
            year: "2024"
        }
    };
    const user = useSelector((state) => state.auth.user); // Adjust path if necessary
    console.log("user",user)
    return (
        
        <div className="flex h-screen bg-white">
            <UserSidebar />
            <div className="flex-1 pl-[16vw]">
                <UserHeader />
                <div className="w-full min-h-screen bg-white p-[1.25vw]">
                    {/* Header Section */}
                    <div className="flex justify-between items-center mb-[1.667vw]">
                        <div>
                            <span className="text-gray-600 text-[1.25vw] font-medium">Welcome back, </span>
                            <span className="text-indigo-600 text-[1.25vw] font-medium">{user.name}</span>
                        </div>
                        <div className="flex items-center gap-[0.208vw]">
                            <span className="text-indigo-600 text-[1.25vw] font-medium">{currentTime.day}</span>
                            <span className="text-gray-600 text-[1.25vw] font-medium">, </span>
                            <span className="text-gray-600 text-[1.25vw] font-medium"><CustomClock /> </span>
                            <span className="text-indigo-600 text-[1.25vw] font-medium">{currentTime.period}</span>
                        </div>
                    </div>

                    {/* Action Cards Section */}
                    <div className="grid grid-cols-3 gap-[1.25vw] ">
                        {/* Clock In Card */}
                        <div
                            className="flex items-center bg-indigo-600 text-white rounded-[0.833vw] p-[1.25vw] justify-between h-[5vw] cursor-pointer"
                            onClick={() => handleClockIn(false)}
                        >
                            <div>
                                <h3 className="text-[1.25vw] font-medium">Clock In</h3>
                                <p className="text-[0.938vw] font-medium mt-[0.208vw]">{clockInTime}</p>
                            </div>
                            <div className="w-[1.667vw] h-[1.667vw] rotate-90 bg-transparent" />
                        </div>

                        {/* Clock Out Card */}
                        <div
                            className="flex items-center bg-green-600 text-white rounded-[0.833vw] p-[1.25vw] justify-between h-[5vw] cursor-pointer"
                            onClick={() => handleClockOut(false)}
                        >
                            <div>
                                <h3 className="text-[1.25vw] font-medium">Clock Out</h3>
                                <p className="text-[0.938vw] font-medium mt-[0.208vw]">{clockOutTime}</p>
                            </div>
                            <div className="w-[1.667vw] h-[1.667vw] -rotate-90 bg-transparent" />
                        </div>

                        {/* Working Hours Card */}
                        <div className="bg-gray-100 rounded-[0.833vw] flex flex-col items-center justify-center h-[5vw]">
                            <div className="bg-white shadow-sm border rounded-[0.417vw] px-[0.833vw] py-[0.417vw] mb-[0.417vw]">
                                <h3 className="text-gray-600 text-[0.938vw] font-medium">Working Hours</h3>
                            </div>
                            <p className="text-black text-[1.875vw] font-medium">{formatTime(timer)}</p>
                        </div>

                        {/* Absence Card */}
                        <div className="flex items-center bg-red-600 text-white rounded-[0.833vw] p-[1.25vw] mb-[1.25vw] justify-between h-[5vw]">
                            <div>
                                <h3 className="text-[1.25vw] font-medium">Total Absent</h3>
                                <p className="text-[0.938vw] font-medium mt-[0.208vw]">{dashboardData.absenceData.dateRange}</p>
                            </div>
                            <div className="bg-white text-red-600 text-[2.5vw] font-medium px-[1.25vw] py-[0.417vw] rounded-[0.417vw]">
                                {dashboardData.absenceData.count.toString().padStart(2, '0')}
                            </div>
                        </div>
                    </div>

                    {/* Events and Calendar Section */}
                    <div className="grid grid-cols-2 gap-[1.25vw]">
                        {/* Events Panel */}
                        <div className="bg-gray-100 rounded-[0.833vw] p-[0.833vw] h-[27.042vw]">
                            <div className="h-[2.5vw] px-[0.833vw] py-[0.625vw] bg-white rounded-[0.417vw] shadow-sm border mb-[0.833vw]">
                                <div className="text-gray-600 text-[0.938vw] font-medium">Events</div>
                            </div>
                            <div className="space-y-4">
                                {dashboardData.events.map((event, index) => (
                                    <div key={index} className="p-[1.25vw] bg-white rounded-[0.417vw] shadow-sm border border-yellow-400 flex justify-center items-center">
                                        <div className="text-black text-[1.25vw] font-bold">{event}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Calendar Panel */}
                        <div className="bg-gray-100 rounded-[0.833vw] p-[0.833vw] h-[27.042vw]">
                            <div className="h-[2.5vw] px-[0.833vw] py-[0.625vw] bg-white rounded-[0.417vw] shadow-sm border mb-[0.833vw]">
                                <div className="text-gray-600 text-[0.938vw] font-medium">Calendar</div>
                            </div>
                            <div className="bg-white rounded-[0.417vw] p-[1.25vw]">
                                {/* Calendar Header */}
                                <div className="flex justify-between items-center mb-[1.25vw]">
                                    <div className="text-black text-[1.25vw] font-bold">
                                        {formatMonthYear(currentDate)}
                                    </div>
                                    <div className="flex gap-[0.417vw]">
                                        <button
                                            onClick={prevMonth}
                                            className="p-[0.417vw] hover:bg-gray-100 rounded-full"
                                        >
                                            <div className="w-[0.833vw] h-[0.833vw] bg-gray-400 rounded-full" />
                                        </button>
                                        <button
                                            onClick={nextMonth}
                                            className="p-[0.417vw] hover:bg-gray-100 rounded-full transform rotate-180"
                                        >
                                            <div className="w-[0.833vw] h-[0.833vw] bg-gray-400 rounded-full" />
                                        </button>
                                    </div>
                                </div>

                                {/* Calendar Days Header */}
                                <div className="grid grid-cols-7 gap-[0.833vw] mb-[0.833vw]">
                                    {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((day) => (
                                        <div key={day} className="text-center text-black text-[0.729vw] font-medium">
                                            {day}
                                        </div>
                                    ))}
                                </div>

                                {/* Calendar Days Grid */}
                                <div className="grid grid-cols-7">
                                    {generateCalendarDays().map((day, index) => (
                                        <div
                                            key={index}
                                            className={`h-[2.8vw] flex justify-center border border-[#d4d3df] items-center ${isToday(day)
                                                    ? 'bg-indigo-600 text-white'
                                                    : day
                                                        ? 'hover:bg-gray-50'
                                                        : ''
                                                } `}
                                        >
                                            <span className="text-[0.729vw]">{day}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;