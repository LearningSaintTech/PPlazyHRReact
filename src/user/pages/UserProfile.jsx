import React, { useState, useEffect } from "react";
import UserSideBar from "../components/UserSideBar";
import UserHeader from "../components/UserHeader";
import { Camera } from "lucide-react";

const UserProfile = () => {
    const [activeTab, setActiveTab] = useState("personal");
    const [formData, setFormData] = useState({
        // Personal Details
        firstName: "Aditya",
        surname: "Raj",
        pincode: "",
        city: "Noida",
        state: "Uttar Pradesh",
        email: "someone@gmail.com",
        phone: "",
        dob: "",
        gender: "Male",
        bloodGroup: "O+",
        address: "",
        // Employment Details
        employeeProfile: "xyz",
        salary: "xyz",
        employmentType: "",
        workLocation: "",
        department: "",
        shiftTiming: "",
        dateOfJoining: "",
        allowances: "",
        manager: "",
        // Bank Details
        bankName: "123445",
        bankBranch: "",
        accountHolder: "",
        passBook: "",
        accountNumber: "xyz",
        customerID: "xyz",
        ifscCode: "xyz",
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

            <div className="flex-1 p-8 ml-[290px]">
                <UserHeader
                    title="User Dashboard"
                    avatarSrc="/api/placeholder/35/35"
                    showNotification={true}
                    showChevron={true}
                />

                <div className="mt-6 bg-white rounded-lg p-6">
                    <div className="flex justify-between items-center mb-4">
                        <p className="text-gray-600 text-lg">
                            Welcome back,{" "}
                            <span className="text-indigo-600 font-semibold">Aditya</span>
                        </p>
                        <p className="text-indigo-600 font-medium">
                            {currentDateTime.day}, {currentDateTime.time}
                        </p>
                    </div>

                    <h2 className="text-2xl font-semibold text-gray-800 mb-8">
                        My Profile
                    </h2>

                    <div className="flex items-center gap-16 mb-12">
                        <div className="relative">
                            <div className="w-48 h-48 rounded-full bg-indigo-50 overflow-hidden border-4 border-white ring-1 ring-gray-100">
                                <img
                                    src="/api/placeholder/192/192"
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <button className="absolute bottom-0 right-0 p-3 bg-indigo-600 text-white rounded-full shadow-lg">
                                <Camera className="w-6 h-6" />
                            </button>
                        </div>

                        <div>
                            <h3 className="text-2xl font-semibold text-gray-800">Aditya Raj</h3>
                            <p className="text-lg text-gray-500">Sr. Frontend Developer</p>
                            <p className="text-gray-500 mt-2">
                                Employee ID: <span className="text-indigo-600">PP_01</span>
                            </p>
                        </div>
                    </div>

                    <div className="flex">
                        <div className="flex flex-col space-y-2 w-56 pr-8 border-r border-gray-200">
                            <button
                                onClick={() => setActiveTab("personal")}
                                className={`w-full py-3 px-6 text-left rounded-lg transition-colors ${activeTab === "personal"
                                    ? "bg-indigo-600 text-white"
                                    : "text-indigo-600 hover:bg-indigo-50"
                                    }`}
                            >
                                Personal Details
                            </button>
                            <button
                                onClick={() => setActiveTab("employment")}
                                className={`w-full py-3 px-6 text-left rounded-lg transition-colors ${activeTab === "employment"
                                    ? "bg-indigo-600 text-white"
                                    : "text-indigo-600 hover:bg-indigo-50"
                                    }`}
                            >
                                Employment Details
                            </button>
                            <button
                                onClick={() => setActiveTab("bank")}
                                className={`w-full py-3 px-6 text-left rounded-lg transition-colors ${activeTab === "bank"
                                    ? "bg-indigo-600 text-white"
                                    : "text-indigo-600 hover:bg-indigo-50"
                                    }`}
                            >
                                Bank Details
                            </button>
                        </div>

                        <div className="flex-1 pl-8">
                            {activeTab === "personal" && (
                                <div className="grid grid-cols-2 gap-x-16 gap-y-6">
                                    <div className="grid grid-cols-2 gap-4 col-span-2">
                                        <div>
                                            <label className="block text-sm text-gray-500 mb-1">
                                                First Name
                                            </label>
                                            <input
                                                type="text"
                                                id="firstName"
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-gray-500 mb-1">
                                                Surname
                                            </label>
                                            <input
                                                type="text"
                                                id="surname"
                                                value={formData.surname}
                                                onChange={handleInputChange}
                                                className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm text-gray-500 mb-1">
                                            Date of Birth
                                        </label>
                                        <input
                                            type="date"
                                            id="dob"
                                            value={formData.dob}
                                            onChange={handleInputChange}
                                            className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm text-gray-500 mb-1">
                                            Gender
                                        </label>
                                        <select
                                            id="gender"
                                            value={formData.gender}
                                            onChange={handleInputChange}
                                            className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500"
                                        >
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm text-gray-500 mb-1">
                                            Blood Group
                                        </label>
                                        <input
                                            type="text"
                                            id="bloodGroup"
                                            value={formData.bloodGroup}
                                            onChange={handleInputChange}
                                            className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm text-gray-500 mb-1">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500"
                                        />
                                    </div>

                                    <div className="col-span-2">
                                        <label className="block text-sm text-gray-500 mb-1">
                                            Phone Number
                                        </label>
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value="+91"
                                                disabled
                                                className="w-16 p-2.5 border border-gray-200 rounded-lg bg-gray-50"
                                            />
                                            <input
                                                type="tel"
                                                id="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                placeholder="Mobile Number"
                                                className="flex-1 p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm text-gray-500 mb-1">
                                            City
                                        </label>
                                        <input
                                            type="text"
                                            id="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm text-gray-500 mb-1">
                                            Pin Code
                                        </label>
                                        <input
                                            type="text"
                                            id="pincode"
                                            value={formData.pincode}
                                            onChange={handleInputChange}
                                            className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm text-gray-500 mb-1">
                                            State
                                        </label>
                                        <input
                                            type="text"
                                            id="state"
                                            value={formData.state}
                                            onChange={handleInputChange}
                                            className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500"
                                        />
                                    </div>

                                    <div className="col-span-2">
                                        <label className="block text-sm text-gray-500 mb-1">
                                            Address
                                        </label>
                                        <input
                                            type="text"
                                            id="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500"
                                        />
                                    </div>
                                </div>
                            )}

                            {activeTab === "employment" && (
                                <div className="grid grid-cols-2 gap-x-16 gap-y-6">
                                    <div>
                                        <label className="block text-sm text-gray-500 mb-1">
                                            Employee Profile
                                        </label>
                                        <input
                                            type="text"
                                            id="employeeProfile"
                                            value={formData.employeeProfile}
                                            onChange={handleInputChange}
                                            placeholder="xyz"
                                            className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm text-gray-500 mb-1">
                                            Salary
                                        </label>
                                        <input
                                            type="text"
                                            id="salary"
                                            value={formData.salary}
                                            onChange={handleInputChange}
                                            placeholder="xyz"
                                            className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm text-gray-500 mb-1">
                                            Employment Type
                                        </label>
                                        <input
                                            type="text"
                                            id="employmentType"
                                            value={formData.employmentType}
                                            onChange={handleInputChange}
                                            placeholder="Write here"
                                            className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm text-gray-500 mb-1">
                                            Work Location
                                        </label>
                                        <input
                                            type="text"
                                            id="workLocation"
                                            value={formData.workLocation}
                                            onChange={handleInputChange}
                                            placeholder="Write here"
                                            className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500"
                                        />
                                    </div>

                                    <div className="col-span-2">
                                        <label className="block text-sm text-gray-500 mb-1">
                                            Department
                                        </label>
                                        <input
                                            type="text"
                                            id="department"
                                            value={formData.department}
                                            onChange={handleInputChange}
                                            placeholder="Write here"
                                            className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm text-gray-500 mb-1">
                                            Shift Timing
                                        </label>
                                        <input
                                            type="text"
                                            id="shiftTiming"
                                            value={formData.shiftTiming}
                                            onChange={handleInputChange}
                                            placeholder="00:00:00"
                                            className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm text-gray-500 mb-1">
                                            Date of joining
                                        </label>
                                        <input
                                            type="text"
                                            id="dateOfJoining"
                                            value={formData.dateOfJoining}
                                            onChange={handleInputChange}
                                            placeholder="dd/mm/yyyy"
                                            className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm text-gray-500 mb-1">
                                            Allowances
                                        </label>
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                id="allowances"
                                                value={formData.allowances}
                                                onChange={handleInputChange}
                                                placeholder="Write here"
                                                className="flex-1 p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500"
                                            />
                                            <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg">
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm text-gray-500 mb-1">
                                            Manager
                                        </label>
                                        <input
                                            type="text"
                                            id="manager"
                                            value={formData.manager}
                                            onChange={handleInputChange}
                                            placeholder="Write here"
                                            className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500"
                                        />
                                    </div>
                                </div>
                            )}

                            {activeTab === "bank" && (
                                <div className="grid grid-cols-2 gap-x-16 gap-y-6">
                                    <div>
                                        <label className="block text-sm text-gray-500 mb-1">
                                            Bank Name
                                        </label>
                                        <input
                                            type="text"
                                            id="bankName"
                                            value={formData.bankName}
                                            onChange={handleInputChange}
                                            placeholder="123445"
                                            className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm text-gray-500 mb-1">
                                            Bank Branch
                                        </label>
                                        <input
                                            type="text"
                                            id="bankBranch"
                                            value={formData.bankBranch}
                                            onChange={handleInputChange}
                                            placeholder="10/mm/yyyy"
                                            className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm text-gray-500 mb-1">
                                            Account Holder
                                        </label>
                                        <input
                                            type="text"
                                            id="accountHolder"
                                            value={formData.accountHolder}
                                            onChange={handleInputChange}
                                            className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm text-gray-500 mb-1">
                                            Phone Number
                                        </label>
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value="+91"
                                                disabled
                                                className="w-16 p-2.5 border border-gray-200 rounded-lg bg-gray-50"
                                            />
                                            <input
                                                type="tel"
                                                id="bankPhone"
                                                value={formData.bankPhone}
                                                onChange={handleInputChange}
                                                placeholder="Contact Number"
                                                className="flex-1 p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm text-gray-500 mb-1">
                                            Pass Book
                                        </label>
                                        <input
                                            type="file"
                                            id="passBook"
                                            onChange={handleFileChange}
                                            className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500"
                                        />
                                    </div>

                                    <div className="col-span-2">
                                        <label className="block text-sm text-gray-500 mb-1">
                                            Account Number
                                        </label>
                                        <input
                                            type="text"
                                            id="accountNumber"
                                            value={formData.accountNumber}
                                            onChange={handleInputChange}
                                            placeholder="xyz"
                                            className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm text-gray-500 mb-1">
                                            Customer ID
                                        </label>
                                        <input
                                            type="text"
                                            id="customerID"
                                            value={formData.customerID}
                                            onChange={handleInputChange}
                                            placeholder="xyz"
                                            className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm text-gray-500 mb-1">
                                            IFSC Code
                                        </label>
                                        <input
                                            type="text"
                                            id="ifscCode"
                                            value={formData.ifscCode}
                                            onChange={handleInputChange}
                                            placeholder="xyz"
                                            className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm text-gray-500 mb-1">
                                            City
                                        </label>
                                        <input
                                            type="text"
                                            id="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            placeholder="Noida"
                                            className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm text-gray-500 mb-1">
                                            Pin Code
                                        </label>
                                        <input
                                            type="text"
                                            id="pincode"
                                            value={formData.pincode}
                                            onChange={handleInputChange}
                                            placeholder="XXXXXX"
                                            className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm text-gray-500 mb-1">
                                            State
                                        </label>
                                        <input
                                            type="text"
                                            id="state"
                                            value={formData.state}
                                            onChange={handleInputChange}
                                            placeholder="Uttar Pradesh"
                                            className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500"
                                        />
                                    </div>

                                    <div className="col-span-2 grid grid-cols-2 gap-x-16">
                                        <div>
                                            <label className="block text-sm text-gray-500 mb-1">
                                                Upload Aadhar Card
                                            </label>
                                            <input
                                                type="file"
                                                id="aadharCard"
                                                onChange={handleFileChange}
                                                className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm text-gray-500 mb-1">
                                                Upload PAN Card
                                            </label>
                                            <input
                                                type="file"
                                                id="panCard"
                                                onChange={handleFileChange}
                                                className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="flex justify-end mt-8">
                                <button
                                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
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