import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { doctorProfile } from '../../Helpers/doctorHelper';
import Profile from '../../components/Doctor/Profile';
import SideBar from '../../components/Doctor/SideBar';

const DoctorsProfile = () => {
    let { id } = useParams();
    let [doctor, setDoctor] = useState([]);
    useEffect(() => {
        doctorProfile(id).then((doctor) => {
            setDoctor(doctor.data)
        }).catch((err) => {
            return err;
        })
    }, []);
    return (
        <div className='font-poppins antialiased overflow-x-hidden'>
            <div
                id="view"
                class="h-full w-screen flex flex-row"
                x-data="{ sidenav: true }"
            >
                <SideBar />
                <div className='flex items-center justify-center p-16'>
                <Profile doctor={doctor} id={id} />
                </div>
                
            </div>
        </div>
    )
}

export default DoctorsProfile

