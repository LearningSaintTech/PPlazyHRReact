import React, { useState, useEffect } from 'react';
import { Search, Calendar, Download, TrendingUp } from 'lucide-react';
import AdminSidebar from '../component/AdminSidebar';
import AdminHeader from '../component/AdminHeader';
import { getAllEmployee, updateEmployee } from "../../commonComponent/Api";


const AdminPerformance = () => {
    const [employeeData, setEmployeeData] = useState([]); // State for employee data

    // Sample data - replace with API data

    useEffect(() => {
        const fetchEmployeeData = async () => {
            try {
                const data = await getAllEmployee(); // Fetch employee data
                setEmployeeData(data); // Set the fetched data into state
                console.log("employee", data)
            } catch (error) {
                console.error('Error fetching employee data:', error);
            }
        };
        fetchEmployeeData();
    }, []);

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDate, setSelectedDate] = useState('13 Jan, 2024');

    // Filter function for search
    const filteredEmployees = employeeData.filter(emp =>
        Object.values(emp).some(value =>
            typeof value === 'string' && value.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );
    

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar - Fixed width */}
            <div className="w-[13.333vw] flex-shrink-0">
                <AdminSidebar />
            </div>

            {/* Main Content - Separate scrolling area */}
            <div className="flex-1">
                {/* Header - Fixed at top */}
                <div className="sticky px-[2.917vw] z-10 top-[0.625vw]">
                    <AdminHeader />
                </div>

                {/* Page Content - Scrollable */}
                <main className="px-[2.917vw]">
                    <div className="space-y-8 px-[2.5vw] py-[1.667vw] bg-white rounded-[0.833vw]">
                        <h1 className="text-[1.25vw] font-medium text-black">User Performance</h1>

                        {/* Controls */}
                        <div className="flex gap-[1.25vw] items-center">
                            {/* Search */}
                            <div className="relative flex-1">
                                <Search className="absolute left-[0.833vw] top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search by Date, Time, Status..."
                                    className="w-full h-[2.917vw] pl-[2.5vw] pr-[0.833vw] rounded-[0.625vw] border border-black/20 shadow-sm"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            {/* Date Selector */}
                            <button className="h-[2.917vw] px-[1.25vw] rounded-[0.625vw] border border-black/20 shadow-sm flex items-center gap-[0.417vw]">
                                <span className="text-black">Date</span>
                                <Calendar size={20} className="text-gray-500" />
                            </button>

                            {/* Selected Date */}
                            <div className="h-[2.917vw] px-[1.25vw] rounded-[0.625vw] border border-black/20 shadow-sm flex items-center gap-2">
                                <Calendar size={20} className="text-gray-500" />
                                <span className="text-black">{selectedDate}</span>
                            </div>

                            {/* Export Button */}
                            <button className="h-[2.917vw] px-[1.25vw] rounded-[0.625vw] border border-black/20 shadow-sm flex items-center gap-2">
                                <span className="text-black">Export CSV</span>
                                <Download size={20} className="text-gray-500" />
                            </button>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto bg-white rounded-[0.417vw] shadow">
                            <table className="w-full">
                                <thead>
                                    <tr>
                                        {['Emp. ID', 'Department', 'Employee Name', 'Designation', 'User Performance'].map((header) => (
                                            <th key={header} className="px-[0.833vw] py-[1.042vw] text-left bg-gray-100 text-gray-600 text-[1.25vw] font-medium rounded-[0.417vw]">
                                                {header}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredEmployees.map((employee, index) => (
                                        <tr key={index} className="border-b border-gray-100">
                                            <td className="px-[0.833vw] py-[1.042vw] text-[1.042vw] font-light text-gray-600">{employee.empId}</td>
                                            <td className="px-[0.833vw] py-[1.042vw] text-[1.042vw] font-light text-gray-600">{employee.department}</td>
                                            <td className="px-[0.833vw] py-[1.042vw] text-[1.042vw] font-light text-gray-600">{employee.firstName}</td>
                                            <td className="px-[0.833vw] py-[1.042vw] text-[1.042vw] font-light text-gray-600">{employee.designation}</td>
                                            <td className="px-[0.833vw] py-[1.042vw] text-[1.042vw]">
                                                <button className="flex items-center gap-[0.417vw] bg-blue-600 text-white px-[0.833vw] py-[0.208vw] rounded-[0.417vw]">
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