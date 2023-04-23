import "./departments.scss"
import Sidebar from "../../../components/Admin/sidebar/Sidebar"
import Navbar from "../../../components/Admin/navbar/Navbar"
import DepartmentList from "../../../components/Admin/departments/Departments"
import { getAllDepartments } from "../../../Helpers/adminHelper"

import { useEffect, useState } from "react"

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  useEffect(() => {
    getAllDepartments().then((data) => {
        setDepartments(data?.data);
    }).catch((err) => {
        console.log(err);
    })
}, []);



  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <DepartmentList departments={departments} setDepartments={setDepartments}/>
      </div>
    </div>
  )
}

export default Departments;