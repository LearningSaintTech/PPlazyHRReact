import React, { useState, useEffect } from "react";
import UserSideBar from "../components/UserSideBar";
import UserHeader from "../components/UserHeader";
import { Camera } from "lucide-react";
import { useSelector } from "react-redux";

const UserProfile = () => {
    const [activeTab, setActiveTab] = useState("personal");
    const [formData, setFormData] = useState({
        // Personal Details
        firstName: "",
        surname: "",
        pincode: "",
        city: "",
        state: "",
        email: "",
        phone: "",
        dob: "",
        gender: "",
        bloodGroup: "",
        address: "",
        // Employment Details
        employeeProfile: "",
        salary: "",
        employmentType: "",
        workLocation: "",
        department: "",
        shiftTiming: "",
        dateOfJoining: "",
        allowances: "",
        manager: "",
        // Bank Details
        bankName: "",
        bankBranch: "",
        accountHolder: "",
        passBook: "",
        accountNumber: "",
        customerID: "",
        ifscCode: "",
        aadharCard: "",
        panCard: "",
        bankPhone: "" // Added new field for bank phone number
    });

    const [currentDateTime, setCurrentDateTime] = useState({
        day: "",
        time: "",
        date: "",
    });

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            const options = { weekday: "long" };
            const day = now.toLocaleDateString(undefined, options);
            const time = now.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
            });
            const date = now.toLocaleDateString();
            setCurrentDateTime({ day, time, date });
        };

        updateDateTime();
        const interval = setInterval(updateDateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleFileChange = (e) => {
        const { id, files } = e.target;
        if (files[0]) {
            setFormData({ ...formData, [id]: files[0].name });
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <UserSideBar />

            <div className="flex-1 ml-[16vw]">
                <UserHeader
                    title="User Dashboard"
                    avatarSrc="/api/placeholder/35/35"
                    showNotification={true}
                    showChevron={true}
                />

                <div className="mt-[1.25vw] bg-white rounded-[0.417vw] p-[1.25vw]">

                    <h2 className="text-[1.25vw] font-semibold text-gray-800 mb-[1.667vw]">
                        My Profile
                    </h2>

                    <div className="flex items-center gap-[3.333vw] mb-[0.208vw]2">
                        <div className="relative">
                            <div className="w-[10vw] h-[10vw] rounded-full bg-indigo-50 overflow-hidden border-4 border-white ring-1 ring-gray-100">
                                <img
                                    src="/api/placeholder/192/192"
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <button className="absolute bottom-0 right-0 p-[0.625vw] bg-indigo-600 text-white rounded-full shadow-lg">
                                <Camera className="w-[1.25vw] h-[1.25vw]" />
                            </button>
                        </div>

                        <div>
                            <h3 className="text-[1.25vw] font-semibold text-gray-800">Aditya Raj</h3>
                            <p className="text-[1.1vw] text-gray-500">Sr. Frontend Developer</p>
                            <p className="text-gray-500 text-[0.9vw] mt-[0.417vw]">
                                Employee ID: <span className="text-indigo-600 text-[0.9vw]">PP_01</span>
                            </p>
                        </div>
                    </div>

                    <div className="flex mt-[2.083vw]">
                        <div className="flex flex-col space-y-2 w-[11.667vw] pr-[1.667vw] border-r border-gray-200">
                            <button
                                onClick={() => setActiveTab("personal")}
                                className={`w-full py-[0.625vw] px-[1.25vw] text-left rounded-[0.417vw] transition-colors ${activeTab === "personal"
                                    ? "bg-indigo-600 text-white"
                                    : "text-indigo-600 hover:bg-indigo-50"
                                    }`}
                            >
                                Personal Details
                            </button>
                            <button
                                onClick={() => setActiveTab("employment")}
                                className={`w-full py-[0.625vw] px-[1.25vw] text-left rounded-[0.417vw] transition-colors ${activeTab === "employment"
                                    ? "bg-indigo-600 text-white"
                                    : "text-indigo-600 hover:bg-indigo-50"
                                    }`}
                            >
                                Employment Details
                            </button>
                            <button
                                onClick={() => setActiveTab("bank")}
                                className={`w-full py-[0.625vw] px-[1.25vw] text-left rounded-[0.417vw] transition-colors ${activeTab === "bank"
                                    ? "bg-indigo-600 text-white"
                                    : "text-indigo-600 hover:bg-indigo-50"
                                    }`}
                            >
                                Bank Details
                            </button>
                        </div>

                        <div className="flex-1 pl-[1.667vw]">
                            {activeTab === "personal" && (
                                <div className="grid grid-cols-2 space-x-4" >
                                    <div className="grid grid-cols-2 gap-x-[3.333vw] gap-y-[1.25vw]">
                                        <div className="grid grid-cols-2 gap-[0.833vw] col-span-2">
                                            <div>
                                                <label className="block text-[0.729vw] text-gray-500 mb-[0.208vw]">
                                                    First Name
                                                </label>
                                                <input
                                                    type="text"
                                                    id="firstName"
                                                    value={formData.firstName}
                                                    onChange={handleInputChange}
                                                    className="w-full p-[0.521vw] border border-gray-200 rounded-[0.417vw] focus:outline-none focus:border-indigo-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[0.729vw] text-gray-500 mb-[0.208vw]">
                                                    Surname
                                                </label>
                                                <input
                                                    type="text"
                                                    id="surname"
                                                    value={formData.surname}
                                                    onChange={handleInputChange}
                                                    className="w-full p-[0.521vw] border border-gray-200 rounded-[0.417vw] focus:outline-none focus:border-indigo-500"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-[0.729vw] text-gray-500 mb-[0.208vw]">
                                                Date of Birth
                                            </label>
                                            <input
                                                type="date"
                                                id="dob"
                                                value={formData.dob}
                                                onChange={handleInputChange}
                                                className="w-full p-[0.521vw] border border-gray-200 rounded-[0.417vw] focus:outline-none focus:border-indigo-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-[0.729vw] text-gray-500 mb-[0.208vw]">
                                                Gender
                                            </label>
                                            <select
                                                id="gender"
                                                value={formData.gender}
                                                onChange={handleInputChange}
                                                className="w-full p-[0.521vw] border border-gray-200 rounded-[0.417vw] focus:outline-none focus:border-indigo-500"
                                            >
                                                <option value="Select Any" className="text-gray-600">Select Any</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-[0.729vw] text-gray-500 mb-[0.208vw]">
                                                Blood Group
                                            </label>
                                            <input
                                                type="text"
                                                id="bloodGroup"
                                                value={formData.bloodGroup}
                                                onChange={handleInputChange}
                                                className="w-full p-[0.521vw] border border-gray-200 rounded-[0.417vw] focus:outline-none focus:border-indigo-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-[0.729vw] text-gray-500 mb-[0.208vw]">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="w-full p-[0.521vw] border border-gray-200 rounded-[0.417vw] focus:outline-none focus:border-indigo-500"
                                            />
                                        </div>
                                        <div className="col-span-2">
                                            <label className="block text-[0.729vw] text-gray-500 mb-[0.208vw]">
                                                Address
                                            </label>
                                            <input
                                                type="text"
                                                id="address"
                                                value={formData.address}
                                                onChange={handleInputChange}
                                                className="w-full p-[0.521vw] border border-gray-200 rounded-[0.417vw] focus:outline-none focus:border-indigo-500"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="col-span-2">
                                            <label className="block text-[0.729vw] text-gray-500 mb-[0.208vw]">
                                                Phone Number
                                            </label>
                                            <div className="flex gap-[0.417vw]">
                                                <input
                                                    type="text"
                                                    value="+91"
                                                    disabled
                                                    className="w-[3.333vw] p-[0.521vw] border border-gray-200 rounded-[0.417vw] bg-gray-50"
                                                />
                                                <input
                                                    type="tel"
                                                    id="phone"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    placeholder="Mobile Number"
                                                    className="flex-1 p-[0.521vw] border border-gray-200 rounded-[0.417vw] focus:outline-none focus:border-indigo-500"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-3 space-x-1">
                                            <div>
                                                <label className="block text-[0.729vw] text-gray-500 mb-[0.208vw]">
                                                    City
                                                </label>
                                                <input
                                                    type="text"
                                                    id="city"
                                                    value={formData.city}
                                                    onChange={handleInputChange}
                                                    className="w-full p-[0.521vw] border border-gray-200 rounded-[0.417vw] focus:outline-none focus:border-indigo-500"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-[0.729vw] text-gray-500 mb-[0.208vw]">
                                                    Pin Code
                                                </label>
                                                <input
                                                    type="text"
                                                    id="pincode"
                                                    value={formData.pincode}
                                                    onChange={handleInputChange}
                                                    className="w-full p-[0.521vw] border border-gray-200 rounded-[0.417vw] focus:outline-none focus:border-indigo-500"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-[0.729vw] text-gray-500 mb-[0.208vw]">
                                                    State
                                                </label>
                                                <input
                                                    type="text"
                                                    id="state"
                                                    value={formData.state}
                                                    onChange={handleInputChange}
                                                    className="w-full p-[0.521vw] border border-gray-200 rounded-[0.417vw] focus:outline-none focus:border-indigo-500"
                                                />
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === "employment" && (
                                <div className="grid grid-cols-2 space-x-4">
                                    <div className="grid grid-cols-2 gap-x-[3.333vw] gap-y-[1.25vw]">
                                        <div>
                                            <label className="block text-[0.729vw] text-gray-500 mb-[0.208vw]">
                                                Employee Profile
                                            </label>
                                            <input
                                                type="text"
                                                id="employeeProfile"
                                                value={formData.employeeProfile}
                                                onChange={handleInputChange}
                                                placeholder="Write Here"
                                                className="w-full p-[0.521vw] border border-gray-200 rounded-[0.417vw] focus:outline-none focus:border-indigo-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-[0.729vw] text-gray-500 mb-[0.208vw]">
                                                Salary
                                            </label>
                                            <input
                                                type="text"
                                                id="salary"
                                                value={formData.salary}
                                                onChange={handleInputChange}
                                                placeholder="Write Here"
                                                className="w-full p-[0.521vw] border border-gray-200 rounded-[0.417vw] focus:outline-none focus:border-indigo-500"
                                            />
                                        </div>

                                        <div className="col-span-2">
                                            <label className="block text-[0.729vw] text-gray-500 mb-[0.208vw]">
                                                Department
                                            </label>
                                            <input
                                                type="text"
                                                id="department"
                                                value={formData.department}
                                                onChange={handleInputChange}
                                                placeholder="Write here"
                                                className="w-full p-[0.521vw] border border-gray-200 rounded-[0.417vw] focus:outline-none focus:border-indigo-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-[0.729vw] text-gray-500 mb-[0.208vw]">
                                                Allowances
                                            </label>
                                            <div className="flex gap-[0.417vw]">
                                                <input
                                                    type="text"
                                                    id="allowances"
                                                    value={formData.allowances}
                                                    onChange={handleInputChange}
                                                    placeholder="Write here"
                                                    className="flex-1 p-[0.521vw] border border-gray-200 rounded-[0.417vw] focus:outline-none focus:border-indigo-500"
                                                />
                                                <button className="px-[0.833vw] py-[0.417vw] bg-gray-100 text-gray-600 rounded-[0.417vw]">
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="grid grid-cols-2 space-x-2">
                                            <div>
                                                <label className="block text-[0.729vw] text-gray-500 mb-[0.208vw]">
                                                    Employment Type
                                                </label>
                                                <input
                                                    type="text"
                                                    id="employmentType"
                                                    value={formData.employmentType}
                                                    onChange={handleInputChange}
                                                    placeholder="Write here"
                                                    className="w-full p-[0.521vw] border border-gray-200 rounded-[0.417vw] focus:outline-none focus:border-indigo-500"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-[0.729vw] text-gray-500 mb-[0.208vw]">
                                                    Work Location
                                                </label>
                                                <input
                                                    type="text"
                                                    id="workLocation"
                                                    value={formData.workLocation}
                                                    onChange={handleInputChange}
                                                    placeholder="Write here"
                                                    className="w-full p-[0.521vw] border border-gray-200 rounded-[0.417vw] focus:outline-none focus:border-indigo-500"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 space-x-2">
                                            <div>
                                                <label className="block text-[0.729vw] text-gray-500 mb-[0.208vw]">
                                                    Shift Timing
                                                </label>
                                                <input
                                                    type="text"
                                                    id="shiftTiming"
                                                    value={formData.shiftTiming}
                                                    onChange={handleInputChange}
                                                    placeholder="00:00:00"
                                                    className="w-full p-[0.521vw] border border-gray-200 rounded-[0.417vw] focus:outline-none focus:border-indigo-500"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-[0.729vw] text-gray-500 mb-[0.208vw]">
                                                    Date of joining
                                                </label>
                                                <input
                                                    type="text"
                                                    id="dateOfJoining"
                                                    value={formData.dateOfJoining}
                                                    onChange={handleInputChange}
                                                    placeholder="dd/mm/yyyy"
                                                    className="w-full p-[0.521vw] border border-gray-200 rounded-[0.417vw] focus:outline-none focus:border-indigo-500"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-[0.729vw] text-gray-500 mb-[0.208vw]">
                                                Manager
                                            </label>
                                            <input
                                                type="text"
                                                id="manager"
                                                value={formData.manager}
                                                onChange={handleInputChange}
                                                placeholder="Write here"
                                                className="w-full p-[0.521vw] border border-gray-200 rounded-[0.417vw] focus:outline-none focus:border-indigo-500"
                                            />
                                        </div>

                                    </div>
                                </div>
                            )}

                            {activeTab === "bank" && (
                                <div className="grid grid-cols-2 space-x-4">
                                    <div className="grid grid-cols-2 gap-x-[3.333vw] gap-y-[1.25vw]">
                                        <div>
                                            <label className="block text-[0.729vw] text-gray-500 mb-[0.208vw]">
                                                Bank Name
                                            </label>
                                            <input
                                                type="text"
                                                id="bankName"
                                                value={formData.bankName}
                                                onChange={handleInputChange}
                                                placeholder="123445"
                                                className="w-full p-[0.521vw] border border-gray-200 rounded-[0.417vw] focus:outline-none focus:border-indigo-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-[0.729vw] text-gray-500 mb-[0.208vw]">
                                                Bank Branch
                                            </label>
                                            <input
                                                type="text"
                                                id="bankBranch"
                                                value={formData.bankBranch}
                                                onChange={handleInputChange}
                                                placeholder="10/mm/yyyy"
                                                className="w-full p-[0.521vw] border border-gray-200 rounded-[0.417vw] focus:outline-none focus:border-indigo-500"
                                            />
                                        </div>

                                        <div className="col-span-2">
                                            <label className="block text-[0.729vw] text-gray-500 mb-[0.208vw]">
                                                Account Number
                                            </label>
                                            <input
                                                type="text"
                                                id="accountNumber"
                                                value={formData.accountNumber}
                                                onChange={handleInputChange}
                                                placeholder="Write Here"
                                                className="w-full p-[0.521vw] border border-gray-200 rounded-[0.417vw] focus:outline-none focus:border-indigo-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-[0.729vw] text-gray-500 mb-[0.208vw]">
                                                Customer ID
                                            </label>
                                            <input
                                                type="text"
                                                id="customerID"
                                                value={formData.customerID}
                                                onChange={handleInputChange}
                                                placeholder="Write Here"
                                                className="w-full p-[0.521vw] border border-gray-200 rounded-[0.417vw] focus:outline-none focus:border-indigo-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-[0.729vw] text-gray-500 mb-[0.208vw]">
                                                IFSC Code
                                            </label>
                                            <input
                                                type="text"
                                                id="ifscCode"
                                                value={formData.ifscCode}
                                                onChange={handleInputChange}
                                                placeholder="Write Here"
                                                className="w-full p-[0.521vw] border border-gray-200 rounded-[0.417vw] focus:outline-none focus:border-indigo-500"
                                            />
                                        </div>

                                        <div className="col-span-2">
                                            <label className="block text-[0.729vw] text-gray-500 mb-[0.208vw]">
                                                Upload Aadhar Card
                                            </label>
                                            <input
                                                type="file"
                                                id="aadharCard"
                                                onChange={handleFileChange}
                                                className="w-full p-[0.521vw] border border-gray-200 rounded-[0.417vw] focus:outline-none focus:border-indigo-500"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-[0.729vw] text-gray-500 mb-[0.208vw]">
                                                Account Holder
                                            </label>
                                            <input
                                                type="text"
                                                id="accountHolder"
                                                value={formData.accountHolder}
                                                onChange={handleInputChange}
                                                className="w-full p-[0.521vw] border border-gray-200 rounded-[0.417vw] focus:outline-none focus:border-indigo-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-[0.729vw] text-gray-500 mb-[0.208vw]">
                                                Pass Book
                                            </label>
                                            <input
                                                type="file"
                                                id="passBook"
                                                onChange={handleFileChange}
                                                className="w-full p-[0.417vw] border border-gray-200 rounded-[0.417vw] focus:outline-none focus:border-indigo-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-[0.729vw] text-gray-500 mb-[0.208vw]">
                                                Upload PAN Card
                                            </label>
                                            <input
                                                type="file"
                                                id="panCard"
                                                onChange={handleFileChange}
                                                className="w-full p-[0.417vw] border border-gray-200 rounded-[0.417vw] focus:outline-none focus:border-indigo-500"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="flex justify-end mt-[1.667vw]">
                                <button
                                    className="px-[1.25vw] py-[0.417vw] bg-indigo-600 text-white rounded-[0.417vw] hover:bg-indigo-700 transition-colors"
                                    onClick={() => {
                                        console.log("Edit request submitted");
                                    }}
                                >
                                    Edit Request
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;