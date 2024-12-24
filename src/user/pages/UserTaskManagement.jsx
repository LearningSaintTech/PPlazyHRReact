import React, { useState, useEffect } from 'react';
import { Calendar, Upload, Search, ChevronDown, Bell } from 'lucide-react';
import UserSideBar from '../components/UserSideBar';
import UserHeader from '../components/UserHeader';

const UserTaskManagement = () => {
    const [currentTime, setCurrentTime] = useState('');
    const [currentDay, setCurrentDay] = useState('');
    const [currentDate, setCurrentDate] = useState('');

    const taskData = [
        { id: 1, task: 'Task 1', priority: 'Low', dueDate: '18/01/2024', description: 'This is for testing.', status: 'Completed' },
        { id: 2, task: 'Task 2', priority: 'High', dueDate: '18/01/2024', description: 'This is for testing.', status: 'In Progress' },
        { id: 3, task: 'Task 3', priority: 'Medium', dueDate: '18/01/2024', description: 'This is for testing.', status: 'Pending' },
        { id: 4, task: 'Task 4', priority: 'Low', dueDate: '18/01/2024', description: 'This is for testing.', status: 'In Progress' },
        { id: 5, task: 'Task 5', priority: 'Low', dueDate: '18/01/2024', description: 'This is for testing.', status: 'Completed' },
    ];

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const time = now.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            });
            setCurrentTime(time);
            setCurrentDay(days[now.getDay()]);
            setCurrentDate('13 Jan, 2024');
        };

        updateDateTime();
        const timer = setInterval(updateDateTime, 1000);
        return () => clearInterval(timer);
    }, []);

    const getPriorityStyle = (priority) => {
        switch (priority.toLowerCase()) {
            case 'high':
                return 'bg-red-100 text-red-600';
            case 'medium':
                return 'bg-yellow-100 text-yellow-600';
            case 'low':
                return 'bg-green-100 text-green-600';
            default:
                return 'bg-gray-100 text-gray-600';
        }
    };

    const getStatusStyle = (status) => {
        switch (status.toLowerCase()) {
            case 'completed':
                return 'bg-green-100 text-green-600';
            case 'in progress':
                return 'bg-violet-100 text-violet-600';
            case 'pending':
                return 'bg-yellow-100 text-yellow-600';
            default:
                return 'bg-gray-100 text-gray-600';
        }
    };

    return (
        <div className="flex bg-gray-50 min-h-screen">
            {/* Sidebar */}
            <UserSideBar />

            {/* Main Content */}
            <div className="flex-1 p-8 ml-[290px]">
                {/* Header */}
                <UserHeader
                    title="User Dashboard"
                    avatarSrc="/api/placeholder/35/35"
                    showNotification={true}
                    showChevron={true}
                />

                {/* Content */}
                <div className="mt-8">
                    {/* Welcome Section */}
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-gray-700">
                            Welcome back, <span className="text-indigo-600">Aditya</span>
                        </h2>
                        <p className="text-blue-500 font-medium">
                            {currentDay}, {currentTime}
                        </p>
                    </div>

                    {/* Search and Filter Section */}
                    <div className="flex justify-between items-center mb-8">
                        <div className="relative flex-1 max-w-xl">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search by Date, Time, Status..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div className="flex gap-4">
                            <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg">
                                <Calendar className="w-5 h-5 text-gray-500" />
                                <span>{currentDate}</span>
                            </div>
                            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                                Export CSV
                            </button>
                        </div>
                    </div>

                    {/* Statistics Cards */}
                    <div className="grid grid-cols-2 gap-6 mb-8">
                        <div className="bg-white p-6 rounded-lg border border-gray-200">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-indigo-100 rounded-lg">
                                    <Calendar className="w-6 h-6 text-indigo-600" />
                                </div>
                                <div>
                                    <p className="text-gray-600 text-sm">Total Task Assign</p>
                                    <p className="text-2xl font-semibold">09</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-lg border border-gray-200">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-green-100 rounded-lg">
                                    <Calendar className="w-6 h-6 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-gray-600 text-sm">Total Task Done</p>
                                    <p className="text-2xl font-semibold">04</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Task Table */}
                    <div className="bg-white rounded-lg border border-gray-200">
                        <div className="p-6 border-b border-gray-200">
                            <h3 className="text-lg font-semibold">Last Applied</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-200">
                                        <th className="text-left py-4 px-6 text-gray-600 font-medium">Task</th>
                                        <th className="text-left py-4 px-6 text-gray-600 font-medium">Priority</th>
                                        <th className="text-left py-4 px-6 text-gray-600 font-medium">Due Date</th>
                                        <th className="text-left py-4 px-6 text-gray-600 font-medium">Description</th>
                                        <th className="text-left py-4 px-6 text-gray-600 font-medium">Status</th>
                                        <th className="text-left py-4 px-6 text-gray-600 font-medium">Comment</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {taskData.map((task) => (
                                        <tr key={task.id} className="border-b border-gray-200">
                                            <td className="py-4 px-6">{task.task}</td>
                                            <td className="py-4 px-6">
                                                <span className={`px-3 py-1 rounded-full text-sm ${getPriorityStyle(task.priority)}`}>
                                                    {task.priority}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6">{task.dueDate}</td>
                                            <td className="py-4 px-6">{task.description}</td>
                                            <td className="py-4 px-6">
                                                <span className={`px-3 py-1 rounded-full text-sm ${getStatusStyle(task.status)}`}>
                                                    {task.status}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <input
                                                    type="text"
                                                    placeholder="Comment here"
                                                    className="w-full px-3 py-1 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserTaskManagement;