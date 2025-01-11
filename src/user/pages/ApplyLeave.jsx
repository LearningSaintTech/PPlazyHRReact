import React, { useState, useEffect } from "react";
import { Calendar } from "lucide-react";
import UserSideBar from "../components/UserSideBar";
import UserHeader from "../components/UserHeader";
import { applyLeaveAPI } from '../../commonComponent/Api'; // Import the API function for applying leave

const Dashboard = () => {
  const [currentDateTime, setCurrentDateTime] = useState({
    day: "",
    time: "",
    date: "",
  });

  const [leaveDetails, setLeaveDetails] = useState({
    fromDate: "",
    toDate: "",
    reason: "",
    leaveType: "Casual Leave",
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

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeaveDetails({ ...leaveDetails, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    applyLeaveAPI(leaveDetails) // Call the API to apply leave
      .then((response) => {
        if (typeof response === 'string') {
          alert(response); // If the response is a success message string
        } else {
          alert('Leave applied successfully!'); // If response is JSON, show a generic success message
        }
      })
      .catch((error) => {
        console.error(error);
        alert('There was an error applying for leave!');
      });
  };
  
  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <UserSideBar />

      {/* Main Content */}
      <div className="flex-1 p-[1.667vw] ml-[15.104vw]">
        {/* Header */}
        <UserHeader
          title="User Dashboard"
          avatarSrc="/api/placeholder/35/35"
          showNotification={true}
          showChevron={true}
        />

        {/* Dashboard Content */}
        <section className="bg-white p-[1.667vw] rounded-[0.729vw] shadow relative mt-[1.667vw]">
          {/* Welcome Message */}
          <div className="flex justify-between items-center mb-[0.833vw]">
            <p className="text-gray-600 text-lg">
              Welcome back,{" "}
              <span className="text-blue-500 font-semibold">Aditya</span>
            </p>
            <p className="text-blue-500 font-medium">
              {currentDateTime.day}, {currentDateTime.time}
            </p>
          </div>

          {/* Date */}
          <div className="flex justify-end mb-[1.25vw]">
            <div className="flex items-center gap-[0.417vw] px-[0.833vw] py-[0.417vw] border border-gray-300 rounded-[0.729vw]">
              <Calendar size={20} className="text-gray-500" />
              <span className="text-gray-700 font-medium">
                {currentDateTime.date}
              </span>
            </div>
          </div>

          {/* Leave Form */}
          <div className="bg-gray-50 p-[1.25vw] rounded-[0.729vw] shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-[0.833vw]">Apply Leave</h3>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-[1.25vw] mb-[0.833vw]">
                <div>
                  <label className="block text-[0.729vw] font-medium text-gray-600 mb-[0.417vw]">
                    From Date
                  </label>
                  <input
                    type="date"
                    name="fromDate"
                    value={leaveDetails.fromDate}
                    onChange={handleChange}
                    className="w-full p-[0.677vw] border rounded-[0.729vw] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-[0.729vw] font-medium text-gray-600 mb-[0.417vw]">
                    To Date
                  </label>
                  <input
                    type="date"
                    name="toDate"
                    value={leaveDetails.toDate}
                    onChange={handleChange}
                    className="w-full p-[0.677vw] border rounded-[0.729vw] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="mb-[0.833vw]">
                <label className="block text-[0.729vw] font-medium text-gray-600 mb-[0.417vw]">
                  Leave Reason
                </label>
                <textarea
                  name="reason"
                  value={leaveDetails.reason}
                  onChange={handleChange}
                  placeholder="Write your reason here..."
                  className="w-full p-[0.677vw] border rounded-[0.729vw] resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
              </div>
              <div className="mb-[1.25vw]">
                <label className="block text-[0.729vw] font-medium text-gray-600 mb-[0.417vw]">
                  Leave Type
                </label>
                <select
                  name="leaveType"
                  value={leaveDetails.leaveType}
                  onChange={handleChange}
                  className="w-full p-[0.677vw] border rounded-[0.729vw] focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>Casual Leave</option>
                  <option>Earn Leave</option>
                </select>
              </div>
              <div className="flex gap-[0.833vw]">
                <button
                  type="submit"
                  className="px-[1.25vw] py-[0.417vw] bg-blue-600 text-white rounded-[0.729vw] hover:bg-blue-700"
                >
                  Apply Leave
                </button>
                <button
                  type="button"
                  className="px-[1.25vw] py-[0.417vw] bg-gray-300 text-gray-700 rounded-[0.729vw] hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
