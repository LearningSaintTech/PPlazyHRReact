import React from "react";
import AdminSideBar from "../component/AdminSidebar";
import AdminHeader from "../component/AdminHeader";
import { PlusIcon, PencilIcon } from "lucide-react";

const AdminDashboard = () => {
  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div className="w-64 fixed top-0 left-0 h-full bg-white border-r">
        <AdminSideBar />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 p-6 bg-white">
        {/* Header */}
        <div className="fixed top-0 left-64 right-0 z-10 bg-white border-b">
          <AdminHeader />
        </div>

        {/* Content */}
        <div className="mt-20">
          {/* Welcome Section */}
          <div className="mt-6">
            <h1 className="text-2xl text-gray-600">
              Welcome back, <span className="text-indigo-600">Admin</span>
            </h1>
            <p className="text-sm text-gray-500 mt-1">Tue, 00:00:00 AM</p>
          </div>

          {/* Search and Filters */}
          <div className="mt-8 flex items-center gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search by Date, Time, Status..."
                className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <select className="px-4 py-2.5 border rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500">
              <option>Date</option>
              <option>Status</option>
            </select>
            <div className="relative">
              <input
                type="text"
                value="13 Jan, 2024"
                readOnly
                className="px-4 py-2.5 border rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <button className="px-6 py-2.5 bg-white border rounded-lg text-gray-700 hover:bg-gray-50 flex items-center gap-2">
              Export CSV
            </button>
          </div>

          {/* Task Actions */}
          <div className="mt-8 flex items-center gap-4">
            <button className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg flex items-center gap-2 hover:bg-indigo-700">
              <PlusIcon className="w-5 h-5" />
              New Task
            </button>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-gray-700">Completed</span>
                <span className="font-semibold text-green-600">12</span>
              </div>

              <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                <span className="text-gray-700">Inprogress</span>
                <span className="font-semibold text-indigo-600">18</span>
              </div>

              <div className="flex items-center gap-2 px-4 py-2 bg-yellow-50 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <span className="text-gray-700">Pending</span>
                <span className="font-semibold text-yellow-600">15</span>
              </div>

              <div className="flex items-center gap-2 px-4 py-2 bg-red-50 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <span className="text-gray-700">Canceled</span>
                <span className="font-semibold text-red-600">1</span>
              </div>
            </div>
          </div>

          {/* Task Columns */}
          <div className="grid grid-cols-3 gap-6 mt-8">
            {/* Pending Column */}
            <div className="bg-white rounded-lg">
              <h2 className="text-lg font-medium text-yellow-500 mb-4">Pending</h2>
              <div className="space-y-4">
                {[1, 2].map((task, index) => (
                  <div key={index} className="p-4 bg-white border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-700">Task {task}</span>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <PencilIcon className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-gray-600 mb-3">Aditya Raj</p>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                      <span className="text-yellow-500">Not Started</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* In Progress Column */}
            <div className="bg-white rounded-lg">
              <h2 className="text-lg font-medium text-indigo-500 mb-4">In Progress</h2>
              <div className="space-y-4">
                {[1, 2].map((task, index) => (
                  <div key={index} className="p-4 bg-white border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-700">Task {task}</span>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <PencilIcon className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-gray-600 mb-3">Aditya Raj</p>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                      <span className="text-indigo-500">In progress</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Completed Column */}
            <div className="bg-white rounded-lg">
              <h2 className="text-lg font-medium text-green-500 mb-4">Completed</h2>
              <div className="space-y-4">
                {[1, 2].map((task, index) => (
                  <div key={index} className="p-4 bg-white border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-700">Task {task}</span>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <PencilIcon className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-gray-600 mb-3">Aditya Raj</p>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="text-green-500">Done</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
