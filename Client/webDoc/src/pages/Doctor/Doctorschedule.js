import React from 'react'
import DoctorTimeSchedule from '../../components/Doctor/DoctorTimeSchedule'
import SideBar from '../../components/Doctor/SideBar'

const Doctorschedule = () => {
    return (
        <div className='font-poppins antialiased overflow-x-hidden'>
            <div
                id="view"
                class="h-full w-screen flex flex-row"
                x-data="{ sidenav: true }"
            >
                <SideBar/>
                <h1 className='m-5 font-extrabold'>Schedule Time</h1>
                <DoctorTimeSchedule/>
            </div>
        </div>
    )
}

export default Doctorschedule