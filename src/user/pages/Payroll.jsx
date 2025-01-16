import React, { useEffect, useState } from "react";
import UserSideBar from "../components/UserSideBar";
import UserHeader from "../components/UserHeader";
import { Download, X, Search, Calendar } from "lucide-react";
import { getSalarySlipByID } from "../../commonComponent/Api";
import { jsPDF } from "jspdf";

const Payroll = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [password, setPassword] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [salarySlips, setSalarySlips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [salaryMonth, setSalaryMonth] = useState(""); // Only store the month for search
    const [showModal, setShowModal] = useState(false);
    const [selectedSlip, setSelectedSlip] = useState(null);

    useEffect(() => {
        const fetchSalarySlips = async () => {
            try {
                const response = await getSalarySlipByID();
                setSalarySlips(response);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch salary slips. Please try again later.");
                setLoading(false);
            }
        };

        fetchSalarySlips();
    }, []);

    // Filtering salary slips based only on salaryMonth (no employeeId)
    const filteredSalarySlips = salarySlips.filter((slip) => {
        return slip.salaryMonth?.toLowerCase().includes(salaryMonth.toLowerCase());
    });

    const openModal = (slip) => {
        setSelectedSlip(slip);
        setShowModal(true);
    };

    const closeModalDetails = () => {
        setSelectedSlip(null);
        setShowModal(false);
    };

    const generatePDF = (slip) => {
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text("Salary Slip", 14, 20);

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

    const handleMonthChange = (e) => {
        const month = e.target.value;
        setSalaryMonth(month);
    };

    return (
        <div className="flex bg-gray-100 min-h-screen">
            <UserSideBar />

            <div className="flex-1 ml-[16vw]">
                <UserHeader title="Payroll Dashboard" />

                <section className="bg-white p-[1.667vw] rounded-[0.417vw] shadow relative mt-[1.667vw]">
                    <div className="flex justify-between items-center mb-[0.833vw]">
                        <p className="text-gray-600 text-[0.938vw]">
                            Welcome back,{" "}
                            <span className="text-blue-500 font-semibold">Aditya</span>
                        </p>
                    </div>

                    <div className="flex gap-[0.833vw] mb-[1.667vw]">
                        {/* Search bar only filters by salary month */}
                        <div className="relative flex-1">
                            <Search className="absolute left-[0.625vw] top-[0.625vw] text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search by salary month..."
                                className="w-full pl-[2.083vw] pr-[0.833vw] py-[0.417vw] border rounded-[0.417vw] focus:outline-none focus:border-blue-500"
                                onChange={(e) => setSalaryMonth(e.target.value)}
                            />
                        </div>

                        {/* Calendar input for month selection */}
                        <input
                            type="month"
                            className="px-[0.833vw] py-[0.417vw] border rounded-[0.417vw] focus:outline-none focus:border-blue-500"
                            onChange={handleMonthChange}
                            value={salaryMonth}
                        />

                        <div className="flex items-center gap-[0.417vw] px-[0.833vw] py-[0.417vw] border rounded-[0.417vw]">
                            <Calendar size={20} className="text-gray-400" />
                            <span>13 Jan, 2024</span>
                        </div>
                        <button className="flex items-center gap-[0.417vw] px-[0.833vw] py-[0.417vw] text-gray-600 border rounded-[0.417vw] hover:bg-gray-50">
                            <Download size={20} />
                            Export CSV
                        </button>
                    </div>

                    <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                            <tr>
                                <th className="border-b px-4 py-2 text-left">Serial No.</th>
                                <th className="border-b px-4 py-2 text-left">Salary Month</th>
                                <th className="border-b px-4 py-2 text-left">View Action</th>
                                <th className="border-b px-4 py-2 text-left">Download Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredSalarySlips.length > 0 ? (
                                filteredSalarySlips.map((slip, index) => (
                                    <tr key={slip.id} className="hover:bg-gray-50">
                                        <td className="border-b px-4 py-2">{index + 1}</td>
                                        <td className="border-b px-4 py-2">{slip.salaryMonth}</td>
                                        <td className="border-b px-4 py-2">
                                            <button
                                                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2"
                                                onClick={() => openModal(slip)}
                                            >
                                                View
                                            </button>
                                        </td>

                                        <td className="px-[0.833vw] py-[0.625vw]">
                                            <button
                                                className="bg-blue-600 text-white px-[0.833vw] py-[0.417vw] rounded-[0.417vw] flex items-center gap-[0.417vw] hover:bg-blue-700"
                                                onClick={() => generatePDF(slip)}
                                            >
                                                <Download size={16} />
                                                Download
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center py-4 text-gray-500">
                                        No salary slips found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </section>

                {showModal && selectedSlip && (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
                        <div className="bg-white rounded-lg shadow-lg w-3/4 p-6">
                            <h2 className="text-xl font-bold mb-4">Salary Slip Details</h2>
                            <p><strong>Employee ID:</strong> {selectedSlip.employeeDetail.empId}</p>
                            <p><strong>Name:</strong> {selectedSlip.employeeDetail.firstName} {selectedSlip.employeeDetail.surname}</p>
                            <p><strong>Department:</strong> {selectedSlip.employeeDetail.department}</p>
                            <p><strong>Designation:</strong> {selectedSlip.employeeDetail.designation}</p>
                            <p><strong>Salary Month:</strong> {selectedSlip.salaryMonth}</p>
                            <p><strong>Basic Salary:</strong> ₹{selectedSlip.payroll.basicSalary.toFixed(2)}</p>
                            <p><strong>Bonus:</strong> ₹{selectedSlip.payroll.bonus.toFixed(2)}</p>
                            <p><strong>Total Earnings:</strong> ₹{selectedSlip.totalEarnings.toFixed(2)}</p>
                            <p><strong>Total Deductions:</strong> ₹{selectedSlip.totalDeductions.toFixed(2)}</p>
                            <p><strong>Net Salary:</strong> ₹{selectedSlip.netSalary.toFixed(2)}</p>
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded"
                                onClick={closeModalDetails}
                            >
                                <X size={20} />
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Payroll;
