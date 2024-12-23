import React, { useState } from 'react';
import AdminSideBar from '../component/AdminSidebar';
import AdminHeader from '../component/AdminHeader';  // Importing the Header component


const AdminHome = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <AdminSideBar />

      {/* Main Content */}
      <div className="flex-1">
        <AdminHeader  />
        home page
        
      </div>
    </div>
  );
};

export default AdminHome;
