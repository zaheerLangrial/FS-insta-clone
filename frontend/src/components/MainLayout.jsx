import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux';
import Signin from '../pages/Signin';

const MainLayout = () => {
  const user = useSelector((state) => state.auth.user);
  return (
    <div className='flex'>
        <Sidebar />
        <div className='flex-1'>
            {/* {
              user ? : <Signin />
            } */}
            <Outlet /> 
        </div>
    </div>
  )
}

export default MainLayout