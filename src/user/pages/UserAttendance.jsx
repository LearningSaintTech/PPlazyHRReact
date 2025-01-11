import React, { useState, useEffect } from "react";
import UserSideBar from "../components/UserSideBar";
import UserHeader from "../components/UserHeader";
import { CiSearch } from "react-icons/ci";
import { IoCloudUploadOutline } from "react-icons/io5";
import { Search, Calendar, Download } from "lucide-react";
import { getAttendanceById } from "../../commonComponent/Api"; // Assuming the API call is in the api.js file

const UserAttendance = () => {
    const [attendanceData, setAttendanceData] = useState([]);
    const [currentDateTime, setCurrentDateTime] = useState({
        day: "",
        time: "",
        date: "",
    });

    useEffect(() => {
        // Fetch attendance data from the API
        const fetchAttendanceData = async () => {
            try {
                const userInfo = localStorage.getItem("USER_DATA");
                const parsedUserInfo = JSON.parse(userInfo);
                console.log("userInfo.id", userInfo)
                const response = await getAttendanceById(parsedUserInfo.id); // Replace with actual user ID
                console.log("response", response)
                setAttendanceData(response); // Assuming API returns data in response.data
            } catch (error) {
                console.error("Error fetching attendance data:", error);
            }
        };

        fetchAttendanceData();

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
    }, []); // Empty dependency array ensures the effect runs only once when the component mounts

    return (
        <div className="flex bg-gray-100 min-h-screen">
            {/* Sidebar */}
            <UserSideBar />

            {/* Main Content */}
            <div className="flex-1 p-6 ml-[290px]"> {/* Add ml-[290px] to offset the sidebar */}
                {/* Header */}
                <UserHeader title="User Attendance" />

                {/* Attendance Content */}
                <div className="p-6 bg-white rounded-lg shadow mt-6">
                    <div className="flex justify-between items-center mb-4">
                        <p className="text-gray-600 text-lg">
                            Welcome back, <span className="text-blue-500 font-semibold">Aditya</span>
                        </p>
                        <p className="text-blue-500 font-medium">
                            {currentDateTime.day}, {currentDateTime.time}
                        </p>
                    </div>

                    {/* Search Box and Filters */}
                    <div className="flex gap-4 mb-8">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search by Name, ID, status..."
                                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <select
                            className="px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        >
                            <option value="">Action</option>
                            <option value="open">Open</option>
                            <option value="closed">Closed</option>
                            <option value="pending">Pending</option>
                        </select>
                        <div className="flex items-center gap-2 px-4 py-2 border rounded-lg">
                            <Calendar size={20} className="text-gray-400" />
                            <span>13 Jan, 2024</span>
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 text-gray-600 border rounded-lg hover:bg-gray-50">
                            <Download size={20} />
                            Export CSV
                        </button>
                    </div>

                    {/* Table */}
                    <div className="overflow-auto">
                        <table className="table-auto w-full text-gray-700 border-collapse">
                            <thead className="bg-gray-100 border-t border-b">
                                <tr>
                                    <th className="p-3 text-left font-medium border-r">Date</th>
                                    <th className="p-3 text-left font-medium border-r">Check In</th>
                                    <th className="p-3 text-left font-medium border-r">Check Out</th>
                                    <th className="p-3 text-left font-medium border-r">Status</th>
                                    <th className="p-3 text-left font-medium">Late</th>
                                </tr>
                            </thead>
                            <tbody>
                                {attendanceData.map((item, index) => {
                                    // Convert and format dates
                                    const formattedDate = new Date(item.date).toLocaleDateString(undefined, {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    });
                                    const formattedClockIn = new Date(item.clockInDate).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: true,
                                    });
                                    const formattedClockOut = new Date(item.clockOutDate).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: true,
                                    });

                                    return (
                                        <tr key={index} className="border-t hover:bg-gray-50 transition">
                                            <td className="p-3 border-r">{formattedDate}</td>
                                            <td className="p-3 border-r">{formattedClockIn}</td>
                                            <td className="p-3 border-r">{formattedClockOut}</td>
                                            <td className="p-3 border-r">
                                                <span
                                                    className={`inline-block px-2 py-1 rounded text-sm font-medium ${item.status === "Present"
                                                            ? "bg-green-100 text-green-600"
                                                            : item.status === "Absent"
                                                                ? "bg-red-100 text-red-600"
                                                                : "bg-yellow-100 text-yellow-600"
                                                        }`}
                                                >
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="p-3">{item.late || "N/A"}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserAttendance;
