import React, { useState } from 'react'
import { forgotPassword } from '../../Helpers/userHelper';
import toast, { Toaster } from 'react-hot-toast'
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

const validate = values => {
  const errors = {};

  if (!values.email) {
    errors.email = toast.error("email is required")
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = toast.error("invalid email address")
  }

  console.log(errors, "///");
  return errors
}

const ResetPassword = () => {
  const history = useNavigate();


  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async value => {
      let verify = forgotPassword({ email: value.email })

      toast.promise(verify, {
        loading: 'sending email...',
        success: <b>email sended successfully</b>,
        error: <b>Can't sent email</b>
      })

      verify.then((data) => {
        console.log(data);
      }).catch((err) => {
        history("/signin")
      })
    }
  })



  return (
    <div class="flex h-screen items-center justify-center bg-[#fbfbfb]">
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <form onSubmit={formik.handleSubmit}>
      <div class="grid w-80 grid-rows-4 gap-1 text-center">
          <h1 className='font-bold text-3xl text-center'>webDoc</h1>
          <p class="font-semibold text-gray-700 text-center">Enter the email address that you given</p>


          <input type="text" class="h-10 w-full rounded border p-2 text-sm mb-3" placeholder="Your email" name='email' onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email} />
          <button type='submit' class="rounded bg-blue-500 text-gray-50 hover:bg-gradient-to-r hover:from-blue-300 hover:to-blue-600 h-10 w-full">verify</button>
      </div>
      </form>

    </div>
  )
}

export default ResetPassword