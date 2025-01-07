import React, { useState, useEffect } from "react";
import { Search, Calendar, Download, ChevronLeft, ChevronRight } from "lucide-react";
import AdminSideBar from "../component/AdminSidebar";
import AdminHeader from "../component/AdminHeader";
import { format } from 'date-fns';
import { getAllTicket } from '../../commonComponent/Api';  // Ensure this is the correct path to your API file

const AdminTicketQuery = () => {
    // State variables
    const [tickets, setTickets] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [loading, setLoading] = useState(true);  // Loading state for the API call
    const [error, setError] = useState("");  // Error state for API failure

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
            const options = { weekday: "long" };
            const day = now.toLocaleDateString(undefined, options);
            const time = format(now, 'hh:mm:ss a');
            const date = now.toLocaleDateString();
            setCurrentDateTime({ day, time, date });
        };

        updateDateTime();
        const interval = setInterval(updateDateTime, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const fetchTickets = async () => {
            setLoading(true);
            // try {
            //     const response = await getAllTicket();
            //     console.log("response", response); // Log the full response here
                
            //     if (response && response.data) {
            //         setTickets(response.data); // Update state
            //         console.log("Tickets to be set:", response.data); // Log the data to be set
            //     } else {
            //         setError("No tickets found in the response");
            //     }
            // } catch (error) {
            //     setError("Failed to load tickets");
            //     console.error(error);
            // } finally {
            //     setLoading(false);
            // }
            getAllTicket().then((data) => {
                setTickets(data); // Set tickets with the data from the API
                console.log("Tickets have been set:", data); // Optionally log the data
            })
            .catch((error) => {
                setError("Failed to load tickets"); // Handle error
                console.error("Error fetching tickets:", error); // Log the error
            })
            .finally(() => {
                setLoading(false); // Ensure loading is set to false
            });
        };
    
        fetchTickets();
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

    // Filter and search functionality
    const filteredTickets = tickets.filter(ticket => {
        const matchesSearch = searchTerm === "" ||
            Object.values(ticket).some(value =>
                value.toString().toLowerCase().includes(searchTerm.toLowerCase())
            );
        const matchesStatus = statusFilter === "" ||
            ticket.status.toLowerCase() === statusFilter.toLowerCase();
        return matchesSearch && matchesStatus;
    });

    // Pagination calculations
    const totalPages = Math.ceil(filteredTickets.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredTickets.slice(indexOfFirstItem, indexOfLastItem);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

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
                        <div className="flex justify-between items-center p-6">
                            <p className="text-gray-500 font-medium">
                                Welcome back, <span className="text-blue-500">Admin</span>
                            </p>
                            <p className="text-blue-500 font-medium">
                                {currentDateTime.day}, {currentDateTime.time}
                            </p>
                        </div>

                        {/* Search and Filter Row */}
                        <div className="flex gap-4 mb-8">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search by Name, ID, status..."
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

                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-gray-700 text-lg font-bold">Ticket List</h3>
                            <div className="flex items-center gap-4">
                                <span className="text-gray-600">
                                    Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredTickets.length)} of {filteredTickets.length} entries
                                </span>
                                <select
                                    className="p-2 border rounded-lg focus:outline-none focus:border-indigo-500"
                                    value={itemsPerPage}
                                    onChange={(e) => {
                                        setItemsPerPage(Number(e.target.value));
                                        setCurrentPage(1);
                                    }}
                                >
                                    <option value={10}>10 per page</option>
                                    <option value={20}>20 per page</option>
                                    <option value={50}>50 per page</option>
                                </select>
                            </div>
                        </div>

                        {/* Tickets Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="px-4 py-3 text-left text-gray-600 font-medium">Ticket ID</th>
                                        {/* <th className="px-4 py-3 text-left text-gray-600 font-medium">Date</th> */}
                                        <th className="px-4 py-3 text-left text-gray-600 font-medium">Title</th>
                                        {/* <th className="px-4 py-3 text-left text-gray-600 font-medium">Employee</th> */}
                                        <th className="px-4 py-3 text-left text-gray-600 font-medium">Description</th>
                                        <th className="px-4 py-3 text-left text-gray-600 font-medium">Created At</th>
                                        <th className="px-4 py-3 text-left text-gray-600 font-medium">Status</th>
                                        <th className="px-4 py-3 text-left text-gray-600 font-medium">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems.map((ticket, index) => (
                                        <tr key={index} className="border-t hover:bg-gray-50">
                                            <td className="px-4 py-3">{ticket.id}</td>
                                            {/* <td className="px-4 py-3">{ticket.date}</td> */}
                                            <td className="px-4 py-3">{ticket.title}</td>
                                            {/* <td className="px-4 py-3">{ticket.employee}</td> */}
                                            <td className="px-4 py-3">{ticket.description}</td>
                                            <td className="px-4 py-3">{ticket.createdAt}</td>
                                            <td className="px-4 py-3">
                                                <span
                                                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                                                        ticket.status
                                                    )}`}
                                                >
                                                    {ticket.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <select
                                                    className="bg-gray-100 border-gray-300 rounded-md px-2 py-1"
                                                    defaultValue={ticket.status}
                                                >
                                                    <option value="Open">Open</option>
                                                    <option value="Close">Close</option>
                                                    <option value="Pending">Pending</option>
                                                </select>
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
    );
};

export default AdminTicketQuery;
