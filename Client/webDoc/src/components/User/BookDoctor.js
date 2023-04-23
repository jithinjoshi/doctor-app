import React, { useState } from 'react'
import moment from 'moment'
import { useSelector } from 'react-redux';
import { selectUser } from '../../Redux/User/userSlice';
import { appointmentDoctor, checkAvailability, paymentGate, timingsF, updateTime } from '../../Helpers/userHelper';
import toast, { Toaster } from 'react-hot-toast'
import StripeCheckout from 'react-stripe-checkout';
import PayButton from './PayButton';



const BookDoctor = ({ doctor }) => {
    const user = useSelector(selectUser);

    const [isAvailable, setIsAvailable] = useState(false)

    const [lastClickedButton, setLastClickedButton] = useState(null);

    function handleButtonClick(buttonId) {
        setLastClickedButton(buttonId);
    }


    //appointment logic
    let timings = doctor?.timings;

    const Dates = new Date().toISOString().slice(0, 10)
    const [date, setDate] = useState(Dates);
    const [time, setTime] = useState();
    const doctorId = doctor?._id;
    const userId = user?._id;
    const doctorInfo = [
        {
            doctorName: doctor?.firstName + doctor?.lastName,
            department: doctor?.department,
            fees: doctor?.fees,
            image: doctor?.image?.secure_url,
            email: doctor?.email
        }
    ];
    const userInfo = [
        {
            userName: user?.username,
            email: user?.email,
        }
    ];

    console.log(time, ">>>");
    if (time) {
        timings.filter((item) => item !== time);
    }


    const credentials = {
        doctorId, userId, doctorInfo, userInfo, date, time
    }



    // const submitHandler = async (e) => {
    //     e.preventDefault();
    //     try {

    //     } catch (error) {

    //     }
    //     try {
    //         const updateTimeSchedule = await updateTime(doctorId, date, timings);

    //         if (updateTimeSchedule.data.success) {
    //             console.log(updateTimeSchedule,"....");
    //             appointmentDoctor(credentials).then((data) => {
    //                 console.log(data);
    //             }).catch((err) => {
    //                 console.log(err);
    //             })
    //         } else {
    //             const schedule = await timingsF(doctorId, date, timings);

    //             if (schedule) {
    //                 appointmentDoctor(credentials).then((data) => {
    //                     console.log(data);
    //                 }).catch((err) => {
    //                     console.log(err);
    //                 })

    //             } else {
    //                 console.log("something went wrong");
    //             }

    //         }

    //     } catch (error) {
    //         console.log(error,">>>>");
    //     }
    // }

    const timeHandler = ((e, id) => {
        e.preventDefault();
        setLastClickedButton(id);
        setTime(e.target.value)
    })

    const checkAvailabilityF = async () => {
        const credentials = {
            date,
            time,
            doctorId
        }
        const availability = await checkAvailability(credentials);
        try {
            if (availability?.data?.success) {
                setIsAvailable(true);
                toast.success(availability?.data?.message)

            } else {
                setIsAvailable(false)
                toast.error(availability?.data?.message)
            }

        } catch (error) {
            console.log(error);

        }

    }

    const paymentItems = {
        name: "Online Doctor consultancy",
        price: doctor?.fees,
        doctor: doctor?.firstName + doctor?.lastName,
        userId: user?._id,
        doctorImage: doctor?.image?.secure_url,
        doctorDepartment: doctor?.department,
        doctorId: doctor?._id
    }



    // const makePayment = async token => {
    //     const body = {
    //         token,
    //         paymentItems
    //     }

    //     const headers = {
    //         "Content-Type": "application/json"
    //     }


    //     return fetch(`http://localhost:8080/api/user/payment`,{
    //         method:"POST",
    //         headers,
    //         body:JSON.stringify(body)
    //     }).then(response => {
    //         alert(response)
    //         console.log(response,">>>");
    //     }).catch(err => console.log(err,"|||||")) 

    // }

    const makePayment = (token) => {
        console.log(token, "LLLLLLL");
    }

    // const submitHandler = ((e) => {
    //     e.preventDefault();
    //     try {
    //         appointmentDoctor(credentials).then((data) => {
    //             console.log(data);
    //             toast.success("appointment booked successfully")
    //         }).catch((err) => {
    //             console.log(err);
    //             toast.err("appointment booking failed")
    //         })

    //     } catch (error) {
    //         return error;

    //     }

    // })

    return (
        <div className='flex justify-evenly'>
            <Toaster position='top-center' reverseOrder={false}></Toaster>
            <div class="bg-white font-semibold text-center rounded-3xl border shadow-lg p-10 max-w-xs m-10 max-w-lg">
                <img class="mb-3 w-32 h-32 rounded-full shadow-lg mx-auto" src={doctor?.image?.secure_url} alt="product designer" />
                <h1 class="text-lg text-gray-700"> {doctor?.firstName} {doctor?.lastName} </h1>
                <h3 class="text-sm text-gray-400 "> {doctor?.department} </h3>
                <h3 class="text-sm text-gray-400 "> {doctor?.experience} years of experience </h3>
                <p class="text-xs text-gray-400 mt-4"> {doctor?.about} </p>
            </div>

            <div class="font-manrope m-10">
                <div class="mx-auto box-border w-[365px] border bg-white p-4">
                    <div class="flex items-center justify-between">
                        <span class="text-[#64748B]">Appointment Now</span>
                    </div>

                    <form>
                        <div class="mt-6">
                            <div class="font-semibold">Date</div>
                            <div><input class="mt-1 w-full rounded-[4px] border border-[#A0ABBB] p-2" onChange={(e) => setDate(e.target.value)} type="date" placeholder="select Date" selected={date}
                                min={new Date().toISOString().split('T')[0]} /></div>
                            <div class="grid grid-cols-3 g-3">
                                {
                                    timings?.map((time, index) => {
                                        const changedTime = moment(time, ["HH"]).format("hh A")
                                        return (
                                            <button key={index} class={`mt-[14px] cursor-pointer truncate rounded-[4px] border border-[#E7EAEE] p-3 text-[#191D23] ${lastClickedButton === index ? 'text-white bg-green-700' : 'hover:border-green-700'}`} value={changedTime} onClick={(e) => timeHandler(e, index)}>{changedTime}</button>
                                        )
                                    })
                                }

                                {/* <div class="mt-[14px] cursor-pointer truncate rounded-[4px] border border-green-700 p-3 text-[#191D23]">$100.00</div>
                            <div class="mt-[14px] cursor-pointer truncate rounded-[4px] border border-[#E7EAEE] p-3 text-[#191D23]">$200.00</div> */}
                            </div>
                        </div>


                    </form>



                    <div class="mt-6">
                        <button class="w-full cursor-pointer rounded-[4px] bg-blue-700 px-3 py-[6px] text-center font-semibold text-white" onClick={checkAvailabilityF}>Check Availability</button>
                    </div>

                    {
                        isAvailable && <div class="mt-6">
                            {/* <button onClick={paymentHandler} class="w-full cursor-pointer rounded-[4px] bg-green-700 px-3 py-[6px] text-center font-semibold text-white">Book Now</button> */}
                            {/* <StripeCheckout name='webDoc' stripeKey={process.env.REACT_APP_KEY} token={makePayment} amount={doctor?.fees * 100} currency='USD'>
                                    <button class="w-full cursor-pointer rounded-[4px] bg-blue-700 px-3 py-[6px] text-center font-semibold text-white">Book Now Doctor</button>
                                </StripeCheckout> */}
                            <PayButton items={paymentItems} />
                        </div>
                    }


                </div>
            </div>




        </div>
    )
}

export default BookDoctor