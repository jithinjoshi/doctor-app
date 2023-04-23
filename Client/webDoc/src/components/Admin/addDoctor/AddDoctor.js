import React, { useEffect, useState } from 'react'
import { addDoctor, getAllDepartments } from '../../../Helpers/adminHelper';
import { Toaster, toast } from 'react-hot-toast';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'

const AddDoctor = () => {

    const currentDate = new Date();
    const year = currentDate.getFullYear() - 23;
    const minYear = currentDate.getFullYear() - 80;
    const minDate = new Date(minYear, 0, 1);
    const dateBefore23Years = new Date(year, 0, 30);

    const history = useNavigate();
    const [image, setImage] = useState("");
    const [departments, setDepartments] = useState();
    const [value, setFieldValue] = useState({});
    const [startDate, setStartDate] = useState(new Date('01/01/2000'));

    




    const handleDoctorImageUpload = (e) => {
        const file = e.target.files[0];

        TransformFile(file)
    };

    const TransformFile = (file) => {
        const reader = new FileReader();

        if (file) {
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setImage(reader.result)
            };
        } else {
            setImage("")
        }
    }

    let result;
    if (image) {
        
        const delimiter = '/';
        const end = ';'
        const index = image.indexOf(delimiter);
        const endIndex = image.indexOf(end);
        result = image.slice(index + 1,endIndex);

    }

    const validate = values => {
        const errors = {};


        if (!values.firstName) {
            errors.firstName = toast.error("first name is required");
        } else if (values.firstName.length < 3) {
            errors.firstName = toast.error("firstname should contain three characters")
        }
        else if (!values.lastName) {
            errors.lastName = toast.error("Last name is required");
        }
        else if (!values.email) {
            errors.email = toast.error("email is required");
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = toast.error("invalid email address")
        } else if (!values.password) {
            errors.password = toast.error('password is required');
        } else if (values.password.includes(' ')) {
            errors.password = toast.error('wrong password');
        } else if (!values.address) {
            errors.address = toast.error("address is required");
        } else if (!values.mobile) {
            errors.mobile = toast.error("mobile number is required");

        } else if (values.mobile.length < 11) {
            errors.mobile = toast.error("phone number must valid")
        }
        else if (!values.password) {
            errors.password = toast.error("password is required")
        } else if (values.password < 7) {
            errors.password = toast.error("password must contain six characters")
        }

        else if (!image) {
            errors.image = toast.error("must contain a image")
        }
        else if (!startDate) {
            errors.dob = toast.error("dob is required")
        }else if(result !== 'jpg' && result !== 'jpeg' && result !== 'png' && result !== 'webp'){
            errors.image = toast.error("This format of image is not supported")
        }



        return errors
    }


    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            address: '',
            mobile: '',
            password: ''
        },
        validate,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {
            const date = moment(startDate).format('MM-DD-YYYY');
            let img = { image: image,dob:date }
            const imgCopy = Object.assign({}, values, img,value);

            if (!imgCopy.department) {
                imgCopy.department = departments[0].department;
            }
            let doctor = addDoctor(imgCopy)

            toast.promise(doctor, {
                loading: 'creating...',
                success: <b>Doctor added successfully</b>,
                error: <b>Can't add doctor</b>
            })

            doctor.then((user) => {
                if (user) {
                    history("/admin/doctors")

                }
            }).catch((err) => {
                console.log("login failure");
            })
        }
    })

    useEffect(() => {
        getAllDepartments().then((data) => {
            console.log(data);
            setDepartments(data.data)
        }).catch((err) => {
            console.log(err);
        })
    }, []);




    return (
        <>
            <div class="min-h-screen bg-gray-100 flex items-center justify-center">
                <div class="container max-w-screen-lg mx-auto">
                    <div>

                        <div class="bg-white rounded shadow-lg px-4 md:p-8 mb-6">
                            <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                                <div class="text-gray-600">
                                    <p class="font-medium text-lg">Add Doctor</p>
                                    <p>Please fill out all the fields.</p>
                                </div>

                                <div class="lg:col-span-2">
                                    <Toaster position='top-center' reverseOrder={false}></Toaster>

                                    {
                                        image ?
                                            <div className="flex flex-wrap justify-center mb-5">
                                                <div className="w-6/12 sm:w-4/12 px-4">
                                                    <img src={image} alt="..." className="shadow rounded-full max-w-full h-auto align-middle border-none" />
                                                </div>
                                            </div>
                                            :
                                            <div className="flex flex-wrap justify-center mb-5">
                                                <div className="w-16 h-16 sm:w-4/12 rounded-full">
                                                    <p>image will appear here</p>
                                                </div>
                                            </div>
                                    }

                                    <form onSubmit={formik.handleSubmit}>
                                        <div class="flex items-center justify-center w-full">
                                            <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50">
                                                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <svg aria-hidden="true" class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                                    <p class="mb-2 text-sm text-gray-500"><span class="font-semibold">Click to upload</span></p>
                                                </div>
                                                <input id="dropzone-file" type="file" class="hidden" accept='image/*' onChange={handleDoctorImageUpload} />
                                            </label>
                                        </div>

                                        <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5 mt-5">
                                            <div class="md:col-span-5">
                                                <label for="full_name">First Name</label>
                                                <input type="text" name="firstName" id="full_name" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.firstName} />
                                            </div>

                                            <div class="md:col-span-5">
                                                <label for="full_name">Last Name</label>
                                                <input type="text" name="lastName" id="full_name" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.lastName} />
                                            </div>

                                            <div class="md:col-span-5">
                                                <label for="email">Email Address</label>
                                                <input type="text" name="email" id="email" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="email@domain.com" onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.email} />
                                            </div>

                                            <div class="md:col-span-5">
                                                <label for="email">Address</label>
                                                <input type="text" name="address" id="email" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.address} />
                                            </div>

                                            <div class="md:col-span-3">
                                                <label for="address">Mobile Number</label>
                                                <input type="number" name="mobile" id="address" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.mobile} />
                                            </div>


                                            {/* <div class="md:col-span-2">
                                                <label for="city">Department</label>
                                                <input type="text" name="department" id="city" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.department} />
                                            </div> */}

                                            <div className='md:col-span-2'>
                                                <label for="city">Department</label>
                                                <select name="Department" id="department" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" onChange={(e) => setFieldValue({ department: e.target.value })}>

                                                    {
                                                        departments ?
                                                            departments.map((department) => {
                                                                return (
                                                                    <option value={department.department}>{department.department}</option>
                                                                )
                                                            })
                                                            :
                                                            <option></option>
                                                    }
                                                </select>
                                            </div>









                                            <div class="md:col-span-2">
                                                <label for="city">Date Of birth</label>
                                                <DatePicker name="dob" id='city' className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" selected={startDate} value={startDate} onChange={(date) => setStartDate(date)} maxDate={dateBefore23Years} minDate={minDate}
                                                    onBlur={formik.handleBlur} />
                                            </div>

                                            <div class="md:col-span-3">
                                                <label for="address">Password</label>
                                                <input type="password" name="password" id="address" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.password} />
                                            </div>






                                            <div class="md:col-span-5 text-right">
                                                <div class="inline-flex items-end">
                                                    <button type='submit' class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
                                                </div>
                                            </div>

                                        </div>
                                    </form>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddDoctor