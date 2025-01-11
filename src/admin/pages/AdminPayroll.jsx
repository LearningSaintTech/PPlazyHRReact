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

  const [newAllowance, setNewAllowance] = useState({ type: '', percentage: '' });
  const [newDeduction, setNewDeduction] = useState({ type: '', percentage: '' });

  useEffect(() => {
    const fetchPayroll = async () => {
      setLoading(true);
      try {
        const response = await getAllPayroll(); 
        console.log("response",response)
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
      console.log("currentPayroll.id",currentPayroll.id)
      console.log("currentPayroll",currentPayroll)


      const response = await updatePayroll(currentPayroll.id, currentPayroll);
      console.log('Payroll updated successfully:', response);
      setPayrollData((prevData) =>
        prevData.map((payroll) =>
          payroll.id === currentPayroll.id ? response : payroll
        )
      );
      setEditMode(false);
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

  // Delete an allowance
  const deleteAllowance = (index) => {
    setCurrentPayroll((prev) => ({
      ...prev,
      allowances: prev.allowances.filter((_, i) => i !== index),
    }));
  };

  // Delete a deduction
  const deleteDeduction = (index) => {
    setCurrentPayroll((prev) => ({
      ...prev,
      deductions: prev.deductions.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="flex">
      <div className="w-[15%] fixed top-0 left-0 h-full bg-white shadow-lg z-10">
        <AdminSideBar />
      </div>
      <div className="flex-1 ml-[15%]">
        <AdminHeader />
        
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Payroll Information</h1>
          
          {error && <div className="text-red-500 mb-4">{error}</div>}
          
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : (
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr>
                  <th className="border-b p-2 text-left">ID</th>
                  <th className="border-b p-2 text-left">Basic Salary</th>
                  <th className="border-b p-2 text-left">Bonus</th>
                  <th className="border-b p-2 text-left">Pay Date</th>
                  <th className="border-b p-2 text-left">CTC</th>
                  <th className="border-b p-2 text-left">Deductions</th>
                  <th className="border-b p-2 text-left">Allowances</th>
                  <th className="border-b p-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {payrollData.length > 0 ? (
                  payrollData.map((payroll) => (
                    <tr key={payroll.id}>
                      <td className="border-b p-2">{payroll.id}</td>
                      <td className="border-b p-2">
                        {editMode && currentPayroll.id === payroll.id ? (
                          <input
                            type="number"
                            name="basicSalary"
                            value={currentPayroll.basicSalary}
                            onChange={handleChange}
                            className="p-2 border rounded"
                          />
                        ) : (
                          payroll.basicSalary
                        )}
                      </td>
                      <td className="border-b p-2">
                        {editMode && currentPayroll.id === payroll.id ? (
                          <input
                            type="number"
                            name="bonus"
                            value={currentPayroll.bonus}
                            onChange={handleChange}
                            className="p-2 border rounded"
                          />
                        ) : (
                          payroll.bonus
                        )}
                      </td>
                      <td className="border-b p-2">
                        {editMode && currentPayroll.id === payroll.id ? (
                          <input
                            type="date"
                            name="payDate"
                            value={currentPayroll.payDate}
                            onChange={handleChange}
                            className="p-2 border rounded"
                          />
                        ) : (
                          payroll.payDate
                        )}
                      </td>
                      <td className="border-b p-2">
                        {editMode && currentPayroll.id === payroll.id ? (
                          <input
                            type="number"
                            name="ctc"
                            value={currentPayroll.ctc}
                            onChange={handleChange}
                            className="p-2 border rounded"
                          />
                        ) : (
                          payroll.ctc
                        )}
                      </td>
                      <td className="border-b p-2">
                        {editMode && currentPayroll.id === payroll.id ? (
                          <>
                            {currentPayroll.deductions.map((deduction, index) => (
                              <div key={index} className="flex items-center">
                                <input
                                  type="text"
                                  name="type"
                                  value={deduction.type}
                                  onChange={(e) => {
                                    const updatedDeductions = [...currentPayroll.deductions];
                                    updatedDeductions[index].type = e.target.value;
                                    setCurrentPayroll((prev) => ({ ...prev, deductions: updatedDeductions }));
                                  }}
                                  className="p-2 border rounded"
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
                                  className="p-2 border rounded"
                                />
                                <button
                                  onClick={() => deleteDeduction(index)}
                                  className="ml-2 bg-red-500 text-white p-2 rounded"
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
                              className="p-2 border rounded"
                            />
                            <input
                              type="number"
                              name="percentage"
                              value={newDeduction.percentage}
                              onChange={handleNewDeductionChange}
                              placeholder="Percentage"
                              className="p-2 border rounded"
                            />
                            <button
                              onClick={addNewDeduction}
                              className="ml-2 bg-blue-500 text-white p-2 rounded"
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
                      <td className="border-b p-2">
                        {editMode && currentPayroll.id === payroll.id ? (
                          <>
                            {currentPayroll.allowances.map((allowance, index) => (
                              <div key={index} className="flex items-center">
                                <input
                                  type="text"
                                  name="type"
                                  value={allowance.type}
                                  onChange={(e) => {
                                    const updatedAllowances = [...currentPayroll.allowances];
                                    updatedAllowances[index].type = e.target.value;
                                    setCurrentPayroll((prev) => ({ ...prev, allowances: updatedAllowances }));
                                  }}
                                  className="p-2 border rounded"
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
                                  className="p-2 border rounded"
                                />
                                <button
                                  onClick={() => deleteAllowance(index)}
                                  className="ml-2 bg-red-500 text-white p-2 rounded"
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
                              className="p-2 border rounded"
                            />
                            <input
                              type="number"
                              name="percentage"
                              value={newAllowance.percentage}
                              onChange={handleNewAllowanceChange}
                              placeholder="Percentage"
                              className="p-2 border rounded"
                            />
                            <button
                              onClick={addNewAllowance}
                              className="ml-2 bg-blue-500 text-white p-2 rounded"
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
                      <td className="border-b p-2">
                        {editMode && currentPayroll.id === payroll.id ? (
                          <button
                            onClick={handleSave}
                            className="bg-green-500 text-white p-2 rounded"
                          >
                            Save
                          </button>
                        ) : (
                          <button
                            onClick={() => handleEdit(payroll)}
                            className="bg-yellow-500 text-white p-2 rounded"
                          >
                            Edit
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="p-2 text-center">No payroll data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPayroll;
