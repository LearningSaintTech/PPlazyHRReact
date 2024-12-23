import React, { useState } from 'react';
import {
    FaChevronDown, FaChevronUp, FaHome, FaUser, FaCalendarAlt, FaTicketAlt,
    FaMoneyCheckAlt, FaCog, FaQuestionCircle, FaDoorOpen, FaClipboardList,
    FaUsers, FaCalendarPlus, FaTasks
} from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../../assets/logowhite.png';

const AdminSideBar = () => {
    const [showTicketOptions, setShowTicketOptions] = useState(false);
    const [showLeaveOptions, setShowLeaveOptions] = useState(false);
    const [showSettingOptions, setShowSettingOptions] = useState(false);
    const location = useLocation();

    const getActiveClass = (path) => {
        return location.pathname === path ? 'bg-[#534feb] text-white' : 'hover:bg-gray-200 hover:text-gray-800 text-gray-600';
    };

    return (
        <div className="fixed left-0 top-0 bg-white h-screen w-[290px] px-6 py-8 flex flex-col shadow-lg overflow-hidden">
            <div className="flex items-center mb-6">
                <img src={Logo} alt="LazyHR" className="h-[80px] w-[200px]" />
            </div>
            
            <nav className="flex-1 overflow-y-auto space-y-2 scrollbar-thin">
                <Link
                    to="/admin/home"
                    className={`flex items-center p-3 rounded-md ${getActiveClass('/admin/home')}`}
                >
                    <FaHome className="mr-3" />
                    <span>Home</span>
                </Link>

                <Link
                    to="/admin/employees"
                    className={`flex items-center p-3 rounded-md ${getActiveClass('/admin/employees')}`}
                >
                    <FaUsers className="mr-3" />
                    <span>Employees</span>
                </Link>

                <Link
                    to="/admin/attendance"
                    className={`flex items-center p-3 rounded-md ${getActiveClass('/admin/attendance')}`}
                >
                    <FaCalendarAlt className="mr-3" />
                    <span>Attendance</span>
                </Link>

                <div>
                    <button
                        className={`w-full flex items-center p-3 rounded-md ${getActiveClass('/admin/tickets')}`}
                        onClick={() => setShowTicketOptions(!showTicketOptions)}
                    >
                        <FaTicketAlt className="mr-3" />
                        <span>Tickets</span>
                        <div className="ml-auto">
                            {showTicketOptions ? (
                                <FaChevronUp className="w-5 h-5" />
                            ) : (
                                <FaChevronDown className="w-5 h-5" />
                            )}
                        </div>
                    </button>
                    {showTicketOptions && (
                        <div className="ml-8 space-y-2">
                            <Link
                                to="/admin/tickets/query"
                                className={`flex items-center p-2 rounded-md ${getActiveClass('/admin/tickets/query')}`}
                            >
                                <span>Query</span>
                            </Link>
                            <Link
                                to="/admin/tickets/reimbursement"
                                className={`flex items-center p-2 rounded-md ${getActiveClass('/admin/tickets/reimbursement')}`}
                            >
                                <span>Reimbursement</span>
                            </Link>
                        </div>
                    )}
                </div>

                <Link
                    to="/admin/task-management"
                    className={`flex items-center p-3 rounded-md ${getActiveClass('/admin/task-management')}`}
                >
                    <FaTasks className="mr-3" />
                    <span>Task Management</span>
                </Link>

                <Link
                    to="/admin/payroll"
                    className={`flex items-center p-3 rounded-md ${getActiveClass('/admin/payroll')}`}
                >
                    <FaMoneyCheckAlt className="mr-3" />
                    <span>Payroll</span>
                </Link>

                <Link
                    to="/admin/management"
                    className={`flex items-center p-3 rounded-md ${getActiveClass('/admin/management')}`}
                >
                    <FaClipboardList className="mr-3" />
                    <span>Management</span>
                </Link>

                <div>
                    <button
                        className={`w-full flex items-center p-3 rounded-md ${getActiveClass('/admin/leaves')}`}
                        onClick={() => setShowLeaveOptions(!showLeaveOptions)}
                    >
                        <FaCalendarAlt className="mr-3" />
                        <span>Leaves</span>
                        <div className="ml-auto">
                            {showLeaveOptions ? (
                                <FaChevronUp className="w-5 h-5" />
                            ) : (
                                <FaChevronDown className="w-5 h-5" />
                            )}
                        </div>
                    </button>
                    {showLeaveOptions && (
                        <div className="ml-8 space-y-2">
                            <Link
                                to="/admin/leaves/apply"
                                className={`flex items-center p-2 rounded-md ${getActiveClass('/admin/leaves/apply')}`}
                            >
                                <span>Apply Leave</span>
                            </Link>
                            <Link
                                to="/admin/leaves/my-leaves"
                                className={`flex items-center p-2 rounded-md ${getActiveClass('/admin/leaves/my-leaves')}`}
                            >
                                <span>My Leaves</span>
                            </Link>
                        </div>
                    )}
                </div>

                <Link
                    to="/admin/create-event"
                    className={`flex items-center p-3 rounded-md ${getActiveClass('/admin/create-event')}`}
                >
                    <FaCalendarPlus className="mr-3" />
                    <span>Create Event</span>
                </Link>

                <div>
                    <button
                        className={`w-full flex items-center p-3 rounded-md ${getActiveClass('/admin/settings')}`}
                        onClick={() => setShowSettingOptions(!showSettingOptions)}
                    >
                        <FaCog className="mr-3" />
                        <span>Settings</span>
                        <div className="ml-auto">
                            {showSettingOptions ? (
                                <FaChevronUp className="w-5 h-5" />
                            ) : (
                                <FaChevronDown className="w-5 h-5" />
                            )}
                        </div>
                    </button>
                    {showSettingOptions && (
                        <div className="ml-8 space-y-2">
                            {/* Add your settings options here */}
                        </div>
                    )}
                </div>
            </nav>

            <div className="mt-auto space-y-2">
                <Link
                    to="/admin/help"
                    className={`flex items-center p-3 rounded-md ${getActiveClass('/admin/help')}`}
                >
                    <FaQuestionCircle className="mr-3" />
                    <span>Help</span>
                </Link>

                <Link
                    to="/logout"
                    className={`flex items-center p-3 rounded-md ${getActiveClass('/logout')}`}
                >
                    <FaDoorOpen className="mr-3" />
                    <span>Logout</span>
                </Link>
            </div>
        </div>
    );
};

export default AdminSideBar;