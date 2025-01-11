import React, { useState } from 'react';
import { FaBell, FaDoorOpen } from 'react-icons/fa';
import { GoChevronDown } from 'react-icons/go';

const Header = ({ title, avatarSrc, showNotification = true, showChevron = true }) => {
    const [showLogout, setShowLogout] = useState(false);

    const handleLogout = () => {
        // Implement your logout logic here
        console.log('Logging out...');
    };

    return (
        <header className="relative flex items-center justify-between bg-white p-5 rounded-lg shadow mb-8">
            {/* Center Title */}
            <h1 className="flex-grow text-center text-xl font-bold text-gray-700">{title}</h1>

            {/* Right Section */}
            <div className="flex items-center gap-3">
                {showNotification && (
                    <FaBell className="text-gray-500 text-2xl cursor-pointer" />
                )}
                {avatarSrc && (
                    <img
                        src={avatarSrc}
                        alt="User Avatar"
                        className="w-10 h-10 rounded-full"
                    />
                )}
                {showChevron && (
                    <button
                        onClick={() => setShowLogout(!showLogout)}
                        className="focus:outline-none"
                    >
                        <GoChevronDown className="text-gray-500 text-2xl cursor-pointer" />
                    </button>
                )}

                {/* Logout Dropdown */}
                {showLogout && (
                    <div className="absolute right-0 top-full mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <div className="py-1">
                            <button
                                onClick={handleLogout}
                                className="flex flex-row items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                <FaDoorOpen className="mb-1 mr-2 text-lg" />
                                <span>Log Out</span>
                            </button>

                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;