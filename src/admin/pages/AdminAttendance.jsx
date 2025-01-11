import React, { useState, useEffect } from 'react';
import { Search, Calendar, Download, Info } from "lucide-react";
import AdminSideBar from '../component/AdminSidebar';
import AdminHeader from '../component/AdminHeader';
import { getAllAttendance } from '../../commonComponent/Api'; // Adjust the import path as needed

const AdminAttendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedStatus, setSelectedStatus] = useState(''); // State for status filter

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await getAllAttendance();
        console.log("response", response);
        setAttendanceData(response); // Assuming the API returns data in response.data
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      }
    };

    fetchAttendanceData();
  }, []);

  const formatStatus = (status) => {
    switch (status.toUpperCase()) {
      case 'A':
        return 'ABSENT';
      case 'H':
        return 'HALF-DAY';
      case 'P':
        return 'PRESENT';
      default:
        return 'no clockout'; // Optional: Handle unexpected values
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // This will return date in YYYY-MM-DD format
  };

  const formatTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true, // Use false for 24-hour format
    }).format(date);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const filteredAttendanceData = attendanceData.filter((data) => {
    const dateMatch = selectedDate ? formatDate(data.date) === selectedDate : true;
    const statusMatch = selectedStatus ? formatStatus(data.status).toLowerCase() === selectedStatus.toLowerCase() : true;
    return (
      dateMatch &&
      statusMatch &&
      (data.id.toString().includes(searchTerm) ||
        data.employeeDetail.empId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        formatStatus(data.status).toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const exportToCSV = () => {
    const csvRows = [];
    const headers = ['Serial', 'Date', 'User ID', 'Employee', 'Clock In', 'Clock Out', 'Working Time', 'Status'];
    csvRows.push(headers.join(','));

    filteredAttendanceData.forEach((data, index) => {
      const row = [
        index + 1,
        formatDate(data.date),
        data.id,
        data.employeeDetail.empId,
        formatTime(data.clockInDate),
        formatTime(data.clockOutDate),
        data.workingTime,
        formatStatus(data.status),
      ];
      csvRows.push(row.join(','));
    });

    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'attendance_data.csv';
    link.click();
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-[15%] fixed top-0 left-0 h-full bg-white shadow-lg z-10">
        <AdminSideBar />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-[15%] p-[1.667vw] bg-gray-100 overflow-auto">
        {/* Header */}
        <AdminHeader />

        {/* Content Area */}
        <div className="bg-white p-[1.25vw] rounded-[0.417vw] shadow-lg mt-[1.25vw]">
          <h2 className="text-[1.563vw] font-semibold mb-[1.25vw]">
            Welcome back, <span className="text-indigo-600">Admin</span>
          </h2>

          {/* Search and Filters */}
          <div className="flex gap-[0.833vw] mb-[1.667vw]">
            <div className="relative flex-1">
              <Search className="absolute left-[0.625vw] top-[0.625vw] text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by Name, ID, status..."
                className="w-full pl-[2.083vw] pr-[0.833vw] py-[0.417vw] border rounded-[0.417vw] focus:outline-none focus:border-blue-500"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <div className="flex items-center gap-2 px-4 py-2 border rounded-lg">
              <Calendar size={20} className="text-gray-400" />
              <input
                type="date"
                className="w-full border px-4 py-2 rounded-lg"
                value={selectedDate}
                onChange={handleDateChange}
              />
            </div>
            <select
              className="px-[0.833vw] py-[0.417vw] border rounded-[0.417vw] focus:outline-none focus:border-blue-500"
              value={selectedStatus}
              onChange={handleStatusChange}
            >
              <option value="">Filter by Status</option>
              <option value="present">Present</option>
              <option value="absent">Absent</option>
              <option value="half-day">Half-Day</option>
            </select>
            <div className="flex items-center gap-[0.417vw] px-[0.833vw] py-[0.417vw] border rounded-[0.417vw]">
              <Calendar size={20} className="text-gray-400" />
              <span>13 Jan, 2024</span>
            </div>
            <button className="flex items-center gap-[0.417vw] px-[0.833vw] py-[0.417vw] text-gray-600 border rounded-[0.417vw] hover:bg-gray-50" onClick={exportToCSV}>
              <Download size={20} />
              Export CSV
            </button>
          </div>

          {/* Attendance Table */}
          <div className="overflow-x-auto">
            <table className="table-auto w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-[0.833vw] border-b font-medium text-[0.938vw] text-gray-600">Serial</th>
                  <th className="p-[0.833vw] border-b font-medium text-[0.938vw] text-gray-600">Date</th>
                  <th className="p-[0.833vw] border-b font-medium text-[0.938vw] text-gray-600">User ID</th>
                  <th className="p-[0.833vw] border-b font-medium text-[0.938vw] text-gray-600">Employee</th>
                  <th className="p-[0.833vw] border-b font-medium text-[0.938vw] text-gray-600">Clock In</th>
                  <th className="p-[0.833vw] border-b font-medium text-[0.938vw] text-gray-600">Clock Out</th>
                  <th className="p-[0.833vw] border-b font-medium text-[0.938vw] text-gray-600">Working Time</th>
                  <th className="p-[0.833vw] border-b font-medium text-[0.938vw] text-gray-600">Status</th>
                  <th className="p-[0.833vw] border-b font-medium text-[0.938vw] text-gray-600">Location</th>
                </tr>
              </thead>
              <tbody>
                {filteredAttendanceData.length > 0 ? (
                  filteredAttendanceData.map((data, index) => (
                    <tr key={data.id} className="hover:bg-gray-50">
                      <td className="p-[0.833vw] border-b text-[0.938vw] text-gray-700">{index + 1}</td>
                      <td className="p-[0.833vw] border-b text-[0.938vw] text-gray-700">{formatDate(data.date)}</td>
                      <td className="p-[0.833vw] border-b text-[0.938vw] text-gray-700">{data.id}</td>
                      <td className="p-[0.833vw] border-b text-[0.938vw] text-gray-700">{data.employeeDetail.empId}</td>
                      <td className="p-[0.833vw] border-b text-[0.938vw] text-gray-700">{formatTime(data.clockInDate)}</td>
                      <td className="p-[0.833vw] border-b text-[0.938vw] text-gray-700">{formatTime(data.clockOutDate)}</td>
                      <td className="p-[0.833vw] border-b text-[0.938vw] text-gray-700">{data.workingTime}</td>
                      <td className="p-2 border-b rounded">
                        <div
                          className={`h-8 px-3 py-1 inline-flex items-center justify-start gap-2.5 rounded-lg border
      ${data.status.toUpperCase() === 'A'
                              ? 'bg-red-50 border-red-600 text-red-600'
                              : data.status.toUpperCase() === 'H'
                                ? 'bg-yellow-50 border-yellow-600 text-yellow-600'
                                : data.status.toUpperCase() === 'P'
                                  ? 'bg-green-50 border-green-600 text-green-600'
                                  : 'bg-gray-50 border-gray-600 text-gray-600'
                            }`}
                        >
                          <div className="text-lg font-light font-sans leading-normal">
                            {formatStatus(data.status)}
                          </div>
                        </div>
                      </td>
                      <td className="p-[0.833vw] border-b text-[0.938vw] text-gray-700">
                        <div className="relative group">
                          <Info size={20} className="text-gray-500 cursor-pointer" />
                          <div
                            className="absolute hidden group-hover:block  left-8 bg-white border p-2 rounded shadow-lg text-sm w-max">
                            <p><strong>Clock In:</strong> {data.clockInAddress || 'N/A'}</p>
                            <p><strong>Clock Out:</strong> {data.clockOutAddress || 'N/A'}</p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="p-4 text-center text-gray-500">
                      No attendance data available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAttendance;
