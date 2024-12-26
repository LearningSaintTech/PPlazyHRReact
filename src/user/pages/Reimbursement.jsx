import React, { useState, useEffect } from 'react';
import { Calendar, Upload, Search, ChevronDown, Download } from 'lucide-react';
import UserSideBar from '../components/UserSideBar';
import UserHeader from '../components/UserHeader';
import { IoCloudUploadOutline } from "react-icons/io5";

const Reimbursement = () => {
  const [category, setCategory] = useState('Electronics');
  const [description, setDescription] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [currentDay, setCurrentDay] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  const mockData = [
    { date: '13/01', category: 'Testing', description: 'I am testing.', status: 'Open', files: true },
    { date: '13/01', category: 'Testing', description: 'I am testing.', status: 'Close', files: true },
    { date: '13/01', category: 'Testing', description: 'I am testing.', status: 'Pending', files: true },
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
      const date = now.toLocaleDateString(); // Format: DD/MM/YYYY
      setCurrentTime(time);
      setCurrentDay(days[now.getDay()]);
      setCurrentDate(date);
    };

    updateDateTime();
    const timer = setInterval(updateDateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'open':
        return 'bg-green-100 text-green-600';
      case 'close':
        return 'bg-red-100 text-red-600';
      case 'pending':
        return 'bg-yellow-100 text-yellow-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
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

        {/* Content of Reimbursement */}
        <div className="p-6 bg-white rounded-lg shadow-sm">
          {/* Welcome Message and Current Day-Time */}
          <div className="mb-8">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-600 text-lg">
                  Welcome back, <span className="text-blue-500 font-semibold">Aditya</span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-blue-500 font-medium">
                  {currentDay}, {currentTime}
                </p>
              </div>
            </div>
          </div>
          {/* Search and Date Section */}
          <div className="flex gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by Name, ID, status..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <select
              className="px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="">Action</option>
              <option value="open">Open</option>
              <option value="closed">Closed</option>
              <option value="pending">Pending</option>
            </select>
            <div className="flex items-center gap-2 px-4 py-2 border rounded-lg">
              <Calendar size={20} className="text-gray-400" />
              <span>13 Jan, 2024</span>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 text-gray-600 border rounded-lg hover:bg-gray-50">
              <Download size={20} />
              Export CSV
            </button>
          </div>


          {/* Form Section */}
          <div className="mb-8">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Category and Upload Image */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Category</label>
                <div className="relative">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-2 text-sm border rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option>Electronics</option>
                    <option>Other Categories</option>
                  </select>
                  <ChevronDown className="absolute w-4 h-4 text-gray-400 right-3 top-3" />
                </div>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Upload Image</label>
                <button className="flex items-center w-full gap-2 px-4 py-2 text-sm border rounded-lg hover:bg-gray-50">
                  <Upload className="w-4 h-4 text-gray-400" />
                  Choose File
                </button>
              </div>
            </div>

            <div className="mt-6">
              <label className="block mb-2 text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write your description here..."
                className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows={4}
              />
            </div>

            <div className="flex justify-end mt-6">
              <button className="px-6 py-2 text-sm text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">
                Submit
              </button>
            </div>
          </div>

          {/* Table displaying mock data */}
          <div>
            <h2 className="mb-4 text-lg font-semibold">Last Created</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-sm text-left text-gray-500 border-b">
                    <th className="pb-3">Date</th>
                    <th className="pb-3">Category</th>
                    <th className="pb-3">Description</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3">Files</th>
                  </tr>
                </thead>
                <tbody>
                  {mockData.map((item, index) => (
                    <tr key={index} className="text-sm border-b">
                      <td className="py-4">{item.date}</td>
                      <td>{item.category}</td>
                      <td>{item.description}</td>
                      <td>
                        <span className={`px-3 py-1 rounded-full ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td>
                        <button className="text-indigo-600 hover:text-indigo-700">Open</button>
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

export default Reimbursement;