import React, { useState, useEffect } from "react";
import { Search, Calendar, Download } from "lucide-react";
import UserSideBar from "../components/UserSideBar";
import UserHeader from "../components/UserHeader";

const TicketQuery = () => {
    const [tickets, setTickets] = useState([
        { date: "13/01", title: "Testing", description: "I am testing.", status: "Open" },
        { date: "13/01", title: "Testing", description: "I am testing.", status: "Close" },
        { date: "13/01", title: "Testing", description: "I am testing.", status: "Pending" },
    ]);

    // State for current date and time
    const [currentDateTime, setCurrentDateTime] = useState({
        day: "",
        time: "",
        date: "",
    });

    // Function to update current date and time
    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            const options = { weekday: "long" }; // Get full day name
            const day = now.toLocaleDateString(undefined, options);
            const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true });
            const date = now.toLocaleDateString(); // Format: DD/MM/YYYY
            setCurrentDateTime({ day, time, date });
        };

        // Update every second
        updateDateTime();
        const interval = setInterval(updateDateTime, 1000);

        return () => clearInterval(interval);
    }, []);

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case "open":
                return "bg-green-100 text-green-800";
            case "close":
                return "bg-red-100 text-red-800";
            case "pending":
                return "bg-yellow-100 text-yellow-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

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

                {/* Ticket Management Section */}
                <section className="bg-white p-8 rounded-lg shadow relative mt-8">

                    {/* Welcome Message and Current Day-Time */}
                    <div className="flex justify-between items-center mb-4">
                        <p className="text-gray-600 text-lg">
                            Welcome back, <span className="text-blue-500 font-semibold">Aditya</span>
                        </p>
                        <p className="text-blue-500 font-medium">
                            {currentDateTime.day}, {currentDateTime.time}
                        </p>
                    </div>

                    <h3 className="text-gray-600 text-lg font-bold mb-6">Manage Tickets</h3>

                    {/* Search and Filter */}
                    <div className="flex gap-6 mb-8">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                placeholder="Search by Date, Title, Status"
                                className="w-full p-3 border rounded-lg focus:outline-none focus:border-indigo-500"
                            />
                            <Search className="absolute right-3 top-3 text-gray-400" size={20} />
                        </div>
                        <input
                            type="date"
                            className="p-3 border rounded-lg focus:outline-none focus:border-indigo-500"
                        />
                        <button className="flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            <Download size={20} />
                            Export CSV
                        </button>
                    </div>

                    {/* Create Ticket */}
                    <div className="mb-8">
                        <h4 className="text-gray-700 font-bold mb-4">Create New Ticket</h4>
                        <input
                            type="text"
                            placeholder="Write your title here..."
                            className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:border-indigo-500"
                        />
                        <textarea
                            placeholder="Write your description here..."
                            className="w-full p-3 border rounded-lg h-24 resize-none focus:outline-none focus:border-indigo-500"
                        />
                        <div className="flex justify-end mt-4">
                            <button className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                                Create Ticket
                            </button>
                        </div>
                    </div>

                    <hr className="mb-8" />

                    {/* Tickets Table */}
                    <div>
                        <h4 className="text-gray-700 font-bold mb-4">Recent Tickets</h4>
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="px-4 py-2 text-left text-gray-600 font-medium">Date</th>
                                        <th className="px-4 py-2 text-left text-gray-600 font-medium">Title</th>
                                        <th className="px-4 py-2 text-left text-gray-600 font-medium">Description</th>
                                        <th className="px-4 py-2 text-left text-gray-600 font-medium">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tickets.map((ticket, index) => (
                                        <tr key={index} className="border-t hover:bg-gray-50">
                                            <td className="px-4 py-3">{ticket.date}</td>
                                            <td className="px-4 py-3">{ticket.title}</td>
                                            <td className="px-4 py-3">{ticket.description}</td>
                                            <td className="px-4 py-3">
                                                <span
                                                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                                                        ticket.status
                                                    )}`}
                                                >
                                                    {ticket.status}
                                                </span>
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

export default TicketQuery;
