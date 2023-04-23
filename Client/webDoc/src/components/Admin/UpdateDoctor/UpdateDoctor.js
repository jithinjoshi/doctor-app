import React, { useEffect, useState } from 'react'
import { Toaster, toast } from 'react-hot-toast';
import { doctorProfile } from '../../../Helpers/doctorHelper';
import { useNavigate, useParams } from 'react-router-dom';
import { editDoctorProfile } from '../../../Helpers/adminHelper';
import { useFormik } from 'formik';
import { getAllDepartments } from '../../../Helpers/adminHelper';


const UpdateDoctor = () => {
    const history = useNavigate();

    let result;
    const { id } = useParams();
    const [doctor, setDoctor] = useState([]);

    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [about, setAbout] = useState();
    const [address, setAddress] = useState();
    const [dob, setDob] = useState();
    const [password, setPassword] = useState();
    const [experience, setExperience] = useState();
    const [fees, setFees] = useState();
    const [image, setImage] = useState();
    const [department, setDepartment] = useState();
    const [departments, setDepartments] = useState([]);
    const [mobile, setMobile] = useState();
    const [previousImage, setPreviousImage] = useState();

    useEffect(() => {
        getAllDepartments().then((departments) => {
            setDepartments(departments.data)
        })
    }, []);




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

    //validation
    if (image) {

        const delimiter = '/';
        const end = ';'
        const index = image.indexOf(delimiter);
        const endIndex = image.indexOf(end);
        result = image.slice(index + 1, endIndex);

    }

    const validate = () => {
        const errors = {};


        if (!firstName) {
            errors.firstName = toast.error("first name is required");
        } else if (firstName.length < 3) {
            errors.firstName = toast.error("firstname should contain three characters")
        }
        else if (!lastName) {
            errors.lastName = toast.error("Last name is required");
        }
        else if (!email) {
            errors.email = toast.error("email is required");
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
            errors.email = toast.error("invalid email address")
        } else if (!password) {
            errors.password = toast.error('password is required');
        } else if (password.includes(' ')) {
            errors.password = toast.error('wrong password');
        } else if (!address) {
            errors.address = toast.error("address is required");
        } else if (!mobile) {
            errors.mobile = toast.error("mobile number is required");

        } else if (mobile.length < 11) {
            errors.mobile = toast.error("phone number must valid")
        } else if (!fees) {
            errors.fees = toast.error("fees is required")
        }

        if (image) {
            if (result !== 'jpg' && result !== 'jpeg' && result !== 'png' && result !== 'webp') {
                errors.image = toast.error("This format of image is not supported")
            }
        }

        return errors
    }

    useEffect(() => {
        doctorProfile(id).then((doctor) => {
            setDoctor(doctor.data);

            setFirstName(doctor?.data?.firstName);
            setLastName(doctor?.data?.lastName);
            setEmail(doctor?.data?.email);
            setAddress(doctor?.data?.address);
            setDob(doctor?.data?.dob);
            setPassword(doctor?.data?.password);
            setAbout(doctor?.data?.about);
            setExperience(doctor?.data?.experience)
            setFees(doctor?.data?.fees);
            setDepartment(doctor?.data?.department);
            setMobile(doctor?.data?.mobile);
            setPreviousImage(doctor?.data?.image?.secure_url)



        }).catch((err) => {
            return err;
        })
    }, []);

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            address: '',
            mobile: '',
            password: '',
            fees,
        },
        validate,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: () => {
            const credentials = {
                firstName,
                lastName,
                email,
                address,
                dob,
                about,
                experience,
                fees,
                image,
                imgPublicId: doctor?.image?.public_id
            }

            editDoctorProfile(id, credentials).then((doctor) => {
                toast.success("doctor updated successfully")

                history("/doctor")

            }).catch((err) => {
                toast.error("doctor updation failed")
                console.log(err);
            })

        }
    });
    return (
        <>
            <div class="flex h-screen items-center justify-center  mt-36 mb-32">
                <Toaster position='top-center' reverseOrder={false}></Toaster>
                <div class="grid bg-white rounded-lg shadow-xl w-11/12 md:w-9/12 lg:w-1/2">

                    <div class="flex justify-center">
                        <div class="flex">
                            <h1 class="text-gray-600 font-bold md:text-2xl text-xl">Doctor Updation</h1>
                        </div>
                    </div>

                    <div class="flex justify-center py-4">
                        <div>
                            <img class="rounded w-36 h-36" src={previousImage} alt="Extra large avatar" />
                        </div>
                    </div>


                    <form onSubmit={formik.handleSubmit}>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-5 mx-7">
                            <div class="grid grid-cols-1">
                                <label class="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">First Name</label>
                                <input class="py-2 px-3 rounded-lg border-2 border-gray-300 mt-1 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent" type="text" placeholder="First Name" name='firstName' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                            </div>
                            <div class="grid grid-cols-1">
                                <label class="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Last Name</label>
                                <input class="py-2 px-3 rounded-lg border-2 border-gray-300 mt-1 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent" type="text" placeholder="Last Name" name='lastName' value={lastName} onChange={(e) => setLastName(e.target.value)} />
                            </div>
                        </div>

                        <div class="grid grid-cols-1 mt-5 mx-7">
                            <label class="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Email</label>
                            <input class="py-2 px-3 rounded-lg border-2 border-gray-300 mt-1 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent" type="email" placeholder="Email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div class="grid grid-cols-1 mt-5 mx-7">
                            <label class="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Address</label>
                            <input class="py-2 px-3 rounded-lg border-2 border-gray-300 mt-1 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent" type="text" placeholder="Address" name='address' value={address} onChange={(e) => setAddress(e.target.value)} />
                        </div>

                        <div class="grid grid-cols-1 mt-5 mx-7">
                            <label class="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Department</label>
                            <select class="py-2 px-3 rounded-lg border-2 border-gray-300 mt-1 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent" onChange={(e) => setDepartment(e.target.value)} value={department}>
                                {departments.map((department) => {
                                    return (
                                        <option value={department.department}>{department.department}</option>
                                    )
                                })}
                            </select>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-5 mx-7">
                            <div class="grid grid-cols-1">
                                <label class="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Mobile Number</label>
                                <input class="py-2 px-3 rounded-lg border-2 border-gray-300 mt-1 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent" type="number" placeholder="Mobile" name='mobile' value={mobile} onChange={(e) => setMobile(e.target.value)} />
                            </div>
                            <div class="grid grid-cols-1">
                                <label class="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Fees</label>
                                <input class="py-2 px-3 rounded-lg border-2 border-gray-300 mt-1 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent" type="text" placeholder="fees" name='fees' value={fees} onChange={(e) => setFees(e.target.value)} />
                            </div>
                        </div>



                        <div class="grid grid-cols-1 mt-5 mx-7">
                            <label class="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold mb-1">Upload Photo</label>
                            <div class='flex items-center justify-center w-full'>
                                <label class='flex flex-col border-4 border-dashed w-full h-32 hover:bg-gray-100 hover:border-gray-300 group'>

                                    <div class='flex flex-col items-center justify-center pt-7'>
                                        <svg class="w-10 h-10 text-gray-400 group-hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                        <p class='lowercase text-sm text-gray-400 group-hover:text-gray-600 pt-1 tracking-wider'>Select a photo</p>
                                    </div>
                                    <input type='file' class="hidden" accept='image/*' onChange={handleDoctorImageUpload} />
                                </label>
                            </div>
                        </div>

                        <div class='flex items-center justify-center  md:gap-8 gap-4 pt-5 pb-5'>

                            <button class='w-auto bg-blue-500 hover:bg-blue-700 rounded-lg shadow-xl font-medium text-white px-4 py-2'>Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default UpdateDoctor