import React from 'react';
import { Camera } from 'lucide-react';
import UserSidebar from '../components/UserSideBar';
import UserHeader from '../components/UserHeader';

const UserProfilePage = () => {
    return (
        <div className="flex min-h-screen bg-[#e1e1e1]">
            <UserSidebar />
            <div className="flex-1">
                <UserHeader />
                <div className="p-8">
                    <div className="bg-white rounded-2xl w-full">
                        <div className="p-10">
                            <h2 className="text-2xl font-medium text-[#acb0ba]">My Profile</h2>

                            <div className="flex gap-16 mt-16">
                                {/* Left Section - Profile Image and Buttons */}
                                <div className="flex flex-col items-start gap-16">
                                    {/* Profile Image */}
                                    <div className="relative">
                                        <div className="w-60 h-60 rounded-full border-8 border-[#534feb]/50 shadow-lg">
                                            <img
                                                src="/api/placeholder/240/240"
                                                alt="Profile"
                                                className="w-56 h-56 rounded-full m-1"
                                            />
                                        </div>
                                        <button className="absolute bottom-2 right-2 bg-[#534feb] p-3 rounded-full">
                                            <Camera className="w-8 h-8 text-white" />
                                        </button>
                                    </div>

                                    {/* Navigation Buttons */}
                                    <div className="flex flex-col gap-3 w-48">
                                        <button className="px-10 py-3 bg-[#534feb] text-white rounded-lg text-base font-medium">
                                            Personal Details
                                        </button>
                                        <button className="px-6 py-3 text-[#534feb] border border-[#534feb] rounded-lg text-base font-medium">
                                            Employement Details
                                        </button>
                                        <button className="px-14 py-3 text-[#534feb] border border-[#534feb] rounded-lg text-base font-medium">
                                            Bank Details
                                        </button>
                                    </div>
                                </div>

                                {/* Right Section - Profile Details */}
                                <div className="flex-1">
                                    {/* Profile Title */}
                                    <div className="mb-12">
                                        <h1 className="text-2xl font-semibold text-[#3c3c3c]">Aditya Raj</h1>
                                        <p className="text-xl text-[#acb0ba] mt-2">Sr. Frontend Developer</p>
                                    </div>

                                    {/* Employee ID */}
                                    <div className="mt-8 mb-12 flex items-center gap-1">
                                        <span className="text-2xl font-semibold text-[#acb0ba]">Employee ID :</span>
                                        <span className="text-2xl font-medium text-[#534feb]">PP_01</span>
                                    </div>

                                    {/* Form Section */}
                                    <div className="grid grid-cols-2 gap-6 max-w-[1102px]">
                                        <div className="space-y-1">
                                            <label className="text-base font-medium text-[#3c3c3c]">First Name</label>
                                            <input type="text" value="Aditya" className="w-full h-11 px-3 border border-[#caced8] rounded-lg" />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-base font-medium text-[#3c3c3c]">Surname</label>
                                            <input type="text" value="Kum" className="w-full h-11 px-3 border border-[#534feb] rounded-lg shadow-[2px_2px_4px_0px_rgba(83,79,235,0.10)]" />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-base font-medium text-[#3c3c3c]">Date of Birth</label>
                                            <input type="text" placeholder="dd/mm/yyyy" className="w-full h-11 px-3 border border-[#caced8] rounded-lg text-[#caced8]" />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-base font-medium text-[#3c3c3c]">Gender</label>
                                            <input type="text" value="Male" className="w-full h-11 px-3 border border-[#caced8] rounded-lg" />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-base font-medium text-[#3c3c3c]">Blood Group</label>
                                            <input type="text" value="O+" className="w-full h-11 px-3 border border-[#caced8] rounded-lg font-medium" />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-base font-medium text-[#3c3c3c]">e-mail</label>
                                            <input type="email" placeholder="someone@gmail.com" className="w-full h-11 px-3 border border-[#caced8] rounded-lg text-[#caced8]" />
                                        </div>
                                        <div className="space-y-1 col-span-2">
                                            <label className="text-base font-medium text-[#3c3c3c]">Address</label>
                                            <input type="text" className="w-full h-11 px-3 border border-[#caced8] rounded-lg" />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-base font-medium text-[#3c3c3c]">Phone Number</label>
                                            <div className="flex gap-2">
                                                <input type="text" value="+91" className="w-20 h-11 px-3 border border-[#caced8] rounded-lg font-semibold" />
                                                <input type="text" placeholder="(432)-1234123" className="flex-1 h-11 px-3 border border-[#caced8] rounded-lg text-[#caced8]" />
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-base font-medium text-[#3c3c3c]">City</label>
                                            <input type="text" placeholder="Noida" className="w-full h-11 px-3 border border-[#caced8] rounded-lg text-[#caced8]" />
                                        </div>
                                        <div className="flex gap-3">
                                            <div className="space-y-1 flex-1">
                                                <label className="text-base font-medium text-[#3c3c3c]">Pin Code</label>
                                                <input type="text" placeholder="00XXXX" className="w-full h-11 px-3 border border-[#caced8] rounded-lg text-[#caced8]" />
                                            </div>
                                            <div className="space-y-1 flex-1">
                                                <label className="text-base font-medium text-[#3c3c3c]">State</label>
                                                <input type="text" placeholder="Uttar Pradesh" className="w-full h-11 px-3 border border-[#caced8] rounded-lg text-[#caced8]" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Edit Request Button */}
                                    <button className="mt-12 px-4 py-[11px] text-[#534feb] border border-[#534feb] rounded-lg">
                                        Edit Request
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfilePage;