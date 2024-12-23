import React from 'react';
import UserSidebar from '../components/UserSideBar';
import UserHeader from '../components/UserHeader';

const UserDashboard = () => {
    return (
        <div className="flex">
            {/* Sidebar Component */}
            <UserSidebar />

            {/* Main Content Area */}
            <div className="flex-1 bg-gray-50 min-h-screen">
                {/* Header Component */}
                <UserHeader />

                {/* Main Dashboard Content */}
                <div className="p-6">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <div className="flex justify-between items-center mb-6">
                            <p className="text-lg font-semibold">Welcome back, <span className="text-blue-600">Aditya</span></p>
                            <p className="text-gray-500">Tue, 00:00:00 <span className="text-blue-500">AM</span></p>
                        </div>

                        <div className="flex items-center space-x-4 mb-6">
                            <input
                                type="text"
                                placeholder="Search by Date, Time, Status..."
                                className="flex-grow px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                            />
                            <select
                                className="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                            >
                                <option>Date</option>
                            </select>
                            <input
                                type="date"
                                className="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                            />
                            <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                                Export CSV <span className="ml-2">📤</span>
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-4 bg-gray-100 p-4 rounded-lg mb-6">
                            <div className="flex flex-col items-center">
                                <p className="text-sm text-gray-600">Total Task Assign</p>
                                <p className="text-3xl font-bold">09</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <p className="text-sm text-gray-600">Total Task Done</p>
                                <p className="text-3xl font-bold">04</p>
                            </div>
                        </div>

                        <h2 className="text-lg font-semibold mb-4">Last Applied</h2>
                        <table className="w-full bg-white border rounded-lg">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border px-4 py-2 text-left">Task</th>
                                    <th className="border px-4 py-2 text-left">Priority</th>
                                    <th className="border px-4 py-2 text-left">Due Date</th>
                                    <th className="border px-4 py-2 text-left">Description</th>
                                    <th className="border px-4 py-2 text-left">Status</th>
                                    <th className="border px-4 py-2 text-left">Comment</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { task: "Task 1", priority: "Low", date: "18/01/2024", description: "This is for testing.", status: "Completed" },
                                    { task: "Task 2", priority: "High", date: "18/01/2024", description: "This is for testing.", status: "In Progress" },
                                    { task: "Task 3", priority: "Medium", date: "18/01/2024", description: "This is for testing.", status: "Pending" },
                                    { task: "Task 4", priority: "Low", date: "18/01/2024", description: "This is for testing.", status: "In Progress" },
                                    { task: "Task 5", priority: "Low", date: "18/01/2024", description: "This is for testing.", status: "Completed" },
                                ].map((item, index) => (
                                    <tr key={index}>
                                        <td className="border px-4 py-2">{item.task}</td>
                                        <td className="border px-4 py-2">
                                            <span
                                                className={
                                                    item.priority === "High" ? "text-red-600 font-semibold" :
                                                        item.priority === "Medium" ? "text-yellow-600 font-semibold" :
                                                            "text-green-600 font-semibold"
                                                }
                                            >
                                                {item.priority}
                                            </span>
                                        </td>
                                        <td className="border px-4 py-2">{item.date}</td>
                                        <td className="border px-4 py-2">{item.description}</td>
                                        <td className="border px-4 py-2">
                                            <span
                                                className={
                                                    item.status === "Completed" ? "text-green-600 font-semibold" :
                                                        item.status === "Pending" ? "text-yellow-600 font-semibold" :
                                                            "text-blue-600 font-semibold"
                                                }
                                            >
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="border px-4 py-2">
                                            <input
                                                type="text"
                                                placeholder="Comment here"
                                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
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
    );
};

export default UserDashboard;
