import React, { useState } from 'react';
import { Calendar, CheckCircle, User, Flag } from 'lucide-react';
import { createTask } from "../../commonComponent/Api";

const TaskForm = () => {
    const [status, setStatus] = useState('');
    const [priority, setPriority] = useState('');
    const [assignee, setAssignee] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [messages, setTaskDescription] = useState('');
    const [taskName, setTaskName] = useState('');  // Ensure this is set

    const [file, setFile] = useState(null);

    const handleSave = async (e) => {
        e.preventDefault();

        // Make sure all fields are filled
        if (!taskName || !priority || !assignee || !dueDate || !messages) {
            alert('Please fill in all fields!');
            return;
        }

        const taskData = {
            taskName,
            priority,
            userId: assignee,
            messages,
            dueDate,
        };

        try {
            console.log("taskData", taskData);
            const response = await createTask(taskData);
            console.log('Task Created:', response);
            alert('Task successfully created!');
        } catch (error) {
            console.error('Error creating task:', error);
            alert('Failed to create task. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSave} className="w-full max-w-[37.917vw] p-[1.667vw] bg-white rounded-[0.833vw]">
            {/* Header */}
            <h1 className="text-[2.083vw] font-bold text-[#848892] mb-[2.5vw]">Create Task</h1>

            {/* Form Fields */}
            <div className="flex gap-[2.083vw] mb-[2.5vw]">
                <div className="flex flex-col gap-[0.417vw]">
                    <div className="flex items-center gap-[0.625vw] px-[0.625vw] py-[0.417vw]">
                        <CheckCircle className="w-[1.25vw] h-[1.25vw] text-[#848892]" />
                        <span className="text-[1.042vw] text-[#848892]">Status</span>
                    </div>
                    <div className="flex items-center gap-[0.625vw] px-[0.625vw] py-[0.417vw]">
                        <CheckCircle className="w-[1.25vw] h-[1.25vw] text-[#848892]" />
                        <span className="text-[1.042vw] text-[#848892]">Task Name</span>
                    </div>
                    <div className="flex items-center gap-[0.625vw] px-[0.625vw] py-[0.417vw]">
                        <Flag className="w-[1.25vw] h-[1.25vw] text-[#848892]" />
                        <span className="text-[1.042vw] text-[#848892]">Priority</span>
                    </div>
                    <div className="flex items-center gap-[0.625vw] px-[0.625vw] py-[0.417vw]">
                        <User className="w-[1.25vw] h-[1.25vw] text-[#848892]" />
                        <span className="text-[1.042vw] text-[#848892]">Assignee</span>
                    </div>
                    <div className="flex items-center gap-[0.625vw] px-[0.625vw] py-[0.417vw]">
                        <Calendar className="w-[1.25vw] h-[1.25vw] text-[#848892]" />
                        <span className="text-[1.042vw] text-[#848892]">Due</span>
                    </div>
                </div>

                <div className="flex flex-col gap-[0.625vw] flex-1 mt-[0.417vw]">
                    <div className="flex items-center gap-[0.625vw] px-[0.625vw] py-[1vw] border border-black/20 rounded">
                    </div>
                    <div className="flex items-center gap-[0.625vw] px-[0.625vw] py-[0.417vw] border border-black/20 rounded">
                        <input
                            type="text"
                            placeholder="Task Name"
                            value={taskName} // Make sure value is controlled by state
                            onChange={(e) => setTaskName(e.target.value)} // Update state on change
                            className="w-full text-[0.833vw] font-light text-black bg-transparent placeholder:text-black/40 outline-none"
                            required
                        />
                    </div>
                    <div className="flex items-center gap-[0.625vw] px-[0.625vw] py-[0.417vw] border border-black/20 rounded">
                        <select
                            className="w-full text-[0.833vw] font-light text-black bg-transparent outline-none"
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            required
                        >
                            <option value="">Select Priority</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                    </div>
                    <div className="flex items-center gap-[0.625vw] px-[0.625vw] py-[0.417vw] border border-black/20 rounded">
                        <input
                            type="text"
                            placeholder="Assignee"
                            value={assignee}
                            onChange={(e) => setAssignee(e.target.value)}
                            className="w-full text-[0.833vw] font-light text-black bg-transparent placeholder:text-black/40 outline-none"
                            required
                        />
                    </div>
                    <div className="flex items-center gap-[0.625vw] px-[0.625vw] py-[0.417vw] border border-black/20 rounded">
                        <input
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            className="w-full text-[0.833vw] font-light text-black bg-transparent outline-none"
                            required
                        />
                    </div>
                </div>
            </div>

            {/* Task Description */}
            <div className="mb-[2.5vw]">
                <h2 className="text-[1.25vw] font-medium text-[#5c606a] mb-[0.833vw]">About this task</h2>
                <div className="p-[1.25vw] border border-black/20 rounded-[0.625vw] shadow-[4px_4px_40px_-5px_rgba(0,0,0,0.05)]">
                    <input
                        type="text"
                        placeholder="Task Description here"
                        value={messages}
                        onChange={(e) => setTaskDescription(e.target.value)}
                        className="w-full text-[0.833vw] font-light text-black/40 bg-transparent outline-none"
                        required
                    />
                </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
                <button
                    type="submit"
                    className="px-[1.667vw] py-[0.417vw] bg-[#534feb] text-white text-[1.042vw] font-medium rounded-[0.417vw]"
                >
                    Save
                </button>
            </div>
        </form>
    );
};

export default TaskForm;
