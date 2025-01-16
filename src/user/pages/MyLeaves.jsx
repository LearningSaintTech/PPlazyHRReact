import React, { useState, useEffect } from "react";
import { Search, Calendar, Download } from "lucide-react";
import UserSideBar from "../components/UserSideBar";
import UserHeader from "../components/UserHeader";
import { getLeaves } from "../../commonComponent/Api";

const LeaveManagementDashboard = () => {
  const [currentDateTime, setCurrentDateTime] = useState({
    day: "",
    time: "",
    date: "",
  });
  const [leaveHistory, setLeaveHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [action, setAction] = useState("pending"); // Default to "Pending"
  const [loading, setLoading] = useState(true);

  const userId = "2"; // Replace with dynamic user ID as needed

  // Update Date and Time
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

  // Fetch Leaves
  useEffect(() => {
    setLoading(true);
    getLeaves(userId)
      .then((response) => {
        console.log("Leave History from API:", response); // Debug Log
        setLeaveHistory(response);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching leave history:", error);
        setLoading(false);
      });
  }, [userId]);

  // Calculate Total Days
  const calculateDays = (fromDate, toDate) => {
    const start = new Date(fromDate);
    const end = new Date(toDate);
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  // Format Date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Get Status Styling
  const getStatusStyle = (status) => {
    if (status === true) return "bg-[#e6f5ee] text-[#069855] border-[#069855]";
    if (status === false) return "bg-[#f5e6e6] text-[#d62525] border-[#d62525]";
    return "bg-[#f5efe6] text-[#ffae00] border-[#ffae00]";
  };

  // Get Status Text
  const getStatusText = (status) => {
    if (status === true) return "Approved";
    if (status === false) return "Rejected";
    return "Pending";
  };

  // Filter Leaves
  const filteredLeaves = leaveHistory.filter((leave) => {
    const matchesSearch =
      leave.leaveType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      leave.reason?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      leave.fromDate?.includes(searchTerm) ||
      leave.toDate?.includes(searchTerm);

    const matchesAction =
      action === "" ||
      (action === "pending" && leave.acceptRejectFlag === null) ||
      (action === "accepted" && leave.acceptRejectFlag === true) ||
      (action === "rejected" && leave.acceptRejectFlag === false);

    return matchesSearch && matchesAction;
  });

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <UserSideBar />

      {/* Main Content */}
      <div className="flex-1 ml-[16vw]">
        {/* Header */}
        <UserHeader
          title="User Dashboard"
          avatarSrc="/api/placeholder/35/35"
          showNotification={true}
          showChevron={true}
        />

        <div className="w-full bg-white p-16">
          {/* Header Section */}
          <div className="border-b border-black/20 pb-16 mb-14">
            <div className="flex justify-between items-center mb-12">
              <div>
                <span className="text-[#5c606a] text-2xl font-medium">Welcome back, </span>
                <span className="text-[#534feb] text-2xl font-medium">Aditya</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[#848892] text-2xl font-medium">
                  {currentDateTime.day},{" "}
                </span>
                <span className="text-[#848892] text-2xl font-medium">
                  {currentDateTime.time}
                </span>
              </div>
            </div>

            {/* Search and Filter Section */}
            <div className="flex gap-6 mb-12">
              <div className="flex-1 max-w-md">
                <div className="flex items-center px-6 py-4 border border-black/20 rounded-xl shadow-sm">
                  <Search className="w-5 h-5 text-gray-400 mr-2" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by Date, Time, Status..."
                    className="w-full text-base font-light focus:outline-none"
                  />
                </div>
              </div>
              <select
                className="px-6 py-4 border border-black/20 rounded-xl shadow-sm"
                value={action}
                onChange={(e) => setAction(e.target.value)}
              >
                <option value="">Action</option>
                <option value="pending">Pending</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
              </select>
              <button className="px-6 py-4 border border-black/20 rounded-xl shadow-sm flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{currentDateTime.date}</span>
              </button>
              <button className="px-6 py-4 border border-black/20 rounded-xl shadow-sm flex items-center gap-2">
                <Download className="w-5 h-5" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>

          {/* Leave Applications Table */}
          <div>
            <h2 className="text-[#5c606a] text-2xl font-medium mb-6">
              Last Applied
            </h2>
            <div className="border-b border-black/20">
              <div className="grid grid-cols-6 gap-2 mb-3">
                {["From Date", "To Date", "No. of Days", "Leave Type", "Reason", "Status"].map(
                  (header) => (
                    <div
                      key={header}
                      className="bg-neutral-100 px-6 py-[22px] rounded-lg text-[#5c606a] text-2xl font-medium"
                    >
                      {header}
                    </div>
                  )
                )}
              </div>

              {loading ? (
                <div className="text-center py-8">Loading...</div>
              ) : (
                filteredLeaves.map((leave, index) => (
                  <div
                    key={leave.id || index}
                    className="grid grid-cols-6 gap-2 border-b border-black/20 py-4"
                  >
                    <div className="px-4 text-2xl font-light">{formatDate(leave.fromDate)}</div>
                    <div className="px-4 text-2xl font-light">{formatDate(leave.toDate)}</div>
                    <div className="px-4 text-2xl font-light">{calculateDays(leave.fromDate, leave.toDate)}</div>
                    <div className="px-4 text-2xl font-light">{leave.leaveType}</div>
                    <div className="px-4 text-2xl font-light">{leave.reason}</div>
                    <div className="px-4">
                      <span
                        className={`px-3 py-1 rounded-lg border ${getStatusStyle(
                          leave.acceptRejectFlag
                        )} text-2xl font-light`}
                      >
                        {getStatusText(leave.acceptRejectFlag)}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveManagementDashboard;
