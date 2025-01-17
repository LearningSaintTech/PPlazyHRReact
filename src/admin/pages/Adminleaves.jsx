import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { Calendar, ChevronLeft, ChevronRight, Search, Download } from "lucide-react";
import AdminSideBar from "../component/AdminSidebar";
import AdminHeader from "../component/AdminHeader";
import { getAllLeaves } from "../../commonComponent/Api";
import { updateLeaveStatus } from "../../commonComponent/Api";  // Ensure the correct path for the updateLeaveStatus function
import DatePicker from 'react-datepicker'; // Importing DatePicker for calendar functionality
import 'react-datepicker/dist/react-datepicker.css'; // Required CSS for DatePicker

const ApplyLeave = () => {
    const [formData, setFormData] = useState({
        fromDate: '',
        toDate: '',
        leaveType: '',
        reason: ''
    });

    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [selectedDate, setSelectedDate] = useState(null); // For calendar date

    const [leaveHistory, setLeaveHistory] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    //const itemsPerPage = 5;

    const [currentDateTime, setCurrentDateTime] = useState({
        day: "Sunday",
        time: "00:00:00",
        period: "AM"
    });

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            const time = format(now, 'HH:mm:ss');
            const period = format(now, 'a');
            const day = format(now, 'EEEE');
            setCurrentDateTime({ day, time, period });
        };

        updateDateTime();
        const interval = setInterval(updateDateTime, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        getAllLeaves()
            .then(response => {
                //console.log("response", response)
                setLeaveHistory(response);
            })
            .catch(error => {
                console.error("Error fetching leave history:", error);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log('Form submitted:', formData);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleStatusChange = async (index, status) => {
        const updatedLeaves = [...leaveHistory];
        let newStatus;

        if (status === 'accepted') {
            newStatus = true;
        } else if (status === 'rejected') {
            newStatus = false;
        } else {
            newStatus = null;
        }

        updatedLeaves[index].acceptRejectFlag = newStatus;
        setLeaveHistory(updatedLeaves);

        try {
            // Call the API to update the status
            const leaveId = updatedLeaves[index].id; // Ensure 'id' exists in your leave data
            const response = await updateLeaveStatus(leaveId, newStatus);
            //console.log("Leave status updated:", response);

            setCurrentPage(1);
        } catch (error) {
            console.error("Error updating leave status:", error);
        }
    };


   // const totalPages = Math.ceil(leaveHistory.length / itemsPerPage);
    //const indexOfLastItem = currentPage * itemsPerPage;
    //const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentItems = leaveHistory
        // .filter(leave => {
        //     // Search by username and selected date
        //     const matchesSearchTerm = leave.username.toLowerCase().includes(searchTerm.toLowerCase());
        //     const matchesDate = selectedDate ? format(new Date(leave.fromDate), 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd') : true;
        //     return matchesSearchTerm && matchesDate;
        // })
        // .slice(indexOfFirstItem, indexOfLastItem);

    const formatDate = (date) => format(new Date(date), 'dd/MM/yyyy');

    const getStatusStyle = (status) => {
        if (status === true) {
            return 'bg-green-100 text-green-800'; // Accepted
        } else if (status === false) {
            return 'bg-red-100 text-red-800'; // Rejected
        }
        return 'bg-yellow-100 text-yellow-800'; // Pending
    };

    return (
        <div className="flex bg-gray-100 min-h-screen">
            <AdminSideBar />
            <div className="flex-1 p-[1.667vw] ml-[15.104vw]">
                <AdminHeader
                    title="Apply Leave"
                    avatarSrc="/api/placeholder/35/35"
                    showNotification={true}
                    showChevron={true}
                />

                <div className="bg-white rounded-[0.417vw] shadow-lg p-[1.25vw]">
                    <div className="flex justify-between items-center p-[1.25vw]">
                        <p className="text-gray-500 font-medium">
                            Welcome back, <span className="text-blue-500">Admin</span>
                        </p>
                        <p className="text-blue-500 font-medium">
                            {currentDateTime.day}, {currentDateTime.time} {currentDateTime.period}
                        </p>
                    </div>

                    <div className="flex gap-[0.833vw] mb-[1.667vw]">
                        <div className="relative flex-1">
                            <Search className="absolute left-[0.625vw] top-[0.625vw] text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search by Username ..."
                                className="w-full pl-[2.083vw] pr-[0.833vw] py-[0.417vw] border rounded-[0.417vw] focus:outline-none focus:border-blue-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center gap-[0.417vw] px-[0.833vw] py-[0.417vw] border rounded-[0.417vw]">
                            <Calendar size={20} className="text-gray-400" />
                            <DatePicker
                                selected={selectedDate}
                                onChange={(date) => setSelectedDate(date)}
                                dateFormat="dd/MM/yyyy"
                                className="w-full p-2 border rounded-[0.417vw]"
                                placeholderText="Select Date"
                            />
                        </div>
                        <button className="flex items-center gap-[0.417vw] px-[0.833vw] py-[0.417vw] text-gray-600 border rounded-[0.417vw] hover:bg-gray-50">
                            <Download size={20} />
                            Export CSV
                        </button>
                    </div>

                    <div className="mt-[1.667vw]">
                        <h3 className="text-[1.25vw] font-bold text-gray-700 mb-[1.25vw]">Manage Leaves</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-[0.833vw] py-[0.625vw] text-left text-gray-600 text-[1.042vw]">User Name</th>
                                        <th className="px-[0.833vw] py-[0.625vw] text-left text-gray-600 text-[1.042vw]">From Date</th>
                                        <th className="px-[0.833vw] py-[0.625vw] text-left text-gray-600 text-[1.042vw]">To Date</th>
                                        <th className="px-[0.833vw] py-[0.625vw] text-left text-gray-600 text-[1.042vw]">No. of Days</th>
                                        <th className="px-[0.833vw] py-[0.625vw] text-left text-gray-600 text-[1.042vw]">Leave Type</th>
                                        <th className="px-[0.833vw] py-[0.625vw] text-left text-gray-600 text-[1.042vw]">Reason</th>
                                        <th className="px-[0.833vw] py-[0.625vw] text-left text-gray-600 text-[1.042vw]">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems.map((leave, index) => (
                                        <tr key={index} className="border-t">
                                            <td className="px-[0.833vw] py-[0.625vw] text-[1.042vw]">{leave.username}</td>
                                            <td className="px-[0.833vw] py-[0.625vw] text-[1.042vw]">{formatDate(leave.fromDate)}</td>
                                            <td className="px-[0.833vw] py-[0.625vw] text-[1.042vw]">{formatDate(leave.toDate)}</td>
                                            <td className="px-[0.833vw] py-[0.625vw] text-[1.042vw]">{leave.duration}</td>
                                            <td className="px-[0.833vw] py-[0.625vw] text-[1.042vw]">{leave.leaveType}</td>
                                            <td className="px-[0.833vw] py-[0.625vw] text-[1.042vw]">{leave.reason}</td>
                                            <td className="px-[0.833vw] py-[0.625vw] text-[1.042vw]">
                                                <select
                                                    className="px-[0.625vw] py-[0.417vw] border rounded-[0.417vw] focus:outline-none"
                                                    value={
                                                        leave.acceptRejectFlag === true
                                                            ? 'accepted'
                                                            : leave.acceptRejectFlag === false
                                                                ? 'rejected'
                                                                : 'pending'
                                                    }
                                                    onChange={(e) => handleStatusChange(index, e.target.value)}
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="accepted">Accepted</option>
                                                    <option value="rejected">Rejected</option>
                                                </select>

                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {/* <div className="mt-[0.833vw] flex justify-center items-center gap-[0.833vw]">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="px-[0.833vw] py-[0.417vw] bg-gray-200 rounded-[0.417vw]"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <span className="text-gray-600">{currentPage} of {totalPages}</span>
                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="px-[0.833vw] py-[0.417vw] bg-gray-200 rounded-[0.417vw]"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApplyLeave;
