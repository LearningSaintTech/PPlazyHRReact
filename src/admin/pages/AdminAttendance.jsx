import React, { useState, useEffect } from 'react';
import { Search, Calendar, Download } from "lucide-react";
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
      <div className="flex-1 ml-[15%] p-8 bg-gray-100 overflow-auto">
        {/* Header */}
        <AdminHeader />

        {/* Content Area */}
        <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
          <h2 className="text-3xl font-semibold mb-6">
            Welcome back, <span className="text-indigo-600">Admin</span>
          </h2>

          {/* Search and Filters */}
          <div className="flex gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by Name, ID, status..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
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
              className="px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              value={selectedStatus}
              onChange={handleStatusChange}
            >
              <option value="">Filter by Status</option>
              <option value="present">Present</option>
              <option value="absent">Absent</option>
              <option value="half-day">Half-Day</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2 text-gray-600 border rounded-lg hover:bg-gray-50" onClick={exportToCSV}>
              <Download size={20} />
              Export CSV
            </button>
          </div>

          {/* Attendance Table */}
          <div className="overflow-x-auto">
            <table className="table-auto w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-4 border-b font-medium text-lg text-gray-600">Serial</th>
                  <th className="p-4 border-b font-medium text-lg text-gray-600">Date</th>
                  <th className="p-4 border-b font-medium text-lg text-gray-600">User ID</th>
                  <th className="p-4 border-b font-medium text-lg text-gray-600">Employee</th>
                  <th className="p-4 border-b font-medium text-lg text-gray-600">Clock In</th>
                  <th className="p-4 border-b font-medium text-lg text-gray-600">Clock Out</th>
                  <th className="p-4 border-b font-medium text-lg text-gray-600">Working Time</th>
                  <th className="p-4 border-b font-medium text-lg text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredAttendanceData.length > 0 ? (
                  filteredAttendanceData.map((data, index) => (
                    <tr key={data.id} className="hover:bg-gray-50">
                      <td className="p-4 border-b text-lg text-gray-700">{index + 1}</td>
                      <td className="p-4 border-b text-lg text-gray-700">{formatDate(data.date)}</td>
                      <td className="p-4 border-b text-lg text-gray-700">{data.id}</td>
                      <td className="p-4 border-b text-lg text-gray-700">{data.employeeDetail.empId}</td>
                      <td className="p-4 border-b text-lg text-gray-700">{formatTime(data.clockInDate)}</td>
                      <td className="p-4 border-b text-lg text-gray-700">{formatTime(data.clockOutDate)}</td>
                      <td className="p-4 border-b text-lg text-gray-700">{data.workingTime}</td>
                      <td className={`p-4 border-b text-lg text-gray-700 rounded-md`}>
                        <span className={`${data.status.toUpperCase() === 'A' ? 'bg-red-200 text-red-700 p-2 rounded-md' :
                          data.status.toUpperCase() === 'H' ? 'bg-yellow-200 text-yellow-700 p-2 rounded-md' :
                            data.status.toUpperCase() === 'P' ? 'bg-green-200 text-green-700 p-2 rounded-md' :
                              'bg-gray-200 text-gray-700 p-2 rounded-md' 
                        }`}>{formatStatus(data.status)}</span>
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
