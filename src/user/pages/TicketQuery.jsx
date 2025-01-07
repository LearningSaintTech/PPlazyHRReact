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
    const [ticketDescription, setTicketDescription] = useState("");
    const getStatusColor = (status) => {
        switch (status) {
            case 'Open':
                return 'bg-blue-100 text-blue-500'; // Blue for open tickets
            case 'In Progress':
                return 'bg-yellow-100 text-yellow-500'; // Yellow for in-progress tickets
            case 'Closed':
                return 'bg-green-100 text-green-500'; // Green for closed tickets
            default:
                return 'bg-gray-100 text-gray-500'; // Gray for unknown status
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
                console.log("newData",tickets)
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
                    <div className="flex justify-between items-center mb-4">
                        <p className="text-gray-600 text-lg">
                            Welcome back, <span className="text-blue-500 font-semibold">Aditya</span>
                        </p>
                        <p className="text-blue-500 font-medium">
                            {currentDateTime.day}, {currentDateTime.time}
                        </p>
                    </div>

                    <h3 className="text-gray-600 text-lg font-bold mb-6">Manage Tickets</h3>

                    {/* Create Ticket */}
                    <div className="mb-8">
                        <h4 className="text-gray-700 font-bold mb-4">Create New Ticket</h4>
                        <input
                            type="text"
                            placeholder="Write your title here..."
                            className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:border-indigo-500"
                            value={ticketTitle}
                            onChange={(e) => setTicketTitle(e.target.value)}
                        />
                        <textarea
                            placeholder="Write your description here..."
                            className="w-full p-3 border rounded-lg h-24 resize-none focus:outline-none focus:border-indigo-500"
                            value={ticketDescription}
                            onChange={(e) => setTicketDescription(e.target.value)}
                        />
                        <div className="flex justify-end mt-4">
                            <button className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600" onClick={handleCreateTicket}>
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
                                    {tickets.map((ticket) => (
                                        <tr key={ticket.id} className="border-t hover:bg-gray-50">
                                            <td className="px-4 py-3">{new Date(ticket.createdAt).toLocaleDateString()}</td>
                                            <td className="px-4 py-3">{ticket.title}</td>
                                            <td className="px-4 py-3">{ticket.description}</td>
                                            <td className="px-4 py-3">
                                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(ticket.status)}`}>
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
