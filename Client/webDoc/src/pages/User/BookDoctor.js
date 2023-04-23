import React, { useEffect, useState } from 'react'
import NavBar from '../../components/User/NavBar'
import SideBar from '../../components/User/SideBar'
import AppointmentDoctor from '../../components/User/BookDoctor'
import { useParams } from 'react-router-dom'
import { getSingleDoctor } from '../../Helpers/userHelper'

const BookDoctor = () => {
    const {id} = useParams();
    const [doctor,setDoctor] = useState([]);
    useEffect(()=>{
        getSingleDoctor(id).then((doctor)=>{
            setDoctor(doctor.data)
        }).catch((err)=>{
            return err;
        })
    },[]);
    console.log(doctor,">>>>>><<<<<<");
    return (
        <>
        <NavBar/>
        <div className="flex">
                <SideBar />
                <div className="h-screen flex-1 p-7">
                    <div>
                        <h2>Appointment Doctor</h2>
                        <AppointmentDoctor doctor={doctor}/>
                    </div>

                </div>
            </div>

        </>
    )
}

export default BookDoctor