import React, { useEffect, useState } from 'react'
import Doctor from '../../components/User/Doctors'
import NavBar from '../../components/User/NavBar'
import { getAllDoctors } from '../../Helpers/userHelper';
import SideBar from '../../components/User/SideBar';



const Doctors = () => {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        getAllDoctors().then((doctors) => {
            setDoctors(doctors);
        })
    }, []);


    return (
        <>
            <NavBar />
            <div className="flex">
                <SideBar />
                <div className="h-screen flex-1 p-7">
                    {/* doctors */}
                    <div>
                        <h2>Doctors</h2>
                        <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-12">
                            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {
                                    doctors.map((doctor) => {
                                        return (
                                            <Doctor doctor={doctor} />
                                        )
                                    })
                                }
                            </div>
                        </section>
                    </div>

                </div>
            </div>


        </>

    )
}

export default Doctors