import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Lazy-loaded components
const UserHome = React.lazy(() => import('./user/pages/UserHome'));
const UserProfile = React.lazy(() => import('./user/pages/UserProfile'));
const UserAttendance = React.lazy(() => import('./user/pages/UserAttendance'));
const TicketQuery = React.lazy(() => import('./user/pages/TicketQuery'));
const Reimbursement = React.lazy(() => import('./user/pages/Reimbursement'));
const Leave = React.lazy(() => import('./user/pages/ApplyLeave'));
const Wow = React.lazy(() => import('./user/pages/MyLeaves'));
const Payroll = React.lazy(() => import('./user/pages/Payroll'));
const ChangePassword = React.lazy(() => import('./user/pages/ChangePassword'));
const AdminHome = React.lazy(() => import('./admin/pages/AdminHome'));
const Employee = React.lazy(() => import('./admin/pages/Employee'));
const AdminTicketQuery = React.lazy(() => import('./admin/pages/AdminTicketQuery'));
const AdminReimbursement = React.lazy(() => import('./admin/pages/AdminReimbursement'));
const AdminAttendance = React.lazy(() => import('./admin/pages/AdminAttendance'));
const AdminTaskManagement = React.lazy(() => import('./admin/pages/AdminTaskManagement'));
const AdminManagement = React.lazy(() => import('./admin/pages/AdminManagement'));
const AdminCreateEvents = React.lazy(() => import('./admin/pages/AdminCreateEvents'));
const Adminleaves = React.lazy(() => import("./admin/pages/Adminleaves"));
const Login = React.lazy(() => import('./authcomponent/Login'));
const SignUp = React.lazy(() => import('./authcomponent/SignUp'));
const SignupForm = React.lazy(() => import('./authcomponent/SignupForm'));
const UserTaskManagement = React.lazy(() => import('./user/pages/UserTaskManagement'));
const AdminPayroll = React.lazy(() => import('./admin/pages/AdminPayroll'));
const TaskGraph = React.lazy(() => import('./admin/pages/TaskGraph'));
const AdminPerformance = React.lazy(() => import('./admin/pages/AdminPerformance'));
const AdminSalarySlips = React.lazy(() => import('./admin/pages/AdminSalarySlips'));
const ProtectedRoute = React.lazy(() => import('./commonComponent/RoleProtectedRoute'));

function App() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/create-account" element={<SignUp />} />
                <Route path="/SignupForm" element={<SignupForm />} />

                {/* User routes */}
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

                {/* Admin routes */}
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
        </Suspense>
    );
}

export default App;
