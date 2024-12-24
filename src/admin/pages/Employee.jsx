import React, { useState, useEffect } from 'react';
import AdminHeader from '../component/AdminHeader';
import AdminSidebar from '../component/AdminSidebar';
import { FaArrowRight } from "react-icons/fa6";
import { IoCloudUploadOutline } from "react-icons/io5";

// Employee data (unchanged)
const employeeData = [
  { id: 'PP_01', department: 'Information Technology', name: 'Aditya Kumar', designation: 'Frontend Developer', phone: '+91 1234567891' },
  { id: 'PP_02', department: 'Human Resources', name: 'Priya Sharma', designation: 'HR Manager', phone: '+91 9876543210' },
  { id: 'PP_03', department: 'Information Technology', name: 'Aditya Kumar', designation: 'Frontend Developer', phone: '+91 1234567891' },
  { id: 'PP_04', department: 'Finance', name: 'Ravi Mehta', designation: 'Accountant', phone: '+91 1122334455' },
  { id: 'PP_05', department: 'Marketing', name: 'Sneha Gupta', designation: 'Marketing Manager', phone: '+91 6677889900' },
  { id: 'PP_06', department: 'Information Technology', name: 'Anil Singh', designation: 'Backend Developer', phone: '+91 2233445566' },
  { id: 'PP_07', department: 'Sales', name: 'Rohit Verma', designation: 'Sales Executive', phone: '+91 4455667788' },
  { id: 'PP_08', department: 'Information Technology', name: 'Kriti Sharma', designation: 'UI/UX Designer', phone: '+91 9988776655' },
  { id: 'PP_09', department: 'Human Resources', name: 'Ananya Joshi', designation: 'HR Executive', phone: '+91 5566778899' },
  { id: 'PP_10', department: 'Finance', name: 'Sunil Yadav', designation: 'Accountant', phone: '+91 1122334455' },
  { id: 'PP_11', department: 'Marketing', name: 'Niharika Patel', designation: 'SEO Specialist', phone: '+91 6677889900' },
  { id: 'PP_12', department: 'Information Technology', name: 'Rajesh Kumar', designation: 'Full Stack Developer', phone: '+91 1234567891' },
  { id: 'PP_13', department: 'Sales', name: 'Sandeep Singh', designation: 'Sales Manager', phone: '+91 2233445566' },
  { id: 'PP_14', department: 'Finance', name: 'Amit Agarwal', designation: 'Finance Analyst', phone: '+91 3344556677' },
  { id: 'PP_15', department: 'Human Resources', name: 'Sonia Dubey', designation: 'Recruitment Specialist', phone: '+91 9988776655' },
  { id: 'PP_16', department: 'Marketing', name: 'Meera Soni', designation: 'Content Writer', phone: '+91 2233445566' },
  { id: 'PP_17', department: 'Sales', name: 'Vikas Chauhan', designation: 'Sales Coordinator', phone: '+91 4455667788' },
  { id: 'PP_18', department: 'Information Technology', name: 'Neha Patel', designation: 'DevOps Engineer', phone: '+91 9988776655' },
  { id: 'PP_19', department: 'Human Resources', name: 'Ashish Rawat', designation: 'HR Manager', phone: '+91 6677889900' },
  { id: 'PP_20', department: 'Finance', name: 'Pooja Nair', designation: 'Financial Controller', phone: '+91 1122334455' },
  { id: 'PP_21', department: 'Sales', name: 'Kavita Reddy', designation: 'Sales Executive', phone: '+91 2233445566' },
  { id: 'PP_22', department: 'Marketing', name: 'Kiran Verma', designation: 'Social Media Manager', phone: '+91 9988776655' },
  { id: 'PP_23', department: 'Information Technology', name: 'Shyam Reddy', designation: 'System Administrator', phone: '+91 4455667788' },
  { id: 'PP_24', department: 'Human Resources', name: 'Pallavi Sharma', designation: 'Employee Relations', phone: '+91 2233445566' },
  { id: 'PP_25', department: 'Finance', name: 'Vivek Choudhary', designation: 'Tax Consultant', phone: '+91 1122334455' },
  { id: 'PP_26', department: 'Sales', name: 'Renu Mehra', designation: 'Sales Head', phone: '+91 5566778899' },
  { id: 'PP_27', department: 'Information Technology', name: 'Sandeep Kumar', designation: 'Cloud Engineer', phone: '+91 2233445566' },
  { id: 'PP_28', department: 'Marketing', name: 'Vinay Gupta', designation: 'Digital Marketing Manager', phone: '+91 4455667788' },
  { id: 'PP_29', department: 'Sales', name: 'Tanuja Bhardwaj', designation: 'Sales Lead', phone: '+91 5566778899' },
  { id: 'PP_30', department: 'Human Resources', name: 'Aarti Patil', designation: 'Training & Development', phone: '+91 6677889900' },
];

const AdminEmployeeDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All Department');
  const [showPopup, setShowPopup] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = { hour: '2-digit', minute: '2-digit' };
      setCurrentTime(now.toLocaleTimeString([], options));
    };
    const interval = setInterval(updateTime, 1000);
    updateTime();
    return () => clearInterval(interval);
  }, []);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleDepartmentChange = (e) => setSelectedDepartment(e.target.value);

  const filteredEmployees = employeeData.filter((emp) => {
    const matchesSearch =
      searchTerm === '' ||
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'All Department' || emp.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const openPopup = (employee) => {
    setSelectedEmployee(employee);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedEmployee(null);
  };

  const todayDate = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-[15%]">
        <AdminSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 px-8 pt-8 pb-4 overflow-auto bg-gray-100 rounded-tl-3xl">
        <AdminHeader />
        {/* Content */}
        <div className="bg-white py-8 px-12 rounded-lg shadow-md">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-2xl font-semibold">
              Welcome back, <span className="text-indigo-500">Admin</span>
            </h2>
            <p className="text-indigo-500 font-mono text-lg">{currentTime}</p>
          </div>

          {/* Search & Filters */}
          <div className="flex items-center mb-8 space-x-8">
            <input
              type="text"
              placeholder="Search by Name, ID, Designation..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="border border-gray-300 rounded-lg p-3 w-96 focus:outline-indigo-500 shadow-sm"
            />
            <select
              value={selectedDepartment}
              onChange={handleDepartmentChange}
              className="border border-gray-300 rounded-lg p-3 w-60 focus:outline-indigo-500 shadow-sm"
            >
              <option>All Department</option>
              <option>Information Technology</option>
              <option>Human Resources</option>
              <option>Sales</option>
              <option>Finance</option>
              <option>Marketing</option>
            </select>
            <div className="border border-gray-300 rounded-lg p-3 w-40 bg-gray-50 text-gray-700 shadow-sm text-center">
              {todayDate}
            </div>
            <button className="flex items-center gap-2 bg-indigo-500 text-white px-6 py-3 rounded-lg hover:bg-indigo-600 shadow-sm">
              <IoCloudUploadOutline />
              Export CSV
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="table-auto w-full bg-white rounded-lg shadow-sm overflow-hidden">
              <thead>
                <tr className="bg-gray-100 text-gray-700 text-left">
                  <th className="px-6 py-4">Emp. ID</th>
                  <th className="px-6 py-4">Department</th>
                  <th className="px-6 py-4">Employee Name</th>
                  <th className="px-6 py-4">Designation</th>
                  <th className="px-6 py-4">Phone No.</th>
                  <th className="px-6 py-4">View More</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4">{employee.id}</td>
                    <td className="px-6 py-4">{employee.department}</td>
                    <td className="px-6 py-4">{employee.name}</td>
                    <td className="px-6 py-4">{employee.designation}</td>
                    <td className="px-6 py-4">{employee.phone}</td>
                    <td className="px-6 py-4">
                      <button
                        className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
                        onClick={() => openPopup(employee)}
                      >
                        <FaArrowRight />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Popup */}
          {showPopup && selectedEmployee && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-8 rounded-lg max-w-lg shadow-lg">
                <h2 className="text-2xl font-bold text-indigo-500 mb-4 text-center">
                  Employee Details
                </h2>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>Emp. ID:</strong> {selectedEmployee.id}
                  </div>
                  <div>
                    <strong>Department:</strong> {selectedEmployee.department}
                  </div>
                  <div>
                    <strong>Name:</strong> {selectedEmployee.name}
                  </div>
                  <div>
                    <strong>Designation:</strong> {selectedEmployee.designation}
                  </div>
                  <div>
                    <strong>Phone:</strong> {selectedEmployee.phone}
                  </div>
                </div>
                <div className="flex justify-end mt-6">
                  <button
                    className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                    onClick={closePopup}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminEmployeeDashboard;
