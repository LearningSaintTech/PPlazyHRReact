import React, { useState, useEffect } from "react";
import UserSideBar from "../components/UserSideBar";
import UserHeader from "../components/UserHeader";

const UserProfile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        surname: "",
        pincode: "",
        city: "",
        state: "",
        email: "",
        phone: "",
        dob: "",
        gender: "",
    });
    const [error, setError] = useState("");

    // State for current date and time
    const [currentDateTime, setCurrentDateTime] = useState({
        day: "",
        time: "",
        date: "",
    });

    // Function to update current date and time
    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            const options = { weekday: "long" }; // Get full day name
            const day = now.toLocaleDateString(undefined, options);
            const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true });
            const date = now.toLocaleDateString(); // Format: DD/MM/YYYY
            setCurrentDateTime({ day, time, date });
        };

        // Update every second
        updateDateTime();
        const interval = setInterval(updateDateTime, 1000);

        return () => clearInterval(interval);
    }, []);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const lookupPincode = async (pincode) => {
        try {
            const response = await fetch(
                `https://api.postalpincode.in/pincode/${pincode}`
            );
            const data = await response.json();
            if (data[0].Status === "Success") {
                const postOffice = data[0].PostOffice[0];
                setFormData({
                    ...formData,
                    city: postOffice.District,
                    state: postOffice.State,
                });
                setError("");
            } else {
                throw new Error("Invalid pincode");
            }
        } catch (error) {
            setError("Failed to fetch pincode data");
        }
    };

    const handlePincodeChange = async (e) => {
        const pincode = e.target.value;
        setFormData({ ...formData, pincode, city: "", state: "" });
        if (pincode.length === 6) {
            await lookupPincode(pincode);
        }
    };

    return (
        <div className="flex bg-gray-100 min-h-screen">
            {/* Sidebar */}
            <UserSideBar />

            {/* Main Content */}
            <div className="flex-1 p-8 ml-[290px]">
                {/* Header */}
                <UserHeader
                    title="User Dashboard"
                    avatarSrc="/api/placeholder/35/35"
                    showNotification={true}
                    showChevron={true}
                />

                {/* Profile Section */}
                <section className="bg-white p-8 rounded-lg shadow relative">
                    {/* My Profile Heading */}
                    {/* Welcome Message and Current Day-Time */}
                    <div className="flex justify-between items-center mb-4">
                        <p className="text-gray-600 text-lg">
                            Welcome back, <span className="text-blue-500 font-semibold">Aditya</span>
                        </p>
                        <p className="text-blue-500 font-medium">
                            {currentDateTime.day}, {currentDateTime.time}
                        </p>
                    </div>

                    <h3 className="text-gray-600 text-lg font-bold mb-6">My Profile</h3>

                    {/* Rest of the existing code remains the same */}
                    {/* Profile Picture and Info */}
                    <div className="flex items-center gap-8 mb-8">
                        {/* Profile Picture */}
                        <div className="relative w-32 h-32">
                            <img
                                src="/api/placeholder/130/130"
                                alt="Profile Picture"
                                className="w-full h-full rounded-full object-cover border-4 border-white"
                            />
                            <div className="absolute bottom-2 right-2 bg-indigo-500 text-white p-2 rounded-full cursor-pointer">
                                <i className="fas fa-camera"></i>
                            </div>
                        </div>

                        {/* User Info */}
                        <div>
                            <h2 className="text-xl font-bold text-gray-700">{`${formData.firstName} ${formData.surname}`}</h2>
                            <p className="text-gray-500">Sr. Frontend Developer</p>
                        </div>
                    </div>

                    {/* Remaining code continues as before */}
                    {/* Edit Profile Button */}
                    <div className="mb-8">
                        <button
                            className="border border-indigo-500 text-indigo-500 px-4 py-2 rounded-lg hover:bg-indigo-50"
                            onClick={() => setIsEditing(true)}
                        >
                            Edit Profile
                        </button>
                    </div>

                    <hr className="mb-8" />

                    {/* Employee ID */}
                    <div className="mb-8">
                        <p className="text-gray-500 text-sm">Employee ID:</p>
                        <h4 className="text-indigo-500 font-bold">PP_01</h4>
                    </div>

                    {/* Forms */}
                    <div className="grid grid-cols-2 gap-8">
                        {/* Personal Information */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-700 mb-4">Personal</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm text-gray-500">First Name</label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        className="w-full p-3 border rounded-lg focus:outline-none focus:border-indigo-500"
                                        disabled={!isEditing}
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <label className="text-sm text-gray-500">Surname</label>
                                    <input
                                        type="text"
                                        id="surname"
                                        className="w-full p-3 border rounded-lg focus:outline-none focus:border-indigo-500"
                                        disabled={!isEditing}
                                        value={formData.surname}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="mt-4">
                                <label className="text-sm text-gray-500">Date of Birth</label>
                                <input
                                    type="date"
                                    id="dob"
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:border-indigo-500"
                                    disabled={!isEditing}
                                    value={formData.dob}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mt-4">
                                <label className="text-sm text-gray-500">Gender</label>
                                <select
                                    id="gender"
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:border-indigo-500"
                                    disabled={!isEditing}
                                    value={formData.gender}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-700 mb-4">Contact</h3>
                            <div>
                                <label className="text-sm text-gray-500">Pincode</label>
                                <input
                                    type="text"
                                    id="pincode"
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:border-indigo-500"
                                    disabled={!isEditing}
                                    value={formData.pincode}
                                    onChange={handlePincodeChange}
                                />
                                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                            </div>
                            <div className="grid grid-cols-2 gap-4 mt-4">
                                <div>
                                    <label className="text-sm text-gray-500">City</label>
                                    <input
                                        type="text"
                                        id="city"
                                        className="w-full p-3 border rounded-lg focus:outline-none"
                                        disabled
                                        value={formData.city}
                                    />
                                </div>
                                <div>
                                    <label className="text-sm text-gray-500">State</label>
                                    <input
                                        type="text"
                                        id="state"
                                        className="w-full p-3 border rounded-lg focus:outline-none"
                                        disabled
                                        value={formData.state}
                                    />
                                </div>
                            </div>
                            <div className="mt-4">
                                <label className="text-sm text-gray-500">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:border-indigo-500"
                                    disabled={!isEditing}
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mt-4">
                                <label className="text-sm text-gray-500">Phone</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:border-indigo-500"
                                    disabled={!isEditing}
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Save / Cancel Buttons */}
                    {isEditing && (
                        <div className="flex justify-end mt-8 gap-4">
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded-lg"
                                onClick={() => setIsEditing(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-green-500 text-white px-4 py-2 rounded-lg"
                                onClick={() => {
                                    // Save logic can go here
                                    setIsEditing(false);
                                }}
                            >
                                Save Changes
                            </button>
                        </div>
                    )}
                </section>
            </div>
        </div>

    );
};

export default UserProfile;
