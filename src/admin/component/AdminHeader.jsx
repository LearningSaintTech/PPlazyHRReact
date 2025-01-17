// Header.js
import React from "react";
import { FaBell } from "react-icons/fa";
import { GoChevronDown } from "react-icons/go";

const Header = ({ title, avatarSrc, showNotification = true, showChevron = true }) => {
    return (
        <header className="flex items-center justify-between bg-white p-5 rounded-lg shadow mb-8">
             <h1 className="flex-grow text-center text-xl font-bold text-gray-700">{title}</h1>

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
                    <GoChevronDown className="text-gray-500 text-2xl cursor-pointer" /> 
                )}
            </div>
        </header>
    );
};

export default Header;
