import React, { useState } from 'react'
import './PhoneNumber.css'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { auth } from '../../../config/firebase-config'
import { useNavigate } from 'react-router-dom'
import { Toaster, toast } from 'react-hot-toast'
import { loginWithOtp } from '../../../Helpers/userHelper'


const PhoneNumber = () => {
    const history = useNavigate();
    const [ph, setPh] = useState();

    function onCapchVerify() {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
                'size': 'normal',
                'callback': (response) => {
                    onSignup()
                },
                'expired-callback': () => {
                }
            }, auth)
        }
    }

    async function onSignup() {
        const user = await loginWithOtp({mobile:ph});
        console.log(user,">>>>>>>>>");
        if (user.data) {
            
            onCapchVerify();

                const appVerifier = window.recaptchaVerifier
                const formatPh = '+' + ph
                signInWithPhoneNumber(auth, formatPh, appVerifier).then((confirmationResult) => {
                    window.confirmationResult = confirmationResult;
                    toast.success("otp sended successfully");
                    setTimeout(() => {
                        history('/otp')
                    }, 2000)


                }).catch((err) => {
                    console.log(err);
                })
            

        } else {
            toast.error("No user exist with this mobile number")
        }


    }

    return (
        <div className='ph '>
            <div class="flex w-full max-w-md flex-col space-y-8 sm:w-full ">
                <div class="flex flex-col items-center justify-center text-center space-y-2">
                <Toaster position='top-center' reverseOrder={false}/>
                    <div class="font-semibold text-3xl">
                        <p>webDoc</p>
                    </div>
                    <div class="flex flex-row text-sm font-medium text-gray-400">
                        <p>Enter Your Mobile Number</p>
                    </div>
                </div>

                <div>
                    <div class="flex flex-col space-y-8 ">
                        {/* <div class="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                                <div class="w-11/12 h-16 mx-auto ">
                                    <input class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="number" name="" id=""/>
                                </div>
                            </div> */}
                        <PhoneInput country={"in"} value={ph} onChange={phone => setPh(phone)} />



                        <div class="flex flex-col space-y-5">
                            <div id='recaptcha-container'></div>
                            <div>
                                <button class="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm" onClick={onSignup}>
                                    Send OTP
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PhoneNumber

