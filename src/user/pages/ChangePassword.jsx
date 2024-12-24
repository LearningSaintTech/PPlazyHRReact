import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // For show/hide password icons
import { X } from "lucide-react"; // For close button icon

const ChangePassword = () => {
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const modalRef = useRef(null);
    const navigate = useNavigate();

    // Function to handle click outside the modal
    const handleClickOutside = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            navigate(-1); // Redirects to the previous page
        }
    };

    // Add the event listener for clicks on the entire document
    React.useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div
                className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative"
                ref={modalRef} // Attach the ref to the modal
            >
                {/* Close Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                >
                    <X size={20} />
                </button>

                <h2 className="text-gray-700 font-semibold mb-6 text-xl text-center">
                    Change Password
                </h2>

                {/* Old Password */}
                <div className="mb-4 relative">
                    <label className="block text-gray-600 mb-2">Old Password</label>
                    <input
                        type={showOldPassword ? "text" : "password"}
                        placeholder="Password"
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={() => setShowOldPassword(!showOldPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    >
                        {showOldPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                    </button>
                </div>

                {/* New Password */}
                <div className="mb-4 relative">
                    <label className="block text-gray-600 mb-2">New Password</label>
                    <input
                        type={showNewPassword ? "text" : "password"}
                        placeholder="Password"
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    >
                        {showNewPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                    </button>
                </div>

                {/* Confirm Password */}
                <div className="mb-4 relative">
                    <label className="block text-gray-600 mb-2">Confirm Password</label>
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Password"
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    >
                        {showConfirmPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                    </button>
                </div>

                {/* Forgot Password */}
                <div className="text-right mb-6">
                    <a href="#" className="text-blue-500 text-sm hover:underline">
                        Forget Password?
                    </a>
                </div>

                {/* Confirm Button */}
                <button
                    className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700"
                    onClick={() => alert("Password Changed Successfully!")}
                >
                    Confirm
                </button>
            </div>
        </div>
    );
};

export default ChangePassword;
