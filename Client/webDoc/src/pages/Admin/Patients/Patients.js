import React, { useEffect, useState } from 'react'
import "./Patients.scss"
import Sidebar from "../../../components/Admin/sidebar/Sidebar"
import Navbar from "../../../components/Admin/navbar/Navbar"
import Patientstable from "../../../components/Admin/patients/Patients"
import { getAllPatients } from '../../../Helpers/adminHelper'

const Patients = () => {
    const [patients,setPatients] = useState([]);
    useEffect(()=>{
        getAllPatients().then((user)=>{
            setPatients(user.data)
        }).catch((err)=>{
            console.log(err);
        })
    },[])
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Patientstable patients={patients}/>
      </div>
    </div>
  )
}

export default Patients