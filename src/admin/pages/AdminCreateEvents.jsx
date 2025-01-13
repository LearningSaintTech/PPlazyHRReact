import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { Calendar, ChevronLeft, ChevronRight, Search, Download } from "lucide-react";
import AdminSideBar from "../component/AdminSidebar";
import AdminHeader from "../component/AdminHeader";
import { getAllEvents, createEvent } from "../../commonComponent/Api"; // Import API functions

const AdminCreateEvents = () => {
    const [formData, setFormData] = useState({
        title: '',
        notes: '',
        startTime: '',
        endTime: ''
    });

    const [searchTerm, setSearchTerm] = useState('');
    const [dateFilter, setDateFilter] = useState('');
    const [eventHistory, setEventHistory] = useState([]);
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

    // Fetch all events when the component mounts
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const events = await getAllEvents();
                setEventHistory(events);
                console.log("events", eventHistory)
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        fetchEvents();
    }, []);

    // Handle form submission to create an event
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Map the form data to match the required payload format
            const payload = {
                title: formData.title,
                notes: formData.notes,
                startTime: formData.startTime,
                endTime: formData.endTime
            };

            // Call the API to create the event
            await createEvent(payload);

            // After creating an event, refetch the events
            const events = await getAllEvents();
            setEventHistory(events);

            // Reset the form data
            setFormData({
                title: '',
                notes: '',
                startTime: '',
                endTime: ''
            });

        } catch (error) {
            console.error("Error creating event:", error);
        }
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
            <div className="flex-1 p-[1.667vw] ml-[15.104vw]">
                <AdminHeader
                    title="Admin Dashboard"
                    avatarSrc="/api/placeholder/35/35"
                    showNotification={true}
                    showChevron={true}
                />

                <div className="">
                    <div className="bg-white rounded-[0.417vw] shadow-lg p-[1.25vw]">
                        {/* Welcome Section */}
                        <div className="flex justify-between items-center p-[1.25vw]">
                            <p className="text-gray-500 font-medium">
                                Welcome back, <span className="text-blue-500">Admin</span>
                            </p>
                            <p className="text-blue-500 font-medium">
                                {currentDateTime.day}, {currentDateTime.time} {currentDateTime.period}
                            </p>
                        </div>

                        {/* Create Event Form */}
                        <div className="mt-[1.667vw]">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-[0.729vw] font-medium text-gray-700 mb-[0.417vw]">
                                        Event Name
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        placeholder="Write your title here..."
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        className="w-full p-[0.625vw] border rounded-[0.417vw] focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[0.729vw] font-medium text-gray-700 mb-[0.417vw]">
                                        Description
                                    </label>
                                    <textarea
                                        name="notes"
                                        placeholder="Write your Reason here...."
                                        value={formData.notes}
                                        onChange={handleInputChange}
                                        rows={4}
                                        className="w-full p-[0.625vw] border rounded-[0.417vw] focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-[1.25vw]">
                                    <div>
                                        <label className="block text-[0.729vw] font-medium text-gray-700 mb-[0.417vw]">
                                            From Date/Time
                                        </label>
                                        <input
                                            type="datetime-local"
                                            name="startTime"
                                            value={formData.startTime}
                                            onChange={handleInputChange}
                                            className="w-full p-[0.625vw] border rounded-[0.417vw] focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[0.729vw] font-medium text-gray-700 mb-[0.417vw]">
                                            To Date/Time
                                        </label>
                                        <input
                                            type="datetime-local"
                                            name="endTime"
                                            value={formData.endTime}
                                            onChange={handleInputChange}
                                            className="w-full p-[0.625vw] border rounded-[0.417vw] focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-start">
                                    <button
                                        type="submit"
                                        className="px-[1.25vw] py-[0.417vw] bg-blue-500 text-white rounded-[0.417vw] hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        Create Event
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Last Created Section */}
                        <div className="mt-[1.667vw]">
                            <h3 className="text-[0.938vw] font-bold text-gray-700 mb-[1.25vw]">Last Created</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-[1.25vw] py-[0.625vw] text-left text-[0.729vw] font-medium text-gray-600">Created At</th>
                                            <th className="px-[1.25vw] py-[0.625vw] text-left text-[0.729vw] font-medium text-gray-600">Event</th>
                                            <th className="px-[1.25vw] py-[0.625vw] text-left text-[0.729vw] font-medium text-gray-600">Description</th>
                                            <th className="px-[1.25vw] py-[0.625vw] text-left text-[0.729vw] font-medium text-gray-600">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentItems.map((event, index) => (
                                            <tr key={index} className="border-t">
                                                <td className="px-[1.25vw] py-[0.833vw]">{event.startTime ? format(new Date(event.startTime), 'yyyy-MM-dd HH:mm:ss') : "N/A"}</td>
                                                <td className="px-[1.25vw] py-[0.833vw]">{event.title || "Untitled"}</td>
                                                <td className="px-[1.25vw] py-[0.833vw]">{event.notes || "No description available"}</td>
                                                <td className="px-[1.25vw] py-[0.833vw]">
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
                            <div className="flex justify-between items-center mt-[1.25vw]">
                                <button
                                    className="px-[0.833vw] py-[0.417vw] flex items-center gap-[0.417vw] text-gray-600 disabled:text-gray-400"
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                >
                                    <ChevronLeft size={20} />
                                    Previous
                                </button>
                                <div className="flex gap-[0.417vw]">
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                        <button
                                            key={page}
                                            className={`px-[0.833vw] py-[0.417vw] rounded ${currentPage === page
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
                                    className="px-[0.833vw] py-[0.417vw] flex items-center gap-[0.417vw] text-gray-600 disabled:text-gray-400"
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
