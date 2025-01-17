import React, { useState, useEffect } from 'react';
import { Search, Calendar, Download } from 'lucide-react';
import { getReimbursements, createReimbursement } from '../../commonComponent/Api';
import UserSideBar from '../components/UserSideBar';
import UserHeader from '../components/UserHeader';
import { useSelector } from "react-redux";

const ReimbursementForm = () => {
    // States from old design
    const [reimbursements, setReimbursements] = useState([]);
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    // States from new design
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('Electronics');
  const user = useSelector((state) => state.auth.user);
    // Fetch reimbursements on component mount
    const fetchReimbursements = async () => {
        setLoading(true);
        try {
            const data = await getReimbursements();
            setReimbursements(data);
        } catch (error) {
            console.error('Error fetching reimbursements:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReimbursements();
    }, []);

    const formatDate = (date) => {
        const d = new Date(date);
        return d.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedFile) {
            alert('Please select a file to upload.');
            return;
        }
        const userData = localStorage.getItem('userData');
        const parsedUserData = JSON.parse(userData);
        const userId = parsedUserData.id;   
        const reimbursementData = {
            category,
            description,
            file: selectedFile,
            userId: userId, // Replace with dynamic value if needed
        };

        try {
            setLoading(true);
            await createReimbursement(reimbursementData);
            alert('Reimbursement created successfully!');
            fetchReimbursements();
            // Reset form
            setDescription('');
            setSelectedFile(null);
            setCategory('Electronics');
        } catch (error) {
            console.error('Error creating reimbursement:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleImageClick = (fileUrl) => {
        if (!fileUrl) return;
        const base64Image = `data:image/jpeg;base64,${fileUrl}`;
        setImagePreview(base64Image);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setImagePreview(null);
    };

    const getStatusStyle = (status) => {
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

    return (
        <div className="flex bg-gray-100 min-h-screen">
            <UserSideBar />
            <div className="flex-1 pl-[16vw]">
                <UserHeader
                    title="User Dashboard"
                    avatarSrc="/api/placeholder/35/35"
                    showNotification={true}
                    showChevron={true}
                />

                <div className="w-full mx-auto p-[3.333vw] bg-white rounded-[0.833vw]">
                    {/* Header Section */}
                    <div className="border-b border-black/20 pb-[3.333vw] mb-[3.333vw]">
                        <div className="flex justify-between items-center mb-[3.333vw]">
                            <div>
                                <span className="text-[#5c606a] text-[1.25vw] font-medium">Welcome back, </span>
                                <span className="text-[#534feb] text-[1.25vw] font-medium">{user.name}</span>
                            </div>
                            <div className="flex items-center gap-[0.208vw]">
                                <div className="text-[#848892] text-[1.25vw] font-medium">
                                    {new Date().toLocaleDateString('en-US', { weekday: 'short' })},
                                </div>
                                <div>
                                    <span className="text-[#848892] text-[1.25vw] font-medium">
                                        {new Date().toLocaleTimeString()}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Search and Filter Section */}
                        <div className="flex gap-[1.25vw]">
                            <div className="flex-1">
                                <div className="flex items-center px-[1.25vw] py-[0.833vw] rounded-[0.625vw] border border-black/20 shadow-sm">
                                    <Search className="w-4 h-4 text-black/40 mr-3" />
                                    <input
                                        type="text"
                                        placeholder="Search by Date, Time, Status..."
                                        className="w-full text-base font-light focus:outline-none"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                            </div>
                            <button className="px-[1.25vw] py-[0.833vw] rounded-[0.625vw] border border-black/20 shadow-sm">
                                Date
                            </button>
                            <button className="px-[1.25vw] py-[0.833vw] rounded-[0.625vw] border border-black/20 shadow-sm flex items-center gap-[0.625vw]">
                                <Calendar className="w-5 h-5" />
                                {new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}
                            </button>
                            <button className="px-[1.25vw] py-[0.833vw] rounded-[0.625vw] border border-black/20 shadow-sm flex items-center gap-[0.625vw]">
                                Export CSV
                                <Download className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Form Section */}
                    <form onSubmit={handleSubmit} className="border-black/10 pb-[2.5vw] mb-[2.5vw]">
                        <div className="grid grid-cols-2 gap-[1.25vw] mb-[1.25vw]">
                            <div>
                                <label className="text-[#5c606a] text-[1.25vw] font-medium block mb-[1.25vw]">Category</label>
                                <select
                                    className="w-full px-[1.25vw] py-[0.833vw] rounded-[0.625vw] border border-black/20 shadow-sm text-black/40"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    <option>Electronics</option>
                                    <option>Other Categories</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-[#5c606a] text-[1.25vw] font-medium block mb-[1.25vw]">Upload Image</label>
                                <div className="p-[0.417vw] rounded-[0.625vw] border border-black/20 shadow-sm flex items-center">
                                    <label className="px-[0.417vw] py-[0.417vw] bg-black/5 rounded-[0.313vw] border border-[#534feb] text-[#534feb] cursor-pointer">
                                        Choose File
                                        <input
                                            type="file"
                                            className="hidden"
                                            onChange={(e) => setSelectedFile(e.target.files[0])}
                                        />
                                    </label>
                                    <span className="ml-[0.625vw] text-black/40">
                                        {selectedFile ? selectedFile.name : 'No file Chosen'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="text-[#5c606a] text-[1.25vw] font-medium block mb-[1.25vw]">Description</label>
                            <textarea
                                className="w-full px-[1.25vw] pt-[0.833vw] pb-[2.5vw] rounded-[0.625vw] border border-black/20 shadow-sm resize-none"
                                placeholder="Write your description here...."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="float-right px-[3.333vw] mt-[0.833vw] py-[0.833vw] bg-[#534feb] text-white text-[1vw] font-medium rounded-[0.417vw]"
                        >
                            {loading ? 'Submitting...' : 'Submit'}
                        </button>
                        
                    </form>
                    <div className='w-[77.552vw] h-[0.052vw] bg-black/20 mt-[2.083vw]'></div>
                    {/* Table Section */}
                    <div className=''> 
                        <h2 className="text-[#5c606a] text-[1.25vw] font-medium p-[0.521vw] mb-[1.25vw]">Last Created</h2>
                        {loading ? (
                            <div className="text-center py-[0.833vw]">Loading...</div>
                        ) : (
                            <>
                                <div className="grid grid-cols-5 gap-[0.417vw] mb-[0.625vw]">
                                    {['Date', 'Category', 'Description', 'Status', 'Files'].map((header) => (
                                        <div key={header} className="px-[1.25vw] py-[1.146vw] bg-neutral-100 rounded-[0.417vw]  text-[#5c606a] text-[1.25vw] font-medium">
                                            {header}
                                        </div>
                                    ))}
                                </div>
                                {reimbursements.length === 0 ? (
                                    <div className="text-center py-[0.833vw]">No records found.</div>
                                ) : (
                                    reimbursements.map((item, index) => (
                                        <div key={index} className="grid grid-cols-5 gap-[0.417vw] border-b border-black/20 mb-0">
                                            <div className="px-[1.25vw] py-[1.146vw]  text-black text-[1.25vw] font-light">
                                                {formatDate(item.createdAt)}
                                            </div>
                                            <div className="px-[1.25vw] py-[1.146vw]  text-black text-[1.25vw] font-light">
                                                {item.category}
                                            </div>
                                            <div className="px-[1.25vw] py-[1.146vw]  text-black text-[1.25vw] font-light">
                                                {item.description}
                                            </div>
                                            <div className="px-[1.25vw] py-[1.146vw]  text-black text-[1.25vw] font-light">
                                                <div className={`px-[0.625vw] py-[0.208vw] rounded-[0.417vw] border inline-block ${getStatusStyle(item.status)}`}>
                                                    {item.status}
                                                </div>
                                            </div>
                                            <div className="px-[1.25vw] py-[1.146vw]  text-black text-[1.25vw] font-light">
                                                <button
                                                    onClick={() => handleImageClick(item.image)}
                                                    className="text-[#534feb] hover:text-[#403bc4]"
                                                >
                                                    View
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Image Preview Modal */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-[1.667vw] rounded-[0.625vw] relative">
                        <button
                            onClick={closeModal}
                            className="absolute top-[0.417vw] right-[0.417vw] text-[1.25vw] text-gray-600 hover:text-gray-800"
                        >
                            &times;
                        </button>
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="max-w-full max-h-[80vh] object-contain"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReimbursementForm;