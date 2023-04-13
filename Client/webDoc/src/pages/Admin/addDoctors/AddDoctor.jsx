import Sidebar from "../../../components/Admin/sidebar/Sidebar"
import Navbar from "../../../components/Admin/navbar/Navbar"
import AddDoctors from "../../../components/Admin/addDoctor/AddDoctor"

import React from 'react'

const AddDoctor = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <AddDoctors/>
      </div>
    </div>
  )
}

export default AddDoctor