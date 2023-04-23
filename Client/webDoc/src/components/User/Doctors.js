import React, { useState } from 'react'
import Profile from './Profile';
import { Link } from 'react-router-dom';

const Doctors = ({ doctor }) => {
    return (
        <div class="w-full bg-gray-50 border rounded-lg p-12 flex flex-col justify-center items-center">
            <div class="mb-8">
                <img class="object-center object-cover rounded-full h-36 w-36" src={doctor.image.secure_url} alt="photo" />
            </div>
            <div class="text-center">
                <p class="text-xl text-gray-700 font-bold mb-2">{doctor.firstName} {doctor.lastName}</p>
                <p class="text-base text-gray-600 font-normal">{doctor.department}</p>
                <span class="text-base text-gray-400 font-normal">Fees Per Consultation : </span><span className='border-l-zinc-950 inline'>₹{doctor.fees}</span>
                <p class="text-base text-gray-400 font-normal">Available on</p>
                <span className='border-l-zinc-950 inline'>{doctor.startTime} to {doctor.endTime}</span>
            </div>

            <Link to={`/appointment/${doctor._id}`} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">
                Book Now
            </Link>
        </div>

    )
}

export default Doctors