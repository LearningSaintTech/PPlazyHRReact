import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import LoginImg from '../assets/login.svg';
import Logo from '../assets/logo.svg';
import { useNavigate } from 'react-router-dom';
import { login, getCurrentUser } from "../commonComponent/Api";
import { useSelector, useDispatch } from 'react-redux';
import { setToken, setUser } from '../commonComponent/slice/AuthSlice';
import { ACCESS_TOKEN, USER_DATA } from '../commonComponent/Constant';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });
    const [errorMessage, setErrorMessage] = useState('');

    const handleNavigate = () => {
        navigate('/create-account');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // Clear previous error messages
        try {
            const response = await login(formData);
            console.log("response", response);
            if (response.status === "failure") {
                if (response.reason === "User is inactive. Please contact support.") {
                    setErrorMessage(response.reason);
                } else {
                    setErrorMessage(response.reason);
                }
                return;
            }

            localStorage.setItem(ACCESS_TOKEN, response.data.accessToken);
            dispatch(setToken(response.data.accessToken));
            const userData = await getCurrentUser(response.data.accessToken);
            localStorage.setItem(USER_DATA, JSON.stringify(userData));
            dispatch(setUser(userData));

            if (userData.roles.some(role => role.name === 'ADMIN')) {
                navigate('/admin/home');
            } else if (userData.roles.some(role => role.name === 'USER')) {
                navigate('/user/home');
            } else {
                navigate('/login');
            }
        } catch (error) {
            console.error('Login error:', error);
            setErrorMessage('An error occurred during login. Please try again.');
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    return (
        <div className="min-h-screen bg-indigo-50 flex flex-row">
            <header className="p-[1.25vw]">
                <div className="flex items-center w-[7.729vw] h-[4.958vw] ml-[3.542vw] mt-[1.823vw]">
                    <img src={Logo} alt="LazyHR Logo" />
                </div>
                <div className="w-[52.083vw] h-[36.094vw] mt-[1.25vw] ml-[7.135vw] items-center">
                    <img src={LoginImg} alt="HR Management Illustration" />
                    <p className="mt-[1.25vw] text-center text-gray-700 text-[0.938vw]">
                        Simplify your HR hustle, One click at a time!
                    </p>
                </div>
            </header>

            <main className="flex-1 flex flex-row items-center justify-center px-[1.833vw]">
                <div className="w-full max-w-[26.333vw] py-[1.042vw]">
                    <div className="bg-white rounded-[0.833vw] shadow-lg px-[2.646vw] py-[6.969vw]">
                        <div className="text-center mb-[1.667vw]">
                            <h2 className="text-[1.563vw] font-semibold text-gray-800">
                                Login to your Account
                            </h2>
                            <p className="mt-[0.417vw] text-[1vw] text-gray-600">
                                See what is going on with your business
                            </p>
                        </div>

                        {errorMessage && (
                            <p className="text-red-600 text-center mb-[0.833vw]">{errorMessage}</p>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="space-y-6 py-[5.167vw]">
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
                                                <EyeOff className="h-[1.042vw] w-[1.042vw] text-gray-400" />
                                            ) : (
                                                <Eye className="h-[1.042vw] w-[1.042vw] text-gray-400" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="remember-me"
                                            name="rememberMe"
                                            checked={formData.rememberMe}
                                            onChange={handleInputChange}
                                            className="h-[0.833vw] w-[0.833vw] text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor="remember-me" className="ml-[0.417vw] block text-[1vw] text-gray-700">
                                            Remember Me
                                        </label>
                                    </div>
                                    <a href="#" className="text-[1vw] text-indigo-600 hover:text-indigo-500">
                                        Forgot Password?
                                    </a>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-[0.417vw] px-[0.833vw] border border-transparent rounded-[0.313vw] shadow-sm text-[1vw] font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Login
                                </button>
                            </div>
                        </form>
                        <div className="text-center mt-[0.833vw]">
                            <span className="text-gray-600 text-[1vw]">Not Registered Yet? </span>
                            <button onClick={handleNavigate} className="text-indigo-600 text-[1vw] hover:text-indigo-500">
                                Create an account
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Login;
