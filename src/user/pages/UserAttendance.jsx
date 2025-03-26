import React, { useState, useEffect } from "react";
import UserSideBar from "../components/UserSideBar";
import UserHeader from "../components/UserHeader";
import { Search, Calendar, Download } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Make sure to import the styles
import { getAttendanceById } from "../../commonComponent/Api"; // Assuming the API call is in the api.js file
import { useSelector } from "react-redux";

const UserAttendance = () => {
    const [attendanceData, setAttendanceData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [currentDateTime, setCurrentDateTime] = useState({
        day: "",
        time: "",
        date: "",
    });
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [actionFilter, setActionFilter] = useState("");
    const [selectedDate, setSelectedDate] = useState(null); // New state for selected date
  const user = useSelector((state) => state.auth.user);
    useEffect(() => {
        // Fetch attendance data from the API
        const fetchAttendanceData = async () => {
            try {
                const userInfo = localStorage.getItem("userData");
                const parsedUserInfo = JSON.parse(userInfo);
                const response = await getAttendanceById(parsedUserInfo.id); // Replace with actual user ID
                setAttendanceData(response); // Assuming API returns data in response.data
                setFilteredData(response); // Set the initial filtered data
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

    // Filter attendance data based on search query, status, action, and selected date
    const filterData = () => {
        let filtered = attendanceData;

        // Apply search query filter
        if (searchQuery) {
            filtered = filtered.filter((item) => {
                const name = item.name ? item.name.toLowerCase() : ''; // Safe check for name
                const id = item.id ? item.id.toString() : ''; // Safe check for id
                const status = item.status ? item.status.toLowerCase() : ''; // Safe check for status
                return (
                    name.includes(searchQuery.toLowerCase()) ||
                    id.includes(searchQuery) ||
                    status.includes(searchQuery.toLowerCase())
                );
            });
        }

        // Apply status filter
        if (statusFilter) {
            filtered = filtered.filter((item) => item.status === statusFilter);
        }

        // Apply action filter (Present, Absent, Half Day)
        if (actionFilter) {
            filtered = filtered.filter((item) => item.status === actionFilter);
        }

        // Apply date filter
        if (selectedDate) {
            filtered = filtered.filter((item) => {
                const itemDate = new Date(item.date).toLocaleDateString();
                const selectedDateStr = selectedDate.toLocaleDateString();
                return itemDate === selectedDateStr; // Check if the dates match
            });
        }

        setFilteredData(filtered);
    };

    // Handle input changes
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleStatusChange = (e) => {
        setStatusFilter(e.target.value);
    };

    const handleActionChange = (e) => {
        setActionFilter(e.target.value);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date); // Update selected date
    };

    useEffect(() => {
        filterData();
    }, [searchQuery, statusFilter, actionFilter, selectedDate]); // Re-filter when these values change

    // Convert status code to full text
    const statusText = (statusCode) => {
        switch (statusCode) {
            case "P":
                return "Present";
            case "A":
                return "Absent";
            case "H":
                return "Half Day";
            default:
                return "Unknown";
        }
    };

    // Function to convert data to CSV format
    const exportToCSV = () => {
        const headers = ["Date", "Check In", "Check Out", "Status", "Late"];
        const rows = filteredData.map(item => {
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

            return [
                formattedDate,
                formattedClockIn,
                formattedClockOut,
                statusText(item.status),
                item.late || "N/A"
            ];
        });

        // Combine headers and rows
        const csvContent = [
            headers,
            ...rows
        ]
        .map(row => row.join(","))
        .join("\n");

        // Create a Blob from the CSV content
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "attendance.csv"; // File name for download
        link.click();
    };

    return (
        <div className="flex bg-gray-100 min-h-screen">
            {/* Sidebar */}
            <UserSideBar />

            {/* Main Content */}
            <div className="flex-1 ml-[16vw]">
                {/* Header */}
                <UserHeader title="User Attendance" />

                {/* Attendance Content */}
                <div className="p-[1.25vw] bg-white rounded-[0.417vw] shadow mt-[1.25vw]">
                    <div className="flex justify-between items-center mb-[0.625vw]">
                        <p className="text-gray-600 text-[0.938vw]">
                            Welcome back, <span className="text-blue-500 font-semibold">{user.name}</span>
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
                                value={searchQuery}
                                onChange={handleSearchChange}
                                className="w-full pl-[2.083vw] pr-[0.833vw] py-[0.417vw] border rounded-[0.417vw] focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <select
                            value={actionFilter}
                            onChange={handleActionChange}
                            className="px-[0.833vw] py-[0.417vw] border rounded-[0.417vw] focus:outline-none focus:border-blue-500"
                        >
                            <option value="">Action</option>
                            <option value="P">Present</option>
                            <option value="A">Absent</option>
                            <option value="H">Half Day</option>
                        </select>
                        <div className="flex items-center gap-[0.417vw] px-[0.833vw] py-[0.417vw] border rounded-[0.417vw]">
                            <Calendar size={20} className="text-gray-400" />
                            <DatePicker
                                selected={selectedDate}
                                onChange={handleDateChange}
                                dateFormat="dd MMM, yyyy"
                                placeholderText="Select Date"
                                className="border rounded-[0.417vw] p-[0.417vw]"
                            />
                        </div>
                        <button
                            onClick={exportToCSV} // Trigger CSV export
                            className="flex items-center gap-[0.417vw] px-[0.833vw] py-[0.417vw] text-gray-600 border rounded-[0.417vw] hover:bg-gray-50"
                        >
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
                                    <th className="p-[0.625vw] text-left font-medium ">Late</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((item, index) => {
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
                                  //  const formattedClockOut = new Date(item.clockOutDate).toLocaleTimeString([], {
                                    //    hour: "2-digit",
                                      //  minute: "2-digit",
                                      //  hour12: true,
                                  //  });

const formattedClockOut = item.clockOutDate
    ? new Date(item.clockOutDate).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    })
    : "N/A"; // Show "N/A" or any other fallback text when null
                                    return (
                                        <tr key={index} className="border-t hover:bg-gray-50 transition">
                                            <td className="p-[0.625vw] border-r">{formattedDate}</td>
                                            <td className="p-[0.625vw] border-r">{formattedClockIn}</td>
                                            <td className="p-[0.625vw] border-r">{formattedClockOut}</td>
                                            <td className="p-[0.625vw] border-r">
                                                <span
                                                    className={`inline-block px-[0.417vw] py-[0.208vw] rounded text-[0.729vw] font-medium  ${item.status === "P"
                                                            ? "bg-green-100 text-green-600"
                                                            : item.status === "A"
                                                                ? "bg-red-100 text-red-600"
                                                                : "bg-yellow-100 text-yellow-600"
                                                        }`}
                                                >
                                                    {statusText(item.status)}
                                                </span>
                                            </td>
                                            <td className="p-[0.625vw]">{item.late || "N/A"}</td>
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
