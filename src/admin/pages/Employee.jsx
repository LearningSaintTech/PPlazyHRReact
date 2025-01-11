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
  const exportToCSV = () => {
    const header = ['Emp. ID', 'Department', 'Employee Name', 'Designation', 'Phone No.'];
    const rows = employeeData.map((employee) => [
      employee.employeeId,
      employee.department,
      employee.firstName,
      employee.designation,
      employee.phno,
    ]);

    const csvContent = [
      header.join(','), 
      ...rows.map(row => row.join(',')), 
    ].join('\n'); 

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'employee_data.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

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
    console.log("Checking employee:", emp);

    // Ensure employeeId is a string before calling .includes()
    const matchesSearch =
      searchTerm === '' ||
      emp.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.employeeId.toString().includes(searchTerm.toLowerCase()) || // Convert employeeId to string
      emp.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment = selectedDepartment === 'All Department' || emp.department.trim().toLowerCase() === selectedDepartment.trim().toLowerCase();
    console.log("emp.department.toLowerCase()", emp.department.toLowerCase())
    console.log("selectedDepartment.toLowerCase()", selectedDepartment.toLowerCase())
    console.log("matchesDepartment", matchesDepartment)




    return matchesSearch && matchesDepartment;
  });


  const openPopup = (employee) => {
    setSelectedEmployee({ ...employee });
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
    setShowPopup(false);

  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-[15%]">
        <AdminSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 px-[1.667vw] pt-[1.667vw] pb-[1.667vw] overflow-auto bg-gray-100 rounded-tl-[1.25vw]">
        <AdminHeader />
        {/* Content */}
        <div className="bg-white py-[1.667vw] px-[2.5vw] rounded-[0.417vw] shadow-md">
          <div className="mb-[1.25vw] flex justify-between items-center">
            <h2 className="text-[1.25vw] font-semibold">
              Welcome back, <span className="text-indigo-500">Admin</span>
            </h2>
            <p className="text-indigo-500 font-mono text-[0.938vw]">{currentTime}</p>
          </div>

          {/* Search & Filters */}
          <div className="flex gap-[0.833vw] mb-[1.667vw]">
            <div className="relative flex-1">
              <Search className="absolute left-[0.625vw] top-[0.625vw] text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by Name, ID, status..."
                className="w-full pl-[2.083vw] pr-[0.833vw] py-[0.417vw] border rounded-[0.417vw] focus:outline-none focus:border-blue-500"
                onChange={handleSearchChange}
                value={searchTerm}

              />
            </div>
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
            <div className="flex items-center gap-[0.417vw] px-[0.833vw] py-[0.417vw] border rounded-[0.417vw]">
              <Calendar size={20} className="text-gray-400" />
              <span>{todayDate}</span>
            </div>
            <button
              className="flex items-center gap-[0.417vw] px-[0.833vw] py-[0.417vw] text-gray-600 border rounded-[0.417vw] hover:bg-gray-50"
              onClick={exportToCSV} // Call exportToCSV function
            >
              <IoCloudUploadOutline />
              Export CSV
            </button>

          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="table-auto w-full bg-white rounded-[0.417vw] shadow-sm overflow-hidden">
              <thead>
                <tr className="bg-gray-100 text-gray-700 text-left">
                  <th className="px-[1.25vw] py-[0.833vw]">Emp. ID</th>
                  <th className="px-[1.25vw] py-[0.833vw]">Department</th>
                  <th className="px-[1.25vw] py-[0.833vw]">Employee Name</th>
                  <th className="px-[1.25vw] py-[0.833vw]">Designation</th>
                  <th className="px-[1.25vw] py-[0.833vw]">Phone No.</th>
                  <th className="px-[1.25vw] py-[0.833vw]">View More</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id} className="border-b hover:bg-gray-50">
                    <td className="px-[1.25vw] py-[0.833vw]">{employee.empId}</td>
                    <td className="px-[1.25vw] py-[0.833vw]">{employee.department}</td>
                    <td className="px-[1.25vw] py-[0.833vw]">{employee.firstName}</td>
                    <td className="px-[1.25vw] py-[0.833vw]">{employee.designation}</td>
                    <td className="px-[1.25vw] py-[0.833vw]">{employee.phno}</td>
                    <td className="px-[1.25vw] py-[0.833vw]">
                      <button
                        className="bg-indigo-500 text-white px-[0.833vw] py-[0.417vw] rounded hover:bg-indigo-600"
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
              <div className="bg-white p-[36.458vw] rounded-[0.417vw] max-w-[60vw] shadow-lg w-[90%] overflow-y-auto h-[90%]">
                <h2 className="text-[1.25vw] font-bold text-indigo-500 mb-[1.25vw] text-center">
                  Employee Details
                </h2>
                <div className="grid grid-cols-3 [1.25vw] text-[0.729vw]">
                  {/* Personal Information */}
                  <div>
                    <label className="font-bold">ID:</label>
                    <input
                      type="text"
                      value={selectedEmployee.employeeId || "N/A"}
                      className="border w-full px-[0.417vw] py-[0.208vw] rounded"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="font-bold">Emp. ID:</label>
                    <input
                      type="text"
                      name="empId"
                      value={selectedEmployee.empId}
                      onChange={handleChange}

                      className="border w-full px-2 py-1 rounded"
                    />
                  </div>
                  <div>
                    <label className="font-bold">First Name:</label>
                    <input
                      type="text"
                      name="firstName"
                      value={selectedEmployee.firstName}
                      className="border w-full px-[0.417vw] py-[0.208vw] rounded"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="font-bold">Surname:</label>
                    <input
                      type="text"
                      name="surname"
                      value={selectedEmployee.surname}
                      className="border w-full px-[0.417vw] py-[0.208vw] rounded"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="font-bold">Email:</label>
                    <input
                      type="email"
                      name="email"
                      value={selectedEmployee.email}
                      className="border w-full px-[0.417vw] py-[0.208vw] rounded"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="font-bold">Phone:</label>
                    <input
                      type="text"
                      name="phno"
                      value={selectedEmployee.phno}
                      className="border w-full px-[0.417vw] py-[0.208vw] rounded"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="font-bold">DOB:</label>
                    <input
                      type="date"
                      name="dob"
                      value={selectedEmployee.dob}
                      className="border w-full px-[0.417vw] py-[0.208vw] rounded"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="font-bold">Gender:</label>
                    <input
                      type="text"
                      name="gender"
                      value={selectedEmployee.gender}
                      className="border w-full px-[0.417vw] py-[0.208vw] rounded"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="font-bold">Address:</label>
                    <input
                      type="text"
                      name="address"
                      value={selectedEmployee.address}
                      className="border w-full px-[0.417vw] py-[0.208vw] rounded"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="font-bold">City:</label>
                    <input
                      type="text"
                      name="city"
                      value={selectedEmployee.city}
                      className="border w-full px-[0.417vw] py-[0.208vw] rounded"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="font-bold">State:</label>
                    <input
                      type="text"
                      name="state"
                      value={selectedEmployee.state}
                      className="border w-full px-[0.417vw] py-[0.208vw] rounded"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="font-bold">Pin Code:</label>
                    <input
                      type="text"
                      name="pinCode"
                      value={selectedEmployee.pinCode}
                      className="border w-full px-[0.417vw] py-[0.208vw] rounded"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="font-bold">Blood Group:</label>
                    <input
                      type="text"
                      name="bloodGroup"
                      value={selectedEmployee.bloodGroup}
                      className="border w-full px-[0.417vw] py-[0.208vw] rounded"
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
                      className="border w-full px-[0.417vw] py-[0.208vw] rounded"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="font-bold">Department:</label>
                    <input
                      type="text"
                      name="department"
                      value={selectedEmployee.department || " "}
                      className="border w-full px-[0.417vw] py-[0.208vw] rounded"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="font-bold">Designation:</label>
                    <input
                      type="text"
                      name="designation"
                      value={selectedEmployee.designation || ""}
                      className="border w-full px-[0.417vw] py-[0.208vw] rounded"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="font-bold">Shift:</label>
                    <input
                      type="text"
                      name="shift"
                      value={selectedEmployee.shift || ""}
                      className="border w-full px-[0.417vw] py-[0.208vw] rounded"
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
                      className="border w-full px-[0.417vw] py-[0.208vw] rounded"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="font-bold">CL Balance:</label>
                    <input
                      type="number"
                      name="clBalance"
                      value={selectedEmployee.clBalance}
                      className="border w-full px-[0.417vw] py-[0.208vw] rounded"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="font-bold">EL Balance:</label>
                    <input
                      type="number"
                      name="elBalance"
                      value={selectedEmployee.elBalance}
                      className="border w-full px-[0.417vw] py-[0.208vw] rounded"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="font-bold">Bank Name:</label>
                    <input
                      type="text"
                      name="bankName"
                      value={selectedEmployee.bankName}
                      className="border w-full px-[0.417vw] py-[0.208vw] rounded"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="font-bold">Bank Branch:</label>
                    <input
                      type="text"
                      name="bankBranch"
                      value={selectedEmployee.bankBranch}
                      className="border w-full px-[0.417vw] py-[0.208vw] rounded"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="font-bold">Account Holder:</label>
                    <input
                      type="text"
                      name="accountHolder"
                      value={selectedEmployee.accountHolder}
                      className="border w-full px-[0.417vw] py-[0.208vw] rounded"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="font-bold">Account Number:</label>
                    <input
                      type="text"
                      name="accountNumber"
                      value={selectedEmployee.accountNumber}
                      className="border w-full px-[0.417vw] py-[0.208vw] rounded"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="font-bold">IFSC Code:</label>
                    <input
                      type="text"
                      name="ifscCode"
                      value={selectedEmployee.ifscCode}
                      className="border w-full px-[0.417vw] py-[0.208vw] rounded"
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
                      className="text-indigo-500 underline ml-[0.417vw]"
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
                      className="text-indigo-500 underline ml-[0.417vw]"
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
                      className="text-indigo-500 underline ml-[0.417vw]"
                    >
                      View Photo
                    </a>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-end mt-[1.667vw] gap-[0.833vw]">
                  <button
                    className="bg-gray-400 text-white px-[0.833vw] py-[0.417vw] rounded hover:bg-gray-500"
                    onClick={closePopup}
                  >
                    Close
                  </button>
                </div>

                <div className="flex justify-end mt-[1.667vw] gap-[0.833vw]">
                  <button
                    className="bg-green-500 text-white px-[0.833vw] py-[0.417vw] rounded hover:bg-green-600"
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
