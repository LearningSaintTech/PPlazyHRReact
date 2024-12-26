import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { Calendar, ChevronLeft, ChevronRight, Search, Download } from "lucide-react";
import AdminSideBar from "../component/AdminSidebar";
import AdminHeader from "../component/AdminHeader";

const AdminCreateEvents = () => {
    const [formData, setFormData] = useState({
        eventName: '',
        description: '',
        fromDate: '',
        toDate: ''
    });

    const [searchTerm, setSearchTerm] = useState('');
    const [dateFilter, setDateFilter] = useState('');

    // Sample event history data
    const generateEventHistory = () => {
        return Array.from({ length: 20 }, (_, i) => ({
            createdAt: '13/01/2024',
            event: `Event ${i + 1}`,
            description: 'This is a sample event description.',
        }));
    };

    const [eventHistory, setEventHistory] = useState(generateEventHistory());
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // State for current date and time
    const [currentDateTime, setCurrentDateTime] = useState({
        day: "Tuesday",
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
    const totalPages = Math.ceil(eventHistory.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = eventHistory.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className="flex bg-gray-100 min-h-screen">
            <AdminSideBar />
            <div className="flex-1 p-8 ml-[290px]">
                <AdminHeader
                    title="Admin Dashboard"
                    avatarSrc="/api/placeholder/35/35"
                    showNotification={true}
                    showChevron={true}
                />

                <div className="p-6">
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        {/* Welcome Section */}
                        <div className="flex justify-between items-center p-6">
                            <p className="text-gray-500 font-medium">
                                Welcome back, <span className="text-blue-500">Admin</span>
                            </p>
                            <p className="text-blue-500 font-medium">
                                {currentDateTime.day}, {currentDateTime.time} {currentDateTime.period}
                            </p>
                        </div>

                        {/* Search and Filter Section */}
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

                        {/* Create Event Form */}
                        <div className="mt-8">
                            {/* <h3 className="text-lg font-bold text-gray-700 mb-6">Create Event</h3> */}
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Event Name
                                    </label>
                                    <input
                                        type="text"
                                        name="eventName"
                                        placeholder="Write your title here..."
                                        value={formData.eventName}
                                        onChange={handleInputChange}
                                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Description
                                    </label>
                                    <textarea
                                        name="description"
                                        placeholder="Write your Reason here...."
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        rows={4}
                                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            From Date/Time
                                        </label>
                                        <input
                                            type="date"
                                            name="fromDate"
                                            value={formData.fromDate}
                                            onChange={handleInputChange}
                                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            To Date/Time
                                        </label>
                                        <input
                                            type="date"
                                            name="toDate"
                                            value={formData.toDate}
                                            onChange={handleInputChange}
                                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-start">
                                    <button
                                        type="submit"
                                        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        Create Event
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Last Created Section */}
                        <div className="mt-8">
                            <h3 className="text-lg font-bold text-gray-700 mb-6">Last Created</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Created At</th>
                                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Event</th>
                                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Description</th>
                                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentItems.map((event, index) => (
                                            <tr key={index} className="border-t">
                                                <td className="px-6 py-4">{event.createdAt}</td>
                                                <td className="px-6 py-4">{event.event}</td>
                                                <td className="px-6 py-4">{event.description}</td>
                                                <td className="px-6 py-4">
                                                    <button className="text-blue-600 hover:text-blue-800">
                                                        Edit
                                                    </button>
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
                                            className={`px-4 py-2 rounded ${currentPage === page
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

export default AdminCreateEvents;