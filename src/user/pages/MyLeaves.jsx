import React, { useState, useEffect } from "react";
import { Calendar, Download, Search } from "lucide-react";
import UserSideBar from "../components/UserSideBar";
import UserHeader from "../components/UserHeader";
import { getLeaves } from "../../commonComponent/Api"; // Import your getLeaves function

const MyLeaves = () => {
  const [currentDateTime, setCurrentDateTime] = useState({
    day: "",
    time: "",
    date: "",
  });
  const [leaveHistory, setLeaveHistory] = useState([]); // State to store leave history
  const userId = "2"; // Replace this with actual user ID logic

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

  useEffect(() => {
    // Fetch leave data when the component mounts
    getLeaves(userId)
      .then(response => {
        setLeaveHistory(response); // Update state with the fetched leave history
      })
      .catch(error => {
        console.error("Error fetching leave history:", error);
      });
  }, [userId]);

  // Function to calculate the number of days between two dates
  const calculateDays = (fromDate, toDate) => {
    const start = new Date(fromDate);
    const end = new Date(toDate);
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // Add 1 to include the start day
  };

  // Function to format date into a readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // This will return a readable format like "1/6/2025"
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

        {/* My Leaves Content */}
        <section className="bg-white p-[1.667vw] rounded-[0.417vw] shadow relative mt-[1.667vw]">
          {/* Welcome Message */}
          <div className="flex justify-between items-center mb-[0.833vw]">
            <p className="text-gray-600 text-[0.938vw]">
              Welcome back,{" "}
              <span className="text-blue-500 font-semibold">Aditya</span>
            </p>
            <p className="text-blue-500 font-medium">
              {currentDateTime.day}, {currentDateTime.time}
            </p>
          </div>

          {/* Date */}
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

          {/* Leave History */}
          <div className="bg-gray-50 p-[1.25vw] rounded-[0.417vw] shadow-sm">
            <h3 className="text-[0.938vw] font-semibold text-gray-800 mb-[0.833vw]">Leave History</h3>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-100 text-gray-500 text-left">
                    <th className="px-[0.833vw] py-[0.417vw]">From Date</th>
                    <th className="px-[0.833vw] py-[0.417vw]">To Date</th>
                    <th className="px-[0.833vw] py-[0.417vw]">No. of Days</th>
                    <th className="px-[0.833vw] py-[0.417vw]">Leave Type</th>
                    <th className="px-[0.833vw] py-[0.417vw]">Reason</th>
                    <th className="px-[0.833vw] py-[0.417vw]">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Map over the leaveHistory state to display data */}
                  {leaveHistory.map((leave, index) => (
                    <tr key={index} className="border-b">
                      <td className="px-[0.833vw] py-[0.417vw]">{formatDate(leave.fromDate)}</td>
                      <td className="px-[0.833vw] py-[0.417vw]">{formatDate(leave.toDate)}</td>
                      <td className="px-[0.833vw] py-[0.417vw]">{calculateDays(leave.fromDate, leave.toDate)}</td>
                      <td className="px-[0.833vw] py-[0.417vw]">{leave.leaveType}</td>
                      <td className="px-[0.833vw] py-[0.417vw]">{leave.reason}</td>
                      <td className="px-[0.833vw] py-[0.417vw]">
                        {leave.acceptRejectFlag ? "Accepted" : "Pending"}
                      </td>
                    </tr>
                  ))}
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
