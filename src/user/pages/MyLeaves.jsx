import React, { useState, useEffect } from "react";
import { Calendar, Download, Search } from "lucide-react";
import UserSideBar from "../components/UserSideBar";
import UserHeader from "../components/UserHeader";

const MyLeaves = () => {
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
      const time = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
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
      <div className="flex-1 p-8 ml-[290px]">
        {/* Header */}
        <UserHeader
          title="User Dashboard"
          avatarSrc="/api/placeholder/35/35"
          showNotification={true}
          showChevron={true}
        />

        {/* My Leaves Content */}
        <section className="bg-white p-8 rounded-lg shadow relative mt-8">
          {/* Welcome Message */}
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600 text-lg">
              Welcome back,{" "}
              <span className="text-blue-500 font-semibold">Aditya</span>
            </p>
            <p className="text-blue-500 font-medium">
              {currentDateTime.day}, {currentDateTime.time}
            </p>
          </div>

          {/* Date */}
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

          {/* Metrics Section */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            {/* Total Casual Leaves */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm flex justify-between items-center">
              <div>
                <p className="text-gray-600 text-lg">Total Casual Leaves</p>
                <h2 className="text-5xl font-bold text-black-500">150</h2>
              </div>
              <Calendar size={48} className="text-blue-400" />
            </div>

            {/* Total Earn Leaves */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm flex justify-between items-center">
              <div>
                <p className="text-gray-600 text-lg">Total Earn Leaves</p>
                <h2 className="text-5xl font-bold text-black-500">4</h2>
              </div>
              <Calendar size={48} className="text-indigo-400" />
            </div>
          </div>

          {/* Leave History */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Leave History</h3>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-100 text-gray-500 text-left">
                    <th className="px-4 py-2">From Date</th>
                    <th className="px-4 py-2">To Date</th>
                    <th className="px-4 py-2">No. of Days</th>
                    <th className="px-4 py-2">Leave Type</th>
                    <th className="px-4 py-2">Reason</th>
                    <th className="px-4 py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Populate table data here */}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MyLeaves;