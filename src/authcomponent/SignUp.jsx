import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import LoginImg from '../assets/login.svg';
import Logo from '../assets/logo.svg';
import { signup, getCurrentUser } from "../commonComponent/Api";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '../commonComponent/slice/AuthSlice';
import { ACCESS_TOKEN, USER_DATA } from '../commonComponent/Constant';

const SignUp = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        rememberMe: false
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle signup logic here
        try {
            const response = await signup(formData);
            // console.log("You're successfully registered. Please verify your email!", response);

            // Set token in localStorage and Redux store
            localStorage.setItem(ACCESS_TOKEN, response.data.accessToken);
            dispatch(setToken(response.data.accessToken));

            // Fetch current user data
            const userData = await getCurrentUser(response.data.accessToken);
            localStorage.setItem(USER_DATA, JSON.stringify(userData));
            dispatch(setUser(userData));

            // Redirect to OTP verification
            navigate('/SignupForm');
        } catch (error) {
            console.log((error && error.message) || 'Oops! Something went wrong. Please try again!');
        }
        // console.log('Form submitted:', formData);
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleNavigate = () => {
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-indigo-50 flex flex-row">
            {/* Header */}
            <header className="p-[1.25vw]">
                <div className="flex items-center w-[7.729vw] h-[4.958vw] ml-[3.542vw] mt-[1.823vw]">
                    <img
                        src={Logo}
                        alt="LazyHR Logo"
                    />
                </div>
                <div className="w-[52.083vw] h-[36.094vw] mt-[2.083vw] ml-[7.135vw] items-center">
                    <img
                        src={LoginImg}
                        alt="HR Management Illustration"
                    />
                    <p className="mt-[1.25vw] text-center text-gray-700 text-[0.938vw]">
                        Simplify your HR hustle, One click at a time!
                    </p>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex flex-row items-center justify-center px-[1vw]">
                <div className="w-full max-w-[26.333vw] py-[1.25vw]">
                    <div className="bg-white rounded-[0.833vw] shadow-lg px-[3vw] py-[5.6vw]">
                        <div className="text-center mb-[1.667vw]">
                            <h2 className="text-[1.563vw] font-semibold text-gray-800">
                                Create your Account
                            </h2>
                            <p className="mt-[0.417vw] text-gray-600 text-[1vw]">
                                See what is going on with your business
                            </p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="space-y-6 py-[5.167vw]">
                                {/* Full Name Input */}
                                <div>
                                    <label htmlFor="name" className="block text-[1vw] font-medium text-gray-700">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Your Name"
                                        value={formData.name} // Fixed binding here
                                        onChange={handleInputChange}
                                        className="mt-[0.208vw] block w-full px-[0.625vw] py-[0.417vw] border border-gray-300 rounded-[0.313vw] shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        required
                                    />
                                </div>

                                {/* Email Input */}
                                <div>
                                    <label htmlFor="email" className="block text-[1vw] font-medium text-gray-700">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="mail@abc.com"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="mt-[0.208vw] block w-full px-[0.625vw] py-[0.417vw] border border-gray-300 rounded-[0.313vw] shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        required
                                    />
                                </div>

                                {/* Password Input */}
                                <div>
                                    <label htmlFor="password" className="block text-[1vw] font-medium text-gray-700">
                                        Password
                                    </label>
                                    <div className="mt-[0.208vw] relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            id="password"
                                            name="password"
                                            placeholder="********"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            className="block w-full px-[0.625vw] py-[0.417vw] border border-gray-300 rounded-[0.313vw] shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-0 pr-[0.625vw] flex items-center"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-[18px] w-[18px] text-gray-400" />
                                            ) : (
                                                <Eye className="h-[18px] w-[18px] text-gray-400" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* Remember Me */}
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="remember-me"
                                        name="rememberMe"
                                        checked={formData.rememberMe}
                                        onChange={handleInputChange}
                                        className="h-[15px] w-[15px] text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="remember-me" className="ml-[0.417vw] block text-[1vw] text-gray-700">
                                        Remember Me
                                    </label>
                                </div>

                                {/* Create Account Button */}
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-[0.417vw] px-[0.833vw] border border-transparent rounded-[0.313vw] shadow-sm text-[1vw] font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Create Account
                                </button>
                            </div>
                        </form>
                        {/* Login Link */}
                        <div className="text-center mt-[0.833vw]">
                            <span className="text-gray-600 text-[1vw]">Already Have An Account? </span>
                            <button onClick={handleNavigate} className="text-indigo-600 text-[1vw] hover:text-indigo-500">
                                Login Here
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SignUp;
