import React, { useState, useEffect } from "react";
import { Search, Calendar, Download, ChevronLeft, ChevronRight } from "lucide-react";
import AdminSideBar from "../component/AdminSidebar";
import AdminHeader from "../component/AdminHeader";
import { format } from "date-fns";
import { getAllTicket, updateTicketStatus } from "../../commonComponent/Api";

const AdminTicketQuery = () => {
    // State variables
    const [tickets, setTickets] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedDate, setSelectedDate] = useState('');
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
            const time = format(now, "hh:mm:ss a");
            const date = now.toLocaleDateString();
            setCurrentDateTime({ day, time, date });
        };

        updateDateTime();
        const interval = setInterval(updateDateTime, 1000);

        return () => clearInterval(interval);
    }, []);
    const exportToCSV = () => {
        // Create CSV header
        const headers = ["Ticket ID", "Title", "Description", "Created At", "Status"];
        
        // Convert ticket data to CSV rows based on filtered tickets
        const rows = filteredTickets.map((ticket) => [
            ticket.id,
            ticket.title,
            ticket.description,
            formatDate(ticket.createdAt),
            ticket.status,
        ]);
    
        // Combine headers and rows into a single string
        const csvContent = [
            headers.join(","),
            ...rows.map(row => row.join(",")),
        ].join("\n");
    
        // Create a Blob and trigger a download
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "tickets.csv"; // Set the file name
        link.click();
    };
    
    
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toISOString().split('T')[0]; // This will return date in YYYY-MM-DD format
    };

    const formatTime = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true, // Use false for 24-hour format
        }).format(date);
    };
    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };
    // Fetch tickets from API
    useEffect(() => {
        const fetchTickets = async () => {
            setLoading(true);
            try {
                const data = await getAllTicket();
                console.log("data", data)
                setTickets(data);
            } catch (error) {
                setError("Failed to load tickets");
                console.error("Error fetching tickets:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTickets();
    }, []);

    // Get status color
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

    // Filter tickets based on search term and status filter
    // Filter tickets based on search term and status filter
    const filteredTickets = tickets.filter((ticket) => {
        const dateMatch = selectedDate ? formatDate(ticket.createdAt) === selectedDate : true;



        const matchesSearch =
            searchTerm === "" ||
            Object.values(ticket).some((value) =>
                value.toString().toLowerCase().includes(searchTerm.toLowerCase())
            );
        const matchesStatus =
            statusFilter === "" ||
            ticket.status.toLowerCase() === statusFilter.toLowerCase();

        return matchesSearch && matchesStatus && dateMatch;
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
            <div className="flex-1 p-[1.667vw] ml-[15.104vw]">
                <AdminHeader
                    title="Admin Dashboard"
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
                                {currentDateTime.day}, {currentDateTime.time}
                            </p>
                        </div>

                        {/* Search and Filter Row */}
                        <div className="flex gap-[0.833vw] mb-[1.667vw]">
                            <div className="relative flex-1">
                                <Search className="absolute left-[0.625vw] top-[0.625vw] text-gray-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search by Name, ID, status..."
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
                                <option value="">Action</option>
                                <option value="open">Open</option>
                                <option value="closed">Closed</option>
                                <option value="pending">Pending</option>
                            </select>
                            <div className="flex items-center gap-[0.417vw] px-[0.833vw] py-[0.417vw] border rounded-[0.417vw]">
                                <Calendar size={20} className="text-gray-400" />
                                <input
                                    type="date"
                                    className="w-full border px-4 py-2 rounded-lg"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                />
                            </div>
                            <button
                                className="flex items-center gap-[0.417vw] px-[0.833vw] py-[0.417vw] text-gray-600 border rounded-[0.417vw] hover:bg-gray-50"
                                onClick={exportToCSV}
                            >
                                <Download size={20} />
                                Export CSV
                            </button>

                        </div>

                        <div className="flex justify-between items-center mb-[1.25vw]">
                            <h3 className="text-gray-700 text-[0.938vw] font-bold">Ticket List</h3>
                            <div className="flex items-center gap-[0.833vw]">
                                <span className="text-gray-600">
                                    Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredTickets.length)} of {filteredTickets.length} entries
                                </span>
                                <select
                                    className="p-[0.417vw] border rounded-[0.417vw] focus:outline-none focus:border-indigo-500"
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
                                        <th className="px-[0.833vw] py-[0.625vw] text-left text-gray-600 font-medium">Ticket ID</th>
                                        <th className="px-[0.833vw] py-[0.625vw] text-left text-gray-600 font-medium">Title</th>
                                        <th className="px-[0.833vw] py-[0.625vw] text-left text-gray-600 font-medium">Description</th>
                                        <th className="px-[0.833vw] py-[0.625vw] text-left text-gray-600 font-medium">Created At</th>
                                        <th className="px-[0.833vw] py-[0.625vw] text-left text-gray-600 font-medium">Status</th>
                                        <th className="px-[0.833vw] py-[0.625vw] text-left text-gray-600 font-medium">Action</th>
                                    </tr>
                                </thead>                        <tbody>
                                    {currentItems.map((ticket, index) => (
                                        <tr key={index} className="border-t hover:bg-gray-50">
                                            <td className="px-[0.833vw] py-[0.625vw]">{ticket.id}</td>
                                            <td className="px-[0.833vw] py-[0.625vw]">{ticket.title}</td>
                                            <td className="px-[0.833vw] py-[0.625vw]">{ticket.description}</td>
                                            <td className="px-[0.833vw] py-[0.625vw]">{formatDate(ticket.createdAt)}</td>
                                            <td className="px-[0.833vw] py-[0.625vw]">
                                                <span
                                                    className={`inline-flex px-[0.417vw] py-[0.208vw] text-[0.625vw] font-semibold rounded-full ${getStatusColor(
                                                        ticket.status
                                                    )}`}
                                                >
                                                    {ticket.status}
                                                </span>
                                            </td>
                                            <td className="px-[0.833vw] py-[0.625vw]">
                                                <select
                                                    className="bg-gray-100 border-gray-300 rounded-[0.313vw] px-[0.417vw] py-[0.208vw]"
                                                    value={ticket.status} // Use current status value
                                                    onChange={async (e) => {
                                                        const newStatus = e.target.value;
                                                        // Call the updateTicketStatus function when status is changed
                                                        try {
                                                            await updateTicketStatus(ticket.id, newStatus);
                                                            // Optionally update the status locally after the API call
                                                            setTickets(prevTickets =>
                                                                prevTickets.map(t =>
                                                                    t.id === ticket.id ? { ...t, status: newStatus } : t
                                                                )
                                                            );
                                                        } catch (error) {
                                                            console.error("Error updating ticket status:", error);
                                                        }
                                                    }}
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
                        <div className="flex justify-between items-center mt-[1.25vw]">
                            <button
                                className="px-[0.833vw] py-[0.417vw] flex items-center gap-[0.417vw] text-gray-600 disabled:text-gray-400"
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                            >
                                <ChevronLeft size={20} />
                                Previous
                            </button>
                            <div className="flex gap-[0.417vw]">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <button
                                        key={page}
                                        className={`px-[0.833vw] py-[0.417vw] rounded ${currentPage === page
                                            ? "bg-blue-500 text-white"
                                            : "text-gray-600 hover:bg-gray-100"
                                            }`}
                                        onClick={() => setCurrentPage(page)}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>
                            <button
                                className="px-[0.833vw] py-[0.417vw] flex items-center gap-[0.417vw] text-gray-600 disabled:text-gray-400"
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
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
