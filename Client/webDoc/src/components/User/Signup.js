import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import toast, { Toaster } from 'react-hot-toast'
import { googleRegister, registerUser } from '../../Helpers/userHelper'

import { app } from '../../config/firebase-config'
import {getAuth,signInWithPopup,GoogleAuthProvider} from 'firebase/auth'

const validate = values =>{
    const errors = {};

    //username
    if(!values.username){
        errors.username = toast.error('Username Required')
    }else if(values.username.length < 4){
        errors.username = toast.error('username should contain atleast Four characters')
    }


    //email
    else if(!values.email){
        errors.email = toast.error("email is required")
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
        errors.email = toast.error("invalid email address")
    }

    //mobile
    else if(!values.mobile){
        errors.mobile = toast.error("mobile number is required");
    }
    else if(!/^[1-9]{1}[0-9]{9}$/.test(values.mobile)){
        errors.mobile = toast.error("invalid mobile number")
    }


    //password
    else if(!values.password){
        errors.password = toast.error('password is required');
    }else if(values.password.length < 6){
        errors.password = toast.error("password should contain atleast Six characters")
    }else if(values.password.includes(' ')){
        errors.password = toast.error('wrong password');
    }

    //confirm password

    else if(values.password !== values.confirmPassword){
        errors.confirmPassword = toast.error("it doesn't match with the first password")
    }

    return errors
}


const Signup = () => {
    const history = useNavigate()
    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword:'',
            mobile:''
        },
        validate,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit:async values => {
            
            let register = registerUser(values)
            
            toast.promise(register,{
                loading : 'creating...',
                success : <b>sign up successfully</b>,
                error : <b>Can't sign up user</b>
            })

            register.then((data)=>{
                if(data){
                    history("/signin")
                }
            })


        }
    })

    //signup with google

    const firebaseAuth = getAuth(app)
    const provider = new GoogleAuthProvider();

    const loginwithGoogle = async()=>{
        const response = await signInWithPopup(firebaseAuth,provider);
    }

    useEffect(()=>{
        firebaseAuth.onAuthStateChanged((userCred)=>{
            if(userCred){
                userCred.getIdToken().then((token)=>{
                    console.log(token);
                    googleRegister(token).then(data=>{
                        if(data.user){
                            history("/home")
                        }
                        
                    }).catch((err)=>{
                        console.log(err);
                    })
                })
            }
        })
    },[])
    
   
    return (
        <div>
            <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
                <div>
                <Toaster position='top-center' reverseOrder={false}></Toaster>
                    <a href="/">
                        <h3 className="text-4xl font-bold text-purple-600">
                            signup here
                        </h3>
                    </a>
                </div>
                <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg">
                    <form onSubmit={formik.handleSubmit}>
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                userame
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    type="text"
                                    name="username"
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.username}

                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Email
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    type="email"
                                    name="email"
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Mobile Number
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    type="text"
                                    name="mobile"
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.mobile}

                                />
                            </div>
                        </div>

                        <div className="mt-4">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Password
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    type="password"
                                    name="password"
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password}
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="password_confirmation"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Confirm Password
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.confirmPassword}
                                />
                            </div>
                        </div>
                        <a
                            href="#"
                            className="text-xs text-purple-600 hover:underline"
                        >
                            Forget Password?
                        </a>
                        <div className="flex items-center mt-4">
                            <button type='submit' className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                                Sign up
                            </button>
                        </div>
                    </form>
                    <div className="mt-4 text-grey-600">
                        Already have an account?{" "}
                        <span>
                            <Link to="/signin" className="text-purple-600 hover:underline">
                                sign in
                            </Link>
                        </span>
                    </div>
                    <div className="flex items-center w-full my-4">
                        <hr className="w-full" />
                        <p className="px-3 ">OR</p>
                        <hr className="w-full" />
                    </div>
                    <div className="my-6 space-y-2">
                        <button
                            aria-label="Login with Google"
                            type="button"
                            className="flex items-center justify-center w-full p-2 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-400 focus:ring-violet-400"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 32 32"
                                className="w-5 h-5 fill-current"
                            >
                                <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                            </svg>
                            <button onClick={loginwithGoogle}>Sign up with Google</button>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup