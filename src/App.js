import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserHome from './user/pages/UserHome';
import UserProfile from './user/pages/UserProfile';
import UserAttendance from './user/pages/UserAttendance';
import TicketQuery from './user/pages/TicketQuery';
import Reimbursement from './user/pages/Reimbursement';
import Leave from './user/pages/ApplyLeave';
import Wow from './user/pages/MyLeaves';
import './App.css';
import Payroll from './user/pages/Payroll';
import ChangePassword from './user/pages/ChangePassword';
import AdminHome from './admin/pages/AdminHome';
import Employee from './admin/pages/Employee';
import AdminTicketQuery from './admin/pages/AdminTicketQuery';
import AdminReimbursement from './admin/pages/AdminReimbursement';
import AdminAttendance from './admin/pages/AdminAttendance';
import AdminTaskManagement from './admin/pages/AdminTaskManagement';
import AdminManagement from './admin/pages/AdminManagement';
import AdminCreateEvents from './admin/pages/AdminCreateEvents';
import Adminleaves from "../src/admin/pages/Adminleaves"
import Login from './authcomponent/Login';
import SignUp from './authcomponent/SignUp';
import UserTaskManagement from './user/pages/UserTaskManagement';
import SignupForm from './authcomponent/SignupForm';
import AdminPayroll from './admin/pages/AdminPayroll';
import TaskGraph from './admin/pages/TaskGraph';
import AdminPerformance from './admin/pages/AdminPerformance';
import Dummy from './user/pages/Dummy';
import AdminSalarySlips from './admin/pages/AdminSalarySlips';
import ProtectedRoute from './commonComponent/ProtectedRoute';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/create-account" element={<SignUp />} />
            <Route path="/SignupForm" element={<SignupForm />} />

            <Route
                path="/user/home"
                element={
                    <ProtectedRoute>
                        <UserHome />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/profile"
                element={
                    <ProtectedRoute>
                        <UserProfile />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/attendance"
                element={
                    <ProtectedRoute>
                        <UserAttendance />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/ticket/query"
                element={
                    <ProtectedRoute>
                        <TicketQuery />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/ticket/reimbursement"
                element={
                    <ProtectedRoute>
                        <Reimbursement />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/leave/apply"
                element={
                    <ProtectedRoute>
                        <Leave />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/leave/my-leaves"
                element={
                    <ProtectedRoute>
                        <Wow />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/payroll"
                element={
                    <ProtectedRoute>
                        <Payroll />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/setting/changepassword"
                element={
                    <ProtectedRoute>
                        <ChangePassword />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/task-management"
                element={
                    <ProtectedRoute>
                        <UserTaskManagement />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/dummy"
                element={
                    <ProtectedRoute>
                        <Dummy />
                    </ProtectedRoute>
                }
            />

            {/* Admin Routes */}
            <Route
                path="/admin/home"
                element={
                    <ProtectedRoute>
                        <AdminHome />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/admin/employees"
                element={
                    <ProtectedRoute>
                        <Employee />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/admin/attendance"
                element={
                    <ProtectedRoute>
                        <AdminAttendance />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/admin/task-management"
                element={
                    <ProtectedRoute>
                        <AdminTaskManagement />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/admin/tickets/query"
                element={
                    <ProtectedRoute>
                        <AdminTicketQuery />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/admin/tickets/reimbursement"
                element={
                    <ProtectedRoute>
                        <AdminReimbursement />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/admin/leaves/apply"
                element={
                    <ProtectedRoute>
                        <Adminleaves />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/admin/management"
                element={
                    <ProtectedRoute>
                        <AdminManagement />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/admin/create-event"
                element={
                    <ProtectedRoute>
                        <AdminCreateEvents />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/admin/payroll"
                element={
                    <ProtectedRoute>
                        <AdminPayroll />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/admin/payroll/salary-slip"
                element={
                    <ProtectedRoute>
                        <AdminSalarySlips />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/admin/graphs"
                element={
                    <ProtectedRoute>
                        <TaskGraph />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/admin/performance-tracking"
                element={
                    <ProtectedRoute>
                        <AdminPerformance />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
}

export default App;


