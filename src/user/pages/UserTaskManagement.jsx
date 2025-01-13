import React, { useState, useEffect } from "react";
import {
  Search,
  Calendar,
  FileDown,
  FileText,
  Check,
  ChevronDown,
} from "lucide-react";
import UserSidebar from "../components/UserSideBar";
import UserHeader from "../components/UserHeader";
import { getAllTask } from "../../commonComponent/Api";
import { updateTaskStatus } from "../../commonComponent/Api"; // Adjust the path based on your project structure

const TaskDashboard = () => {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks when the component is mounted
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getAllTask();
        setTasks(data); // Assuming `data` is an array of tasks
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case "Low":
        return "bg-[#e6f5ee] text-[#069855] border-[#069855]";
      case "Medium":
        return "bg-[#f5f2e6] text-[#ffae00] border-[#ffae00]";
      case "High":
        return "bg-[#f5e6e7] text-[#d62525] border-[#d62525]";
      default:
        return "bg-gray-100 text-gray-600 border-gray-400";
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Completed":
        return "bg-[#e6f5ee] text-[#069855] border-[#069855]";
      case "In Progress":
        return "bg-[#e9e6f5] text-[#534feb] border-[#534feb]";
      case "Pending":
        return "bg-[#f5efe6] text-[#ffae00] border-[#ffae00]";
      default:
        return "bg-white text-gray-600 border-gray-300";
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      // Update status locally for immediate feedback
      setTasks(
        tasks.map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task
        )
      );

      // Call the API to update the status
      await updateTaskStatus(taskId, newStatus);
      console.log(`Task ${taskId} status updated to ${newStatus}`);
    } catch (error) {
      console.error(`Error updating task ${taskId} status:`, error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-[250px] flex-shrink-0">
        <UserSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <UserHeader />

        {/* Content */}
        <div className="p-16 bg-white flex-1 overflow-y-auto">
          {/* Statistics Cards */}
          <div className="flex gap-6 mb-14">
            <div className="p-6 border border-black/20 rounded-xl flex items-center justify-between min-w-[250px]">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 border border-black/20 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <span className="text-base font-light">Total Task Assign</span>
              </div>
              <span className="text-5xl font-medium">{tasks.length}</span>
            </div>
            <div className="p-6 border border-[#069855] rounded-xl flex items-center justify-between min-w-[250px]">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 border border-black/20 rounded-lg flex items-center justify-center">
                  <Check className="w-5 h-5" />
                </div>
                <span className="text-[#069855] text-base font-light">
                  Total Task Done
                </span>
              </div>
              <span className="text-[#069855] text-5xl font-medium">
                {tasks.filter((task) => task.status === "Completed").length}
              </span>
            </div>
          </div>

          {/* Task List Section */}
          <div className="mt-14">
            <h2 className="text-[#5c606a] text-2xl font-medium mb-6">
              Last Applied
            </h2>
            <div className="grid grid-cols-6 gap-2 mb-3">
              {["Task", "Priority", "Due Date", "Description", "Status", "Comment"].map((header) => (
                <div
                  key={header}
                  className="px-6 py-[22px] bg-neutral-100 rounded-lg shadow-sm border-l-2 text-[#5c606a] text-2xl font-medium"
                >
                  {header}
                </div>
              ))}
            </div>
            {tasks.map((task) => (
              <div
                key={task.id}
                className="grid grid-cols-6 gap-2 border-b border-black/20 py-3"
              >
                <div className="px-4 py-4 text-2xl font-light">{task.name}</div>
                <div className="px-4 py-4">
                  <span
                    className={`px-3 py-1 rounded-lg border ${getPriorityStyle(
                      task.priority
                    )} text-2xl font-light`}
                  >
                    {task.priority}
                  </span>
                </div>
                <div className="px-4 py-4 text-2xl font-light">
                  {task.dueDate}
                </div>
                <div className="px-4 py-4 text-2xl font-light">
                  {task.messages}
                </div>
                <div className="px-4 py-4 relative">
                  <select
                    className={`w-full px-3 py-1 rounded-lg border ${getStatusStyle(
                      task.status
                    )} text-2xl font-light appearance-none cursor-pointer pr-10`}
                    value={task.status}
                    onChange={(e) =>
                      handleStatusChange(task.id, e.target.value)
                    }
                  >
                    <option value="COMPLETED">Completed</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="Pending">Pending</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600 pointer-events-none" />
                </div>
                <div className="px-4 py-4 flex items-center relative">
                  <input
                    type="text"
                    placeholder="Comment here"
                    className="w-full h-14 px-4 py-2 border border-black rounded-lg text-base font-light pr-12"
                  />
                  <button className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-[#534feb] rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDashboard;
