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

function App() {
    return (
            <Routes>
                {/* Define the routes */}
                <Route path="/" element={<Login />} />
                <Route path="/create-account" element={<SignUp />} />
                <Route path="/SignupForm" element={<SignupForm/>}/>
                <Route path="/user/home" element={<UserHome />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/attendance" element={<UserAttendance />} />
                <Route path="/ticket/query" element={<TicketQuery />} /> 
                <Route path="/ticket/reimbursement" element={<Reimbursement />} />
                <Route path="/leave/apply" element={<Leave />} />
                <Route path="/leave/my-leaves" element={<Wow />} />
                <Route path="/payroll" element={<Payroll />} />
                <Route path="/setting/changepassword" element={<ChangePassword />} />
                <Route path="/task-management" element={<UserTaskManagement />} />


                <Route path="/admin/home" element={<AdminHome />} />
                <Route path="/admin/employees" element={<Employee />} />
                <Route path="/admin/attendance" element={<AdminAttendance />} />
                <Route path="/admin/task-management" element={<AdminTaskManagement />} />
                <Route path="/admin/tickets/query" element={<AdminTicketQuery />} />
                <Route path="/admin/tickets/reimbursement" element={<AdminReimbursement />} />
                <Route path="/admin/leaves/apply" element={<Adminleaves />} />
                <Route path="/admin/management" element={<AdminManagement />} />
                <Route path="/admin/create-event" element={<AdminCreateEvents />} />
                <Route path="/admin/payroll" element={<AdminPayroll />} />

                <Route path="/admin/graphs" element={<TaskGraph />} />
                <Route path="/admin/performance-tracking" element={<AdminPerformance />} />
            </Routes>
    );
}

export default App;
