import React, { useState, useEffect } from 'react';
import AdminHeader from '../component/AdminHeader';
import AdminSidebar from '../component/AdminSidebar';
import { FaArrowRight } from "react-icons/fa6";
import { IoCloudUploadOutline } from "react-icons/io5";
import { Search, Calendar, Download, X } from "lucide-react";
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
        //console.log.log("employee", data)
      } catch (error) {
        //console.log.error('Error fetching employee data:', error);
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
      employee.empId
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
    // Ensure `searchTerm` and `employeeId` are strings before using `includes()`
    const matchesSearch =
      searchTerm === '' ||
      emp.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.empId.toString().toLowerCase().includes(searchTerm.toLowerCase()) || // Ensure employeeId is string
      emp.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment =
      selectedDepartment === 'All Department' ||
      emp.department.trim().toLowerCase() === selectedDepartment.trim().toLowerCase();

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
    //console.log.log('Updated Employee Data:', selectedEmployee);
    updateEmployee(selectedEmployee.employeeId, selectedEmployee)
      .then(response => {
        //console.log.log("Employee updated successfully:", response);
      })
      .catch(error => {
        //console.log.error("Failed to update employee:", error);
      });
    setShowPopup(false);

  };

  // Add new function for field grouping
  const renderFormGroup = (label, name, value, type = "text", disabled = false) => (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-gray-700 mb-1">{label}:</label>
      <input type={type} name={name} value={value || ""} onChange={handleChange} disabled={disabled}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ease-in-out disabled:bg-gray-100" />
    </div>
  );

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
            <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 px-4">
              <div className="bg-white rounded-lg shadow-xl w-[80%] max-h-[90vh] overflow-hidden relative">
                {/* Header */}
                <div className="bg-indigo-500 px-6 py-4 flex justify-between items-center">
                  <h2 className="text-xl font-bold text-white">Employee Details</h2>
                  <button onClick={closePopup}
                    className="text-white hover:bg-indigo-600 p-2 rounded-full transition-colors">
                    <X size={20} />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                  {/* Grid Layout */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Personal Information Section */}
                    <div className="col-span-full">
                      <h3 className="text-lg font-semibold text-indigo-600 mb-4 pb-2 border-b">
                        Personal Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {renderFormGroup("Employee ID", "employeeId", selectedEmployee.employeeId, "text", true)}
                        {renderFormGroup("Emp ID", "empId", selectedEmployee.empId)}
                        {renderFormGroup("First Name", "firstName", selectedEmployee.firstName)}
                        {renderFormGroup("Surname", "surname", selectedEmployee.surname)}
                        {renderFormGroup("Email", "email", selectedEmployee.email, "email")}
                        {renderFormGroup("Phone", "phno", selectedEmployee.phno)}
                        {renderFormGroup("Date of Birth", "dob", selectedEmployee.dob, "date")}
                        {renderFormGroup("Gender", "gender", selectedEmployee.gender)}
                      </div>
                    </div>

                    {/* Address Section */}
                    <div className="col-span-full">
                      <h3 className="text-lg font-semibold text-indigo-600 mb-4 pb-2 border-b">
                        Address Details
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {renderFormGroup("Address", "address", selectedEmployee.address)}
                        {renderFormGroup("City", "city", selectedEmployee.city)}
                        {renderFormGroup("State", "state", selectedEmployee.state)}
                        {renderFormGroup("Pin Code", "pinCode", selectedEmployee.pinCode)}
                      </div>
                    </div>

                    {/* Employment Details */}
                    <div className="col-span-full">
                      <h3 className="text-lg font-semibold text-indigo-600 mb-4 pb-2 border-b">
                        Employment Details
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {renderFormGroup("Date of Joining", "dateOfJoining", selectedEmployee.dateOfJoining,
                          "date")}
                        {renderFormGroup("Department", "department", selectedEmployee.department)}
                        {renderFormGroup("Designation", "designation", selectedEmployee.designation)}
                        {renderFormGroup("Shift", "shift", selectedEmployee.shift)}
                        {renderFormGroup("Blood Group", "bloodGroup", selectedEmployee.bloodGroup)}
                      </div>
                    </div>

                    {/* Financial Details */}
                    <div className="col-span-full">
                      <h3 className="text-lg font-semibold text-indigo-600 mb-4 pb-2 border-b">
                        Financial Details
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {renderFormGroup("Salary", "salary", selectedEmployee.salary, "number")}
                        {renderFormGroup("CL Balance", "clBalance", selectedEmployee.clBalance, "number")}
                        {renderFormGroup("EL Balance", "elBalance", selectedEmployee.elBalance, "number")}
                        {renderFormGroup("Bank Name", "bankName", selectedEmployee.bankName)}
                        {renderFormGroup("Bank Branch", "bankBranch", selectedEmployee.bankBranch)}
                        {renderFormGroup("Account Holder", "accountHolder", selectedEmployee.accountHolder)}
                        {renderFormGroup("Account Number", "accountNumber", selectedEmployee.accountNumber)}
                        {renderFormGroup("IFSC Code", "ifscCode", selectedEmployee.ifscCode)}
                      </div>
                    </div>

                    {/* Documents Section */}
                    <div className="col-span-full">
                      <h3 className="text-lg font-semibold text-indigo-600 mb-4 pb-2 border-b">
                        Documents
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <h4 className="font-semibold mb-2">Aadhar Card</h4>
                          <a href={selectedEmployee.aadharCardPhoto} target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center text-indigo-600 hover:text-indigo-800 transition-colors">
                            <Download size={16} className="mr-2" />
                            View Document
                          </a>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <h4 className="font-semibold mb-2">PAN Card</h4>
                          <a href={selectedEmployee.pancardPhoto} target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center text-indigo-600 hover:text-indigo-800 transition-colors">
                            <Download size={16} className="mr-2" />
                            View Document
                          </a>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <h4 className="font-semibold mb-2">Passbook</h4>
                          <a href={selectedEmployee.passbookPhoto} target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center text-indigo-600 hover:text-indigo-800 transition-colors">
                            <Download size={16} className="mr-2" />
                            View Document
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="border-t bg-gray-50 px-6 py-4 flex justify-end gap-4">
                  <button onClick={closePopup}
                    className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                    Cancel
                  </button>
                  <button onClick={handleSave}
                    className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors">
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
