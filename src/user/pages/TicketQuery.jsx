import React, { useState, useEffect } from "react";
import { createTicket } from "../../commonComponent/Api"; // Import createTicket function
import { Search, Calendar, Download } from "lucide-react";
import UserSideBar from "../components/UserSideBar";
import UserHeader from "../components/UserHeader";
import { getTickets } from "../../commonComponent/Api"; // import the getTickets API call

const TicketQuery = () => {
    const [tickets, setTickets] = useState([]);
    const [currentDateTime, setCurrentDateTime] = useState({
        day: "",
        time: "",
        date: "",
    });
    const [ticketTitle, setTicketTitle] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [ticketDescription, setTicketDescription] = useState("");
    const getStatusStyles = (status) => {
        switch (status) {
            case 'Open':
                return 'bg-[#e6f5ee] border-[#069855] text-[#069855]';
            case 'Close':
                return 'bg-[#f5e6e6] border-[#d62525] text-[#d62525]';
            case 'Pending':
                return 'bg-[#f5efe6] border-[#ffae00] text-[#ffae00]';
            default:
                return '';
        }
    };

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            const options = { weekday: "long" };
            const day = now.toLocaleDateString(undefined, options);
            const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true });
            const date = now.toLocaleDateString();
            setCurrentDateTime({ day, time, date });
        };

        updateDateTime();
        const interval = setInterval(updateDateTime, 1000);
        return () => clearInterval(interval);
    }, []);

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

    useEffect(() => {
        const userId = 1; // Assuming the user ID is 1, replace with actual user ID
        getTickets(userId).then((data) => setTickets(data)).catch((error) => console.error("Error fetching tickets:", error));
    }, []);
    const userId = 1; // Assuming the user ID is 1, replace with actual user ID

    const handleCreateTicket = () => {
        const newTicket = {
            title: ticketTitle,
            description: ticketDescription,
            userId: userId

        };

        // Call the createTicket API
        createTicket(newTicket)
            .then((response) => {
                // On success, you can update the tickets list or show a success message
                console.log("Ticket created successfully:", response);
                setTickets((prevTickets) => [...prevTickets, response]);
                setTicketTitle(""); // Reset ticket title input
                setTicketDescription(""); // Reset ticket description input
                console.log("newData", tickets)
            })
            .catch((error) => {
                console.error("Error creating ticket:", error);
            });
    };

    return (
        <div className="flex bg-gray-100 min-h-screen">
            {/* Sidebar */}
            <UserSideBar />

            {/* Main Content */}
            <div className="flex-1  pl-[16vw]">
                {/* Header */}
                <UserHeader
                    title="User Dashboard"
                    avatarSrc="/api/placeholder/35/35"
                    showNotification={true}
                    showChevron={true}
                />

                {/* Ticket Management Section */}
                <section className="bg-white p-[1.667vw] rounded-[0.417vw] shadow relative mt-[1.667vw]">
                    <div className="flex justify-between items-center mb-[0.833vw]">
                        <p className="text-gray-600 text-[0.938vw]">
                            Welcome back, <span className="text-blue-500 font-semibold">Aditya</span>
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
                            <span>13 Jan, 2024</span>
                        </div>
                        <button className="flex items-center gap-[0.417vw] px-[0.833vw] py-[0.417vw] text-gray-600 border rounded-[0.417vw] hover:bg-gray-50">
                            <Download size={20} />
                            Export CSV
                        </button>
                    </div>

                    {/* Form Section */}
                    <form className="pb-[2.5vw] border-b border-black/10 flex justify-between items-end">
                        <div className="w-[38.333vw] space-y-6">
                            <div className="space-y-6">
                                <label className="text-[#5c606a] text-[1.25vw] font-medium block">Title</label>
                                <input
                                    type="text"
                                    placeholder="Write your title here...."
                                    className="w-full px-[1.25vw] py-[0.833vw] rounded-[0.625vw] shadow-[4px_4px_40px_-5px_rgba(0,0,0,0.05)] border border-black/20 text-[0.833vw] font-light placeholder:text-black/40"
                                    value={ticketTitle}
                                    onChange={(e) => setTicketTitle(e.target.value)}
                                />
                            </div>

                            <div className="space-y-6">
                                <label className="text-[#5c606a] text-[1.25vw] font-medium block">Description</label>
                                <textarea
                                    placeholder="Write your description here...."
                                    className="w-full px-[1.25vw] pt-[0.833vw] pb-[2.5vw] rounded-[0.625vw] shadow-[4px_4px_40px_-5px_rgba(0,0,0,0.05)] border border-black/20 text-[0.833vw] font-light placeholder:text-black/40 resize-none"
                                    value={ticketDescription}
                                    onChange={(e) => setTicketDescription(e.target.value)}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-[11.406vw] px-[1.667vw] py-[0.938vw] bg-[#534feb] rounded-[0.417vw] text-white text-[1.25vw] font-medium"
                            onClick={handleCreateTicket}
                        >
                            Create Ticket
                        </button>
                    </form>

                    <hr className="mb-[1.667vw]" />

                    {/* Tickets Table Section */}
                    <div className="mt-[3.333vw]">
                        <div className="p-[0.521vw] text-[#5c606a] text-[1.25vw] font-medium mb-[0.938vw]">
                            Last Created
                        </div>

                        <div className="space-y-3">
                            {/* Table Headers */}
                            <div className="flex gap-[0.417vw]">
                                {['Date', 'Title', 'Description', 'Status'].map((header) => (
                                    <div key={header} className="w-[18.75vw] px-[1.25vw] py-[1.146vw] bg-neutral-100 rounded-[0.417vw] shadow-[4px_4px_40px_-5px_rgba(0,0,0,0.05)] border-l-2 text-[#5c606a] text-[1.25vw] font-medium">
                                        {header}
                                    </div>
                                ))}
                            </div>

                            {/* Table Rows */}
                            {tickets.map((ticket) => (
                                <div key={ticket.id} className="flex justify-between border-b border-black/20">
                                    <div className="w-[18.75vw] px-[1.25vw] py-[1.146vw] shadow-[4px_4px_40px_-5px_rgba(0,0,0,0.05)] border-l-2 text-black text-[1.25vw] font-light">
                                        {new Date(ticket.createdAt).toLocaleDateString()}
                                    </div>
                                    <div className="w-[18.75vw] px-[1.25vw] py-[1.146vw] shadow-[4px_4px_40px_-5px_rgba(0,0,0,0.05)] border-l-2 text-black text-[1.25vw] font-light">
                                        {ticket.title}
                                    </div>
                                    <div className="w-[18.75vw] px-[1.25vw] py-[1.146vw] shadow-[4px_4px_40px_-5px_rgba(0,0,0,0.05)] border-l-2 text-black text-[1.25vw] font-light">
                                        {ticket.description}
                                    </div>
                                    <div className="w-[18.75vw] px-[1.25vw] py-[0.781vw] shadow-[4px_4px_40px_-5px_rgba(0,0,0,0.05)] border-l-2">
                                        <div className={`w-[7.188vw] h-[1.875vw] px-[0.625vw] py-[0.208vw] rounded-[0.417vw] border flex items-center ${getStatusStyles(ticket.status)}`}>
                                            <span className="text-[1.25vw] font-light">{ticket.status}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default TicketQuery;
