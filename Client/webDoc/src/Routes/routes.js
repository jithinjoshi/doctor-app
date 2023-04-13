import {createBrowserRouter} from "react-router-dom";
import Login from "../pages/Admin/login/Login";
import Home from "../pages/Admin/home/Home";
import List from "../pages/Admin/list/List";
import Single from "../pages/Admin/single/Single";
import Doctors from "../pages/Admin/doctors/Doctors";
import AddDoctor from '../pages/Admin/addDoctors/AddDoctor'
import Departments from "../pages/Admin/Departments/Departments";
import Patients from "../pages/Admin/Patients/Patients";

export const router = createBrowserRouter([
    {
        path:'/admin',
        element:<Home/>
    },
    {
        path:'/admin/login',
        element:<Login/>
    },
    {
        path:'/admin/users',
        element:<Patients/>
    },
    {
        path:'/admin/users/:userId',
        element:<Single/>
    },
    {
        path:'/admin/doctors',
        element:<Doctors/>
    },
    {
        path:'/admin/addDoctor',
        element:<AddDoctor/>
    },
    {
        path:'/admin/departments',
        element:<Departments/>
    }
    
])