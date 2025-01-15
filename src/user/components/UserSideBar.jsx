import React, { useState, useEffect } from 'react';
import { FaChevronDown, FaChevronUp, FaHome, FaUser, FaCalendarAlt, FaTicketAlt, FaMoneyCheckAlt, FaCog, FaQuestionCircle, FaDoorOpen, FaTasks } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
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
    const location = useLocation();

    // Update active item based on current path
    useEffect(() => {
        const path = location.pathname;
        if (path.includes('/user/home')) setActiveItem('Home');
        else if (path.includes('/profile')) setActiveItem('My Profile');
        else if (path.includes('/attendance')) setActiveItem('Attendance');
        else if (path.includes('/ticket')) {
            setActiveItem('Ticket');
            setShowTicketOptions(true);
            if (path.includes('/query')) setActiveItem('Query');
            if (path.includes('/reimbursement')) setActiveItem('Reimbursement');
        }
        else if (path.includes('/leave')) {
            setActiveItem('Leave');
            setShowLeaveOptions(true);
            if (path.includes('/apply')) setActiveItem('Apply Leave');
            if (path.includes('/my-leaves')) setActiveItem('My Leaves');
        }
        else if (path.includes('/payroll')) setActiveItem('Payroll');
        else if (path.includes('/task-management')) setActiveItem('Task Management');
        else if (path.includes('/setting')) {
            setActiveItem('Setting');
            setShowSettingOptions(true);
            if (path.includes('/changepassword')) setActiveItem('Change Password');
        }
    }, [location.pathname]);

    const handleItemClick = (item) => {
        setActiveItem(item);
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    return (
        <div className="bg-white h-screen w-[15.104vw] px-[1.25vw] py-[1.667vw] flex flex-col shadow-lg fixed left-0 top-0 bottom-0">
            <div className="flex items-center mb-[0.417vw]">
                <img src={Logo} alt="LazyHR" className="h-[5.208vw] w-[10.5vw] mr-[0.417vw]" />
            </div>
            <nav className="flex-1 space-y-0 overflow-y-auto">
                {/* Home */}
                <Link
                    to="/user/home"
                    className={`flex items-center p-[0.625vw] rounded-[0.313vw] ${activeItem === 'Home' ? 'bg-[#534feb] text-white' : 'hover:bg-gray-100 hover:text-gray-800 text-gray-600'}`}
                    onClick={() => handleItemClick('Home')}
                >
                    <FaHome className="mr-[0.625vw]" />
                    <span>Home</span>
                </Link>

                {/* Profile */}
                <Link
                    to="/profile"
                    className={`flex items-center p-[0.625vw] rounded-[0.313vw] ${activeItem === 'My Profile' ? 'bg-[#534feb] text-white' : 'hover:bg-gray-100 hover:text-gray-800 text-gray-600'}`}
                    onClick={() => handleItemClick('My Profile')}
                >
                    <FaUser className="mr-[0.625vw]" />
                    <span>My Profile</span>
                </Link>

                {/* Attendance */}
                <Link
                    to="/attendance"
                    className={`flex items-center p-[0.625vw] rounded-[0.313vw] ${activeItem === 'Attendance' ? 'bg-[#534feb] text-white' : 'hover:bg-gray-100 hover:text-gray-800 text-gray-600'}`}
                    onClick={() => handleItemClick('Attendance')}
                >
                    <FaCalendarAlt className="mr-[0.625vw]" />
                    <span>Attendance</span>
                </Link>

                {/* Ticket */}
                <div>
                    <div
                        className={`flex items-center p-[0.625vw] rounded-[0.313vw] cursor-pointer ${activeItem === 'Ticket' || activeItem === 'Query' || activeItem === 'Reimbursement' ? 'bg-[#534feb] text-white' : 'hover:bg-gray-100 hover:text-gray-800 text-gray-600'}`}
                        onClick={() => {
                            setShowTicketOptions(!showTicketOptions);
                            handleItemClick('Ticket');
                        }}
                    >
                        <FaTicketAlt className="mr-[0.625vw]" />
                        <span>Ticket</span>
                        <div className="ml-auto">
                            {showTicketOptions ? (
                                <FaChevronUp className={`w-[1.042vw] h-[1.042vw] ${activeItem === 'Ticket' || activeItem === 'Query' || activeItem === 'Reimbursement' ? 'text-white' : 'text-gray-600'}`} />
                            ) : (
                                <FaChevronDown className={`w-[1.042vw] h-[1.042vw] ${activeItem === 'Ticket' || activeItem === 'Query' || activeItem === 'Reimbursement' ? 'text-white' : 'text-gray-600'}`} />
                            )}
                        </div>
                    </div>

                    {showTicketOptions && (
                        <div className="ml-[1.667vw] space-y-2 transition-all duration-300 ease-in-out">
                            <Link
                                to="/ticket/query"
                                className={`flex items-center p-[0.417vw] mt-[0.417vw] rounded-[0.313vw] ${activeItem === 'Query' ? 'bg-[#534feb] text-white' : 'hover:bg-gray-100 hover:text-gray-800 text-gray-600'}`}
                                onClick={() => handleItemClick('Query')}
                            >
                                <span>Query</span>
                            </Link>

                            <Link
                                to="/ticket/reimbursement"
                                className={`flex items-center p-[0.417vw] rounded-[0.313vw] ${activeItem === 'Reimbursement' ? 'bg-[#534feb] text-white' : 'hover:bg-gray-100 hover:text-gray-800 text-gray-600'}`}
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
                        className={`flex items-center p-[0.625vw] rounded-[0.313vw] cursor-pointer ${activeItem === 'Leave' || activeItem === 'Apply Leave' || activeItem === 'My Leaves' ? 'bg-[#534feb] text-white' : 'hover:bg-gray-100 hover:text-gray-800 text-gray-600'}`}
                        onClick={() => {
                            setShowLeaveOptions(!showLeaveOptions);
                            handleItemClick('Leave');
                        }}
                    >
                        <FaCalendarAlt className="mr-[0.625vw]" />
                        <span>Leave</span>
                        <div className="ml-auto">
                            {showLeaveOptions ? (
                                <FaChevronUp className={`w-[1.042vw] h-[1.042vw] ${activeItem === 'Leave' || activeItem === 'Apply Leave' || activeItem === 'My Leaves' ? 'text-white' : 'text-gray-600'}`} />
                            ) : (
                                <FaChevronDown className={`w-[1.042vw] h-[1.042vw] ${activeItem === 'Leave' || activeItem === 'Apply Leave' || activeItem === 'My Leaves' ? 'text-white' : 'text-gray-600'}`} />
                            )}
                        </div>
                    </div>

                    {showLeaveOptions && (
                        <div className="ml-[1.667vw] space-y-2 transition-all duration-300 ease-in-out">
                            <Link
                                to="/leave/apply"
                                className={`flex items-center p-[0.417vw] mt-[0.417vw] rounded-[0.313vw] ${activeItem === 'Apply Leave' ? 'bg-[#534feb] text-white' : 'hover:bg-gray-100 hover:text-gray-800 text-gray-600'}`}
                                onClick={() => handleItemClick('Apply Leave')}
                            >
                                <span>Apply Leave</span>
                            </Link>
                            <Link
                                to="/leave/my-leaves"
                                className={`flex items-center p-[0.417vw] rounded-[0.313vw] ${activeItem === 'My Leaves' ? 'bg-[#534feb] text-white' : 'hover:bg-gray-100 hover:text-gray-800 text-gray-600'}`}
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
                    className={`flex items-center p-[0.625vw] rounded-[0.313vw] ${activeItem === 'Payroll' ? 'bg-[#534feb] text-white' : 'hover:bg-gray-100 hover:text-gray-800 text-gray-600'}`}
                    onClick={() => handleItemClick('Payroll')}
                >
                    <FaMoneyCheckAlt className="mr-[0.625vw]" />
                    <span>Payroll</span>
                </Link>

                {/* Task Management */}
                <Link
                    to="/task-management"
                    className={`flex items-center p-[0.625vw] rounded-[0.313vw] ${activeItem === 'Task Management' ? 'bg-[#534feb] text-white' : 'hover:bg-gray-100 hover:text-gray-800 text-gray-600'}`}
                    onClick={() => handleItemClick('Task Management')}
                >
                    <FaTasks className="mr-[0.625vw]" />
                    <span>Task Management</span>
                </Link>

                {/* Settings */}
                <div>
                    <div
                        className={`flex items-center p-[0.625vw] rounded-[0.313vw] cursor-pointer ${activeItem === 'Setting' || activeItem === 'Change Password' ? 'bg-[#534feb] text-white' : 'hover:bg-gray-100 hover:text-gray-800 text-gray-600'}`}
                        onClick={() => {
                            setShowSettingOptions(!showSettingOptions);
                            handleItemClick('Setting');
                        }}
                    >
                        <FaCog className="mr-[0.625vw]" />
                        <span>Setting</span>
                        <div className="ml-auto">
                            {showSettingOptions ? (
                                <FaChevronUp className={`w-[1.042vw] h-[1.042vw] ${activeItem === 'Setting' || activeItem === 'Change Password' ? 'text-white' : 'text-gray-600'}`} />
                            ) : (
                                <FaChevronDown className={`w-[1.042vw] h-[1.042vw] ${activeItem === 'Setting' || activeItem === 'Change Password' ? 'text-white' : 'text-gray-600'}`} />
                            )}
                        </div>
                    </div>

                    {showSettingOptions && (
                        <div className="ml-[1.667vw] space-y-2 transition-all duration-300 ease-in-out">
                            <Link
                                to="/setting/changepassword"
                                className={`flex items-center p-[0.417vw] rounded-[0.313vw] ${activeItem === 'Change Password' ? 'bg-[#534feb] text-white' : 'hover:bg-gray-100 hover:text-gray-800 text-gray-600'}`}
                                onClick={() => handleItemClick('Change Password')}
                            >
                                <span>Change Password</span>
                            </Link>
                        </div>
                    )}
                </div>
            </nav>

            {/* Help */}
            <div className='space-y-0'>
                <div
                    className={`flex items-center p-[0.625vw] rounded-[0.313vw] cursor-pointer ${activeItem === 'Help' ? 'bg-[#534feb] text-white' : 'hover:bg-gray-100 hover:text-gray-800 text-gray-600'}`}
                    onClick={() => handleItemClick('Help')}
                >
                    <FaQuestionCircle className="mr-[0.417vw]" />
                    <span>Help</span>
                </div>

                {/* Logout */}
                <div
                    className={`flex items-center p-[0.625vw] rounded-[0.313vw] cursor-pointer ${activeItem === 'Logout' ? 'bg-[#534feb] text-white' : 'hover:bg-gray-100 hover:text-gray-800 text-gray-600'}`}
                    onClick={handleLogout}
                >
                    <FaDoorOpen className="mr-[0.417vw]" />
                    <span>Logout</span>
                </div>
            </div>
        </div>
    );
};

export default UserSideBar;