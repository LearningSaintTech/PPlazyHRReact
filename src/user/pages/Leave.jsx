import React, { useState, useEffect } from "react";
import { Calendar } from "lucide-react";
import UserSideBar from "../components/UserSideBar";
import UserHeader from "../components/UserHeader";

const Dashboard = () => {
  const [currentDateTime, setCurrentDateTime] = useState({
    day: "",
    time: "",
    date: "",
  });

  // Update current date and time every second
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

        {/* Dashboard Content */}
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
          <div className="flex justify-end mb-6">
            <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg">
              <Calendar size={20} className="text-gray-500" />
              <span className="text-gray-700 font-medium">
                {currentDateTime.date}
              </span>
            </div>
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

          {/* Leave Form */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Apply Leave</h3>
            <div className="grid grid-cols-2 gap-6 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  From Date
                </label>
                <input
                  type="date"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  To Date
                </label>
                <input
                  type="date"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Leave Reason
              </label>
              <textarea
                placeholder="Write your reason here..."
                className="w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Leave Type
              </label>
              <select className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Casual Leave</option>
                <option>Earn Leave</option>
              </select>
            </div>
            <div className="flex gap-4">
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Apply Leave
              </button>
              <button className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400">
                Cancel
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>

  );
};

export default Dashboard;
