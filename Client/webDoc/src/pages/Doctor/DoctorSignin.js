import React from 'react'
import { useFormik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import { signinDoctor } from '../../Helpers/doctorHelper'
import { useDispatch } from 'react-redux'
import { login } from '../../Redux/Doctor/doctorSlice'

const validate = values => {
    const errors = {};

    //email
    if (!values.email) {
        errors.email = toast.error("email is required")
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = toast.error("invalid email address")
    }

    //password
    else if (!values.password) {
        errors.password = toast.error('password is required');
    } else if (values.password.includes(' ')) {
        errors.password = toast.error('wrong password');
    }
    return errors

}

const DoctorSignin = () => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validate,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {
            let signin = signinDoctor(values)
            toast.promise(signin, {
                loading: 'searching...',
                success: <b>sign in successfull</b>,
                error: <b>can't find the user</b>
            })

            signin.then((user) => {
                if (user) {
                
        
                    dispatch(
                        login({
                            _id: user.data.user._id,
                            firstName:user.data.user.firstName,
                            lastName:user.data.user.lastName,
                            department:user.data.user.department,
                            image:user.data.user.image.secure_url,
                            loggedIn: true
                        })
                    );
                    setTimeout(()=>{
                        history("/doctor");
                    },2000)
                    
                }
            }).catch((err) => {
                console.log("login failure");
            })

        }
    })


    return (
        <div class="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div class="relative py-3 sm:max-w-xl sm:mx-auto">
                <div
                    class="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
                </div>
                <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <div class="max-w-md mx-auto">
                        <Toaster position='top-center' reverseOrder={false}></Toaster>
                        <div>
                            <h1 class="text-2xl font-semibold">Doctor Login</h1>
                        </div>
                        <form onSubmit={formik.handleSubmit}>
                            <div class="divide-y divide-gray-200">
                                <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                    <div class="relative">
                                        <input autocomplete="off" id="email" name="email" type="text" class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email address" onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.email} />
                                        <label for="email" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email Address</label>
                                    </div>
                                    <div class="relative">
                                        <input autocomplete="off" id="password" name="password" type="password" class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.password} />
                                        <label for="password" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
                                    </div>
                                    <div class="relative">
                                        <button class="bg-blue-500 text-white rounded-md px-2 py-1">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DoctorSignin