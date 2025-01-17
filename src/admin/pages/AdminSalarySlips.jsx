import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import AdminSideBar from "../component/AdminSidebar";
import AdminHeader from "../component/AdminHeader";
import { getAllSalarySlips, calculateSalarySlips } from "../../commonComponent/Api"; // Adjust the import path if necessary

const AdminSalarySlips = () => {
    const [salarySlips, setSalarySlips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [employeeId, setEmployeeId] = useState(""); // Search input for employeeId
    const [salaryMonth, setSalaryMonth] = useState(""); // Search input for salaryMonth
    const [startDate, setStartDate] = useState(""); // Start date for filtering salary slips
    const [endDate, setEndDate] = useState(""); // End date for filtering salary slips
    const [showModal, setShowModal] = useState(false);
    const [selectedSlip, setSelectedSlip] = useState(null); // Holds the data of the selected slip

    useEffect(() => {
        const fetchSalarySlips = async () => {
            try {
                const response = await getAllSalarySlips();
                setSalarySlips(response);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch salary slips. Please try again later.");
                setLoading(false);
            }
        };

        fetchSalarySlips();
    }, []);

    const filteredSalarySlips = salarySlips.filter((slip) => {
        const matchesEmployeeId = employeeId
            ? slip.employeeDetail.empId.toString().includes(employeeId)
            : true;
        const matchesSalaryMonth = salaryMonth
            ? slip.salaryMonth?.toString().includes(salaryMonth)
            : true;
        return matchesEmployeeId && matchesSalaryMonth;
    });

    const openModal = (slip) => {
        setSelectedSlip(slip);
        setShowModal(true);
    };

    const closeModal = () => {
        setSelectedSlip(null);
        setShowModal(false);
    };

    const generatePDF = (slip) => {
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text("Salary Slip", 14, 20);

        // Add employee details
        const employeeDetails = [
            ["Employee ID", slip.employeeDetail.empId],
            ["Name", `${slip.employeeDetail.firstName} ${slip.employeeDetail.surname}`],
            ["Department", slip.employeeDetail.department],
            ["Designation", slip.employeeDetail.designation],
            ["Salary Month", slip.salaryMonth],
            ["Generated Date", slip.generatedDate],
        ];

        doc.autoTable({
            startY: 30,
            head: [["Field", "Details"]],
            body: employeeDetails,
        });

        // Add earnings and deductions
        const salaryDetails = [
            ["Basic Salary", `₹${slip.payroll.basicSalary.toFixed(2)}`],
            ["Bonus", `₹${slip.payroll.bonus.toFixed(2)}`],
            ["Deductions", `₹${slip.totalDeductions.toFixed(2)}`],
            ["Net Salary", `₹${slip.netSalary.toFixed(2)}`],
        ];

        doc.autoTable({
            startY: doc.lastAutoTable.finalY + 10,
            head: [["Description", "Amount"]],
            body: salaryDetails,
        });

        doc.save(`SalarySlip_${slip.employeeDetail.empId}_${slip.salaryMonth}.pdf`);
    };

    const handleGenerateSalarySlips = async () => {
        if (startDate && endDate) {
            //console.log("startDate", startDate);
            //console.log("endDate", endDate);
    
            setLoading(true);
            try {
                // Call to calculate salary slips
                const response = await calculateSalarySlips(startDate, endDate);
    
                // Fetch the updated salary slips after successful generation
                const fetchResponse = await getAllSalarySlips();  // Fetch the updated list
                setSalarySlips(fetchResponse);  // Update the salarySlips state with the newly fetched data
    
                setLoading(false);
            } catch (err) {
                setError("Failed to generate salary slips. Please try again later.");
                setLoading(false);
            }
        } else {
            setError("Please provide both start date and end date.");
        }
    };
    

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p>Loading salary slips...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-red-600">{error}</p>
            </div>
        );
    }

    return (
        <div className="flex bg-gray-100 min-h-screen">
            <AdminSideBar />
            <div className="flex-1 p-[1.667vw] ml-[15.104vw]">
                <AdminHeader
                    title="Salary Slips"
                    avatarSrc="/api/placeholder/35/35"
                    showNotification={true}
                    showChevron={true}
                />
                <div className="mt-6 bg-white shadow rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-4">Generate Salary Slips</h2>
                    <div className="mb-4 flex gap-4">
                        <input
                            type="date"
                            placeholder="Start Date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="border rounded px-4 py-2 w-1/3"
                        />
                        <input
                            type="date"
                            placeholder="End Date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="border rounded px-4 py-2 w-1/3"
                        />
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            onClick={handleGenerateSalarySlips}
                        >
                            Generate Salary Slips
                        </button>
                    </div>
                    <div className="mb-4 flex gap-4">
                        <input
                            type="text"
                            placeholder="Search by Employee ID"
                            value={employeeId}
                            onChange={(e) => setEmployeeId(e.target.value)}
                            className="border rounded px-4 py-2 w-1/3"
                        />
                        <input
                            type="text"
                            placeholder="Search by Salary Month"
                            value={salaryMonth}
                            onChange={(e) => setSalaryMonth(e.target.value)}
                            className="border rounded px-4 py-2 w-1/3"
                        />
                    </div>
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                            <tr>
                                <th className="border-b px-4 py-2 text-left">Employee ID</th>
                                <th className="border-b px-4 py-2 text-left">Name</th>
                                <th className="border-b px-4 py-2 text-left">Department</th>
                                <th className="border-b px-4 py-2 text-left">Designation</th>
                                <th className="border-b px-4 py-2 text-left">Total Salary</th>
                                <th className="border-b px-4 py-2 text-left">Salary Month</th>
                                <th className="border-b px-4 py-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredSalarySlips.map((slip) => (
                                <tr key={slip.id} className="hover:bg-gray-50">
                                    <td className="border-b px-4 py-2">{slip.employeeDetail.empId}</td>
                                    <td className="border-b px-4 py-2">
                                        {slip.employeeDetail.firstName} {slip.employeeDetail.surname}
                                    </td>
                                    <td className="border-b px-4 py-2">{slip.employeeDetail.department}</td>
                                    <td className="border-b px-4 py-2">{slip.employeeDetail.designation}</td>
                                    <td className="border-b px-4 py-2">₹{slip.totalEarnings.toFixed(2)}</td>
                                    <td className="border-b px-4 py-2">{slip.salaryMonth}</td>
                                    <td className="border-b px-4 py-2">
                                        <button
                                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2"
                                            onClick={() => openModal(slip)}
                                        >
                                            View
                                        </button>
                                        <button
                                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                            onClick={() => generatePDF(slip)}
                                        >
                                            Download PDF
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredSalarySlips.length === 0 && (
                        <p className="mt-4 text-gray-500 text-center">No results found.</p>
                    )}
                </div>
            </div>

            {/* Modal */}
            {showModal && selectedSlip && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
                    <div className="bg-white rounded-lg shadow-lg w-3/4 p-6">
                        <h2 className="text-xl font-bold mb-4">Salary Slip Details</h2>
                        <p><strong>Employee ID:</strong> {selectedSlip.employeeDetail.empId}</p>
                        <p><strong>Name:</strong> {selectedSlip.employeeDetail.firstName} {selectedSlip.employeeDetail.surname}</p>
                        <p><strong>Department:</strong> {selectedSlip.employeeDetail.department}</p>
                        <p><strong>Designation:</strong> {selectedSlip.employeeDetail.designation}</p>
                        <p><strong>Salary Month:</strong> {selectedSlip.salaryMonth}</p>
                        <p><strong>Present Days:</strong> {selectedSlip.presentDays}</p>
                        <p><strong>Absent Days:</strong> {selectedSlip.absentDays}</p>
                        <p><strong>Half Days:</strong> {selectedSlip.halfDays}</p>
                        <p><strong>CTC</strong> {selectedSlip.payroll.ctc}</p>

                        {/* Allowances */}
                        <p><strong>Allowances:</strong></p>
                        <ul className="list-disc ml-6">
                            {selectedSlip.payroll.allowances.map((allowance, index) => (
                                <li key={index}>
                                    <strong>{allowance.type}:</strong> {allowance.percentage}%
                                </li>
                            ))}
                        </ul>

                        {/* Deductions */}
                        <p><strong>Deductions:</strong></p>
                        <ul className="list-disc ml-6">
                            {selectedSlip.payroll.deductions.map((deduction, index) => (
                                <li key={index}>
                                    <strong>{deduction.type}:</strong> {deduction.percentage}%
                                </li>
                            ))}
                        </ul>

                        <p><strong>Net Salary:</strong> ₹{selectedSlip.netSalary.toFixed(2)}</p>
                        <p><strong>Total Salary</strong> ₹{selectedSlip.totalEarnings.toFixed(2)}</p>

                        <button
                            className="bg-red-500 text-white px-4 py-2 rounded mt-4"
                            onClick={closeModal}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminSalarySlips;
