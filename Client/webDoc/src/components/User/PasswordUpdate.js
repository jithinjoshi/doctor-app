
import React, { useState } from 'react'
import { updatePassword } from '../../Helpers/userHelper';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import { useFormik } from 'formik';

const validate = values => {
    const errors = {}

    if (!values.password) {
        errors.password = toast.error('password is required');
    } else if (values.password.includes(' ')) {
        errors.password = toast.error('wrong password');
    } else if (values.password.length < 6) {
        errors.password = toast.error('password must contain 6 characters')
    } else if (values.password !== values.confirmPassword) {
        errors.confirmPassword = toast.error("it doesn't match with the first password")
    }

    return errors
}

const PasswordUpdate = ({ userId, token }) => {
    const history = useNavigate()

    const formik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: ''
        },
        validate,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {
            let update = updatePassword(userId, token, { password: values.password })

            toast.promise(update, {
                loading: 'updating...',
                success: <b>sign up successfully</b>,
                error: <b>Can't sign up user</b>
            })

            update.then((data) => {
                setTimeout(() => {
                    history('/signin')
                })
            }, 1000)

        }
    })



    return (
        <div class="flex h-screen items-center justify-center bg-[#fbfbfb]">
        <Toaster position='top-center' reverseOrder={false}></Toaster>
            <div class="grid w-80 grid-rows-4 gap-1 text-center">
                <h1 className='font-bold text-3xl text-center'>webDoc</h1>
                <p class="font-semibold text-gray-700 text-center">Update your password Now!!</p>
                <form onSubmit={formik.handleSubmit}>
                    <input type="password" class="h-10 w-full rounded border p-2 text-sm mb-3" placeholder="Enter Your Password" name='password' onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password} />
                    <input type="password" class="h-10 w-full rounded border p-2 text-sm mb-3" placeholder="Rewrite the password" name='confirmPassword' onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.confirmPassword} />
                    <button type='submit' class="rounded bg-blue-500 text-gray-50 hover:bg-gradient-to-r hover:from-blue-300 hover:to-blue-600">update</button>
                </form>
            </div>
        </div>
    )
}

export default PasswordUpdate