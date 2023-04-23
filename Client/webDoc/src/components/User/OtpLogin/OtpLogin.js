import React, { useState } from 'react'
import OTPInput from "otp-input-react";
import './OtpLogin.css'
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const OtpLogin = () => {
    const history = useNavigate();
    const [OTP, setOTP] = useState();
    const handleChange = (code) => setOTP(code);

    function onOTPVefify(){
        window.confirmationResult.confirm(OTP).then(async(result)=>{
            history('/')
            
        }).catch((err)=>{
            toast.error('Incorrect OTP input');
            console.log(err);
        })
    }


    return (
        <div class="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
            <div class="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
                <div class="mx-auto flex w-full max-w-md flex-col space-y-16">
                    <div class="flex flex-col items-center justify-center text-center space-y-2">
                    <Toaster position='top-center' reverseOrder={false}/>
                        <div class="font-semibold text-3xl">
                            <p>webDoc</p>
                        </div>
                        <div class="flex flex-row text-sm font-medium text-gray-400">
                            <p>We have sent a code to your Mobile Number</p>
                        </div>
                    </div>

                    <div>
                        <div class="flex flex-col space-y-16 ">
                            <OTPInput
                                className="otp-input"
                                value={OTP}
                                onChange={handleChange}
                                autoFocus
                                OTPLength={6}
                                disabled={false}
                                otpType="number"
                            />

                            <div class="flex flex-col space-y-5">
                                <div>
                                    <button onClick={onOTPVefify} class="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm">
                                        Verify OTP
                                    </button>
                                </div>

                                <div class="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                                    <p>Didn't recieve code?</p> <a class="flex flex-row items-center text-blue-600" href="http://" target="_blank" rel="noopener noreferrer">Resend</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OtpLogin