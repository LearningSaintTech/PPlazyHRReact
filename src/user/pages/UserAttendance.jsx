import React, { useState, useEffect } from "react";
import UserSideBar from "../components/UserSideBar";
import UserHeader from "../components/UserHeader";
import { CiSearch } from "react-icons/ci";
import { IoCloudUploadOutline } from "react-icons/io5";
import { Search, Calendar, Download } from "lucide-react";

const UserAttendance = () => {
    const [attendanceData] = useState([
        { date: "13/01", checkIn: "09:00 AM", checkOut: "05:00 PM", status: "Present", late: "0h" },
        { date: "13/01", checkIn: "-", checkOut: "-", status: "Absent", late: "0h" },
        { date: "13/01", checkIn: "10:15 AM", checkOut: "05:00 PM", status: "Late", late: "0h" },
        { date: "13/01", checkIn: "09:00 AM", checkOut: "06:00 PM", status: "Present", late: "1h" },
        { date: "13/01", checkIn: "09:00 AM", checkOut: "05:00 PM", status: "Present", late: "0h" },
        { date: "13/01", checkIn: "09:00 AM", checkOut: "07:00 PM", status: "Present", late: "2h" },
    ]);

    const [currentDateTime, setCurrentDateTime] = useState({
        day: "",
        time: "",
        date: "",
    });

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            const options = { weekday: "long" };
            const day = now.toLocaleDateString(undefined, options);
            const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true });
            const date = now.toLocaleDateString();
            setCurrentDateTime({ day, time, date });
        };

        updateDateTime();
        const interval = setInterval(updateDateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex bg-gray-100 min-h-screen">
            {/* Sidebar */}
            <UserSideBar />

            {/* Main Content */}
            <div className="flex-1 p-[1.25vw] ml-[15.104vw]"> {/* Add ml-[290px] to offset the sidebar */}
                {/* Header */}
                <UserHeader title="User Attendance" />

                {/* Attendance Content */}
                <div className="p-[1.25vw] bg-white rounded-[0.417vw] shadow mt-[1.25vw]">
                    <div className="flex justify-between items-center mb-[0.625vw]">
                        <p className="text-gray-600 text-[0.938vw]">
                            Welcome back, <span className="text-blue-500 font-semibold">Aditya</span>
                        </p>
                        <p className="text-blue-500 font-medium">
                            {currentDateTime.day}, {currentDateTime.time}
                        </p>
                    </div>

                    {/* Search Box and Filters */}
                    <div className="flex gap-[0.833vw] mb-[1.667vw]">
                        <div className="relative flex-1">
                            <Search className="absolute left-[0.625vw] top-[0.625vw] text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search by Name, ID, status..."
                                className="w-full pl-[2.083vw] pr-[0.833vw] py-[0.417vw] border rounded-[0.417vw] focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <select
                            className="px-[0.833vw] py-[0.417vw] border rounded-[0.417vw] focus:outline-none focus:border-blue-500"
                        >
                            <option value="">Action</option>
                            <option value="open">Open</option>
                            <option value="closed">Closed</option>
                            <option value="pending">Pending</option>
                        </select>
                        <div className="flex items-center gap-[0.417vw] px-[0.833vw] py-[0.417vw] border rounded-[0.417vw]">
                            <Calendar size={20} className="text-gray-400" />
                            <span>13 Jan, 2024</span>
                        </div>
                        <button className="flex items-center gap-[0.417vw] px-[0.833vw] py-[0.417vw] text-gray-600 border rounded-[0.417vw] hover:bg-gray-50">
                            <Download size={20} />
                            Export CSV
                        </button>
                    </div>

                    {/* Table */}
                    <div className="overflow-auto">
                        <table className="table-auto w-full text-gray-700 border-collapse">
                            <thead className="bg-gray-100 border-t border-b">
                                <tr>
                                    <th className="p-[0.625vw] text-left font-medium border-r">Date</th>
                                    <th className="p-[0.625vw] text-left font-medium border-r">Check In</th>
                                    <th className="p-[0.625vw] text-left font-medium border-r">Check Out</th>
                                    <th className="p-[0.625vw] text-left font-medium border-r">Status</th>
                                    <th className="p-[0.625vw] text-left font-medium">Late</th>
                                </tr>
                            </thead>
                            <tbody>
                                {attendanceData.map((item, index) => (
                                    <tr key={index} className="border-t hover:bg-gray-50 transition">
                                        <td className="p-[0.625vw] border-r">{item.date}</td>
                                        <td className="p-[0.625vw] border-r">{item.checkIn}</td>
                                        <td className="p-[0.625vw] border-r">{item.checkOut}</td>
                                        <td className="p-[0.625vw] border-r">
                                            <span
                                                className={`inline-block px-[0.417vw] py-[0.208vw] rounded text-[0.729vw] font-medium ${item.status === "Present"
                                                    ? "bg-green-100 text-green-600"
                                                    : item.status === "Absent"
                                                        ? "bg-red-100 text-red-600"
                                                        : "bg-yellow-100 text-yellow-600"
                                                    }`}
                                            >
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="p-[0.625vw]">{item.late}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserAttendance;
