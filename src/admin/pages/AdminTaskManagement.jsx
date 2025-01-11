import React, { useState } from 'react';
import { Search, Plus, CheckCircle, Clock, AlertCircle, FileText, User } from 'lucide-react';
import { PiNotePencilThin } from "react-icons/pi";
import { TbGraph } from "react-icons/tb";
import AdminSidebar from '../component/AdminSidebar';
import AdminHeader from '../component/AdminHeader';
import TaskForm from './TaskForm';
import TaskPerformance from './TaskPerformance'; // TaskPerformance import here

const TaskManagement = () => {
    const [isTaskFormVisible, setIsTaskFormVisible] = useState(false);
    const [isTaskPerformanceVisible, setIsTaskPerformanceVisible] = useState(false); // New state for Task Performance popup

    const tasks = [
        { id: 1, title: 'Task 1', assignee: 'Aditya Raj', status: 'Not Started' },
        { id: 2, title: 'Task 2', assignee: 'Aditya Raj', status: 'In progress' },
        { id: 3, title: 'Task 3', assignee: 'Aditya Raj', status: 'Done' },
        { id: 4, title: 'Task 4', assignee: 'Aditya Raj', status: 'Not Started' },
        { id: 5, title: 'Task 5', assignee: 'Aditya Raj', status: 'In progress' },
        { id: 6, title: 'Task 6', assignee: 'Aditya Raj', status: 'Done' },
        { id: 7, title: 'Task 7', assignee: 'Aditya Raj', status: 'Not Started' },
        { id: 8, title: 'Task 8', assignee: 'Aditya Raj', status: 'In progress' },
        { id: 9, title: 'Task 9', assignee: 'Aditya Raj', status: 'Done' },
    ];

    const toggleTaskForm = () => {
        setIsTaskFormVisible(!isTaskFormVisible);
    };

    const toggleTaskPerformance = () => {
        setIsTaskPerformanceVisible(!isTaskPerformanceVisible);
    };

    const handleCloseTaskForm = () => {
        setIsTaskFormVisible(false);
    };

    const handleCloseTaskPerformance = () => {
        setIsTaskPerformanceVisible(false); // Close Task Performance popup
    };

    const TaskCard = ({ title, assignee, status }) => {
        const getStatusStyles = () => {
            switch (status) {
                case 'Not Started':
                    return 'bg-[#ffae00]/5 border-[#ffae00] text-[#ffae00]';
                case 'In progress':
                    return 'bg-[#534feb]/5 border-[#534feb] text-[#534feb]';
                case 'Done':
                    return 'bg-[#069855]/5 border-[#069855] text-[#069855]';
                default:
                    return '';
            }
        };

        return (
            <div className={`w-full p-[1.25vw] rounded-[0.833vw] border border-[#5c606a]/20 ${getStatusStyles()}`}>
                <div className="flex flex-col gap-[0.625vw]">
                    <div className="flex justify-between items-center bg-white rounded-[0.313vw] border border-[#5c606a] p-[0.625vw]">
                        <div className="flex items-center gap-[0.417vw]">
                            <FileText className="w-[1.25vw] h-[1.25vw] text-[#5c606a]" />
                            <span className="text-[#5c606a] text-[1.042vw]">{title}</span>
                        </div>
                        <button className="flex items-center justify-center">
                            <PiNotePencilThin className="w-[1.458vw] h-[1.458vw] text-black"/>
                        </button>
                    </div>
                    <div className="flex items-center gap-[0.417vw] bg-white rounded-[0.313vw] border border-[#5c606a] p-[0.625vw]">
                        <User className="w-[1.25vw] h-[1.25vw] text-[#5c606a]" />
                        <span className="text-[#5c606a] text-[1.042vw]">{assignee}</span>
                    </div>
                    <div className={`flex items-center gap-[0.417vw] bg-white rounded-[0.313vw] p-[0.625vw] border ${getStatusStyles()}`}>
                        <div
                            className={`w-[0.625vw] h-[0.625vw] rounded-full ${status === 'Not Started' ? 'bg-[#ffae00]' : status === 'In progress' ? 'bg-[#534feb]' : 'bg-[#069855]'}`}
                        />
                        <span className="text-[1.042vw]">{status}</span>
                    </div>
                </div>
            </div>
        );
    };


    const pendingTasks = tasks.filter(task => task.status === 'Not Started');
    const inProgressTasks = tasks.filter(task => task.status === 'In progress');
    const completedTasks = tasks.filter(task => task.status === 'Done');

    return (
        <div className="relative flex h-screen">
            {/* Background Overlay for Task Form */}
            {isTaskFormVisible && (
                <div
                    className="fixed inset-0 bg-black/30 backdrop-blur-sm z-10"
                    onClick={handleCloseTaskForm}
                />
            )}

            {/* Background Overlay for Task Performance */}
            {isTaskPerformanceVisible && (
                <div
                    className="fixed inset-0 bg-black/30 backdrop-blur-sm z-10"
                    onClick={handleCloseTaskPerformance}
                />
            )}

            {/* Sidebar */}
            <div className="w-[15%] fixed top-0 left-0 h-fullshadow-lg z-20">
                <AdminSidebar />
            </div>

            {/* Main Content */}
            <div className="flex-1 ml-[15%] p-[3.333vw]">
                <AdminHeader />

                {/* Search and Filters */}
                <div className="flex gap-[1.25vw] mb-[3.333vw]">
                    <div className="flex-1 flex items-center gap-3 px-[1.25vw] py-[0.833vw] rounded-xl border border-black/20">
                        <Search className="text-black/40" />
                        <input
                            type="text"
                            placeholder="Search by Date, Time, Status..."
                            className="flex-1 bg-transparent text-black/40 outline-none"
                        />
                    </div>
                    <div className="px-[1.25vw] py-[0.833vw] rounded-xl border border-black/20">
                        <span className="text-black text-[1.042vw]">Date</span>
                    </div>
                    <div className="px-[1.25vw] py-[0.833vw] rounded-xl border border-black/20 flex items-center gap-3">
                        <span className="text-black text-[1.042vw]">13 Jan, 2024</span>
                    </div>
                    <div className="px-[1.25vw] py-[0.833vw] rounded-xl border border-black/20 flex items-center gap-3">
                        <span className="text-black text-[1.042vw]">Export CSV</span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-[1.25vw] mb-[1.667vw]">
                    <button
                        onClick={toggleTaskForm}
                        className="flex items-center gap-[0.625vw] px-[1.25vw] py-[0.833vw] bg-[#534feb] text-white rounded-[0.833vw]"
                    >
                        <span className="text-[1.042vw] font-medium">Create Task</span>
                        <Plus className="w-[1.25vw] h-[1.25vw] ml-[7.5vw]" />
                    </button>

                    <button
                        onClick={toggleTaskPerformance} // Open Task Performance popup
                        className="flex items-center gap-[0.625vw] px-[1.25vw] py-[0.833vw] bg-[#534feb] text-white rounded-[0.833vw]"
                    >
                        <span className="text-[1.042vw] font-medium">Task Performance</span>
                        <TbGraph className="w-[1.25vw] h-[1.25vw] ml-[1.458vw]" />
                    </button>

                    <div className="flex items-center gap-[0.625vw] flex-1">
                        <div className="flex-1 flex justify-between items-center px-[1.25vw] py-[0.833vw] rounded-[0.833vw] border border-[#48ad6d]">
                            <div className="flex items-center gap-[0.417vw]">
                                <CheckCircle className="text-[#48ad6d] w-[1.25vw] h-[1.25vw]" />
                                <span className="text-[#39434f] text-[1.042vw]">Completed</span>
                            </div>
                            <span className="text-[#48ad6d] text-[1.042vw]">{completedTasks.length}</span>
                        </div>

                        <div className="flex-1 flex justify-between items-center px-[1.25vw] py-[0.833vw] rounded-[0.833vw] border border-[#3c70f5]">
                            <div className="flex items-center gap-[0.417vw]">
                                <Clock className="text-[#3c70f5] w-[1.25vw] h-[1.25vw]" />
                                <span className="text-[#39434f] text-[1.042vw]">In Progress</span>
                            </div>
                            <span className="text-[#3c70f5] text-[1.042vw]">{inProgressTasks.length}</span>
                        </div>

                        <div className="flex-1 flex justify-between items-center px-[1.25vw] py-[0.833vw] rounded-[0.833vw] border border-[#f5ab3b]">
                            <div className="flex items-center gap-[0.417vw]">
                                <AlertCircle className="text-[#f5ab3b] w-[1.25vw] h-[1.25vw]" />
                                <span className="text-[#39434f] text-[1.042vw]">Pending</span>
                            </div>
                            <span className="text-[#f5ab3b] text-[1.042vw]">{pendingTasks.length}</span>
                        </div>
                    </div>
                </div>

                {/* Status Headers */}
            <div className="flex gap-[1.25vw] mb-[1.667vw]">
                    <div className="flex-1 px-[1.25vw] py-[0.833vw] rounded-[0.833vw] border border-[#ffae00]">
                        <span className="text-[#ffae00] text-[1.25vw]">Pending</span>
                    </div>
                    <div className="flex-1 px-[1.25vw] py-[0.833vw] rounded-[0.833vw] border border-[#534feb]">
                        <span className="text-[#534feb] text-[1.25vw]">In Progress</span>
                    </div>
                    <div className="flex-1 px-[1.25vw] py-[0.833vw] rounded-[0.833vw] border border-[#069855]">
                        <span className="text-[#069855] text-[1.25vw]">Completed</span>
                    </div>
                </div>

                {/* Task Cards */}
                <div className="flex gap-[1.25vw]">
                    <div className="flex-1 flex flex-col gap-8">
                        {pendingTasks.map(task => (
                            <TaskCard
                                key={task.id}
                                title={task.title}
                                assignee={task.assignee}
                                status={task.status}
                            />
                        ))}
                    </div>
                    <div className="flex-1 flex flex-col gap-8">
                        {inProgressTasks.map(task => (
                            <TaskCard
                                key={task.id}
                                title={task.title}
                                assignee={task.assignee}
                                status={task.status}
                            />
                        ))}
                    </div>
                    <div className="flex-1 flex flex-col gap-8">
                        {completedTasks.map(task => (
                            <TaskCard
                                key={task.id}
                                title={task.title}
                                assignee={task.assignee}
                                status={task.status}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Task Performance Popup */}
            <div
                className={`fixed top-0 right-0 w-[400px] shadow-lg transform transition-transform duration-700 z-20 ${isTaskPerformanceVisible ? 'translate-x-0' : 'translate-x-full'
                    }`}
                style={{ width: '84%', height: '50%' }}
                onClick={(e) => e.stopPropagation()} // Prevent clicks inside the form from closing it
            >
                <TaskPerformance onClose={handleCloseTaskPerformance} />
            </div>

            {/* Task Form */}
            <div
                className={`fixed top-0 right-0 h-full w-[400px] bg-white shadow-lg transform transition-transform duration-500 z-20 ${isTaskFormVisible ? 'translate-x-0' : 'translate-x-full'
                    }`}
                style={{ width: '30%' }}
                onClick={(e) => e.stopPropagation()} // Prevent clicks inside the form from closing it
            >
                <TaskForm />
            </div>
        </div>
    );
};

export default TaskManagement;
