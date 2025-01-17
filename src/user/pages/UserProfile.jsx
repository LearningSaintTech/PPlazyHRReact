import React, { useState, useEffect } from "react";
import UserSideBar from "../components/UserSideBar";
import UserHeader from "../components/UserHeader";
import { Camera } from "lucide-react";
import { getEmployeeProfile,updateEmployee } from "../../commonComponent/Api"; // Adjust the path to match your project structure
import { useSelector } from "react-redux";

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

    const [profileData, setProfileData] = useState(null); // State to store the API response
    const [loading, setLoading] = useState(true); // State to manage loading state
    const [error, setError] = useState(null); // State to manage errors
  const user = useSelector((state) => state.auth.user);
    // useEffect(() => {
    //     const fetchData = async () => {
    //       try {
    //         setLoading(true);
    //         const response = await getEmployeeProfile(); // Call the API function
    //         setProfileData(response); // Assuming the data is in the `data` key
    //         console.log("responseeee",profileData)
    //       } catch (err) {
    //         console.error("Error fetching profile data:", err);
    //         setError("Failed to load profile data");
    //       } finally {
    //         setLoading(false);
    //       }
    //     };

    //     fetchData();
    //   }, []);


    const fetchData = async () => {
        setLoading(true);
        try {
            const data = await getEmployeeProfile();
            setProfileData(data);
            console.log("profile", profileData)
        } catch (error) {
            console.error('Error fetching reimbursements:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setProfileData(prev => ({ ...prev, [id]: value }));
    };

    const handleFileChange = (e) => {
        const { id, files } = e.target;
        if (files[0]) {
            setProfileData(prev => ({ ...prev, [id]: files[0].name }));
        }
    };

    const handleSave = async () => {
        try {
            const response = await updateEmployee(profileData.employeeId, profileData); // Call the update API
            console.log("Employee updated successfully:", response);
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating employee profile:", error);
            alert("Failed to update profile. Please try again.");
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

                {loading ? (
                    <div className="text-center py-[0.833vw]">Loading...</div>
                ) : (
                    <>
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
                                    <h3 className="text-[1.25vw] font-semibold text-gray-800"> {profileData.firstName} {profileData.surname}</h3>
                                    <p className="text-[1.1vw] text-gray-500">{profileData.designation}</p>
                                    <p className="text-gray-500 text-[0.9vw] mt-[0.417vw]">
                                        Employee ID: <span className="text-indigo-600 text-[0.9vw]">{profileData.empId}</span>
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
                                            <FormField label="First Name" id="firstName" value={profileData.firstName} onChange={handleInputChange} />
                                            <FormField label="Surname" id="surname" value={profileData.surname} onChange={handleInputChange} />
                                        </div>
                                        <FormField label="Date of Birth" id="dob" type="date" value={profileData.dob} onChange={handleInputChange} />
                                        <FormField label="Gender" id="gender" value={profileData.gender} onChange={handleInputChange}>
                                            <select
                                                id="gender"
                                                value={profileData.gender}
                                                onChange={handleInputChange}
                                                className="w-full p-[0.521vw] border border-gray-200 rounded-[0.417vw] focus:outline-none focus:border-indigo-500"
                                            >
                                                <option value="Select Any">Select Any</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </FormField>
                                        <FormField label="Blood Group" id="bloodGroup" value={profileData.bloodGroup} onChange={handleInputChange} />
                                        <FormField label="Email" id="email" type="email" value={profileData.email} onChange={handleInputChange} />
                                        <FormField
                                            label="Address"
                                            id="address"
                                            value={profileData.address}
                                            onChange={handleInputChange}
                                            className="col-span-2"
                                        />
                                    </div>

                                    <div className="space-y-6">
                                        <FormField label="Phone Number" id="phone" value={profileData.phno} onChange={handleInputChange}>
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
                                                    value={profileData.phno}
                                                    onChange={handleInputChange}
                                                    placeholder="Mobile Number"
                                                    className="flex-1 p-[0.521vw] border border-gray-200 rounded-[0.417vw] focus:outline-none focus:border-indigo-500"
                                                />
                                            </div>
                                        </FormField>

                                        <div className="grid grid-cols-3 space-x-1">
                                            <FormField label="City" id="city" value={profileData.city} onChange={handleInputChange} />
                                            <FormField label="Pin Code" id="pincode" value={profileData.pinCode} onChange={handleInputChange} />
                                            <FormField label="State" id="state" value={profileData.state} onChange={handleInputChange} />
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
                                            value={profileData.employeeProfile}
                                            onChange={handleInputChange}
                                            placeholder="Write Here"
                                        />
                                        <FormField
                                            label="Salary"
                                            id="salary"
                                            value={profileData.salary}
                                            onChange={handleInputChange}
                                            placeholder="Write Here"
                                        />
                                        <FormField
                                            label="Department"
                                            id="department"
                                            value={profileData.department}
                                            onChange={handleInputChange}
                                            placeholder="Write here"
                                            className="col-span-2"
                                        />
                                        <FormField label="Allowances" id="allowances" value={profileData.allowances} onChange={handleInputChange}>
                                            <div className="flex gap-[0.417vw]">
                                                <input
                                                    type="text"
                                                    id="allowances"
                                                    value={profileData.allowances}
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
                                                value={profileData.employmentType}
                                                onChange={handleInputChange}
                                                placeholder="Write here"
                                            />
                                            <FormField
                                                label="Work Location"
                                                id="workLocation"
                                                value={profileData.workLocation}
                                                onChange={handleInputChange}
                                                placeholder="Write here"
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 space-x-2">
                                            <FormField
                                                label="Shift Timing"
                                                id="shiftTiming"
                                                value={profileData.shift}
                                                onChange={handleInputChange}
                                                placeholder="00:00:00"
                                            />
                                            <FormField
                                                label="Date of joining"
                                                id="dateOfJoining"
                                                value={profileData.dateOfJoining}
                                                onChange={handleInputChange}
                                                placeholder="dd/mm/yyyy"
                                            />
                                        </div>

                                        <FormField
                                            label="Manager"
                                            id="manager"
                                            value={profileData.manager}
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
                                            value={profileData.bankName}
                                            onChange={handleInputChange}
                                            placeholder="123445"
                                        />
                                        <FormField
                                            label="Bank Branch"
                                            id="bankBranch"
                                            value={profileData.bankBranch}
                                            onChange={handleInputChange}
                                            placeholder="10/mm/yyyy"
                                        />
                                        <FormField
                                            label="Account Number"
                                            id="accountNumber"
                                            value={profileData.accountNumber}
                                            onChange={handleInputChange}
                                            placeholder="Write Here"
                                            className="col-span-2"
                                        />
                                        <FormField
                                            label="Customer ID"
                                            id="customerID"
                                            value={profileData.customerID}
                                            onChange={handleInputChange}
                                            placeholder="Write Here"
                                        />
                                        <FormField
                                            label="IFSC Code"
                                            id="ifscCode"
                                            value={profileData.ifscCode}
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
                                            value={profileData.accountHolder}
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
                                onClick={handleSave}
                                className="px-[1.25vw] py-[0.625vw] bg-indigo-600 text-white rounded-[0.417vw] hover:bg-indigo-700 transition-colors"
                                >
                                    Save
                                </button>
                            </div>
                        </div>

                    </>

                )}
            </div>
        </div>
    );
};

export default UserProfile;