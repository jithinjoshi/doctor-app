import React, { useState } from 'react'
import { createDepartments, getAllDepartments } from '../../../Helpers/adminHelper';
import { useFormik } from 'formik'
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast'

const validate = values => {
    const errors = {};

    //department
    if (!values.department) {
        errors.department = toast.error('department is required');
    } else if (values.department.trim().length === 0) {
        errors.department = toast.error('not valid department');
    }
    return errors
}


const AddDepartment = ({ onClose, visible, setDepartments }) => {
    const history = useNavigate();
    const formik = useFormik({
        initialValues: {
            department: ''
        },
        validate,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {
            let departments = createDepartments(values)
            toast.promise(departments, {
                loading: 'searching...',
                success: <b>department added successfully</b>,
                error: <b>This department already exist</b>
            })
            departments.then(async (data) => {
                if (data) {
                    setDepartments(data?.data);


                    setTimeout(() => {
                        onClose();
                    }, 1000)

                }
            }).catch((err) => {
                console.log("login failure");
            })

        }
    })


    const handleOnClose = (e) => {
        if (e.target.id === "container") onClose();
    }
    if (!visible) return null;
    return (

        <div id='container' className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center' onClick={handleOnClose}>
            <Toaster position='top-center' reverseOrder={false}></Toaster>
            <div className="bg-white p-2 rounded w-80 relative">
                <h1 className="font-semibold text-center text-xl text-gray-700 mt-2">
                    Add Department
                </h1>
                <div class="absolute top-0 right-0">
                    <button class="bg-white text-black hover:text-red-600 font-bold py-2 px-4 rounded" onClick={() => onClose()}>
                        X
                    </button>
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <div className="flex flex-col mt-3">
                        <input
                            type="text"
                            name='department'
                            className="border border-gray-700 p-2 rounded mb-5"
                            placeholder="Add new department"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.department}
                        />
                    </div>
                    <div className="text-center">
                        <button className="px-5 py-2 bg-gray-700 text-white rounded" type='submit'>
                            Submit
                        </button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default AddDepartment