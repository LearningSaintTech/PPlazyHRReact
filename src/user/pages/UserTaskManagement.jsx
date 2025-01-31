import React, { useState, useEffect } from "react";
import {
  Search,
  Calendar,
  FileDown,
  FileText,
  Check,
  ChevronDown,
  Info,

} from "lucide-react";
import UserSidebar from "../components/UserSideBar";
import UserHeader from "../components/UserHeader";
import { getAllTask } from "../../commonComponent/Api";
import { updateTaskStatus } from "../../commonComponent/Api"; // Adjust the path based on your project structure
import { useSelector } from "react-redux";

const TaskDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedDescription, setSelectedDescription] = useState(null); // State for modal
  const [currentPage, setCurrentPage] = useState(1);
  // Fetch tasks when the component is mounted
  const itemsPerPage = 5;

  // Calculate total pages


  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

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
  const totalPages = Math.ceil((tasks.length + 1) / itemsPerPage);

  // Slice tasks for the current page
  const currentTasks = tasks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const getPriorityStyle = (priority) => {
    switch (priority) {
      case "LOW":
        return "bg-[#e6f5ee] text-[#069855] border-[#069855]";
      case "Low":
        return "bg-[#e6f5ee] text-[#069855] border-[#069855]";
      case "MEDIUM":
        return "bg-[#f5f2e6] text-[#ffae00] border-[#ffae00]";
      case "Medium":
        return "bg-[#f5f2e6] text-[#ffae00] border-[#ffae00]";
      case "HIGH":
        return "bg-[#f5e6e7] text-[#d62525] border-[#d62525]";
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
      case "COMPLETED":
        return "bg-[#e6f5ee] text-[#069855] border-[#069855]";
      case "In Progress":
        return "bg-[#e9e6f5] text-[#534feb] border-[#534feb]";
      case "IN_PROGRESS":
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
      //console.log(`Task ${taskId} status updated to ${newStatus}`);
    } catch (error) {
      console.error(`Error updating task ${taskId} status:`, error);
    }
  };

  return (
    <>
      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar */}
        <div className="w-[15%] flex-shrink-0">
          <UserSidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col px-[0.833vw]">
          {/* Header */}
          <UserHeader />

          {/* Content */}
          <div className="p-[1vw] bg-white flex-1 overflow-y-auto">
            {/* Statistics Cards */}
            <div className="flex gap-[1.25vw] mb-[2.917vw]">
              <div className="p-[1.25vw] border border-black/20 rounded-[0.625vw] flex items-center justify-between min-w-[13.021vw]">
                <div className="flex items-center gap-[0.833vw]">
                  <div className="w-[2.083vw] h-[2.083vw] border border-black/20 rounded-[0.417vw] flex items-center justify-center">
                    <FileText className="w-[1.042vw] h-[1.042vw]" />
                  </div>
                  <span className="text-[0.833vw] font-light">Total Task Assign</span>
                </div>
                <span className="text-[2.5vw] font-medium">{tasks.length}</span>
              </div>
              <div className="p-[1.25vw] border border-[#069855] rounded-[0.625vw] flex items-center justify-between min-w-[13.021vw]">
                <div className="flex items-center gap-[0.833vw]">
                  <div className="w-[2.083vw] h-[2.083vw] border border-black/20 rounded-[0.417vw] flex items-center justify-center">
                    <Check className="w-[1.042vw] h-[1.042vw]" />
                  </div>
                  <span className="text-[#069855] text-[0.833vw] font-light">
                    Total Task Done
                  </span>
                </div>
                <span className="text-[#069855] text-[2.5vw] font-medium">
                  {tasks.filter((task) => task.status === "Completed").length}
                </span>
              </div>
            </div>

            {/* Task List Section */}
            <div className="mt-[2.917vw]">
              <h2 className="text-[#5c606a] text-[1.25vw] font-medium mb-[1.25vw]">
                Last Applied
              </h2>
              <div className="grid grid-cols-6 gap-[0.417vw] mb-[0.625vw]">
                {["Task", "Priority", "Due Date", "Description", "Status", "Comment"].map((header) => (
                  <div
                    key={header}
                    className="px-[1.25vw] py-[1.146vw] bg-neutral-100 rounded-[0.417vw] shadow-sm border-l-2 text-[#5c606a] text-[1.25vw] font-medium"
                  >
                    {header}
                  </div>
                ))}
              </div>
              {currentTasks.map((task) => (
                <div
                  key={task.id}
                  className="grid grid-cols-6 gap-[0.417vw] border-b border-black/20 py-[0.625vw]"
                >
                  <div className="px-[0.833vw] py-[0.833vw] text-[1.25vw] font-light">{task.name}</div>
                  <div className="px-[0.833vw] py-[0.833vw]">
                    <span
                      className={`px-[0.625vw] py-[0.208vw] rounded-[0.417vw] border ${getPriorityStyle(
                        task.priority
                      )} text-[1.25vw] font-light`}
                    >
                      {task.priority}
                    </span>
                  </div>
                  <div className="px-[0.833vw] py-[0.833vw] text-[1.25vw] font-light">
                    {new Date(task.dueDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                  <div className="px-[0.833vw] py-[0.833vw] flex items-center gap-[0.417vw]">
                    <span className="truncate text-[1.25vw] font-light">{task.messages}</span>
                    <button
                      onClick={() => setSelectedDescription(task.messages)}
                      className="w-[1.25vw] h-[1.25vw] flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300"
                    >
                      <Info className="w-[0.833vw] h-[0.833vw] text-gray-600" />
                    </button>
                  </div>
                  {/* <div className="px-[0.833vw] py-[0.833vw] text-[1.25vw] font-light">
                  {task.messages}
                </div> */}
                  <div className="px-[0.833vw] py-[0.833vw] relative">
                    <select
                      className={`w-full px-[0.625vw] py-[0.208vw] rounded-[0.417vw] border ${getStatusStyle(
                        task.status
                      )} text-[1.25vw] font-light appearance-none cursor-pointer pr-[2.083vw]`}
                      value={task.status}
                      onChange={(e) =>
                        handleStatusChange(task.id, e.target.value)
                      }
                    >
                      <option value="COMPLETED">Completed</option>
                      <option value="IN_PROGRESS">In Progress</option>
                      <option value="Pending">Pending</option>
                    </select>
                    <ChevronDown className="absolute right-[0.625vw] top-1/2 transform -translate-y-1/2 w-[18px] h-[18px] text-gray-600 pointer-events-none" />
                  </div>
                  <div className="px-[0.833vw] py-[0.833vw] flex items-center relative">
                    <input
                      type="text"
                      placeholder="Comment here"
                      className="w-full h-[2.917vw] px-[0.833vw] py-[0.417vw] border border-black rounded-[0.417vw] text-[0.833vw] font-light pr-[2.5vw]"
                    />
                    <button className="absolute right-[0.417vw] top-1/2 transform -translate-y-1/2 w-[0.417vw] h-[0.417vw] bg-[#534feb] rounded-full flex items-center justify-center">
                      <Check className="w-[18px] h-[18px] text-white" />
                    </button>
                  </div>
                </div>
              ))}

            </div>
          </div>
        </div>
        {selectedDescription && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-[2vw] rounded-lg w-[50vw] max-h-[70vh] overflow-auto">
              <h3 className="text-lg font-medium mb-4">Full Description</h3>
              <p className="text-gray-800 text-[1vw]">{selectedDescription}</p>
              <button
                onClick={() => setSelectedDescription(null)}
                className="mt-4 px-4 py-2 bg-[#534feb] text-white rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        )}

      </div>
      <div className="pagination-controls flex justify-center gap-4 mt-4">
       
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded-lg disabled:opacity-50"
        >
          <img src="arrow.png" alt="" width={10} height={10}/>
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border rounded-lg disabled:opacity-50"
        >
          <img src="rightarrow.png" alt="#" width={10} height={10}/>
        </button>
       
      </div>
    </>);
};

export default TaskDashboard;
