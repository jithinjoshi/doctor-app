import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../Redux/Doctor/doctorSlice';
import SideBar from '../../components/Doctor/SideBar';
import { doctorProfile } from '../../Helpers/doctorHelper';

const DoctorHome = () => {
    const user = useSelector(selectUser);
  return (
    <div className='font-poppins antialiased overflow-x-hidden'>
            <div
                id="view"
                class="h-full w-screen flex flex-row"
                x-data="{ sidenav: true }"
            >
                <SideBar user={user}/>
                
            </div>
        </div>
  )
}

export default DoctorHome