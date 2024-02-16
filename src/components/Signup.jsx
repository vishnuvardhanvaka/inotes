import React, { useState, useEffect, useRef } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';
// import { jwtDecode } from "jwt-decode";
import SignupValidation from './SignupValidation';
// import { Dots } from 'react-preloaders';
import Preloader from '../pages/Preloader';
// import { LoaderDots } from '@thumbtack/thumbprint-react';

import { API } from '../ApiClient'
function Signup() {
    const [credentials, setCredentials] = useState({
        'username': '',
        'location': '',
        'phNo': '',
        'email': '',
        'password': '',
        'otp': '',
        'votp': ''
    })
    var countries = [
        'India', 'Germany', 'USA', 'China', 'Brazil', 'Australia', 'Canada', 'France', 'Japan', 'Mexico',
        'Nigeria', 'Russia', 'South Africa', 'Spain', 'Sweden', 'Switzerland', 'United Kingdom', 'Argentina', 'Italy', 'Netherlands',
    ];


    const [clickSendOTP, setClickSendOTP] = useState(false)
    const [fetching, setFetching] = useState(false)
    const [errors, setErrors] = useState({})

    const emailInputRef = useRef(null);
    const locationInputRef = useRef(null);
    const phNoInputRef = useRef(null);
    const passwordInputRef = useRef(null);
    const usernameInputRef = useRef(null);
    const babyDOBInputRef = useRef(null);

    const OTPInputRef = useRef(null);
    const [showPassword, setShowPassword] = useState(false)
    const [vemail, setVemail] = useState(false)
    const [otpButton, setOtpButton] = useState('Send OTP')
    const [otp, setOTP] = useState('')
    const [votp, setVOTP] = useState(null)
    const [isSignedup, setisSignedup] = useState(false)
    const [preloader, setPreloder] = useState(false)

    const navigate = useNavigate();

    const [readOnly, setReadOnly] = useState(true);

    function handleCredentialChange(e) {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })


        if (clickSendOTP && e.target.name !== 'otp') {
            let tempError = SignupValidation({ ...credentials, [e.target.name]: e.target.value })
            setErrors(tempError)
        }
        else {
            setErrors({})
        }

    }
    async function otpsubmit(e) {
        e.preventDefault()
        let tempError = SignupValidation(credentials)
        setErrors(tempError)
        if (!tempError.otp) {
            setPreloder(true)
            const form = new FormData();
            form.append('username', credentials.username)
            form.append('location', credentials.location)
            form.append('phNo', credentials.phNo)
            form.append('email', credentials.email)
            form.append('password', credentials.password)
            const fetchReq = {
                method: 'POST',
                body: form
            }
            const response = await fetch(API + 'auth/signup/', fetchReq)
            const status_code = response.status
            const data = await response.json()
            if (status_code == 200) {
                setisSignedup(true)
                setPreloder(false)
                // navigate('/')
            }
        }
        else {
            setCredentials({ ...credentials, ['otp']: '' })
            OTPInputRef.current.focus()
        }
    }
    const handleFocusWithDelay = () => {
        // Set a timeout with a delay of 2000 milliseconds (2 seconds)
        setTimeout(() => {
            OTPInputRef.current.focus()
        }, 100);
    };
    async function generateOTP(e) {
        e.preventDefault()
        let tempError = SignupValidation(credentials)
        setErrors(tempError)
        setClickSendOTP(true)
        if (tempError.username) {
            usernameInputRef.current.focus();
        }
        else if (tempError.location) {
            locationInputRef.current.focus();
        }
        else if (tempError.phNo) {
            phNoInputRef.current.focus();
        }
        else if (tempError.email) {
            emailInputRef.current.focus();
        }
        else if (tempError.password) {
            passwordInputRef.current.focus();
        }

        if (!tempError.email && !tempError.location && !tempError.phNo && !tempError.password && !tempError.username) {
            
            setFetching(true)
            const form = new FormData();
            form.append('email', credentials.email)
            form.append('username', credentials.username)
            const fetchReq = {
                method: 'POST',
                body: form
            }
            const response = await fetch(API + 'sendOTP/', fetchReq)
            const status_code = response.status
            const OTP = await response.json()

            setFetching(false)
            if (status_code == 200) {
                if (OTP != null) {
                    setOtpButton('OTP Sent')
                    setVOTP(OTP)
                    setCredentials({ ...credentials, ['votp']: OTP })
                    setVemail(true)

                    handleFocusWithDelay();

                }

            }
            else if (status_code == 401) {
                if (OTP.detail === 'User already exists. ') {
                    tempError.email = OTP.detail
                    if (emailInputRef.current) {
                        emailInputRef.current.focus();
                    }
                    setErrors(tempError)
                    setClickSendOTP(false)
                }
            }
        }

    };

    function handleShowPassword() {
        setShowPassword(!showPassword)
    }

    return (
        <React.Fragment>
            {preloader ? (
                <Preloader />
            ) : (
                <div>
                    {
                        isSignedup ?
                            (
                                <section className="bg-white dark:bg-gray-900">
                                    <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
                                        <div className="w-full max-w-md">
                                            <div className="w-full max-w-md px-8 py-4 mt-16 bg-white rounded-lg shadow-lg dark:bg-gray-800">
                                                <div className="flex justify-center -mt-16 md:justify-end">
                                                    <img className="object-cover bg-white w-20 h-20 border-2 border-blue-500 rounded-full dark:border-blue-400" alt="Testimonial avatar" src="https://cdn1.iconfinder.com/data/icons/color-bold-style/21/34-512.png" />
                                                </div>

                                                <h2 className="mt-2 text-2xl font-bold text-[#1bdd1b]  md:mt-0">
                                                    Congratulations !
                                                </h2>


                                                <p className="mt-2 text-baCongratulations!se text-gray-600 dark:text-gray-200">We are thrilled 💫 to have you as part of our community of note-takers. Your journey to organized and efficient note-taking begins now!</p>

                                                <div className="flex justify-end mt-4">

                                                    <Link to='/signin' className="text-sm text-blue-500 hover:underline dark:text-blue-400">
                                                        Back to Login
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                            ) : (
                                <section className="bg-white dark:bg-gray-900">
                                    <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
                                        <div className="w-full max-w-md">
                                            <form className="w-full max-w-md" onSubmit={generateOTP}>
                                                <div className="flex justify-center mx-auto">
                                                    <img className="w-auto h-7 sm:h-8" src="https://merakiui.com/images/logo.svg" alt="" />
                                                </div>

                                                <div className="flex items-center justify-center mt-6">
                                                    <div className="w-1/3 pb-4 font-medium text-center text-gray-800 capitalize border-b-2 border-blue-500 dark:border-blue-400 dark:text-white">
                                                        sign up
                                                    </div>
                                                </div>

                                                <div className="relative flex items-center mt-7">
                                                    <span className="absolute">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                        </svg>
                                                    </span>

                                                    <input
                                                        type="text"
                                                        name='username'
                                                        ref={usernameInputRef}
                                                        autoComplete='off'
                                                        value={credentials.username}
                                                        onChange={handleCredentialChange}
                                                        className={`block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 ${errors.username == null ? 'dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300' : 'border-red-600 focus:border-red-400 dark:focus:border-red-300 focus:ring-red-300'} focus:outline-none focus:ring focus:ring-opacity-40`}
                                                        placeholder="Username"
                                                        disabled={vemail}
                                                    />
                                                </div>
                                                {errors.username &&
                                                    <span className='mt-2 text-sm text-red-500'>
                                                        {errors.username}
                                                    </span>
                                                }

                                                <div className="relative flex items-center mt-4">
                                                    <span className="absolute">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM12 11a2 2 0 100-4 2 2 0 000 4z" />
                                                        </svg>
                                                    </span>


                                                    <select
                                                        ref={locationInputRef}
                                                        className={`block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 ${errors.location == null ? 'dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300' : 'border-red-600 focus:border-red-400 dark:focus:border-red-300 focus:ring-red-300'} focus:outline-none focus:ring focus:ring-opacity-40`}
                                                        name='location'
                                                        onChange={handleCredentialChange}
                                                    >
                                                        <option value="" disabled selected>
                                                            Select your location
                                                        </option>
                                                        {countries.sort().map((country, index) => (
                                                            <option key={index} value={country}>
                                                                {country}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                {errors.location &&
                                                    <span className='mt-2 text-sm text-red-500'>
                                                        {errors.location}
                                                    </span>
                                                }



                                                <div className="relative flex items-center mt-4">
                                                    <span className="absolute">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                        </svg>
                                                    </span>

                                                    <input
                                                        ref={phNoInputRef}
                                                        type="number"
                                                        name='phNo'
                                                        autoComplete='off'
                                                        value={credentials.phNo}
                                                        onChange={handleCredentialChange}

                                                        className={`block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none dark:bg-gray-900 dark:text-gray-300 ${errors.phNo == null ? 'dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300' : 'border-red-600 focus:border-red-400 dark:focus:border-red-300 focus:ring-red-300'} focus:outline-none focus:ring focus:ring-opacity-40`}
                                                        placeholder="phone number"
                                                    />
                                                </div>
                                                {errors.phNo &&
                                                    <span className='mt-2 text-sm text-red-500'>
                                                        {errors.phNo}
                                                    </span>
                                                }

                                                <div className="relative flex items-center mt-4">
                                                    <span className="absolute">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                        </svg>
                                                    </span>

                                                    <input
                                                        ref={emailInputRef}
                                                        type="email"
                                                        name="email"
                                                        autoComplete='off'
                                                        value={credentials.email}
                                                        onChange={handleCredentialChange}
                                                        readOnly={readOnly}
                                                        onFocus={() => setReadOnly(false)}
                                                        onBlur={() => { setReadOnly(true); }}
                                                        className={`block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 ${errors.email == null ? 'dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300' : 'border-red-600 focus:border-red-400 dark:focus:border-red-300 focus:ring-red-300'} focus:outline-none focus:ring focus:ring-opacity-40`}
                                                        placeholder="Email address"
                                                        disabled={vemail}
                                                    />
                                                </div>
                                                {errors.email &&
                                                    <span className='mt-2 text-sm text-red-500'>
                                                        {errors.email}
                                                    </span>
                                                }

                                                <div className="relative flex items-center mt-4">
                                                    <span className="absolute">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                        </svg>
                                                    </span>

                                                    <input
                                                        ref={passwordInputRef}
                                                        type={showPassword ? "text" : "password"}
                                                        name='password'
                                                        autoComplete="new-password"
                                                        value={credentials.password}
                                                        onChange={handleCredentialChange}
                                                        className={`block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 ${errors.password == null ? 'dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300' : 'border-red-600 focus:border-red-400 dark:focus:border-red-300 focus:ring-red-300'} focus:outline-none focus:ring focus:ring-opacity-40`}
                                                        placeholder="Password"
                                                        disabled={vemail}
                                                    />
                                                    {showPassword ? (
                                                        <EyeIcon onClick={handleShowPassword} className="h-5 w-5 text-gray-500 my-auto absolute inset-y-0 right-3 items-center cursor-pointer" />
                                                    ) : (
                                                        <EyeSlashIcon onClick={handleShowPassword} className="h-5 w-5 text-gray-500 my-auto absolute inset-y-0 right-3 items-center cursor-pointer" />
                                                    )
                                                    }
                                                </div>
                                                {errors.password &&
                                                    <span className='mt-2 text-sm text-red-500'>
                                                        {errors.password}
                                                    </span>
                                                }

                                            


                                                

                                                <div className="mt-6 relative flex items-center">
                                                    <button
                                                        type='submit'
                                                        disabled={vemail}
                                                        className={`w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50`}>
                                                        {otpButton}
                                                    </button>
                                                    {fetching && (
                                                        <div
                                                            className="h-7 w-7 text-white-500 my-auto absolute inset-y-0 right-3 items-center cursor-pointer inline-block animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                                                            role="status"></div>
                                                    )}

                                                </div>


                                            </form>
                                            {votp !== null && vemail && (
                                                <form className="w-full max-w-md" onSubmit={otpsubmit}>

                                                    <div>
                                                        <div className="relative flex items-center mt-8">
                                                            <span className="absolute">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                                </svg>
                                                            </span>
                                                            <input
                                                                ref={OTPInputRef}
                                                                type="number"
                                                                name='otp'
                                                                autoComplete='off'
                                                                value={credentials.otp}
                                                                onChange={handleCredentialChange}

                                                                className={`block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none dark:bg-gray-900 dark:text-gray-300 ${errors.otp == null ? 'dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300' : 'border-red-600 focus:border-red-400 dark:focus:border-red-300 focus:ring-red-300'} focus:outline-none focus:ring focus:ring-opacity-40`}
                                                                placeholder="OTP"
                                                            />


                                                        </div>
                                                        {errors.otp &&
                                                            <span className='mt-2 text-sm text-red-500'>
                                                                {errors.otp}
                                                            </span>
                                                        }
                                                        <button
                                                            type='submit'
                                                            className="w-full mt-6 px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                                                            Sign Up
                                                        </button>
                                                    </div>

                                                </form>
                                            )}
                                            <div className="mt-6">
                                                <div className="mt-6 text-center ">
                                                    <Link to='/signin' className="text-sm text-blue-500 hover:underline dark:text-blue-400">
                                                        Already have an account?
                                                    </Link>

                                                </div>
                                            </div>
                                        </div>




                                    </div>
                                </section>
                            )

                    }
                </div>

            )
            }
        </React.Fragment>
    );
};

export default Signup;
