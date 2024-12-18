import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserHome from './user/pages/UserHome';
import UserProfile from './user/pages/UserProfile';
import UserAttendance from './user/pages/UserAttendance'; 
import TicketQuery from './user/pages/TicketQuery';
import Reimbursement from './user/pages/Reimbursement'
import Leave from './user/pages/Leave'
import Wow from './user/pages/Wow'
import './App.css';

function App() {
    return (
        <Router>
            <Routes>
                {/* Define the routes */}
                <Route path="/" element={<UserHome />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/attendance" element={<UserAttendance />} />
                <Route path="/ticket/query" element={<TicketQuery />} /> {/* Correct usage of `element` */}
                <Route path="/ticket/reimbursement" element={<Reimbursement />} />
                <Route path="/leave/apply" element={<Leave />} />
                <Route path="/leave/my-leaves" element={<Wow />} />
            </Routes>
        </Router>
    );
}

export default App;
