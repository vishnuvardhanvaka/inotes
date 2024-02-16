import React, { useEffect, useState, useRef } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
// import { jwtDecode } from "jwt-decode";
import { Link,useNavigate } from 'react-router-dom';
import LoginValidation from './LoginValidation';
import Preloader from '../pages/Preloader';
import { API } from '../ApiClient'
import useStore from '../VariablesStore';

function Login() {
    const [credentials, setCredentials] = useState({
        'email': '',
        'password': ''
    })

    // const {setAccessToken}=useStore()

    const navigate = useNavigate()
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const [clickLogin, setClickedLogin] = useState(false)
    const [errors, setErrors] = useState({})
    const [showPassword, setShowPassword] = useState(false)
    const [readOnly, setReadOnly] = useState(true);
    const [preloader, setPreloder] = useState(false)

    function handleCredentialChange(e) {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
        if (clickLogin) {
            let tempError = LoginValidation({ ...credentials, [e.target.name]: e.target.value })
            setErrors(tempError)
        }
        else {
            setErrors({})
        }
    }

    async function handleLogin(e) {
        e.preventDefault()
        let tempError = LoginValidation(credentials)
        setErrors(tempError)
        setClickedLogin(true)
        if (tempError.email){
            emailInputRef.current.focus();
        }
        else if (tempError.password){
            passwordInputRef.current.focus();
        }
        if (!tempError.email && !tempError.password) {
            setPreloder(true)
            const form = new FormData();
            form.append('username', credentials.email)
            form.append('password', credentials.password)
            const fetchReq = {
                method: 'POST',
                headers: {
                    'Constent-Type': 'application/json',
                },
                body: form
            }
            const response = await fetch(API + 'auth/signin/', fetchReq)
            const status_code = response.status
            const data = await response.json()
            setPreloder(false)
            if (status_code == 401) {
                tempError = {}
                if (data.detail === 'User not found') {
                    tempError.email = data.detail
                    if (emailInputRef.current) {
                        emailInputRef.current.focus();
                    }
                }
                else {
                    tempError.password = data.detail
                    if (passwordInputRef.current) {
                        passwordInputRef.current.focus();
                    }
                }
                setErrors(tempError)
                setClickedLogin(false)
            }
            else if (status_code === 200) {
                localStorage.setItem('access_token', data.access_token)
                // setAccessToken(data.access_token)
                localStorage.setItem('email', data.email)
                localStorage.setItem('username', data.username)
                localStorage.setItem('user_folder', data.user_folder)
                localStorage.setItem('current_storage',data.current_storage)
                localStorage.setItem('TAB','MAIN')
                window.location.pathname=`/new`
                navigate('/new')
            }
            setClickedLogin(false)
        }

    };
    function handleShowPassword() {
        setShowPassword(!showPassword)
    }

    return (
        <div>
            {preloader ? (
                <Preloader />

            ): (
                <section className="bg-white dark:bg-gray-900">

            <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
                <form className="w-full max-w-md">
                    <div className="flex justify-center mx-auto">
                        <img className="w-auto h-7 sm:h-8" src="https://merakiui.com/images/logo.svg" alt="" />
                    </div>

                    <h1 className="mt-4 text-2xl font-semibold tracking-wide text-center text-gray-800 capitalize md:text-3xl dark:text-white">
                        welcome Back
                    </h1>

                    <div className="relative flex items-center mt-8">
                        <span className="absolute">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </span>

                        <input
                            ref={emailInputRef}
                            type="email"
                            name='email'
                            value={credentials.email}
                            onChange={handleCredentialChange}
                            required
                            readOnly={readOnly}
                            onFocus={() => setReadOnly(false)}
                            onBlur={() => {
                                setReadOnly(true);
                            }}

                            className={`block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 ${errors.email == null ? 'dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300' : 'border-red-600 focus:border-red-400 dark:focus:border-red-300 focus:ring-red-300'} focus:outline-none focus:ring focus:ring-opacity-40`}
                            placeholder="Email address"

                        />


                        {/* {errors.email && <p className=''>{errors.email}</p>} */}
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
                            name='password'
                            value={credentials.password}
                            required
                            onChange={handleCredentialChange}
                            type={showPassword ? "text" : "password"}
                            className={`block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 ${errors.password == null ? 'dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300' : 'border-red-600 focus:border-red-400 dark:focus:border-red-300 focus:ring-red-300'} focus:outline-none focus:ring focus:ring-opacity-40`}
                            placeholder="Password"
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

                    <div className="mt-6">
                        <button
                            onClick={handleLogin}
                            className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                            Sign in
                        </button>
                        <div className="mt-6 text-center ">
                            <Link to='/signup' className="text-sm text-blue-500 hover:underline dark:text-blue-400">
                                Don’t have an account yet? Sign up
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </section>


                )}
        </div>
    );
};

export default Login;
