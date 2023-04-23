import {createBrowserRouter} from "react-router-dom";
import Login from "../pages/Admin/login/Login";
import Home from "../pages/Admin/home/Home";
import Single from "../pages/Admin/single/Single";
import Doctors from "../pages/Admin/doctors/Doctors";
import AddDoctor from '../pages/Admin/addDoctors/AddDoctor'
import Departments from "../pages/Admin/Departments/Departments";
import Patients from "../pages/Admin/Patients/Patients";
import LandingPage from "../pages/User/LandingPage";
import Signup from "../pages/User/Signup";
import Signin from "../pages/User/Signin";
import ListOfDoctors from '../pages/User/Doctors'
import DoctorSignin from "../pages/Doctor/DoctorSignin";
import DoctorsProfile from "../pages/Doctor/DoctorProfile";
import DoctorsEdit from "../pages/Doctor/DoctorsEdit";
import DoctorHome from "../pages/Doctor/DoctorHome";
import Doctorschedule from "../pages/Doctor/Doctorschedule";
import BookDoctor from "../pages/User/BookDoctor";
import CheckoutSuccess from "../pages/User/CheckoutSuccess";
import CheckoutFailure from "../pages/User/CheckoutFailure";
import OtpLogin from "../components/User/OtpLogin/OtpLogin";
import PhoneNumber from "../components/User/PhoneNumber/PhoneNumber";
import EmailVerification from "../pages/User/EmailVerification";
import ResetPassword from "../pages/User/ResetPassword";
import UpdateDoctor from "../pages/Admin/UpdateDoctor/UpdateDoctor";

// import BookDoctor from "../pages/User/BookDoctor";


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
    },
    {
        path:'/admin/update-doctor/:id',
        element:<UpdateDoctor/>
    },
    //user
    {
        path:'/',
        element:<LandingPage/>
    },
    {
        path:'/signup',
        element:<Signup/>
    },
    {
        path:'/signin',
        element:<Signin/>
    },
    {
        path:'/otp',
        element:<OtpLogin/>
    },
    {
        path:'/doctors',
        element:<ListOfDoctors/>
    },
    {
        path:'/appointment/:id',
        element:<BookDoctor/>
    },
    {
        path:'/checkout-success',
        element:<CheckoutSuccess/>
    },
    {
        path:'/checkout-failure',
        element:<CheckoutFailure/>
    },
    {
        path:'/phone',
        element:<PhoneNumber/>
    },
    {
        path:'/forgot-password',
        element:<EmailVerification/>
    },
    {
        path:'/reset-password/:userId/:token',
        element:<ResetPassword/>

    },

    //doctors
    {
        path:'/doctor/signin',
        element:<DoctorSignin/>
    },
    {
        path:'/doctor/',
        element:<DoctorHome/>
    },
    {
        path:"/doctor/profile/:id",
        element:<DoctorsProfile/>
    },
    {
        path:"/doctor/edit/:id",
        element:<DoctorsEdit/>
    },
    {
        path:"/doctor/schedule/:id",
        element:<Doctorschedule/>
    }
    
])