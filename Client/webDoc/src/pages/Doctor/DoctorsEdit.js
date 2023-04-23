import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { login, selectDoctor, selectUser } from '../../Redux/Doctor/doctorSlice'
import { doctorProfile, editDoctorProfile } from '../../Helpers/doctorHelper'
import { useNavigate, useParams } from 'react-router-dom'
import SideBar from '../../components/Doctor/SideBar'
import { Toaster, toast } from 'react-hot-toast'
import { useFormik } from 'formik'


const DoctorsEdit = () => {
    const history = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector(selectUser)

    let result;


    let { id } = useParams();
    let [doctor, setDoctor] = useState([]);

    let [firstName, setFirstName] = useState();
    let [lastName, setLastName] = useState();
    let [email, setEmail] = useState();
    let [address, setAddress] = useState();
    let [dob, setDob] = useState();
    let [password, setPassword] = useState();
    let [about, setAbout] = useState();
    const [experience, setExperience] = useState();
    const [fees, setFees] = useState();
    const [image, setImage] = useState();

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

    //validate
    if (image) {

        const delimiter = '/';
        const end = ';'
        const index = image.indexOf(delimiter);
        const endIndex = image.indexOf(end);
        result = image.slice(index + 1, endIndex);

    }
    console.log(result,"{{{{{{{");
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
            // } else if (!mobile) {
            //     errors.mobile = toast.error("mobile number is required");

            // } else if (mobile.length < 11) {
            //     errors.mobile = toast.error("phone number must valid")
        }
        else if (!password) {
            errors.password = toast.error("password is required")
        } else if (password < 7) {
            errors.password = toast.error("password must contain six characters")
        }

        if(image){
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
            setFees(doctor?.data?.fees)



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
            password: ''
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
                toast.loading('Loading...');
                dispatch(
                    login({
                        _id: doctor.data._id,
                        firstName: doctor.data.firstName,
                        lastName: doctor.data.lastName,
                        department: doctor.data.department,
                        image: doctor.data.image.secure_url,
                        loggedIn: true
                    })
                );
                toast.success("doctor updated successfully")

                history("/doctor")

            }).catch((err) => {
                toast.error("doctor updation failed")
                console.log(err);
            })

        }
    });

    // const submitHandler = (e) => {
    //     e.preventDefault();
    //     const credentials = {
    //         firstName,
    //         lastName,
    //         email,
    //         address,
    //         dob,
    //         about,
    //         experience,
    //         fees,
    //         image,
    //         imgPublicId: doctor?.image?.public_id
    //     }
    //     editDoctorProfile(id, credentials).then((doctor) => {
    //         dispatch(
    //             login({
    //                 _id: doctor.data._id,
    //                 firstName: doctor.data.firstName,
    //                 lastName: doctor.data.lastName,
    //                 department: doctor.data.department,
    //                 image: doctor.data.image.secure_url,
    //                 loggedIn: true
    //             })
    //         );

    //         history("/doctor")

    //     }).catch((err) => {
    //         console.log(err);
    //     })

    //}

    return (

        <div className='font-poppins antialiased overflow-x-hidden coverflow-hidden'>
            <div
                id="view"
                class="h-full w-screen flex flex-row overflow-hidden"
                x-data="{ sidenav: true }"
            >
                <SideBar />

                <section className="px-2">
                <Toaster position='top-center' reverseOrder={false}></Toaster>
                    <form novalidate="" action="" className="container flex flex-col mx-auto space-y-10 ng-untouched ng-pristine ng-valid" onSubmit={formik.handleSubmit}>
                        <fieldset className="grid grid-cols-4 gap-6 p-4 rounded-md shadow-sm border">
                            <div className="space-y-2 col-span-full lg:col-span-1">
                                <p className="font-medium">Personal Inormation</p>
                                <p className="text-xs">About myself in brief</p>
                            </div>
                            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                                <div className="col-span-full sm:col-span-3">
                                    <label for="firstname" className="text-sm">First name</label>
                                    <input id="firstname" type="text" onChange={(e) => setFirstName(e.target.value)} value={firstName} placeholder="First name" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900 border text-center" />
                                </div>
                                <div className="col-span-full sm:col-span-3">
                                    <label for="lastname" className="text-sm">Last name</label>
                                    <input id="lastname" type="text" onChange={(e) => setLastName(e.target.value)} value={lastName} placeholder="Last name" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900 border text-center" />
                                </div>
                                <div className="col-span-full sm:col-span-3">
                                    <label for="email" className="text-sm">Email</label>
                                    <input id="email" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900 border text-center" />
                                </div>
                                <div className="col-span-full">
                                    <label for="address" className="text-sm">Address</label>
                                    <input id="address" type="text" placeholder="" onChange={(e) => setAddress(e.target.value)} value={address} className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900 border text-center" />
                                </div>
                                <div className="col-span-full sm:col-span-3">
                                    <label for="city" className="text-sm">Date Of Birth</label>
                                    <input id="city" type="date" value={dob} placeholder="" onChange={(e) => setDob(e.target.value)} className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900 border text-center" />
                                </div>

                                <div className="col-span-full sm:col-span-3">
                                    <label for="email" className="text-sm">Experience</label>
                                    <input id="experience" type="number" placeholder="Experience" onChange={(e) => setExperience(e.target.value)} value={experience} className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900 border text-center" />
                                </div>

                            </div>
                        </fieldset>
                        <fieldset className="grid grid-cols-4 gap-6 p-4 rounded-md shadow-sm border">
                            <div className="space-y-2 col-span-full lg:col-span-1">
                                <p className="font-medium">Profile</p>
                                <p className="text-xs">About my profile</p>
                            </div>
                            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                                <div className="col-span-full sm:col-span-3">
                                    <label for="username" className="text-sm">email/username</label>
                                    <input id="username" value={email} type="text" placeholder="Username" disabled className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900 border text-center" />
                                </div>
                                <div className="col-span-full sm:col-span-3">
                                    <label for="website" className="text-sm">Password</label>
                                    <input id="website" type="password" disabled value={password?.substr(0, 6)} className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900 border text-center" />
                                </div>
                                <div className="col-span-full sm:col-span-3">
                                    <label for="website" className="text-sm">Fees Per consultation</label>
                                    <input id="website" type="number" value={fees} onChange={(e) => setFees(e.target.value)} className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900 border text-center" />
                                </div>
                                <div className="col-span-full">
                                    <label for="bio" className="text-sm">About Me</label>
                                    <textarea id="bio" value={about} placeholder="" onChange={(e) => setAbout(e.target.value)} className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900 border text-center"></textarea>
                                </div>
                                <div className="col-span-full">
                                    <label for="bio" className="text-sm">Photo</label>
                                    <div className="flex items-center space-x-2">
                                        <img src={doctor?.image?.secure_url} alt="" className="w-10 h-10 rounded-full" />
                                        <input id="dropzone-file" type="file" className="px-4 py-2 border rounded-md dark:border-gray-700 dark:text-gray-900" accept='image/*' onChange={handleDoctorImageUpload} />
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                        <div class="flex justify-center">
                            <button type='submit' class="bg-purple-900 text-white hover:bg-blue-400 font-bold py-2 px-4 mt-1 rounded items-center">submit</button>
                        </div>
                    </form>

                </section>

            </div>
        </div>


    )
}

export default DoctorsEdit