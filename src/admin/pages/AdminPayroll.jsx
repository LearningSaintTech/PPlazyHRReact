import React, { useState, useEffect } from 'react';
import AdminSideBar from '../component/AdminSidebar';
import AdminHeader from '../component/AdminHeader'; 
import { getAllPayroll, updatePayroll } from '../../commonComponent/Api'; 

const AdminPayroll = () => {
  const [payrollData, setPayrollData] = useState([]);
  const [editMode, setEditMode] = useState(false); 
  const [currentPayroll, setCurrentPayroll] = useState(null); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 
  const [searchTerm, setSearchTerm] = useState(''); // state for search term

  const [newAllowance, setNewAllowance] = useState({ type: '', percentage: '' });
  const [newDeduction, setNewDeduction] = useState({ type: '', percentage: '' });

  useEffect(() => {
    const fetchPayroll = async () => {
      setLoading(true);
      try {
        const response = await getAllPayroll(); 
        console.log("response",response);
        setPayrollData(response); 
      } catch (error) {
        console.error('Error fetching payroll data:', error);
        setError('Failed to fetch payroll data');
      } finally {
        setLoading(false);
      }
    };

    fetchPayroll();
  }, []);

  const handleEdit = (payroll) => {
    setCurrentPayroll(payroll);
    setEditMode(true); 
  };

  const handleSave = async () => {
    if (!currentPayroll.basicSalary || !currentPayroll.bonus || !currentPayroll.payDate || !currentPayroll.ctc) {
      alert('Please fill in all the fields.');
      return;
    }

    setLoading(true);
    try {
      console.log("currentPayroll.id", currentPayroll.id);
      console.log("currentPayroll", currentPayroll);

      const response = await updatePayroll(currentPayroll.id, currentPayroll);
      console.log('Payroll updated successfully:', response);

      setPayrollData((prevData) =>
        prevData.map((payroll) =>
          payroll.id === currentPayroll.id ? response : payroll
        )
      );
      
      setEditMode(false);
      setCurrentPayroll(null);

    } catch (error) {
      console.error('Error updating payroll:', error);
      setError('Failed to update payroll data');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentPayroll((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNewAllowanceChange = (e) => {
    const { name, value } = e.target;
    setNewAllowance((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNewDeductionChange = (e) => {
    const { name, value } = e.target;
    setNewDeduction((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addNewAllowance = () => {
    if (!newAllowance.type || !newAllowance.percentage) {
      alert('Please fill in both fields for allowance.');
      return;
    }

    setCurrentPayroll((prev) => ({
      ...prev,
      allowances: [...prev.allowances, newAllowance],
    }));
    setNewAllowance({ type: '', percentage: '' });
  };

  const addNewDeduction = () => {
    if (!newDeduction.type || !newDeduction.percentage) {
      alert('Please fill in both fields for deduction.');
      return;
    }

    setCurrentPayroll((prev) => ({
      ...prev,
      deductions: [...prev.deductions, newDeduction],
    }));
    setNewDeduction({ type: '', percentage: '' });
  };

  const deleteAllowance = (index) => {
    setCurrentPayroll((prev) => ({
      ...prev,
      allowances: prev.allowances.filter((_, i) => i !== index),
    }));
  };

  const deleteDeduction = (index) => {
    setCurrentPayroll((prev) => ({
      ...prev,
      deductions: prev.deductions.filter((_, i) => i !== index),
    }));
  };

  // Filter payroll data based on search term
  const filteredPayrollData = payrollData.filter((payroll) =>
    payroll.employeeDetail.empId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex bg-gray-100">
      <div className="w-[20%] fixed top-0 left-0 h-full bg-white shadow-xl p-4">
        <AdminSideBar />
      </div>
      <div className="flex-1 ml-[20%] p-6">
        <AdminHeader />

        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-semibold mb-6">Payroll Information</h1>

          {error && <div className="text-red-600 mb-4">{error}</div>}

          <div className="mb-6 flex items-center space-x-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by Employee ID"
              className="p-3 border rounded-md w-1/4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {loading ? (
            <div className="text-center text-gray-600">Loading...</div>
          ) : (
            <table className="min-w-full table-auto border-collapse bg-white shadow-md rounded-md">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-3 text-left">ID</th>
                  <th className="border p-3 text-left">EMP ID</th>
                  <th className="border p-3 text-left">Basic Salary</th>
                  <th className="border p-3 text-left">Bonus</th>
                  <th className="border p-3 text-left">Pay Date</th>
                  <th className="border p-3 text-left">CTC</th>
                  <th className="border p-3 text-left">Deductions</th>
                  <th className="border p-3 text-left">Allowances</th>
                  <th className="border p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayrollData.length > 0 ? (
                  filteredPayrollData.map((payroll) => (
                    <tr key={payroll.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">{payroll.id}</td>
                      <td className="p-3">{payroll.employeeDetail.empId}</td>
                      <td className="p-3">
                        {editMode && currentPayroll.id === payroll.id ? (
                          <input
                            type="number"
                            name="basicSalary"
                            value={currentPayroll.basicSalary}
                            onChange={handleChange}
                            className="p-2 border rounded-md shadow-sm w-full"
                          />
                        ) : (
                          payroll.basicSalary
                        )}
                      </td>
                      <td className="p-3">
                        {editMode && currentPayroll.id === payroll.id ? (
                          <input
                            type="number"
                            name="bonus"
                            value={currentPayroll.bonus}
                            onChange={handleChange}
                            className="p-2 border rounded-md shadow-sm w-full"
                          />
                        ) : (
                          payroll.bonus
                        )}
                      </td>
                      <td className="p-3">
                        {editMode && currentPayroll.id === payroll.id ? (
                          <input
                            type="date"
                            name="payDate"
                            value={currentPayroll.payDate}
                            onChange={handleChange}
                            className="p-2 border rounded-md shadow-sm w-full"
                          />
                        ) : (
                          payroll.payDate
                        )}
                      </td>
                      <td className="p-3">
                        {editMode && currentPayroll.id === payroll.id ? (
                          <input
                            type="number"
                            name="ctc"
                            value={currentPayroll.ctc}
                            onChange={handleChange}
                            className="p-2 border rounded-md shadow-sm w-full"
                          />
                        ) : (
                          payroll.ctc
                        )}
                      </td>
                      <td className="p-3">
                        {editMode && currentPayroll.id === payroll.id ? (
                          <>
                            {currentPayroll.deductions.map((deduction, index) => (
                              <div key={index} className="flex items-center space-x-2 mb-2">
                                <input
                                  type="text"
                                  name="type"
                                  value={deduction.type}
                                  onChange={(e) => {
                                    const updatedDeductions = [...currentPayroll.deductions];
                                    updatedDeductions[index].type = e.target.value;
                                    setCurrentPayroll((prev) => ({ ...prev, deductions: updatedDeductions }));
                                  }}
                                  className="p-2 border rounded-md shadow-sm w-1/2"
                                />
                                <input
                                  type="number"
                                  name="percentage"
                                  value={deduction.percentage}
                                  onChange={(e) => {
                                    const updatedDeductions = [...currentPayroll.deductions];
                                    updatedDeductions[index].percentage = e.target.value;
                                    setCurrentPayroll((prev) => ({ ...prev, deductions: updatedDeductions }));
                                  }}
                                  className="p-2 border rounded-md shadow-sm w-1/4"
                                />
                                <button
                                  onClick={() => deleteDeduction(index)}
                                  className="bg-red-500 text-white px-2 py-1 rounded-md"
                                >
                                  Delete
                                </button>
                              </div>
                            ))}
                            <input
                              type="text"
                              name="type"
                              value={newDeduction.type}
                              onChange={handleNewDeductionChange}
                              placeholder="Type"
                              className="p-2 border rounded-md shadow-sm mb-2 w-1/2"
                            />
                            <input
                              type="number"
                              name="percentage"
                              value={newDeduction.percentage}
                              onChange={handleNewDeductionChange}
                              placeholder="Percentage"
                              className="p-2 border rounded-md shadow-sm mb-2 w-1/4"
                            />
                            <button
                              onClick={addNewDeduction}
                              className="bg-blue-500 text-white px-4 py-2 rounded-md"
                            >
                              Add Deduction
                            </button>
                          </>
                        ) : (
                          payroll.deductions.map((deduction) => (
                            <div key={deduction.id}>
                              {deduction.type}: {deduction.percentage}%
                            </div>
                          ))
                        )}
                      </td>
                      <td className="p-3">
                        {editMode && currentPayroll.id === payroll.id ? (
                          <>
                            {currentPayroll.allowances.map((allowance, index) => (
                              <div key={index} className="flex items-center space-x-2 mb-2">
                                <input
                                  type="text"
                                  name="type"
                                  value={allowance.type}
                                  onChange={(e) => {
                                    const updatedAllowances = [...currentPayroll.allowances];
                                    updatedAllowances[index].type = e.target.value;
                                    setCurrentPayroll((prev) => ({ ...prev, allowances: updatedAllowances }));
                                  }}
                                  className="p-2 border rounded-md shadow-sm w-1/2"
                                />
                                <input
                                  type="number"
                                  name="percentage"
                                  value={allowance.percentage}
                                  onChange={(e) => {
                                    const updatedAllowances = [...currentPayroll.allowances];
                                    updatedAllowances[index].percentage = e.target.value;
                                    setCurrentPayroll((prev) => ({ ...prev, allowances: updatedAllowances }));
                                  }}
                                  className="p-2 border rounded-md shadow-sm w-1/4"
                                />
                                <button
                                  onClick={() => deleteAllowance(index)}
                                  className="bg-red-500 text-white px-2 py-1 rounded-md"
                                >
                                  Delete
                                </button>
                              </div>
                            ))}
                            <input
                              type="text"
                              name="type"
                              value={newAllowance.type}
                              onChange={handleNewAllowanceChange}
                              placeholder="Type"
                              className="p-2 border rounded-md shadow-sm mb-2 w-1/2"
                            />
                            <input
                              type="number"
                              name="percentage"
                              value={newAllowance.percentage}
                              onChange={handleNewAllowanceChange}
                              placeholder="Percentage"
                              className="p-2 border rounded-md shadow-sm mb-2 w-1/4"
                            />
                            <button
                              onClick={addNewAllowance}
                              className="bg-blue-500 text-white px-4 py-2 rounded-md"
                            >
                              Add Allowance
                            </button>
                          </>
                        ) : (
                          payroll.allowances.map((allowance) => (
                            <div key={allowance.id}>
                              {allowance.type}: {allowance.percentage}%
                            </div>
                          ))
                        )}
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() => handleEdit(payroll)}
                          className="bg-green-500 text-white px-4 py-2 rounded-md"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center py-4">
                      No payroll records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}

          {editMode && (
            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={() => setEditMode(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPayroll;
