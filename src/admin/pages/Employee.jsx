import React, { useState, useEffect } from 'react';
import AdminHeader from '../component/AdminHeader';
import AdminSidebar from '../component/AdminSidebar';
import { FaArrowRight } from "react-icons/fa6";
import { IoCloudUploadOutline } from "react-icons/io5";
import { Search, Calendar, Download } from "lucide-react";
import { getAllEmployee, updateEmployee } from "../../commonComponent/Api";

// Employee data (unchanged)


const AdminEmployeeDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All Department');
  const [showPopup, setShowPopup] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [currentTime, setCurrentTime] = useState('');
  const [employeeData, setEmployeeData] = useState([]); // State for employee data

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
    setSelectedEmployee({ ...employee });  // Make a copy to avoid direct mutation
    setShowPopup(true);
  };

  // Close employee details popup
  const closePopup = () => {
    setShowPopup(false);
    setSelectedEmployee(null);
  };

  const todayDate = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedEmployee((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log('Updated Employee Data:', selectedEmployee);
    updateEmployee(selectedEmployee.employeeId, selectedEmployee)
      .then(response => {
        console.log("Employee updated successfully:", response);
      })
      .catch(error => {
        console.error("Failed to update employee:", error);
      });
  };





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
                    <td className="px-6 py-4">{employee.employeeId}</td>
                    <td className="px-6 py-4">{employee.department}</td>
                    <td className="px-6 py-4">{employee.firstName}</td>
                    <td className="px-6 py-4">{employee.designation}</td>
                    <td className="px-6 py-4">{employee.phno}</td>
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
          {showPopup && selectedEmployee && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-8 rounded-lg max-w-6xl shadow-lg w-[90%] overflow-y-auto h-[90%]">
                <h2 className="text-2xl font-bold text-indigo-500 mb-6 text-center">
                  Employee Details
                </h2>
                <div className="grid grid-cols-3 gap-6 text-sm">
                  {/* Personal Information */}
                  <div>
                    <label className="font-bold">Emp. ID:</label>
                    <input
                      type="text"
                      value={selectedEmployee.employeeId || "N/A"}
                      className="border w-full px-2 py-1 rounded"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="font-bold">First Name:</label>
                    <input
                      type="text"
                      name="firstName"
                      value={selectedEmployee.firstName}
                      className="border w-full px-2 py-1 rounded"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="font-bold">Surname:</label>
                    <input
                      type="text"
                      name="surname"
                      value={selectedEmployee.surname}
                      className="border w-full px-2 py-1 rounded"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="font-bold">Email:</label>
                    <input
                      type="email"
                      name="email"
                      value={selectedEmployee.email}
                      className="border w-full px-2 py-1 rounded"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="font-bold">Phone:</label>
                    <input
                      type="text"
                      name="phno"
                      value={selectedEmployee.phno}
                      className="border w-full px-2 py-1 rounded"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="font-bold">DOB:</label>
                    <input
                      type="date"
                      name="dob"
                      value={selectedEmployee.dob}
                      className="border w-full px-2 py-1 rounded"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="font-bold">Gender:</label>
                    <input
                      type="text"
                      name="gender"
                      value={selectedEmployee.gender}
                      className="border w-full px-2 py-1 rounded"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="font-bold">Address:</label>
                    <input
                      type="text"
                      name="address"
                      value={selectedEmployee.address}
                      className="border w-full px-2 py-1 rounded"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="font-bold">City:</label>
                    <input
                      type="text"
                      name="city"
                      value={selectedEmployee.city}
                      className="border w-full px-2 py-1 rounded"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="font-bold">State:</label>
                    <input
                      type="text"
                      name="state"
                      value={selectedEmployee.state}
                      className="border w-full px-2 py-1 rounded"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="font-bold">Pin Code:</label>
                    <input
                      type="text"
                      name="pinCode"
                      value={selectedEmployee.pinCode}
                      className="border w-full px-2 py-1 rounded"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="font-bold">Blood Group:</label>
                    <input
                      type="text"
                      name="bloodGroup"
                      value={selectedEmployee.bloodGroup}
                      className="border w-full px-2 py-1 rounded"
                      onChange={handleChange}
                    />
                  </div>

                  {/* Employment Information */}
                  <div>
                    <label className="font-bold">Date of Joining:</label>
                    <input
                      type="date"
                      name="dateOfJoining"
                      value={selectedEmployee.dateOfJoining || ""}
                      className="border w-full px-2 py-1 rounded"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="font-bold">Department:</label>
                    <input
                      type="text"
                      name="department"
                      value={selectedEmployee.department || " "}
                      className="border w-full px-2 py-1 rounded"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="font-bold">Designation:</label>
                    <input
                      type="text"
                      name="designation"
                      value={selectedEmployee.designation || ""}
                      className="border w-full px-2 py-1 rounded"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="font-bold">Shift:</label>
                    <input
                      type="text"
                      name="shift"
                      value={selectedEmployee.shift || ""}
                      className="border w-full px-2 py-1 rounded"
                      onChange={handleChange}
                    />
                  </div>

                  {/* Financial Details */}
                  <div>
                    <label className="font-bold">Salary:</label>
                    <input
                      type="number"
                      name="salary"
                      value={selectedEmployee.salary}
                      className="border w-full px-2 py-1 rounded"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="font-bold">CL Balance:</label>
                    <input
                      type="number"
                      name="clBalance"
                      value={selectedEmployee.clBalance}
                      className="border w-full px-2 py-1 rounded"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="font-bold">EL Balance:</label>
                    <input
                      type="number"
                      name="elBalance"
                      value={selectedEmployee.elBalance}
                      className="border w-full px-2 py-1 rounded"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="font-bold">Bank Name:</label>
                    <input
                      type="text"
                      name="bankName"
                      value={selectedEmployee.bankName}
                      className="border w-full px-2 py-1 rounded"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="font-bold">Bank Branch:</label>
                    <input
                      type="text"
                      name="bankBranch"
                      value={selectedEmployee.bankBranch}
                      className="border w-full px-2 py-1 rounded"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="font-bold">Account Holder:</label>
                    <input
                      type="text"
                      name="accountHolder"
                      value={selectedEmployee.accountHolder}
                      className="border w-full px-2 py-1 rounded"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="font-bold">Account Number:</label>
                    <input
                      type="text"
                      name="accountNumber"
                      value={selectedEmployee.accountNumber}
                      className="border w-full px-2 py-1 rounded"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="font-bold">IFSC Code:</label>
                    <input
                      type="text"
                      name="ifscCode"
                      value={selectedEmployee.ifscCode}
                      className="border w-full px-2 py-1 rounded"
                      onChange={handleChange}
                    />
                  </div>

                  {/* Document Links */}
                  <div className="col-span-3">
                    <label className="font-bold">Aadhar Card Photo:</label>
                    <a
                      href={selectedEmployee.aadharCardPhoto}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-500 underline ml-2"
                    >
                      View Photo
                    </a>
                  </div>
                  <div className="col-span-3">
                    <label className="font-bold">PAN Card Photo:</label>
                    <a
                      href={selectedEmployee.pancardPhoto}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-500 underline ml-2"
                    >
                      View Photo
                    </a>
                  </div>
                  <div className="col-span-3">
                    <label className="font-bold">Passbook Photo:</label>
                    <a
                      href={selectedEmployee.passbookPhoto}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-500 underline ml-2"
                    >
                      View Photo
                    </a>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-end mt-8 gap-4">
                  <button
                    className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                    onClick={closePopup}
                  >
                    Close
                  </button>
                </div>

                <div className="flex justify-end mt-8 gap-4">
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    onClick={handleSave}
                  >
                    Save Changes
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
