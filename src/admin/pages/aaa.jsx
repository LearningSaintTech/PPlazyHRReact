import React, { useState, useEffect } from "react";
import { Search, Calendar, Download, ChevronLeft, ChevronRight } from "lucide-react";
import AdminSideBar from "../component/AdminSidebar";
import AdminHeader from "../component/AdminHeader";
import { format } from 'date-fns';
import { getReimbursements, updateReimbursementStatus } from "../../commonComponent/Api";  // Import the API function

const AdminReimbursement = () => {
    const [reimbursements, setReimbursements] = useState([]); // Store reimbursements data
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    // State for current date and time
    const [currentDateTime, setCurrentDateTime] = useState({
        day: "Sunday",
        time: "00:00:00",
        period: "AM"
    });

    // State for modal and image preview
    const [modalOpen, setModalOpen] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    const handleImageClick = (fileUrl) => {
        if (!fileUrl) {
            console.error('No valid image URL found');
            return;
        }

        const base64Image = `data:image/jpeg;base64,${fileUrl}`;
        setImagePreview(base64Image);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setImagePreview(null);
    };

    // Fetch reimbursement data when component mounts
    useEffect(() => {
        const fetchReimbursements = async () => {
            try {
                const response = await getReimbursements(); // Call the API
                console.log("response", response);
                setReimbursements(response); // Assuming API returns data in 'data' field
            } catch (error) {
                console.error("Error fetching reimbursements:", error);
            }
        };

        fetchReimbursements();

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

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case "open":
                return "bg-green-100 text-green-800";
            case "closed":
                return "bg-red-100 text-red-800";
            case "pending":
                return "bg-yellow-100 text-yellow-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    // Filter and search functionality
    const filteredTickets = reimbursements.filter(ticket => {
        const matchesSearch = searchTerm === "" ||
            Object.values(ticket).some(value =>
                value.toString().toLowerCase().includes(searchTerm.toLowerCase())
            );
        const matchesStatus = statusFilter === "" ||
            ticket.status.toLowerCase() === statusFilter.toLowerCase();
        return matchesSearch && matchesStatus;
    });

    const totalPages = Math.ceil(filteredTickets.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredTickets.slice(indexOfFirstItem, indexOfLastItem);

    const handleStatusChange = async (reimbursementId, newStatus) => {
        try {
            await updateReimbursementStatus(reimbursementId, newStatus, "admin"); // Assuming the userRole is always 'admin' for this example
            console.log(`Status updated to ${newStatus}`);
            setReimbursements(prevState =>
                prevState.map(ticket =>
                    ticket.id === reimbursementId ? { ...ticket, status: newStatus } : ticket
                )
            );
        } catch (error) {
            console.error("Error updating reimbursement status:", error);
        }
    };

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
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="px-[0.833vw] py-[0.625vw] text-left text-gray-600 font-medium">Created</th>
                                        <th className="px-[0.833vw] py-[0.625vw] text-left text-gray-600 font-medium">Category</th>
                                        <th className="px-[0.833vw] py-[0.625vw] text-left text-gray-600 font-medium">Description</th>
                                        <th className="px-[0.833vw] py-[0.625vw] text-left text-gray-600 font-medium">Status</th>
                                        <th className="px-[0.833vw] py-[0.625vw] text-left text-gray-600 font-medium">Action</th>
                                        <th className="px-[0.833vw] py-[0.625vw] text-left text-gray-600 font-medium">Image</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems.map((ticket, index) => (
                                        <tr key={index} className="border-t hover:bg-gray-50">
                                            <td className="px-[0.833vw] py-[0.625vw]">{ticket.createdAt}</td>
                                            <td className="px-[0.833vw] py-[0.625vw]">{ticket.category}</td>
                                            <td className="px-[0.833vw] py-[0.625vw]">{ticket.description}</td>
                                            <td className="px-[0.833vw] py-[0.625vw]">
                                                <span className={`inline-flex px-[0.417vw] py-[0.208vw] text-[0.625vw] font-semibold rounded-full ${getStatusColor(ticket.status)}`}>
                                                    {ticket.status}
                                                </span>
                                            </td>
                                            <td>
                                                <button
                                                    className="text-indigo-600 hover:text-indigo-700"
                                                    onClick={() => handleStatusChange(ticket.id, 'closed')}
                                                >
                                                    Mark as Closed
                                                </button>
                                            </td>
                                            <td>
                                                <button
                                                    className="text-indigo-600 hover:text-indigo-700"
                                                    onClick={() => handleImageClick(ticket.image)}
                                                >
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-[1.667vw] flex justify-between items-center">
                            <button
                                className="flex items-center text-gray-500 hover:text-gray-700"
                                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                            >
                                <ChevronLeft size={20} />
                                <span className="ml-[0.417vw]">Previous</span>
                            </button>
                            <span className="text-sm text-gray-500">
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                className="flex items-center text-gray-500 hover:text-gray-700"
                                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                            >
                                <span className="mr-[0.417vw]">Next</span>
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                {modalOpen && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex items-center justify-center">
                        <div className="bg-white p-[1.25vw] rounded-md w-[80%] max-w-lg">
                            <button
                                className="absolute top-[0.417vw] right-[0.417vw] text-black"
                                onClick={closeModal}
                            >
                                X
                            </button>
                            <img src={imagePreview} alt="Reimbursement Image" className="w-full h-auto" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminReimbursement;
