import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import { googleLogin, loginUser } from '../../Helpers/userHelper'
import { useNavigate } from 'react-router-dom'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from '../../config/firebase-config'
import { useDispatch } from 'react-redux'
import { login } from '../../Redux/User/userSlice'


const validate = values => {
    const errors = {};

    //email
    if(!values.email){
        errors.email = toast.error("email is required")
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
        errors.email = toast.error("invalid email address")
    }

    //password
    else if(!values.password){
        errors.password = toast.error('password is required');
    }else if(values.password.includes(' ')){
        errors.password = toast.error('wrong password');
    }
    return errors

}

const Signin = () => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const formik = useFormik({
        initialValues:{
            email:'',
            password:''
        },
        validate,
        validateOnBlur:false,
        validateOnChange:false,
        onSubmit:async values =>{
            let signin = loginUser(values)
            toast.promise(signin,{
                loading : 'searching...',
                success:<b>sign in successfull</b>,
                error:<b>can't find the user</b>
            })

            signin.then((user)=>{
                if(user){ 
                    console.log(user.data.user._id,">>>>");
                    dispatch(
                        login({
                            _id:user.data.user._id,
                            email:user.data.user.email,
                            username:user.data.user.username,
                            token:user.data.token,
                            loggedIn:true
                        })
                    )
                    
                    setTimeout(()=>{
                        history("/")
                    },1000)
                   

                }
            }).catch((err)=>{
                console.log("login failure");
            })

        }
    })

    const firebaseAuth = getAuth(app)
    const provider = new GoogleAuthProvider();

    const loginwithGoogle = async()=>{
        const response = await signInWithPopup(firebaseAuth,provider);
    }

    useEffect(()=>{
        firebaseAuth.onAuthStateChanged((userCred)=>{
            if(userCred){
                userCred.getIdToken().then((token)=>{
                    console.log(token);
                    googleLogin(token).then(data=>{
                        console.log(data);
                        if(data.user){
                            setTimeout(()=>{
                                history("/")
                            },2000)
                            
                        }
                        
                    }).catch((err)=>{
                        console.log(err);
                    })
                })
            }
        })
    },[])
  return (
    <div>
            <div className="flex flex-col items-center min-h-screen sm:justify-center sm:pt-0 bg-gray-50">
                <div>
                <Toaster position='top-center' reverseOrder={false}></Toaster>
                        <h4 className="text-4xl font-bold text-purple-600">
                            signin
                        </h4>
                
                </div>
                <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="mt-4">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Email
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    type="email"
                                    name="email"
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Password
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    type="password"
                                    name="password"
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password}
                                />
                            </div>
                        </div>

                        <a
                            href="#"
                            className="text-xs text-purple-600 hover:underline"
                        >
                            Forget Password?
                        </a>
                        <div className="flex items-center mt-4">
                            <button type='submit' className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                                Sign In
                            </button>
                        </div>
                    </form>
                    <div className="mt-4 text-grey-600">
                        I am new here{" "}
                        <span>
                            <Link to='/signup' className="text-purple-600 hover:underline">
                                Sign up
                            </Link>
                        </span>
                    </div>
                    <div className="flex items-center w-full my-4">
                        <hr className="w-full" />
                        <p className="px-3 ">OR</p>
                        <hr className="w-full" />
                    </div>
                    <div className="my-6 space-y-2">
                        <button
                            aria-label="Login with Google"
                            type="button"
                            className="flex items-center justify-center w-full p-2 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-400 focus:ring-violet-400"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 32 32"
                                className="w-5 h-5 fill-current"
                            >
                                <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                            </svg>
                            <p>Login with Google</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Signin