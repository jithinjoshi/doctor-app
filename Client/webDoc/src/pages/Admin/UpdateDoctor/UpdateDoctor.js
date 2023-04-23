import React from 'react'
import Sidebar from "../../../components/Admin/sidebar/Sidebar"
import Navbar from "../../../components/Admin/navbar/Navbar"
import UpdateUserForm from "../../../components/Admin/UpdateDoctor/UpdateDoctor"

const UpdateDoctor = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <UpdateUserForm/> 
      </div>
    </div>
  )
}

export default UpdateDoctor