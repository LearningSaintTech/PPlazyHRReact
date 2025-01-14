import React, { useState } from "react";
import UserSideBar from "../components/UserSideBar";
import UserHeader from "../components/UserHeader";
import { Download, X, Search, Calendar } from "lucide-react"; 
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; 

const Payroll = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [password, setPassword] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    // Example file password (for simplicity)
    const correctPassword = "RAMU234"; // Update dynamically as needed

    const payrolls = [
        { id: 1, date: "10-May-2024", fileName: "Document.pdf" },
        { id: 2, date: "10-Jun-2024", fileName: "Document.pdf" },
        { id: 3, date: "10-Jul-2024", fileName: "Document.pdf" },
        { id: 4, date: "10-Aug-2024", fileName: "Document.pdf" },
        { id: 5, date: "10-Sep-2024", fileName: "Document.pdf" },
        { id: 6, date: "10-Oct-2024", fileName: "Document.pdf" },
        { id: 7, date: "10-Oct-2024", fileName: "Document.pdf" },
        { id: 8, date: "10-Oct-2024", fileName: "Document.pdf" },
        { id: 9, date: "10-Oct-2024", fileName: "Document.pdf" },
        { id: 10, date: "10-Oct-2024", fileName: "Document.pdf" },
        { id: 11, date: "10-Oct-2024", fileName: "Document.pdf" },
        { id: 12, date: "10-Oct-2024", fileName: "Document.pdf" },
        { id: 13, date: "10-Oct-2024", fileName: "Document.pdf" },
    ];

    // Opens the pop-up and sets the file to download
    const handleDownloadClick = (file) => {
        setSelectedFile(file);
        setIsModalOpen(true);
    };

    // Closes the pop-up
    const closeModal = () => {
        setIsModalOpen(false);
        setPassword("");
    };

    // Validates password and triggers download
    const handlePasswordSubmit = () => {
        if (password === correctPassword) {
            alert(`File ${selectedFile} will download now!`);
            // Simulate file download
            const link = document.createElement("a");
            link.href = `/path/to/files/${selectedFile}`;
            link.download = selectedFile;
            link.click();

            closeModal();
        } else {
            alert("Incorrect Password! Please try again.");
        }
    };

    // Toggle Password Visibility
    const togglePasswordVisibility = () => {
        setIsPasswordVisible((prev) => !prev);
    };

    return (
        <div className="flex bg-gray-100 min-h-screen">
            {/* Sidebar */}
            <UserSideBar />

            {/* Main Content */}
            <div className="flex-1 ml-[16vw]">
                {/* Header */}
                <UserHeader title="Payroll Dashboard" />

                {/* Payroll Section */}
                <section className="bg-white p-[1.667vw] rounded-[0.417vw] shadow relative mt-[1.667vw]">
                    {/* Welcome Message */}
                    <div className="flex justify-between items-center mb-[0.833vw]">
                        <p className="text-gray-600 text-[0.938vw]">
                            Welcome back,{" "}
                            <span className="text-blue-500 font-semibold">Aditya</span>
                        </p>
                        <p className="text-blue-500 font-medium">
                        </p>
                    </div>

                    {/* Search & Filter  */}
                    <div className="flex gap-[0.833vw] mb-[1.667vw]">
                        <div className="relative flex-1">
                            <Search className="absolute left-[0.625vw] top-[0.625vw] text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search by Name, ID, status..."
                                className="w-full pl-[2.083vw] pr-[0.833vw] py-[0.417vw] border rounded-[0.417vw] focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <select
                            className="px-[0.833vw] py-[0.417vw] border rounded-[0.417vw] focus:outline-none focus:border-blue-500"
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


                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="px-[0.833vw] py-[0.417vw] text-left text-gray-600 font-medium">Serial No.</th>
                                    <th className="px-[0.833vw] py-[0.417vw] text-left text-gray-600 font-medium">Date</th>
                                    <th className="px-[0.833vw] py-[0.417vw] text-left text-gray-600 font-medium">Slip Name</th>
                                    <th className="px-[0.833vw] py-[0.417vw] text-left text-gray-600 font-medium">Get Your Slip</th>
                                </tr>
                            </thead>
                            <tbody>
                                {payrolls.map((payroll, index) => (
                                    <tr key={payroll.id} className="border-t hover:bg-gray-50">
                                        <td className="px-[0.833vw] py-[0.625vw]">{String(index + 1).padStart(2, "0")}</td>
                                        <td className="px-[0.833vw] py-[0.625vw]">{payroll.date}</td>
                                        <td className="px-[0.833vw] py-[0.625vw] flex items-center gap-[0.417vw]">
                                            <img
                                                src="https://img.icons8.com/color/20/fa314a/pdf.png"
                                                alt="PDF Icon"
                                            />
                                            {payroll.fileName}
                                        </td>
                                        <td className="px-[0.833vw] py-[0.625vw]">
                                            <button
                                                className="bg-blue-600 text-white px-[0.833vw] py-[0.417vw] rounded-[0.417vw] flex items-center gap-[0.417vw] hover:bg-blue-700"
                                                onClick={() => handleDownloadClick(payroll.fileName)}
                                            >
                                                <Download size={16} />
                                                Download
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Password Confirmation Pop-up */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-[1.667vw] rounded-[0.417vw] shadow-lg relative w-[20vw]">
                            <button
                                onClick={closeModal}
                                className="absolute top-[0.833vw] right-[0.833vw] text-gray-500 hover:text-gray-800"
                            >
                                <X size={20} />
                            </button>
                            <h2 className="text-[1.042vw] font-semibold mb-[0.833vw]">Confirm Password</h2>

                            {/* Password Input with Show/Hide */}
                            <div className="relative">
                                <input
                                    type={isPasswordVisible ? "text" : "password"}
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full p-[0.625vw] border rounded-[0.417vw] pr-[2.083vw] focus:outline-none focus:border-indigo-500"
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute right-[0.625vw] top-[0.625vw] text-gray-500 hover:text-gray-700"
                                >
                                    {isPasswordVisible ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                                </button>
                            </div>

                            <p className="text-gray-500 text-[0.729vw] mt-[0.833vw] mb-[0.833vw]">
                                Your password is a combination of your <i>first four letters</i> of your name and the last three digits of your <i>Aadhar</i>.
                                Eg. <span className="text-blue-500 font-semibold">RAMU123</span>
                            </p>

                            <button
                                onClick={handlePasswordSubmit}
                                className="w-full bg-blue-600 text-white p-[0.625vw] rounded-[0.417vw] hover:bg-blue-700"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Payroll;
