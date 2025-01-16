import React, { useState } from "react";
import UserSideBar from "../components/UserSideBar";
import UserHeader from "../components/UserHeader";
import { Camera } from "lucide-react";

const FormField = ({ label, id, type = "text", value, onChange, placeholder, disabled, className, children }) => (
    <div className={className}>
        <label className="block text-[0.729vw] text-gray-500 mb-[0.208vw]">{label}</label>
        {children || (
            <input
                type={type}
                id={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                className="w-full p-[0.521vw] border border-gray-200 rounded-[0.417vw] focus:outline-none focus:border-indigo-500"
            />
        )}
    </div>
);

const UserProfile = () => {
    const [formData, setFormData] = useState({
        // Personal Details
        firstName: "", surname: "", pincode: "", city: "", state: "", email: "",
        phone: "", dob: "", gender: "", bloodGroup: "", address: "",
        // Employment Details
        employeeProfile: "", salary: "", employmentType: "", workLocation: "",
        department: "", shiftTiming: "", dateOfJoining: "", allowances: "", manager: "",
        // Bank Details
        bankName: "", bankBranch: "", accountHolder: "", passBook: "",
        accountNumber: "", customerID: "", ifscCode: "", aadharCard: "", panCard: "", bankPhone: ""
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleFileChange = (e) => {
        const { id, files } = e.target;
        if (files[0]) {
            setFormData(prev => ({ ...prev, [id]: files[0].name }));
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
                    <h2 className="text-[1.25vw] font-semibold text-gray-800 mb-[1.667vw]">My Profile</h2>

                    <div className="flex items-center gap-[3.333vw] mb-[2.083vw]">
                        <div className="relative">
                            <div className="w-[10vw] h-[10vw] rounded-full bg-indigo-50 overflow-hidden border-4 border-white ring-1 ring-gray-100">
                                <img src="/api/placeholder/192/192" alt="Profile" className="w-full h-full object-cover" />
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

                    {/* Personal Details Section */}
                    <div className="mb-[2.083vw]">
                        <h3 className="text-[1.1vw] font-semibold text-gray-800 mb-[1.25vw] border-b pb-[0.625vw]">
                            Personal Details
                        </h3>
                        <div className="grid grid-cols-2 space-x-4">
                            <div className="grid grid-cols-2 gap-x-[3.333vw] gap-y-[1.25vw]">
                                <div className="grid grid-cols-2 gap-[0.833vw] col-span-2">
                                    <FormField label="First Name" id="firstName" value={formData.firstName} onChange={handleInputChange} />
                                    <FormField label="Surname" id="surname" value={formData.surname} onChange={handleInputChange} />
                                </div>
                                <FormField label="Date of Birth" id="dob" type="date" value={formData.dob} onChange={handleInputChange} />
                                <FormField label="Gender" id="gender" value={formData.gender} onChange={handleInputChange}>
                                    <select
                                        id="gender"
                                        value={formData.gender}
                                        onChange={handleInputChange}
                                        className="w-full p-[0.521vw] border border-gray-200 rounded-[0.417vw] focus:outline-none focus:border-indigo-500"
                                    >
                                        <option value="Select Any">Select Any</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </FormField>
                                <FormField label="Blood Group" id="bloodGroup" value={formData.bloodGroup} onChange={handleInputChange} />
                                <FormField label="Email" id="email" type="email" value={formData.email} onChange={handleInputChange} />
                                <FormField
                                    label="Address"
                                    id="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    className="col-span-2"
                                />
                            </div>

                            <div className="space-y-6">
                                <FormField label="Phone Number" id="phone" value={formData.phone} onChange={handleInputChange}>
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
                                </FormField>

                                <div className="grid grid-cols-3 space-x-1">
                                    <FormField label="City" id="city" value={formData.city} onChange={handleInputChange} />
                                    <FormField label="Pin Code" id="pincode" value={formData.pincode} onChange={handleInputChange} />
                                    <FormField label="State" id="state" value={formData.state} onChange={handleInputChange} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Employment Details Section */}
                    <div className="mb-[2.083vw]">
                        <h3 className="text-[1.1vw] font-semibold text-gray-800 mb-[1.25vw] border-b pb-[0.625vw]">
                            Employment Details
                        </h3>
                        <div className="grid grid-cols-2 space-x-4">
                            <div className="grid grid-cols-2 gap-x-[3.333vw] gap-y-[1.25vw]">
                                <FormField
                                    label="Employee Profile"
                                    id="employeeProfile"
                                    value={formData.employeeProfile}
                                    onChange={handleInputChange}
                                    placeholder="Write Here"
                                />
                                <FormField
                                    label="Salary"
                                    id="salary"
                                    value={formData.salary}
                                    onChange={handleInputChange}
                                    placeholder="Write Here"
                                />
                                <FormField
                                    label="Department"
                                    id="department"
                                    value={formData.department}
                                    onChange={handleInputChange}
                                    placeholder="Write here"
                                    className="col-span-2"
                                />
                                <FormField label="Allowances" id="allowances" value={formData.allowances} onChange={handleInputChange}>
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
                                </FormField>
                            </div>

                            <div className="space-y-6">
                                <div className="grid grid-cols-2 space-x-2">
                                    <FormField
                                        label="Employment Type"
                                        id="employmentType"
                                        value={formData.employmentType}
                                        onChange={handleInputChange}
                                        placeholder="Write here"
                                    />
                                    <FormField
                                        label="Work Location"
                                        id="workLocation"
                                        value={formData.workLocation}
                                        onChange={handleInputChange}
                                        placeholder="Write here"
                                    />
                                </div>

                                <div className="grid grid-cols-2 space-x-2">
                                    <FormField
                                        label="Shift Timing"
                                        id="shiftTiming"
                                        value={formData.shiftTiming}
                                        onChange={handleInputChange}
                                        placeholder="00:00:00"
                                    />
                                    <FormField
                                        label="Date of joining"
                                        id="dateOfJoining"
                                        value={formData.dateOfJoining}
                                        onChange={handleInputChange}
                                        placeholder="dd/mm/yyyy"
                                    />
                                </div>

                                <FormField
                                    label="Manager"
                                    id="manager"
                                    value={formData.manager}
                                    onChange={handleInputChange}
                                    placeholder="Write here"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Bank Details Section */}
                    <div className="mb-[2.083vw]">
                        <h3 className="text-[1.1vw] font-semibold text-gray-800 mb-[1.25vw] border-b pb-[0.625vw]">
                            Bank Details
                        </h3>
                        <div className="grid grid-cols-2 space-x-4">
                            <div className="grid grid-cols-2 gap-x-[3.333vw] gap-y-[1.25vw]">
                                <FormField
                                    label="Bank Name"
                                    id="bankName"
                                    value={formData.bankName}
                                    onChange={handleInputChange}
                                    placeholder="123445"
                                />
                                <FormField
                                    label="Bank Branch"
                                    id="bankBranch"
                                    value={formData.bankBranch}
                                    onChange={handleInputChange}
                                    placeholder="10/mm/yyyy"
                                />
                                <FormField
                                    label="Account Number"
                                    id="accountNumber"
                                    value={formData.accountNumber}
                                    onChange={handleInputChange}
                                    placeholder="Write Here"
                                    className="col-span-2"
                                />
                                <FormField
                                    label="Customer ID"
                                    id="customerID"
                                    value={formData.customerID}
                                    onChange={handleInputChange}
                                    placeholder="Write Here"
                                />
                                <FormField
                                    label="IFSC Code"
                                    id="ifscCode"
                                    value={formData.ifscCode}
                                    onChange={handleInputChange}
                                    placeholder="Write Here"
                                />
                                <FormField
                                    label="Upload Aadhar Card"
                                    id="aadharCard"
                                    type="file"
                                    onChange={handleFileChange}
                                    className="col-span-2"
                                />
                            </div>

                            <div className="space-y-6">
                                <FormField
                                    label="Account Holder"
                                    id="accountHolder"
                                    value={formData.accountHolder}
                                    onChange={handleInputChange}
                                />
                                <FormField
                                    label="Pass Book"
                                    id="passBook"
                                    type="file"
                                    onChange={handleFileChange}
                                />
                                <FormField
                                    label="Upload PAN Card"
                                    id="panCard"
                                    type="file"
                                    onChange={handleFileChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-end mt-[1.667vw]">
                        <button
                            onClick={() => console.log('Form Data:', formData)}
                            className="px-[1.25vw] py-[0.625vw] bg-indigo-600 text-white rounded-[0.417vw] hover:bg-indigo-700 transition-colors"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;