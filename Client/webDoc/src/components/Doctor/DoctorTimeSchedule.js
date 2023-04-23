import React, { useState } from 'react'
import moment from 'moment'
import { editDoctorProfile } from '../../Helpers/doctorHelper';
import { useNavigate, useParams } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';

const DoctorTimeSchedule = () => {
    const {id} = useParams();
    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();

    const history = useNavigate();



    const submitHandler = (e => {
        e.preventDefault();
        const formattedStartTime = moment(startTime, "HH:mm").format("hh:mm A");
        const formattedEndTime = moment(endTime, "HH:mm").format("hh:mm A");
        // const timings = [formattedStartTime,formattedEndTime];

        function getTimesBetween(start, end) {
            const times = [];
            let currentTime = start;
            while (currentTime < end) {
              times.push(currentTime);
              const [hours, minutes] = currentTime.split(":").map(Number);
              currentTime = `${String(hours + 1).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
            }
            return times;
          }
          
          const timings = getTimesBetween(startTime, endTime);
          console.log(timings);


        const update = editDoctorProfile(id,{timings:timings,startTime:formattedStartTime,endTime:formattedEndTime});

        toast.promise(update, {
            loading: 'updating...',
            success: <b>schedule added successfully</b>,
            error: <b>can't schedule timings</b>
        })
        
        update.then((user)=>{
            setTimeout(()=>{
                history('/doctor/')
            },2000) 
        }).catch((err)=>{
            console.log(err);
        })

    })


    return (
        <div>
        <Toaster position='top-center' reverseOrder={false}></Toaster>
            <div class="flex items-center justify-center p-16">
                <div class="mx-auto w-96 border h-80 p-5 flex flex-col items-center justify-center">
                    <form action="" onSubmit={submitHandler}>

                        <div class="-mx-3 flex flex-wrap">
                            <div class="w-full px-3 sm:w-1/2">
                                <div class="mb-5">
                                    <label
                                        for="time"
                                        class="mb-3 block text-base font-medium text-[#07074D]"
                                    >
                                        starting Time
                                    </label>
                                    <input
                                        type="time"
                                        name="startingTime"
                                        id="time"
                                        class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                        required
                                        value={startTime}
                                        onChange={(e) => setStartTime(e.target.value)}
                                    />

                                </div>
                            </div>
                            <div class="w-full px-3 sm:w-1/2">
                                <div class="mb-5">
                                    <label
                                        for="time"
                                        class="mb-3 block text-base font-medium text-[#07074D]"
                                    >
                                        Ending Time
                                    </label>
                                    <input
                                        type="time"
                                        name="endingTime"
                                        id="time"
                                        value={endTime}
                                        required
                                        onChange={(e) => setEndTime(e.target.value)}
                                        class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                    />
                                </div>
                            </div>
                        </div>



                        <div className='flex flex-col items-center justify-center'>
                            <button
                                class="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none" type='submit'
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>


    )
}

export default DoctorTimeSchedule