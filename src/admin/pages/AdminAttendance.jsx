import React, { useState, useEffect } from 'react';
import { Search, Calendar, Download } from "lucide-react";
import AdminSideBar from '../component/AdminSidebar';
import AdminHeader from '../component/AdminHeader';

const AdminAttendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      const mockData = [
        { id: 1, date: '12/12/2024', userId: 'PP_01', employee: 'John Doe', clockIn: '09:00 AM', clockOut: '05:00 PM' },
        { id: 2, date: '12/12/2024', userId: 'PP_02', employee: 'Jane Smith', clockIn: '09:15 AM', clockOut: '05:15 PM' },
        { id: 3, date: '12/12/2024', userId: 'PP_03', employee: 'Aditya Kumar', clockIn: '11:15 AM', clockOut: '08:30 PM' },
        { id: 4, date: '12/12/2024', userId: 'PP_04', employee: 'Emily Davis', clockIn: '10:00 AM', clockOut: '06:00 PM' },
      ];
      setAttendanceData(mockData);
    };
    fetchData();
  }, []);

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
                </tr>
              </thead>
              <tbody>
                {attendanceData.map((data, index) => (
                  <tr key={data.id} className="hover:bg-gray-50">
                    <td className="p-4 border-b text-lg text-gray-700">{index + 1}</td>
                    <td className="p-4 border-b text-lg text-gray-700">{data.date}</td>
                    <td className="p-4 border-b text-lg text-gray-700">{data.userId}</td>
                    <td className="p-4 border-b text-lg text-gray-700">{data.employee}</td>
                    <td className="p-4 border-b text-lg text-gray-700">{data.clockIn}</td>
                    <td className="p-4 border-b text-lg text-gray-700">{data.clockOut}</td>
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

export default AdminAttendance;
