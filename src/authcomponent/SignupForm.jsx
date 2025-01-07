import React, { useState } from 'react';
import { signupForm } from '../commonComponent/Api';  // Ensure the API function is correctly imported
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
        const navigate = useNavigate();
    
  const [formData, setFormData] = useState({
    dob: '',
    gender: '',
    bloodGroup: '',
    phno: '',
    address: '',
    email: '',
    bankName: '',
    bankBranch: '',
    accountHolder: '',
    accountNumber: '',
    ifscCode: '',
    passbookPhoto: '',
    aadharCardPhoto: '',
    pancardPhoto: '',
    city: '',
    pinCode: '',
    state: '',
    firstName: '',
    surname: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
        // Assuming formData is structured correctly, adjust if needed
        console.log("Form Data:", formData);

        // Call the signup API (or any other API you're using)
        const response = await signupForm(formData);  // Send the form data for signup

        if (response) {
            console.log('Success:', response);
            navigate("/");
            // Handle successful signup (e.g., navigate to another page, show a message, etc.)
        }
    } catch (error) {
        console.error('Error:', error);
        // Handle error (e.g., show an error message to the user)
    }
};
  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date of Birth:</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender:</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700">Blood Group:</label>
        <input
          type="text"
          id="bloodGroup"
          name="bloodGroup"
          value={formData.bloodGroup}
          onChange={handleChange}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>

      <div>
        <label htmlFor="phno" className="block text-sm font-medium text-gray-700">Phone Number:</label>
        <input
          type="tel"
          id="phno"
          name="phno"
          value={formData.phno}
          onChange={handleChange}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address:</label>
        <textarea
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>

      <div>
        <label htmlFor="bankName" className="block text-sm font-medium text-gray-700">Bank Name:</label>
        <input
          type="text"
          id="bankName"
          name="bankName"
          value={formData.bankName}
          onChange={handleChange}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>

      <div>
        <label htmlFor="bankBranch" className="block text-sm font-medium text-gray-700">Bank Branch:</label>
        <input
          type="text"
          id="bankBranch"
          name="bankBranch"
          value={formData.bankBranch}
          onChange={handleChange}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>

      <div>
        <label htmlFor="accountHolder" className="block text-sm font-medium text-gray-700">Account Holder:</label>
        <input
          type="text"
          id="accountHolder"
          name="accountHolder"
          value={formData.accountHolder}
          onChange={handleChange}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>

      <div>
        <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700">Account Number:</label>
        <input
          type="text"
          id="accountNumber"
          name="accountNumber"
          value={formData.accountNumber}
          onChange={handleChange}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>

      <div>
        <label htmlFor="ifscCode" className="block text-sm font-medium text-gray-700">IFSC Code:</label>
        <input
          type="text"
          id="ifscCode"
          name="ifscCode"
          value={formData.ifscCode}
          onChange={handleChange}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>

      <div>
        <label htmlFor="passbookPhoto" className="block text-sm font-medium text-gray-700">Passbook Photo URL:</label>
        <input
          type="url"
          id="passbookPhoto"
          name="passbookPhoto"
          value={formData.passbookPhoto}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>

      <div>
        <label htmlFor="aadharCardPhoto" className="block text-sm font-medium text-gray-700">Aadhar Card Photo URL:</label>
        <input
          type="url"
          id="aadharCardPhoto"
          name="aadharCardPhoto"
          value={formData.aadharCardPhoto}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>

      <div>
        <label htmlFor="pancardPhoto" className="block text-sm font-medium text-gray-700">Pancard Photo URL:</label>
        <input
          type="url"
          id="pancardPhoto"
          name="pancardPhoto"
          value={formData.pancardPhoto}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>

      <div>
        <label htmlFor="city" className="block text-sm font-medium text-gray-700">City:</label>
        <input
          type="text"
          id="city"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>

      <div>
        <label htmlFor="pinCode" className="block text-sm font-medium text-gray-700">Pin Code:</label>
        <input
          type="text"
          id="pinCode"
          name="pinCode"
          value={formData.pinCode}
          onChange={handleChange}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>

      <div>
        <label htmlFor="state" className="block text-sm font-medium text-gray-700">State:</label>
        <input
          type="text"
          id="state"
          name="state"
          value={formData.state}
          onChange={handleChange}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>

      <div>
        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>

      <div>
        <label htmlFor="surname" className="block text-sm font-medium text-gray-700">Surname:</label>
        <input
          type="text"
          id="surname"
          name="surname"
          value={formData.surname}
          onChange={handleChange}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>

      <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded-md mt-6 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
        Submit
      </button>
    </form>
  );
};

export default SignupForm;
