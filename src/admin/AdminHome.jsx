import React from 'react'
import AdminSideBar from './AdminSideBar'

const AdminHome = () => {
  return (
    <div className="bg-red-500 text-white text-center p-10">
    {/* <h1 className="text-4xl font-bold">Welcome to HRMS</h1>
    <p className="mt-4 text-lg text-black">React 17 + Tailwind CSS Setup</p> */}
    <AdminSideBar></AdminSideBar>
  </div>  )
}

export default AdminHome