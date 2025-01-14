import React, { useState, useEffect } from "react";


const Header = ({ name, currentTime }) => (
    <div className="flex justify-between items-center mb-8">
        <div>
            <span className="text-gray-600 text-2xl font-medium">Welcome back, </span>
            <span className="text-indigo-600 text-2xl font-medium">{name}</span>
        </div>
        <div className="flex items-center gap-1">
            <span className="text-indigo-600 text-2xl font-medium">{currentTime.day}</span>
            <span className="text-gray-600 text-2xl font-medium">, </span>
            <span className="text-gray-600 text-2xl font-medium">{currentTime.time} </span>
            <span className="text-indigo-600 text-2xl font-medium">{currentTime.period}</span>
        </div>
    </div>
);

const StatusCard = ({ title, time, bgColor, onClick, confirmAction }) => (
    <div
        className={`flex items-center ${bgColor} text-white rounded-2xl p-6 justify-between h-24 cursor-pointer`}
        onClick={() => onClick(confirmAction)}
    >
        <div>
            <h3 className="text-2xl font-medium">{title}</h3>
            <p className="text-lg font-medium mt-1">{time}</p>
        </div>
        <div className={`w-8 h-8 ${title === "Clock In" ? "rotate-90" : "-rotate-90"} bg-transparent`} />
    </div>
);

const WorkingHoursCard = ({ hours }) => (
    <div className="bg-gray-100 rounded-2xl flex flex-col items-center justify-center h-24">
        <div className="bg-white shadow-sm border rounded-lg px-4 py-2 mb-2">
            <h3 className="text-gray-600 text-lg font-medium">Working Hours</h3>
        </div>
        <p className="text-black text-4xl font-medium">{hours}</p>
    </div>
);

const AbsenceCard = ({ dateRange, count }) => (
    <div className="flex items-center bg-red-600 text-white rounded-2xl p-6 mt-6 mb-6 justify-between h-24">
        <div>
            <h3 className="text-2xl font-medium">Total Absent</h3>
            <p className="text-lg font-medium mt-1">{dateRange}</p>
        </div>
        <div className="bg-white text-red-600 text-5xl font-medium px-6 py-2 rounded-lg">
            {count.toString().padStart(2, '0')}
        </div>
    </div>
);

const EventsSection = ({ events }) => (
    <div className="bg-gray-100 rounded-2xl p-4 h-[500px]">
        <div className="h-12 px-4 py-3 bg-white rounded-lg shadow-sm border mb-4">
            <div className="text-gray-600 text-lg font-medium">Events</div>
        </div>
        <div className="space-y-4">
            {events.map((event, index) => (
                <div key={index} className="p-6 bg-white rounded-lg shadow-sm border border-yellow-400 flex justify-center items-center">
                    <div className="text-black text-2xl font-bold">{event}</div>
                </div>
            ))}
        </div>
    </div>
);

const CalendarSection = ({ month, year }) => {
    const days = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
    const dates = Array.from({ length: 31 }, (_, i) => (i + 1).toString());

    return (
        <div className="bg-gray-100 rounded-2xl p-4 h-[500px]">
            <div className="h-12 px-4 py-3 bg-white rounded-lg shadow-sm border mb-4">
                <div className="text-gray-600 text-lg font-medium">Calendar</div>
            </div>
            <div className="bg-white rounded-lg p-6">
                <div className="flex justify-between items-center mb-6">
                    <div className="text-black text-2xl font-bold">{`${month} ${year}`}</div>
                    <div className="flex gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded-full">
                            <div className="w-4 h-4 bg-gray-400 rounded-full" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-full transform rotate-180">
                            <div className="w-4 h-4 bg-gray-400 rounded-full" />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-7 gap-4 mb-4">
                    {days.map((day) => (
                        <div key={day} className="text-center text-black text-sm font-medium">
                            {day}
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-7 gap-2">
                    {dates.map((date) => (
                        <div
                            key={date}
                            className={`h-10 flex justify-center items-center ${date === '19'
                                ? 'bg-indigo-600 text-white rounded-lg'
                                : 'hover:bg-gray-50 rounded-lg'
                                }`}
                        >
                            <span className="text-sm">{date}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const Dashboard = () => {
    const dashboardData = {
        name: "Aditya",
        currentTime: {
            day: "Tue",
            time: "00:00:00",
            period: "AM"
        },
        clockIn: "00:00:00 AM",
        clockOut: "00:00:00 AM",
        workingHours: "08:23:56",
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

    const [isClockedIn, setIsClockedIn] = useState(false);
    const [isClockedOut, setIsClockedOut] = useState(false);
    const [clockInTime, setClockInTime] = useState("00:00:00 AM");
    const [clockOutTime, setClockOutTime] = useState("00:00:00 AM");
    const [timer, setTimer] = useState(0);

    const handleClockIn = (confirm) => {
        if (confirm || !window.confirm("Are you sure you want to clock in?")) return;
        const now = new Date();
        const startTime = Math.floor(Date.now() / 1000);
        localStorage.setItem("clockInStartTime", startTime);
        setClockInTime(now.toLocaleTimeString());
        setIsClockedIn(true);
        setIsClockedOut(false);
    };

    const handleClockOut = (confirm) => {
        if (confirm || !window.confirm("You'll be logged out for the whole day. Do you want to proceed?")) return;
        const now = new Date();
        setClockOutTime(now.toLocaleTimeString());
        setIsClockedOut(true);
        setIsClockedIn(false);
    };

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

    const formatTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs.toString().padStart(2, "0")}:${mins
            .toString()
            .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    return (
        <div className="w-full min-h-screen bg-white p-6">
            <Header name={dashboardData.name} currentTime={dashboardData.currentTime} />

            <div className="grid grid-cols-3 gap-6">
                <StatusCard
                    title="Clock In"
                    time={clockInTime}
                    bgColor="bg-indigo-600"
                    onClick={handleClockIn}
                    confirmAction={true}
                />
                <StatusCard
                    title="Clock Out"
                    time={clockOutTime}
                    bgColor="bg-green-600"
                    onClick={handleClockOut}
                    confirmAction={false}
                />
                <WorkingHoursCard hours={formatTime(timer)} />
            </div>

            <AbsenceCard
                dateRange={dashboardData.absenceData.dateRange}
                count={dashboardData.absenceData.count}
            />

            <div className="grid grid-cols-2 gap-6">
                <EventsSection events={dashboardData.events} />
                <CalendarSection
                    month={dashboardData.calendar.month}
                    year={dashboardData.calendar.year}
                />
            </div>
        </div>
    );
};

export default Dashboard;
