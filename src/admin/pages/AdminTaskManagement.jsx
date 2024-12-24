import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { Calendar, ChevronLeft, ChevronRight, Search, Download, Plus, Edit2, Clock, User } from "lucide-react";
import AdminSideBar from "../component/AdminSidebar";
import AdminHeader from "../component/AdminHeader";

const TaskManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [currentDateTime, setCurrentDateTime] = useState({
        day: "Tuesday",
        time: "00:00:00",
        period: "AM"
    });

    const taskStats = {
        completed: 12,
        inProgress: 18,
        pending: 15,
        canceled: 1
    };

    const tasks = [
        { 
            id: 1, 
            title: "Website Redesign", 
            assignee: "Aditya Raj", 
            status: "Not Started",
            priority: "High",
            dueDate: "2024-01-20",
            progress: 0
        },
        { 
            id: 2, 
            title: "Mobile App Development", 
            assignee: "Aditya Raj", 
            status: "In progress",
            priority: "Medium",
            dueDate: "2024-01-25",
            progress: 45
        },
        { 
            id: 3, 
            title: "Database Optimization", 
            assignee: "Aditya Raj", 
            status: "Done",
            priority: "Low",
            dueDate: "2024-01-15",
            progress: 100
        },
    ];

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            const time = format(now, 'HH:mm:ss');
            const period = format(now, 'a');
            const day = format(now, 'EEEE');
            setCurrentDateTime({ day, time, period });
        };

        updateDateTime();
        const interval = setInterval(updateDateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case "Not Started": return "bg-yellow-100 text-yellow-800";
            case "In progress": return "bg-blue-100 text-blue-800";
            case "Done": return "bg-green-100 text-green-800";
            default: return "bg-gray-100 text-gray-800";
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case "High": return "bg-red-100 text-red-800";
            case "Medium": return "bg-orange-100 text-orange-800";
            case "Low": return "bg-green-100 text-green-800";
            default: return "bg-gray-100 text-gray-800";
        }
    };

    const TaskCard = ({ title, assignee, status, priority, dueDate, progress }) => (
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-3">
                <div className="space-y-1">
                    <h4 className="font-medium text-gray-900">{title}</h4>
                    <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                            {status}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(priority)}`}>
                            {priority}
                        </span>
                    </div>
                </div>
                <button 
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    title="Edit Task"
                >
                    <Edit2 size={16} className="text-gray-400 hover:text-gray-600" />
                </button>
            </div>
            
            <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <User size={14} />
                    <span>{assignee}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock size={14} />
                    <span>Due: {format(new Date(dueDate), 'MMM dd, yyyy')}</span>
                </div>

                <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Progress</span>
                        <span className="text-gray-900">{progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                            className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );

    const StatusButton = ({ icon: Icon, label, count, color, dotColor }) => (
      <div className="flex items-center gap-2 px-6 py-3 bg-white border rounded-lg">
          <div className={`w-2 h-2 ${dotColor} rounded-full`}></div>
          <span className="text-gray-600">{label}</span>
          <span className={`${color} font-bold ml-2`}>{count}</span>
      </div>
  );

    return (
        <div className="flex bg-gray-50 min-h-screen">
            <AdminSideBar />
            <div className="flex-1 p-8 ml-[290px]">
                <AdminHeader
                    title="Admin Dashboard"
                    avatarSrc="/api/placeholder/35/35"
                    showNotification={true}
                    showChevron={true}
                />

                <div className="p-6">
                    <div className="bg-white rounded-lg shadow-lg">
                        <div className="p-6">
                        <div className="flex justify-between items-center p-6">
                            <p className="text-gray-500 font-medium">
                                Welcome back, <span className="text-blue-500">Admin</span>
                            </p>
                            <p className="text-blue-500 font-medium">
                                {currentDateTime.day}, {currentDateTime.time} {currentDateTime.period}
                            </p>
                        </div>

                            <div className="flex gap-4 mb-8">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                                    <input
                                        type="text"
                                        placeholder="Search by Date, Time, Status..."
                                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <select
                                    className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                >
                                    <option value="">Filter by date</option>
                                    <option value="today">Today</option>
                                    <option value="week">This Week</option>
                                    <option value="month">This Month</option>
                                </select>
                                <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <Calendar size={16} />
                                    <span>{format(new Date(), 'dd MMM, yyyy')}</span>
                                </button>
                                <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <Download size={16} />
                                    Export CSV
                                </button>
                            </div>

                            <div className="flex gap-4 mb-8">
                            <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                                <Plus size={20} />
                                New Task
                            </button>
                            <StatusButton 
                                label="Completed"
                                count={taskStats.completed}
                                dotColor="bg-green-500"
                                color="text-green-600"
                            />
                            <StatusButton 
                                label="Inprogress"
                                count={taskStats.inProgress}
                                dotColor="bg-indigo-500"
                                color="text-indigo-600"
                            />
                            <StatusButton 
                                label="Pending"
                                count={taskStats.pending}
                                dotColor="bg-yellow-500"
                                color="text-yellow-600"
                            />
                            <StatusButton 
                                label="Canceled"
                                count={taskStats.canceled}
                                dotColor="bg-red-500"
                                color="text-red-600"
                            />
                        </div>

                            <div className="grid grid-cols-3 gap-6">
                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium text-yellow-600">Pending</h3>
                                    {tasks.filter(task => task.status === "Not Started").map(task => (
                                        <TaskCard key={task.id} {...task} />
                                    ))}
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium text-blue-600">In Progress</h3>
                                    {tasks.filter(task => task.status === "In progress").map(task => (
                                        <TaskCard key={task.id} {...task} />
                                    ))}
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium text-green-600">Completed</h3>
                                    {tasks.filter(task => task.status === "Done").map(task => (
                                        <TaskCard key={task.id} {...task} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskManagement;