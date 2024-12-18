import React from 'react'
import UserSideBar from '../components/UserSideBar'
import UserProfile from './UserProfile'
import UserAttendance from './UserAttendance'

const UserHome = () => {
    return (
        <div className='bg-sky-500'>
            {/* <UserSideBar /> */}
            {/* <UserProfile /> */}
            <UserAttendance />
        </div>
    )
}

export default UserHome