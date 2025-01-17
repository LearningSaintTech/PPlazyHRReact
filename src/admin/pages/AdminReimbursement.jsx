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

        // Prepend 'data:image/jpeg;base64,' if not already present in the base64 string
        const base64Image = `data:image/jpeg;base64,${fileUrl}`;

        // Set the image preview to the base64 string
        setImagePreview(base64Image);

        // Open the modal to display the image
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
                //console.log("response", response);
                setReimbursements(response); // Assuming API returns data in 'data' field
            } catch (error) {
                console.error("Error fetching reimbursements:", error);
            }
        };

        fetchReimbursements();

        // Update date and time every second
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

    // Pagination calculations
    const totalPages = Math.ceil(filteredTickets.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredTickets.slice(indexOfFirstItem, indexOfLastItem);

    const handleStatusChange = async (reimbursementId, newStatus) => {
        //console.log(">>>>>>>>>>>>>>>",reimbursementId)
        try {
            await updateReimbursementStatus(reimbursementId, newStatus, "admin"); // Assuming the userRole is always 'admin' for this example
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

                        <div className="flex justify-between items-center mb-[1.25vw]">
                            <h3 className="text-gray-700 text-[0.938vw] font-bold">Reimbursement List</h3>
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

                        {/* Updated Table Structure */}
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="px-[0.833vw] py-[0.625vw] text-left text-gray-600 font-medium">Created</th>
                                        <th className="px-[0.833vw] py-[0.625vw] text-left text-gray-600 font-medium">Category</th>
                                        <th className="px-[0.833vw] py-[0.625vw] text-left text-gray-600 font-medium">Description</th>
                                        <th className="px-[0.833vw] py-[0.625vw] text-left text-gray-600 font-medium">Status</th>
                                        <th className="px-[0.833vw] py-[0.625vw] text-left text-gray-600 font-medium">Status</th>
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
                                                <select
                                                    value={ticket.status}
                                                    onChange={(e) => handleStatusChange(ticket.id, e.target.value)}
                                                    className="px-[0.833vw] py-[0.417vw] border rounded-[0.417vw] focus:outline-none focus:border-blue-500"
                                                >
                                                    <option value="open">Open</option>
                                                    <option value="closed">Closed</option>
                                                    <option value="pending">Pending</option>
                                                </select>
                                            </td>

                                            <td>
                                                <button
                                                    className="text-indigo-600 hover:text-indigo-700"
                                                    onClick={() => handleImageClick(ticket.image)} // Assuming 'fileUrl' is the field containing the image URL
                                                >
                                                    View
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

            {/* Image Modal */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-[0.833vw] rounded-[0.417vw] relative">
                        <button
                            onClick={closeModal}
                            className="absolute top-[0.469vw] right-[0.417vw] text-[1.042vw] text-gray-600"
                        >
                            &times;
                        </button>
                        <img
                            src={imagePreview}  // Use base64 encoded image
                            alt="Preview"
                            className="max-w-full max-h-[80vh] object-contain"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminReimbursement;
