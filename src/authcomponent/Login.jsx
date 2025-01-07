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
                console.log("response",response);
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
        <div className="min-h-screen bg-indigo-50 flex flex-col">
            <header className="p-6">
                <div className="flex items-center w-[164px] h-[76px] ml-[68px] mt-[35px]">
                    <img src={Logo} alt="LazyHR Logo" />
                </div>
            </header>

            <main className="flex-1 flex flex-col md:flex-row items-center justify-center px-4 sm:px-6 lg:px-8">
                <div className="w-[1056px] h-[693px] flex flex-col items-center">
                    <img src={LoginImg} alt="HR Management Illustration" />
                    <p className="mt-6 text-center text-gray-700 text-lg">
                        Simplify your HR hustle, One click at a time!
                    </p>
                </div>

                <div className="w-full md:w-1/2 max-w-md">
                    <div className="bg-white rounded-lg shadow-lg px-[60px] py-[153px]">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-semibold text-gray-800">
                                Login to your Account
                            </h2>
                            <p className="mt-2 text-gray-600">
                                See what is going on with your business
                            </p>
                        </div>

                        {errorMessage && (
                            <p className="text-red-600 text-center mb-4">{errorMessage}</p>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="mail@abc.com"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                        Password
                                    </label>
                                    <div className="mt-1 relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            id="password"
                                            name="password"
                                            placeholder="********"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-5 w-5 text-gray-400" />
                                            ) : (
                                                <Eye className="h-5 w-5 text-gray-400" />
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
                                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                            Remember Me
                                        </label>
                                    </div>
                                    <a href="#" className="text-sm text-indigo-600 hover:text-indigo-500">
                                        Forgot Password?
                                    </a>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Login
                                </button>

                                <div className="text-center mt-4">
                                    <span className="text-gray-600">Not Registered Yet? </span>
                                    <button onClick={handleNavigate} className="text-indigo-600 hover:text-indigo-500">
                                        Create an account
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Login;
