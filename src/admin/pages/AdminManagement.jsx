import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { Calendar, ChevronLeft, ChevronRight, Search, Download, Users, Shield } from "lucide-react";
import AdminSideBar from "../component/AdminSidebar";
import AdminHeader from "../component/AdminHeader";
import { getAllUsers, updateUserRoleAndStatus } from '../../commonComponent/Api';

const AdminManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [departmentFilter, setDepartmentFilter] = useState('');
    const [users, setUsers] = useState([]);

    // State for current date and time
    const [currentDateTime, setCurrentDateTime] = useState({
        day: "Tue",
        time: "00:00:00",
        period: "AM"
    });

    const fetchUsers = async () => {
        try {
            console.log("fetchUsers");
            const response = await getAllUsers();
            console.log("response", response);
            if (Array.isArray(response)) {
                setUsers(response);
            } else {
                console.error("Unexpected response format:", response);
                setUsers([]); // Set to an empty array as a fallback
            }
        } catch (err) {
            console.error("Error fetching users:", err);
            setUsers([]); // Set to an empty array in case of an error
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // Function to update current date and time
    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            const time = format(now, 'HH:mm:ss');
            const period = format(now, 'a');
            const day = format(now, 'EEE');
            setCurrentDateTime({ day, time, period });
        };

        updateDateTime();
        const interval = setInterval(updateDateTime, 1000);

        return () => clearInterval(interval);
    }, []);

    const getStatusStyle = (status) => {
        switch (status) {
            case 'active':
                return 'text-green-600 border-green-600';
            case 'inactive':
                return 'text-red-600 border-red-600';
            default:
                return 'text-gray-600 border-gray-600';
        }
    };

    const getUserTypeStyle = (role) => {
        switch (role) {
            case 'admin':
                return 'bg-yellow-50 text-yellow-600';
            case 'manager':
                return 'bg-blue-50 text-blue-600';
            default:
                return 'bg-green-50 text-green-600';
        }
    };

    const handleRoleAndStatusChange = (userId, newRoles, newStatus) => {
        // Update the user in the frontend state
        setUsers(prevUsers =>
            prevUsers.map(user =>
                user.id === userId ? { ...user, roles: [{ name: newRoles }], status: newStatus } : user
            )
        );

        console.log("userId", userId);
        console.log("newRoles", newRoles);
        console.log("newStatus", newStatus);

        // Convert newRoles to an array (since backend expects a list of roles)
        const roles = [newRoles];  // Wrap newRoles in an array to match the backend format

        // Call the backend API to update the user role and status
        updateUserRoleAndStatus(userId, roles, newStatus)
            .then(updatedUser => {
                console.log("User updated:", updatedUser);
            })
            .catch(err => {
                console.error("Error updating user:", err);
            });
    };

    return (
        <div className="flex bg-gray-50 min-h-screen">
            <AdminSideBar />
            <div className="flex-1 p-[1.667vw] ml-[15.104vw]">
                <AdminHeader
                    title="Admin Dashboard"
                    avatarSrc="/api/placeholder/35/35"
                    showNotification={true}
                    showChevron={true}
                />

                <div className="">
                    <div className="bg-white rounded-[0.417vw] shadow-sm p-[1.25vw]">
                        <div className="flex justify-between items-center mb-[1.667vw]">
                            <p className="text-gray-600 text-[0.938vw]">
                                Welcome back, <span className="text-blue-600">Admin</span>
                            </p>
                            <p className="text-gray-600">
                                {currentDateTime.day}, {currentDateTime.time} {currentDateTime.period}
                            </p>
                        </div>

                        <div className="flex gap-[0.833vw] mb-[1.667vw]">
                            <div className="relative flex-1">
                                <Search className="absolute left-[0.625vw] top-[0.625vw] text-gray-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search by Date, Time, Status..."
                                    className="w-full pl-[2.083vw] pr-[0.833vw] py-[0.417vw] border rounded-[0.417vw] focus:outline-none focus:border-blue-500"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <select
                                className="px-[0.833vw] py-[0.417vw] border rounded-[0.417vw] focus:outline-none focus:border-blue-500"
                                value={departmentFilter}
                                onChange={(e) => setDepartmentFilter(e.target.value)}
                            >
                                <option value="">All Department</option>
                                <option value="frontend">Frontend</option>
                                <option value="backend">Backend</option>
                                <option value="design">Design</option>
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

                        <div className="grid grid-cols-3 gap-[1.25vw] mb-[2.5vw]">
                            <div className="bg-white p-[1.25vw] rounded-[0.417vw] border border-gray-100 shadow-sm">
                                <div className="flex items-center gap-[0.833vw]">
                                    <div className="p-3 bg-blue-50 rounded-[0.417vw]">
                                        <Users className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Total Users</p>
                                        <p className="text-3xl font-bold text-gray-900">{users.length}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white p-[1.25vw] rounded-[0.417vw] border border-gray-100 shadow-sm">
                                <div className="flex items-center gap-[0.833vw]">
                                    <div className="p-[0.625vw] bg-green-50 rounded-[0.417vw]">
                                        <Users className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Activated</p>
                                        <p className="text-[1.563vw] font-bold text-gray-900">
                                            {users.filter(user => user.status === 'active').length}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white p-[1.25vw] rounded-[0.417vw] border border-gray-100 shadow-sm">
                                <div className="flex items-center gap-[0.833vw]">
                                    <div className="p-[0.625vw] bg-yellow-50 rounded-[0.417vw]">
                                        <Shield className="w-6 h-6 text-yellow-600" />
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Admin</p>
                                        <p className="text-[1.563vw] font-bold text-gray-900">
                                            {users.filter(user => user.roles.some(role => role.name.toLowerCase() === 'admin')).length}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-[1.25vw]">
                            {users.map((user, index) => (
                                <div key={index} className="bg-white p-[1.25vw] rounded-[0.417vw] border border-gray-200 shadow-sm">
                                    <div className="flex flex-col items-center text-center">
                                        <img
                                            src={user.image}
                                            alt={user.name}
                                            className="w-20 h-20 rounded-full mb-[0.833vw]"
                                        />
                                        <h3 className="font-medium text-gray-900">{user.name}</h3>
                                        <p className="text-[0.729vw] text-gray-500 mb-[0.833vw]">{user.roles[0]?.name}</p>

                                        <div className="flex flex-col gap-[0.417vw] w-full">
                                            <select
                                                className={`w-full px-[0.833vw] py-[0.417vw] rounded-[0.417vw] border ${getUserTypeStyle(user.roles[0]?.name)}`}
                                                value={user.roles[0]?.name}
                                                onChange={(e) => handleRoleAndStatusChange(user.id, e.target.value, user.status)}
                                            >
                                                <option value="ADMIN">Admin</option>
                                                <option value="MANAGER">Manager</option>
                                                <option value="USER">User</option>
                                            </select>

                                            <select
                                                className={`w-full px-[0.833vw] py-[0.417vw] rounded-[0.417vw] border ${getStatusStyle(user.status)}`}
                                                value={user.status}
                                                onChange={(e) => handleRoleAndStatusChange(user.id, user.roles[0]?.name, e.target.value)}
                                            >
                                                <option value="active">Active</option>
                                                <option value="inactive">Inactive</option>
                                            </select>

                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminManagement;
