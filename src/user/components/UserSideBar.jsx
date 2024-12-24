import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaHome, FaUser, FaCalendarAlt, FaTicketAlt, FaMoneyCheckAlt, FaCog, FaQuestionCircle, FaDoorOpen, FaTasks } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logowhite.png';
import { useDispatch } from 'react-redux';
import { logout } from '../../commonComponent/slice/AuthSlice';
import { useNavigate } from 'react-router-dom';
const UserSideBar = () => {
    const [showTicketOptions, setShowTicketOptions] = useState(false);
    const [showLeaveOptions, setShowLeaveOptions] = useState(false);
    const [showSettingOptions, setShowSettingOptions] = useState(false);
    const [activeItem, setActiveItem] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleItemClick = (item) => {
        setActiveItem(item);
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    return (
        <div className="bg-white h-screen w-[290px] px-6 py-8 flex flex-col shadow-lg fixed left-0 top-0 bottom-0">
            <div className="flex items-center mb-2">
                <img src={Logo} alt="LazyHR" className="h-[80px] w-[200px] mr-2" />
            </div>
            <nav className="flex-1 space-y-4 overflow-y-auto">
                {/* Home */}
                <Link
                    to="/"
                    className={`flex items-center p-3 rounded-md ${activeItem === 'Home' ? 'bg-[#534feb] text-white' : 'hover:bg-gray-100 hover:text-gray-800 text-gray-600'}`}
                    onClick={() => handleItemClick('Home')}
                >
                    <FaHome className="mr-3" />
                    <span>Home</span>
                </Link>

                {/* Profile */}
                <Link
                    to="/profile"
                    className={`flex items-center p-3 rounded-md ${activeItem === 'My Profile' ? 'bg-[#534feb] text-white' : 'hover:bg-gray-100 hover:text-gray-800 text-gray-600'}`}
                    onClick={() => handleItemClick('My Profile')}
                >
                    <FaUser className="mr-3" />
                    <span>My Profile</span>
                </Link>

                {/* Attendance */}
                <Link
                    to="/attendance"
                    className={`flex items-center p-3 rounded-md ${activeItem === 'Attendance' ? 'bg-[#534feb] text-white' : 'hover:bg-gray-100 hover:text-gray-800 text-gray-600'}`}
                    onClick={() => handleItemClick('Attendance')}
                >
                    <FaCalendarAlt className="mr-3" />
                    <span>Attendance</span>
                </Link>

                {/* Ticket */}
                <div>
                    <div
                        className={`flex items-center p-3 rounded-md ${activeItem === 'Ticket' ? 'bg-[#534feb] text-white' : 'hover:bg-gray-100 hover:text-gray-800 text-gray-600'}`}
                        onClick={() => {
                            setShowTicketOptions(!showTicketOptions);
                            handleItemClick('Ticket');
                        }}
                    >
                        <FaTicketAlt className="mr-3" />
                        <span>Ticket</span>
                        <div className="ml-auto">
                            {showTicketOptions ? (
                                <FaChevronUp className={`w-5 h-5 ${activeItem === 'Ticket' ? 'text-white' : 'text-gray-600'}`} />
                            ) : (
                                <FaChevronDown className={`w-5 h-5 ${activeItem === 'Ticket' ? 'text-white' : 'text-gray-600'}`} />
                            )}
                        </div>
                    </div>

                    {showTicketOptions && (
                        <div className="ml-8 space-y-2 transition-all duration-300 ease-in-out">
                            <Link
                                to="/ticket/query"
                                className={`flex items-center p-2 rounded-md ${activeItem === 'Query' ? 'bg-[#534feb] text-white' : 'hover:bg-gray-100 hover:text-gray-800 text-gray-600'}`}
                                onClick={() => handleItemClick('Query')}
                            >
                                <span>Query</span>
                            </Link>

                            <Link
                                to="/ticket/reimbursement"
                                className={`flex items-center p-2 rounded-md ${activeItem === 'Reimbursement' ? 'bg-[#534feb] text-white' : 'hover:bg-gray-100 hover:text-gray-800 text-gray-600'}`}
                                onClick={() => handleItemClick('Reimbursement')}
                            >
                                <span>Reimbursement</span>
                            </Link>
                        </div>
                    )}
                </div>

                {/* Leave */}
                <div>
                    <div
                        className={`flex items-center p-3 rounded-md ${activeItem === 'Leave' ? 'bg-[#534feb] text-white' : 'hover:bg-gray-100 hover:text-gray-800 text-gray-600'}`}
                        onClick={() => {
                            setShowLeaveOptions(!showLeaveOptions);
                            handleItemClick('Leave');
                        }}
                    >
                        <FaCalendarAlt className="mr-3" />
                        <span>Leave</span>
                        <div className="ml-auto">
                            {showLeaveOptions ? (
                                <FaChevronUp className={`w-5 h-5 ${activeItem === 'Leave' ? 'text-white' : 'text-gray-600'}`} />
                            ) : (
                                <FaChevronDown className={`w-5 h-5 ${activeItem === 'Leave' ? 'text-white' : 'text-gray-600'}`} />
                            )}
                        </div>
                    </div>

                    {showLeaveOptions && (
                        <div className="ml-8 space-y-2 transition-all duration-300 ease-in-out">
                            <Link
                                to="/leave/apply"
                                className={`flex items-center p-2 rounded-md ${activeItem === 'Apply Leave' ? 'bg-[#534feb] text-white' : 'hover:bg-gray-100 hover:text-gray-800 text-gray-600'}`}
                                onClick={() => handleItemClick('Apply Leave')}
                            >
                                <span>Apply Leave</span>
                            </Link>
                            <Link
                                to="/leave/my-leaves"
                                className={`flex items-center p-2 rounded-md ${activeItem === 'My Leaves' ? 'bg-[#534feb] text-white' : 'hover:bg-gray-100 hover:text-gray-800 text-gray-600'}`}
                                onClick={() => handleItemClick('My Leaves')}
                            >
                                <span>My Leaves</span>
                            </Link>
                        </div>
                    )}
                </div>

                {/* Payroll */}
                <Link
                    to="/payroll"
                    className={`flex items-center p-3 rounded-md ${activeItem === 'Payroll' ? 'bg-[#534feb] text-white' : 'hover:bg-gray-100 hover:text-gray-800 text-gray-600'}`}
                    onClick={() => handleItemClick('Payroll')}
                >
                    <FaMoneyCheckAlt className="mr-3" />
                    <span>Payroll</span>
                </Link>

                {/* Task Management */}
                <Link
                    to="/task-management"
                    className={`flex items-center p-3 rounded-md ${activeItem === 'Task Management' ? 'bg-[#534feb] text-white' : 'hover:bg-gray-100 hover:text-gray-800 text-gray-600'}`}
                    onClick={() => handleItemClick('Task Management')}
                >
                    <FaTasks className="mr-3" />
                    <span>Task Management</span>
                </Link>

                {/* Settings */}
                <div>
                    <div
                        className={`flex items-center p-3 rounded-md ${activeItem === 'Setting' ? 'bg-[#534feb] text-white' : 'hover:bg-gray-100 hover:text-gray-800 text-gray-600'}`}
                        onClick={() => {
                            setShowSettingOptions(!showSettingOptions);
                            handleItemClick('Setting');
                        }}
                    >
                        <FaCalendarAlt className="mr-3" />
                        <span>Setting</span>
                        <div className="ml-auto">
                            {showLeaveOptions ? (
                                <FaChevronUp className={`w-5 h-5 ${activeItem === 'Setting' ? 'text-white' : 'text-gray-600'}`} />
                            ) : (
                                <FaChevronDown className={`w-5 h-5 ${activeItem === 'Setting' ? 'text-white' : 'text-gray-600'}`} />
                            )}
                        </div>
                    </div>

                    {showSettingOptions && (
                        <div className="ml-8 space-y-2 transition-all duration-300 ease-in-out">
                            <Link
                                to="/setting/changepassword"
                                className={`flex items-center p-2 rounded-md ${activeItem === 'Change Password' ? 'bg-[#534feb] text-white' : 'hover:bg-gray-100 hover:text-gray-800 text-gray-600'}`}
                                onClick={() => handleItemClick('Apply Leave')}
                            >
                                <span>Change Password</span>
                            </Link>
                        </div>
                    )}
                </div>
            </nav>

            {/* Help */}
            <div
                className={`flex items-center p-3 rounded-md ${activeItem === 'Help' ? 'bg-[#534feb] text-white' : 'hover:bg-gray-100 hover:text-gray-800 text-gray-600'}`}
                onClick={() => handleItemClick('Help')}
            >
                <FaQuestionCircle className="mr-2" />
                <span>Help</span>
            </div>

            {/* Logout */}
            <div
                className={`flex items-center mt-4 p-3 rounded-md ${activeItem === 'Logout' ? 'bg-[#534feb] text-white' : 'hover:bg-gray-100 hover:text-gray-800 text-gray-600'}`}
                onClick={handleLogout}
            >
                <FaDoorOpen className="mr-2" />
                <span>Logout</span>
            </div>
        </div>
    );
};

export default UserSideBar;