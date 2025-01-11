import React, { useState } from 'react';
import { Search, Calendar, Download, TrendingUp } from 'lucide-react';
import AdminSidebar from '../component/AdminSidebar';
import AdminHeader from '../component/AdminHeader';

const AdminPerformance = () => {
    // Sample data - replace with API data
    const [employees] = useState([
        {
            empId: 'PP_03',
            department: 'Information Technology',
            name: 'Aditya Kumar',
            designation: 'Frontend Developer',
        },
        // Add more employee data as needed
    ]);

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDate, setSelectedDate] = useState('13 Jan, 2024');

    // Filter function for search
    const filteredEmployees = employees.filter(emp =>
        Object.values(emp).some(value =>
            value.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar - Fixed width */}
            <div className="w-64 flex-shrink-0">
                <AdminSidebar />
            </div>

            {/* Main Content - Separate scrolling area */}
            <div className="flex-1">
                {/* Header - Fixed at top */}
                <div className="sticky px-14 z-10 top-3">
                    <AdminHeader />
                </div>

                {/* Page Content - Scrollable */}
                <main className="px-14">
                    <div className="space-y-8 px-12 py-8 bg-white rounded-2xl">
                        <h1 className="text-2xl font-medium text-black">User Performance</h1>

                        {/* Controls */}
                        <div className="flex gap-6 items-center">
                            {/* Search */}
                            <div className="relative flex-1">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search by Date, Time, Status..."
                                    className="w-full h-14 pl-12 pr-4 rounded-xl border border-black/20 shadow-sm"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            {/* Date Selector */}
                            <button className="h-14 px-6 rounded-xl border border-black/20 shadow-sm flex items-center gap-2">
                                <span className="text-black">Date</span>
                                <Calendar size={20} className="text-gray-500" />
                            </button>

                            {/* Selected Date */}
                            <div className="h-14 px-6 rounded-xl border border-black/20 shadow-sm flex items-center gap-2">
                                <Calendar size={20} className="text-gray-500" />
                                <span className="text-black">{selectedDate}</span>
                            </div>

                            {/* Export Button */}
                            <button className="h-14 px-6 rounded-xl border border-black/20 shadow-sm flex items-center gap-2">
                                <span className="text-black">Export CSV</span>
                                <Download size={20} className="text-gray-500" />
                            </button>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto bg-white rounded-lg shadow">
                            <table className="w-full">
                                <thead>
                                    <tr>
                                        {['Emp. ID', 'Department', 'Employee Name', 'Designation', 'User Performance'].map((header) => (
                                            <th key={header} className="px-4 py-5 text-left bg-gray-100 text-gray-600 text-2xl font-medium rounded-lg">
                                                {header}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredEmployees.map((employee, index) => (
                                        <tr key={index} className="border-b border-gray-100">
                                            <td className="px-4 py-5 text-xl font-light text-gray-600">{employee.empId}</td>
                                            <td className="px-4 py-5 text-xl font-light text-gray-600">{employee.department}</td>
                                            <td className="px-4 py-5 text-xl font-light text-gray-600">{employee.name}</td>
                                            <td className="px-4 py-5 text-xl font-light text-gray-600">{employee.designation}</td>
                                            <td className="px-4 py-5">
                                                <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-1 rounded-lg">
                                                    Track
                                                    <TrendingUp size={20} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminPerformance;