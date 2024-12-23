import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { Calendar, ChevronLeft, ChevronRight, Search, Download } from "lucide-react";
import AdminSideBar from "../component/AdminSidebar";
import AdminHeader from "../component/AdminHeader";

const ApplyLeave = () => {
    const [formData, setFormData] = useState({
        fromDate: '',
        toDate: '',
        leaveType: '',
        reason: ''
    });

    // Added missing state variables
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    // Sample leave history data
    const generateLeaveHistory = () => {
        return Array.from({ length: 20 }, (_, i) => ({
            fromDate: '13/01/2024',
            toDate: '18/01/2024',
            days: 5,
            leaveType: i % 2 === 0 ? 'CL' : 'EL',
            reason: 'This is for testing.',
            status: i % 3 === 0 ? 'Open' : i % 3 === 1 ? 'Closed' : 'Pending'
        }));
    };

    const [leaveHistory, setLeaveHistory] = useState(generateLeaveHistory());
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // State for current date and time
    const [currentDateTime, setCurrentDateTime] = useState({
        day: "Sunday",
        time: "00:00:00",
        period: "AM"
    });

    // Function to update current date and time
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

    // Pagination calculations
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
            <div className="flex-1 p-8 ml-[290px]">
                <AdminHeader
                    title="Apply Leave"
                    avatarSrc="/api/placeholder/35/35"
                    showNotification={true}
                    showChevron={true}
                />

                <div className="p-6">
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <div className="flex justify-between items-center p-6">
                            <p className="text-gray-500 font-medium">
                                Welcome back, <span className="text-blue-500">Admin</span>
                            </p>
                            <p className="text-blue-500 font-medium">
                                {currentDateTime.day}, {currentDateTime.time} {currentDateTime.period}
                            </p>
                        </div>

                        {/* Search and Filter Row */}
                        <div className="flex gap-4 mb-8">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search by Date, Time, Status ..."
                                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <select
                                className="px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="">Date</option>
                                <option>NA</option>
                                <option>NA</option>
                                <option>NA</option>
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

                        {/* Leave Statistics Cards */}
                        <div className="grid grid-cols-2 gap-6 mb-8">
                            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-blue-100 rounded-lg">
                                        <Calendar className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-sm">Total Casual Leaves</p>
                                        <p className="text-2xl font-bold text-gray-900">150</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-purple-100 rounded-lg">
                                        <Calendar className="w-6 h-6 text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-sm">Total Earn Leaves</p>
                                        <p className="text-2xl font-bold text-gray-900">4</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Apply Leave Form
                        <div className="mt-8">
                            <h3 className="text-lg font-bold text-gray-700 mb-6">Apply Leave</h3>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            From Date
                                        </label>
                                        <input
                                            type="date"
                                            name="fromDate"
                                            value={formData.fromDate}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            To Date
                                        </label>
                                        <input
                                            type="date"
                                            name="toDate"
                                            value={formData.toDate}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Leave Type
                                    </label>
                                    <select
                                        name="leaveType"
                                        value={formData.leaveType}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    >
                                        <option value="">Select Leave Type</option>
                                        <option value="CL">Casual Leave (CL)</option>
                                        <option value="EL">Earned Leave (EL)</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Reason
                                    </label>
                                    <textarea
                                        name="reason"
                                        value={formData.reason}
                                        onChange={handleInputChange}
                                        rows={4}
                                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        Submit Application
                                    </button>
                                </div>
                            </form>
                        </div> */}

                        {/* Leave History Table */}
                        <div className="mt-8">
                            <h3 className="text-lg font-bold text-gray-700 mb-6">Manage Leaves</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-gray-600">From Date</th>
                                            <th className="px-4 py-3 text-left text-gray-600">To Date</th>
                                            <th className="px-4 py-3 text-left text-gray-600">No. of Days</th>
                                            <th className="px-4 py-3 text-left text-gray-600">Leave Type</th>
                                            <th className="px-4 py-3 text-left text-gray-600">Reason</th>
                                            <th className="px-4 py-3 text-left text-gray-600">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentItems.map((leave, index) => (
                                            <tr key={index} className="border-t">
                                                <td className="px-4 py-3">{leave.fromDate}</td>
                                                <td className="px-4 py-3">{leave.toDate}</td>
                                                <td className="px-4 py-3">{leave.days}</td>
                                                <td className="px-4 py-3">{leave.leaveType}</td>
                                                <td className="px-4 py-3">{leave.reason}</td>
                                                <td className="px-4 py-3">
                                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusStyle(leave.status)}`}>
                                                        {leave.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="flex justify-between items-center mt-6">
                                <button
                                    className="px-4 py-2 flex items-center gap-2 text-gray-600 disabled:text-gray-400"
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                >
                                    <ChevronLeft size={20} />
                                    Previous
                                </button>
                                <div className="flex gap-2">
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                        <button
                                            key={page}
                                            className={`px-4 py-2 rounded ${
                                                currentPage === page
                                                    ? 'bg-blue-500 text-white'
                                                    : 'text-gray-600 hover:bg-gray-100'
                                            }`}
                                            onClick={() => setCurrentPage(page)}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                </div>
                                <button
                                    className="px-4 py-2 flex items-center gap-2 text-gray-600 disabled:text-gray-400"
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
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