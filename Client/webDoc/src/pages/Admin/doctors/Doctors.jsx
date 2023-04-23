import "./doctors.scss"
import Sidebar from "../../../components/Admin/sidebar/Sidebar"
import Navbar from "../../../components/Admin/navbar/Navbar"
import DoctorsList from "../../../components/Admin/doctors/Doctors"
import { listDoctors } from "../../../Helpers/adminHelper"

import { useEffect, useState } from "react"

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  useEffect(() => {
    listDoctors().then((data) => {
        setDoctors(data?.data?.data);
    }).catch((err) => {
        console.log(err);
    })
}, []);


  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <DoctorsList doctors={doctors} setDoctors={setDoctors}/>
      </div>
    </div>
  )
}

export default Doctors