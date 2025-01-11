import React, { useState } from 'react';
import {
    FaChevronDown, FaChevronUp, FaHome, FaUser, FaCalendarAlt, FaTicketAlt,
    FaMoneyCheckAlt, FaCog, FaQuestionCircle, FaDoorOpen, FaClipboardList,
    FaUsers, FaCalendarPlus, FaTasks
} from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../../assets/logowhite.png';
import { useDispatch } from 'react-redux';
import { logout } from '../../commonComponent/slice/AuthSlice';
import { useNavigate } from 'react-router-dom';
const AdminSideBar = () => {
    const [showTicketOptions, setShowTicketOptions] = useState(false);
    const [showLeaveOptions, setShowLeaveOptions] = useState(false);
    const [showSettingOptions, setShowSettingOptions] = useState(false);
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [activeItem, setActiveItem] = useState('');
    const handleItemClick = (item) => {
        setActiveItem(item);
    };
    const getActiveClass = (path) => {
        return location.pathname === path ? 'bg-[#534feb] text-white' : 'hover:bg-gray-200 hover:text-gray-800 text-gray-600';
    };
    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    return (
        <div className="fixed left-0 top-0 bg-white h-screen w-[16vw] px-[1.25vw] py-[1.667vw] flex flex-col shadow-lg overflow-hidden">
            <div className="flex items-center mb-[1.25vw]">
                <img src={Logo} alt="LazyHR" className="h-[4.167vw] w-[10.417vw]" />
            </div>

            <nav className="flex-1 overflow-y-auto space-y-2 scrollbar-thin">
                <Link
                    to="/admin/home"
                    className={`flex items-center p-[0.625vw] rounded-[0.313vw] ${getActiveClass('/admin/home')}`}
                >
                    <FaHome className="mr-[0.625vw]" />
                    <span className="text-[1.042vw]">Home</span>
                </Link>

                <Link
                    to="/admin/employees"
                    className={`flex items-center p-[0.625vw] rounded-[0.313vw] ${getActiveClass('/admin/employees')}`}
                >
                    <FaUsers className="mr-[0.625vw]" />
                    <span className="text-[1.042vw]">Employees</span>
                </Link>

                <Link
                    to="/admin/attendance"
                    className={`flex items-center p-[0.625vw] rounded-[0.313vw] ${getActiveClass('/admin/attendance')}`}
                >
                    <FaCalendarAlt className="mr-[0.625vw]" />
                    <span className="text-[1.042vw]">Attendance</span>
                </Link>

                <div>
                    <button
                        className={`w-full flex items-center p-[0.625vw] rounded-[0.313vw] ${getActiveClass('/admin/tickets')}`}
                        onClick={() => setShowTicketOptions(!showTicketOptions)}
                    >
                        <FaTicketAlt className="mr-[0.625vw]" />
                        <span className="text-[1.042vw]">Tickets</span>
                        <div className="ml-auto">
                            {showTicketOptions ? (
                                <FaChevronUp className="w-[1.042vw] h-[1.042vw]" />
                            ) : (
                                <FaChevronDown className="w-[1.042vw] h-[1.042vw]" />
                            )}
                        </div>
                    </button>
                    {showTicketOptions && (
                        <div className="ml-[1.667vw] space-y-2">
                            <Link
                                to="/admin/tickets/query"
                                className={`flex items-center p-[0.417vw] rounded-[0.313vw] ${getActiveClass('/admin/tickets/query')}`}
                            >
                                <span className="text-[1.042vw]">Query</span>
                            </Link>
                            <Link
                                to="/admin/tickets/reimbursement"
                                className={`flex items-center p-[0.417vw] rounded-[0.313vw] ${getActiveClass('/admin/tickets/reimbursement')}`}
                            >
                                <span className="text-[1.042vw]">Reimbursement</span>
                            </Link>
                        </div>
                    )}
                </div>

                <Link
                    to="/admin/task-management"
                    className={`flex items-center p-[0.625vw] rounded-[0.313vw] ${getActiveClass('/admin/task-management')}`}
                >
                    <FaTasks className="mr-[0.625vw]" />
                    <span className="text-[1.042vw]">Task Management</span>
                </Link>

                <Link
                    to="/admin/payroll"
                    className={`flex items-center p-[0.625vw] rounded-[0.313vw] ${getActiveClass('/admin/payroll')}`}
                >
                    <FaMoneyCheckAlt className="mr-[0.625vw]" />
                    <span className="text-[1.042vw]">Payroll</span>
                </Link>

                <Link
                    to="/admin/management"
                    className={`flex items-center p-[0.625vw] rounded-[0.313vw] ${getActiveClass('/admin/management')}`}
                >
                    <FaClipboardList className="mr-[0.625vw]" />
                    <span className="text-[1.042vw]">Management</span>
                </Link>

                <div>
                    <button
                        className={`w-full flex items-center p-[0.625vw] rounded-[0.313vw] ${getActiveClass('/admin/leaves')}`}
                        onClick={() => setShowLeaveOptions(!showLeaveOptions)}
                    >
                        <FaCalendarAlt className="mr-[0.625vw]" />
                        <span className="text-[1.042vw]">Leaves</span>
                        <div className="ml-auto">
                            {showLeaveOptions ? (
                                <FaChevronUp className="w-[1.042vw] h-[1.042vw]" />
                            ) : (
                                <FaChevronDown className="w-[1.042vw] h-[1.042vw]" />
                            )}
                        </div>
                    </button>
                    {showLeaveOptions && (
                        <div className="ml-[1.667vw] space-y-2">
                            <Link
                                to="/admin/leaves/apply"
                                className={`flex items-center p-[0.417vw] rounded-[0.313vw] ${getActiveClass('/admin/leaves/apply')}`}
                            >
                                <span className="text-[1.042vw]">Apply Leave</span>
                            </Link>
                            <Link
                                to="/admin/leaves/my-leaves"
                                className={`flex items-center p-[0.417vw] rounded-[0.313vw] ${getActiveClass('/admin/leaves/my-leaves')}`}
                            >
                                <span className="text-[1.042vw]">My Leaves</span>
                            </Link>
                        </div>
                    )}
                </div>

                <Link
                    to="/admin/create-event"
                    className={`flex items-center p-[0.625vw] rounded-[0.313vw] ${getActiveClass('/admin/create-event')}`}
                >
                    <FaCalendarPlus className="mr-[0.625vw]" />
                    <span className="text-[1.042vw]">Create Event</span>
                </Link>

                <div>
                    <button
                        className={`w-full flex items-center p-[0.625vw] rounded-[0.313vw] ${getActiveClass('/admin/settings')}`}
                        onClick={() => setShowSettingOptions(!showSettingOptions)}
                    >
                        <FaCog className="mr-[0.625vw]" />
                        <span className="text-[1.042vw]">Settings</span>
                        <div className="ml-auto">
                            {showSettingOptions ? (
                                <FaChevronUp className="w-[1.042vw] h-[1.042vw]" />
                            ) : (
                                <FaChevronDown className="w-[1.042vw] h-[1.042vw]" />
                            )}
                        </div>
                    </button>
                    {showSettingOptions && (
                        <div className="ml-[1.667vw] space-y-2">
                            {/* Add your settings options here */}
                        </div>
                    )}
                </div>
            </nav>

            <div className="mt-auto space-y-2">
                <Link
                    to="/admin/help"
                    className={`flex items-center p-[0.625vw] rounded-[0.313vw] ${getActiveClass('/admin/help')}`}
                >
                    <FaQuestionCircle className="mr-[0.625vw]" />
                    <span className="text-[1.042vw]">Help</span>
                </Link>

                <div
                    className={`flex items-center mt-[0.833vw] p-[0.625vw] rounded-[0.313vw] ${activeItem === 'Logout' ? 'bg-[#534feb] text-white' : 'hover:bg-gray-100 hover:text-gray-800 text-gray-600'}`}
                    onClick={handleLogout}
                >
                    <FaDoorOpen className="mr-[0.417vw]" />
                    <span className="text-[1.042vw]">Logout</span>
                </div>
            </div>
        </div>
    );
};

export default AdminSideBar;