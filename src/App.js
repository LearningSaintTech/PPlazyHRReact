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
import AdminSalarySlips from './admin/pages/AdminSalarySlips';
import ProtectedRoute from './commonComponent/RoleProtectedRoute';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/create-account" element={<SignUp />} />
            <Route path="/SignupForm" element={<SignupForm />} />



            <Route path="/user/home" element={<ProtectedRoute allowedRoles={['USER']}><UserHome /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute allowedRoles={['USER']}><UserProfile /></ProtectedRoute>} />
            <Route path="/attendance" element={<ProtectedRoute allowedRoles={['USER']}><UserAttendance /></ProtectedRoute>} />
            <Route path="/ticket/query" element={<ProtectedRoute allowedRoles={['USER']}><TicketQuery /></ProtectedRoute>} />
            <Route path="/ticket/reimbursement" element={<ProtectedRoute allowedRoles={['USER']}><Reimbursement /></ProtectedRoute>} />
            <Route path="/leave/apply" element={<ProtectedRoute allowedRoles={['USER']}><Leave /></ProtectedRoute>} />
            <Route path="/leave/my-leaves" element={<ProtectedRoute allowedRoles={['USER']}><Wow /></ProtectedRoute>} />
            <Route path="/payroll" element={<ProtectedRoute allowedRoles={['USER']}><Payroll /></ProtectedRoute>} />
            <Route path="/setting/changepassword" element={<ProtectedRoute allowedRoles={['USER']}><ChangePassword /></ProtectedRoute>} />
            <Route path="/task-management" element={<ProtectedRoute allowedRoles={['USER']}><UserTaskManagement /></ProtectedRoute>} />





            <Route path="/admin/home" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminHome /></ProtectedRoute>} />
            <Route path="/admin/employees" element={<ProtectedRoute allowedRoles={['ADMIN']}><Employee /></ProtectedRoute>} />
            <Route path="/admin/attendance" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminAttendance /></ProtectedRoute>} />
            <Route path="/admin/task-management" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminTaskManagement /></ProtectedRoute>} />
            <Route path="/admin/tickets/query" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminTicketQuery /></ProtectedRoute>} />
            <Route path="/admin/tickets/reimbursement" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminReimbursement /></ProtectedRoute>} />
            <Route path="/admin/leaves/apply" element={<ProtectedRoute allowedRoles={['ADMIN']}><Adminleaves /></ProtectedRoute>} />
            <Route path="/admin/management" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminManagement /></ProtectedRoute>} />
            <Route path="/admin/create-event" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminCreateEvents /></ProtectedRoute>} />
            <Route path="/admin/payroll" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminPayroll /></ProtectedRoute>} />
            <Route path="/admin/payroll/salary-slip" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminSalarySlips /></ProtectedRoute>} />
            <Route path="/admin/graphs" element={<ProtectedRoute allowedRoles={['ADMIN']}><TaskGraph /></ProtectedRoute>} />
            <Route path="/admin/performance-tracking" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminPerformance /></ProtectedRoute>} />

        </Routes>
    );
}

export default App;


