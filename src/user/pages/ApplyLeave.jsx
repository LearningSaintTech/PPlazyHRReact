import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import UserSideBar from '../components/UserSideBar';
import UserHeader from '../components/UserHeader';
import { applyLeaveAPI } from '../../commonComponent/Api';

const LeaveApplicationForm = () => {
  // State for current date and time
  const [currentDateTime, setCurrentDateTime] = useState({
    day: "",
    time: "",
    date: "",
  });

  // State for form data
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

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeaveDetails(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    applyLeaveAPI(leaveDetails)
      .then((response) => {
        if (typeof response === 'string') {
          alert(response);
        } else {
          alert('Leave applied successfully!');
        }
      })
      .catch((error) => {
        console.error(error);
        alert('There was an error applying for leave!');
      });
  };

  // Handle form cancellation
  const handleCancel = () => {
    setLeaveDetails({
      fromDate: "",
      toDate: "",
      reason: "",
      leaveType: "Casual Leave",
    });
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <UserSideBar />

      {/* Main Content */}
      <div className="flex-1 pl-[16vw]">
        {/* Header */}
        <UserHeader
          title="User Dashboard"
          avatarSrc="/api/placeholder/35/35"
          showNotification={true}
          showChevron={true}
        />

        {/* Main Form Container */}
        <div className="w-full p-[1.667vw] bg-white rounded-[0.417vw] mt-[1.25vw]">
          {/* Header Section */}
          <div className="pb-[1.667vw] border-b border-black/20">
            <div className="flex justify-between items-center mb-[1.25vw]">
              <div className="text-[0.938vw] font-medium">
                <span className="text-[#5c606a]">Welcome back,</span>{' '}
                <span className="text-[#534feb]">Aditya</span>
              </div>
              <div className="flex items-center gap-[0.208vw] text-[0.938vw] font-medium">
                <span className="text-[#848892]">{currentDateTime.day},</span>
                <span className="text-[#848892]">{currentDateTime.time}</span>
              </div>
            </div>

            <div className="flex justify-between items-start">
              <div className="flex gap-[0.833vw]">
                {/* Leave Count Cards */}
                <div className="flex items-center p-[0.833vw] bg-white rounded-[0.417vw] border border-black/20">
                  <div className="flex items-center gap-[0.625vw]">
                    <div className="p-[0.417vw] rounded-[0.313vw] border border-black/20">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <span className="text-[0.729vw] font-light">Total Casual Leaves</span>
                  </div>
                  <span className="ml-[0.625vw] text-[1.875vw] font-medium">150</span>
                </div>

                <div className="flex items-center p-[0.833vw] bg-white rounded-[0.417vw] border border-black/20">
                  <div className="flex items-center gap-[0.625vw]">
                    <div className="p-[0.417vw] rounded-[0.313vw] border border-black/20">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <span className="text-[0.729vw] font-light">Total Earn Leaves</span>
                  </div>
                  <span className="ml-[0.625vw] text-[1.875vw] font-medium">4</span>
                </div>
              </div>

              <div className="flex items-center gap-[0.417vw] px-[0.833vw] py-[0.625vw] bg-white rounded-[0.417vw] border border-black/20">
                <Calendar className="w-5 h-5" />
                <span className="text-[0.729vw] font-light">{currentDateTime.date}</span>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="py-[1.667vw] space-y-8">
            {/* Date Selection */}
            <div className="flex gap-[0.833vw] items-start">
              <div className="w-[15vw] space-y-6">
                <label className="block text-[0.938vw] font-medium text-[#5c606a]">
                  From Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    name="fromDate"
                    value={leaveDetails.fromDate}
                    onChange={handleChange}
                    className="w-full px-[0.833vw] py-[0.625vw] text-[0.729vw] font-light rounded-[0.417vw] border border-black/20 focus:outline-none focus:ring-2 focus:ring-[#534feb]"
                    required
                  />
                  <Calendar className="absolute right-[0.833vw] top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none" />
                </div>
              </div>

              <div className="w-[15vw] space-y-6">
                <label className="block text-[0.938vw] font-medium text-[#5c606a]">
                  To Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    name="toDate"
                    value={leaveDetails.toDate}
                    onChange={handleChange}
                    className="w-full px-[0.833vw] py-[0.625vw] text-[0.729vw] font-light rounded-[0.417vw] border border-black/20 focus:outline-none focus:ring-2 focus:ring-[#534feb]"
                    required
                  />
                  <Calendar className="absolute right-[0.833vw] top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Leave Reason */}
            <div className="space-y-6">
              <label className="block text-[0.938vw] font-medium text-[#5c606a]">
                Leave Reason
              </label>
              <textarea
                name="reason"
                value={leaveDetails.reason}
                onChange={handleChange}
                placeholder="Write your Reason here...."
                className="w-full px-[0.833vw] py-[0.625vw] text-[0.729vw] font-light rounded-[0.417vw] border border-black/20 focus:outline-none focus:ring-2 focus:ring-[#534feb] min-h-28 resize-none"
                required
              />
            </div>

            {/* Leave Type and Buttons */}
            <div className="flex gap-[0.833vw] items-end">
              <div className="w-[15vw] space-y-6">
                <label className="block text-[0.938vw] font-medium text-[#5c606a]">
                  Leave Type
                </label>
                <select
                  name="leaveType"
                  value={leaveDetails.leaveType}
                  onChange={handleChange}
                  className="w-full px-[0.833vw] py-[0.625vw] text-[0.729vw] font-light rounded-[0.417vw] border border-black/20 focus:outline-none focus:ring-2 focus:ring-[#534feb] appearance-none bg-white"
                  required
                >
                  <option value="Casual Leave">Casual Leave</option>
                  <option value="Earn Leave">Earn Leave</option>
                </select>
              </div>

              <div className="flex gap-[0.417vw]">
                <button
                  type="submit"
                  className="px-[1.667vw] py-[0.625vw] text-[0.833vw] font-medium text-white bg-[#534feb] rounded-[0.417vw] hover:bg-[#4338ca] transition-colors"
                >
                  Apply Leave
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-[1.667vw] py-[0.625vw] text-[0.833vw] font-medium text-white bg-[#534feb] rounded-[0.417vw] hover:bg-[#4338ca] transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LeaveApplicationForm;