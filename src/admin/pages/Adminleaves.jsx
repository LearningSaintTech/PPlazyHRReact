import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { Calendar, ChevronLeft, ChevronRight, Search, Download } from "lucide-react";
import AdminSideBar from "../component/AdminSidebar";
import AdminHeader from "../component/AdminHeader";
import { getAllLeaves } from "../../commonComponent/Api";

const ApplyLeave = () => {
    const [formData, setFormData] = useState({
        fromDate: '',
        toDate: '',
        leaveType: '',
        reason: ''
    });

    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    const [leaveHistory, setLeaveHistory] = useState([]); // Initialized as empty array
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

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
        // Fetch leaves when the component mounts
       
        
        getAllLeaves()
              .then(response => {
                console.log("response",response)
                setLeaveHistory(response); // Update state with the fetched leave history
                console.log("leaveHistory",leaveHistory)

              })
              .catch(error => {
                console.error("Error fetching leave history:", error);
              });
        

              getAllLeaves();
    }, []); // Empty dependency array to fetch data only once when component mounts

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const totalPages = Math.ceil(leaveHistory.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = leaveHistory.slice(indexOfFirstItem, indexOfLastItem);

    const getStatusStyle = (status) => {
        switch (status.toLowerCase()) {
            case 'open':
                return 'bg-green-100 text-green-800';
            case 'closed':
                return 'bg-red-100 text-red-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
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

                <div className="p-[1.25vw]">
                    <div className="bg-white rounded-[0.417vw] shadow-lg p-[1.25vw]">
                        <div className="flex justify-between items-center p-[1.25vw]">
                            <p className="text-gray-500 font-medium">
                                Welcome back, <span className="text-blue-500">Admin</span>
                            </p>
                            <p className="text-blue-500 font-medium">
                                {currentDateTime.day}, {currentDateTime.time} {currentDateTime.period}
                            </p>
                        </div>

                        {/* Search and Filter Row */}
                        <div className="flex gap-[0.833vw] mb-[1.667vw]">
                            <div className="relative flex-1">
                                <Search className="absolute left-[0.625vw] top-[0.625vw] text-gray-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search by Date, Time, Status ..."
                                    className="w-full pl-[2.083vw] pr-[0.833vw] py-[0.417vw] border rounded-[0.417vw] focus:outline-none focus:border-blue-500"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <select
                                className="px-[0.833vw] py-[0.417vw] border rounded-[0.417vw] focus:outline-none focus:border-blue-500"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="">Date</option>
                                <option>NA</option>
                                <option>NA</option>
                                <option>NA</option>
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

                        {/* Leave Statistics Cards */}
                        <div className="grid grid-cols-2 gap-[1.25vw] mb-[1.667vw]">
                            <div className="bg-white p-[1.25vw] rounded-[0.417vw] border border-gray-200 shadow-sm">
                                <div className="flex items-center gap-[0.833vw]">
                                    <div className="p-[0.625vw] bg-blue-100 rounded-[0.417vw]">
                                        <Calendar className="w-[1.25vw] h-[1.25vw] text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-[0.729vw]">Total Casual Leaves</p>
                                        <p className="text-[1.25vw] font-bold text-gray-900">150</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white p-[1.25vw] rounded-[0.417vw] border border-gray-200 shadow-sm">
                                <div className="flex items-center gap-[0.833vw]">
                                    <div className="p-[0.625vw] bg-purple-100 rounded-[0.417vw]">
                                        <Calendar className="w-[1.25vw] h-[1.25vw] text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-[0.729vw]">Total Earn Leaves</p>
                                        <p className="text-[1.25vw] font-bold text-gray-900">4</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-[1.667vw]">
                            <h3 className="text-[0.417vw] font-bold text-gray-700 mb-[1.25vw]">Manage Leaves</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
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
                                                <td className="px-[0.833vw] py-[0.625vw] text-[1.042vw]">{leave.fromDate}</td>
                                                <td className="px-[0.833vw] py-[0.625vw] text-[1.042vw]">{leave.toDate}</td>
                                                <td className="px-[0.833vw] py-[0.625vw] text-[1.042vw]">{leave.duration}</td>
                                                <td className="px-[0.833vw] py-[0.625vw] text-[1.042vw]">{leave.leaveType}</td>
                                                <td className="px-[0.833vw] py-[0.625vw] text-[1.042vw]">{leave.reason}</td>
                                                <td className="px-[0.833vw] py-[0.625vw] text-[1.042vw]">
                                                    <span className={`inline-flex px-[0.417vw] py-[0.208vw] text-xs font-semibold rounded-full ${getStatusStyle(leave.acceptRejectFlag ? "open" : "closed")}`}>
                                                        {leave.acceptRejectFlag ? 'Accepted' : 'Rejected'}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="mt-[0.833vw] flex justify-center items-center gap-[0.833vw]">
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApplyLeave;
