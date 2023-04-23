import React from 'react'
import { Link } from 'react-router-dom'

const Profile = ({doctor,id}) => {
  return (
    <>
        <div class="p-6">
                <div class="p-8 bg-white shadow mt-24">
                    <div class="grid grid-cols-1 md:grid-cols-3">
                        <div class="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0"></div>
                        <div class="relative py-5">
                            <div class="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                                <img src={doctor?.image?.secure_url} className='rounded-full w-48 h-48' alt="" />
                            </div>
                        </div>
                    </div>

                    <div class="mt-20 text-center border-b pb-12">
                        <h1 class="text-4xl font-medium text-gray-700">{doctor.firstName} {doctor.lastName}</h1>
                        <p class="font-light text-gray-600 mt-3">{doctor.department}</p>

                        <p class="mt-8 text-gray-500">{doctor.email}</p>
                        <p class="mt-2 text-gray-500">{doctor.dob}</p>
                        <p class="mt-2 text-gray-500">{doctor.address}</p>
                    </div>

                    <div class="mt-12 flex flex-col justify-center">
                        <p class="text-gray-600 text-center font-light lg:px-16">{doctor?.about}</p>
                        <button
                            class="text-indigo-500 py-2 px-4  font-medium mt-4"
                        >
                            <Link to={`/doctor/edit/${id}`}>Edit Profile</Link>
                        </button>
                    </div>

                </div>
            </div>
    </>
  )
}

export default Profile