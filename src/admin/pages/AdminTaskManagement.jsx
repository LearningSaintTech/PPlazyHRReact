import React from 'react';
import { Search, Plus, CheckCircle, Clock, AlertCircle, XCircle, FileText, User } from 'lucide-react';
import AdminSidebar from '../component/AdminSidebar';
import AdminHeader from '../component/AdminHeader';

const TaskManagement = () => {
    const tasks = [
        { id: 1, title: 'Task 1', assignee: 'Aditya Raj', status: 'Not Started' },
        { id: 2, title: 'Task 1', assignee: 'Aditya Raj', status: 'Not Started' },
        { id: 3, title: 'Task 1', assignee: 'Aditya Raj', status: 'Not Started' },
        { id: 4, title: 'Task 1', assignee: 'Aditya Raj', status: 'In progress' },
        { id: 5, title: 'Task 1', assignee: 'Aditya Raj', status: 'In progress' },
        { id: 6, title: 'Task 1', assignee: 'Aditya Raj', status: 'In progress' },
        { id: 7, title: 'Task 1', assignee: 'Aditya Raj', status: 'Done' },
        { id: 8, title: 'Task 1', assignee: 'Aditya Raj', status: 'Done' },
        { id: 9, title: 'Task 1', assignee: 'Aditya Raj', status: 'Done' },
    ];

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
            <div className={`w-full p-6 rounded-2xl border border-[#5c606a]/20 ${getStatusStyles()}`}>
                <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center bg-white rounded-md border border-[#5c606a] p-3">
                        <div className="flex items-center gap-2">
                            <FileText className="w-6 h-6 text-[#5c606a]" />
                            <span className="text-[#5c606a] text-xl">{title}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 bg-white rounded-md border border-[#5c606a] p-3">
                        <User className="w-6 h-6 text-[#5c606a]" />
                        <span className="text-[#5c606a] text-xl">{assignee}</span>
                    </div>
                    <div className={`flex items-center gap-2 bg-white rounded-md p-6 border ${getStatusStyles()}`}>
                        <div className={`w-3 h-3 rounded-full ${status === 'Not Started' ? 'bg-[#ffae00]' : status === 'In progress' ? 'bg-[#534feb]' : 'bg-[#069855]'}`} />
                        <span className="text-xl">{status}</span>
                    </div>
                </div>
            </div>
        );
    };

    const pendingTasks = tasks.filter(task => task.status === 'Not Started');
    const inProgressTasks = tasks.filter(task => task.status === 'In progress');
    const completedTasks = tasks.filter(task => task.status === 'Done');

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-[15%] fixed top-0 left-0 h-full bg-white shadow-lg z-10">
                <AdminSidebar />
            </div>

            {/* Main Content */}
            <div className="flex-1 ml-[15%] p-16 bg-white">
                <AdminHeader />

                {/* Search and Filters */}
                <div className="flex gap-6 mb-16">
                    <div className="flex-1 flex items-center gap-3 px-6 py-4 rounded-xl border border-black/20">
                        <Search className="text-black/40" />
                        <input
                            type="text"
                            placeholder="Search by Date, Time, Status..."
                            className="flex-1 bg-transparent text-black/40 outline-none"
                        />
                    </div>
                    <div className="px-6 py-4 rounded-xl border border-black/20">
                        <span className="text-black">Date</span>
                    </div>
                    <div className="px-6 py-4 rounded-xl border border-black/20 flex items-center gap-3">
                        <span className="text-black">13 Jan, 2024</span>
                    </div>
                    <div className="px-6 py-4 rounded-xl border border-black/20 flex items-center gap-3">
                        <span className="text-black">Export CSV</span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-6 mb-8">
                    <button className="flex items-center gap-3 px-6 py-4 bg-[#534feb] text-white rounded-2xl">
                        <span className="text-xl font-medium">New Task</span>
                        <Plus className="w-6 h-6" />
                    </button>

                    <div className="flex items-center gap-3 flex-1">
                        <div className="flex-1 flex justify-between items-center px-6 py-4 rounded-2xl border border-[#48ad6d]">
                            <div className="flex items-center gap-2">
                                <CheckCircle className="text-[#48ad6d]" />
                                <span className="text-[#39434f] text-xl">Completed</span>
                            </div>
                            <span className="text-[#48ad6d] text-xl">{completedTasks.length}</span>
                        </div>

                        <div className="flex-1 flex justify-between items-center px-6 py-4 rounded-2xl border border-[#3c70f5]">
                            <div className="flex items-center gap-2">
                                <Clock className="text-[#3c70f5]" />
                                <span className="text-[#39434f] text-xl">Inprogress</span>
                            </div>
                            <span className="text-[#3c70f5] text-xl">{inProgressTasks.length}</span>
                        </div>

                        <div className="flex-1 flex justify-between items-center px-6 py-4 rounded-2xl border border-[#f5ab3b]">
                            <div className="flex items-center gap-2">
                                <AlertCircle className="text-[#f5ab3b]" />
                                <span className="text-[#39434f] text-xl">Pending</span>
                            </div>
                            <span className="text-[#f5ab3b] text-xl">{pendingTasks.length}</span>
                        </div>

                        <div className="flex-1 flex justify-between items-center px-6 py-4 rounded-2xl border border-[#ff7262]">
                            <div className="flex items-center gap-2">
                                <XCircle className="text-[#ff7262]" />
                                <span className="text-[#39434f] text-xl">Canceled</span>
                            </div>
                            <span className="text-[#ff7262] text-xl">1</span>
                        </div>
                    </div>
                </div>

                {/* Status Headers */}
                <div className="flex gap-6 mb-8">
                    <div className="flex-1 px-6 py-4 rounded-2xl border border-[#ffae00]">
                        <span className="text-[#ffae00] text-2xl">Pending</span>
                    </div>
                    <div className="flex-1 px-6 py-4 rounded-2xl border border-[#534feb]">
                        <span className="text-[#534feb] text-2xl">In Progress</span>
                    </div>
                    <div className="flex-1 px-6 py-4 rounded-2xl border border-[#069855]">
                        <span className="text-[#069855] text-2xl">Completed</span>
                    </div>
                </div>

                {/* Task Grid */}
                <div className="grid grid-cols-3 gap-6">
                    {/* Pending Column */}
                    <div className="space-y-6">
                        {pendingTasks.map(task => (
                            <TaskCard key={task.id} {...task} />
                        ))}
                    </div>

                    {/* In Progress Column */}
                    <div className="space-y-6">
                        {inProgressTasks.map(task => (
                            <TaskCard key={task.id} {...task} />
                        ))}
                    </div>

                    {/* Completed Column */}
                    <div className="space-y-6">
                        {completedTasks.map(task => (
                            <TaskCard key={task.id} {...task} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskManagement;
