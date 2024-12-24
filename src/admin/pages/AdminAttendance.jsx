import React, { useState, useEffect } from 'react';
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
          <div className="flex justify-between items-center mb-8">
            <input
              type="text"
              placeholder="Search by Name, ID, Name..."
              className="border rounded p-3 w-1/3 focus:outline-none focus:ring focus:border-indigo-500 text-lg"
            />

            <div className="flex items-center gap-6">
              <select
                className="border rounded p-3 focus:outline-none focus:ring focus:border-indigo-500 text-lg"
              >
                <option value="">All Department</option>
              </select>
              <input
                type="date"
                className="border rounded p-3 focus:outline-none focus:ring focus:border-indigo-500 text-lg"
              />
              <button className="bg-indigo-600 text-white py-3 px-6 rounded shadow hover:bg-indigo-500 text-lg">
                Export CSV
              </button>
            </div>
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
