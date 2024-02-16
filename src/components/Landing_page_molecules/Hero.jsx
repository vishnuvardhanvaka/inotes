import React, { useState } from "react";
import icon from "../icons/ConvertedLogo20.svg";
import { Link, NavLink } from 'react-router-dom';
import Typed from 'react-typed'


function Hero() {
    const [open, setopen] = useState(false)
    return (
        <header class="bg-white ">
            <nav x-data="{ isOpen: false }" class="relative bg-white ">
                <div class="container px-6 py-4 mx-auto md:flex md:justify-between md:items-center">
                    <div class="flex items-center justify-between">
                        <NavLink
                            to={{ pathname: `/` }}
                            className="flex w-[20vw] items-center">
                            <img className="h-[40px]" src={icon} alt="Reload page" />
                            <p className="text-3xl text-[grey] font-bold px-2.5 py-0 mx-0">iNotes</p>
                        </NavLink>

                        <div class="flex md:hidden" onClick={(e) => { setopen(!open) }}>
                            <button x-cloak type="button" class="text-gray-500 dark: hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400" aria-label="toggle menu">
                                {!open && (
                                    <svg x-show="!isOpen" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M4 8h16M4 16h16" />
                                    </svg>
                                )}

                                {open && (
                                    <svg x-show="isOpen" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                        stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>


                    <div x-cloak class="hidden absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white md:bg-transparent md:dark:bg-transparent md:mt-0 md:p-0 md:top-0 md:relative md:w-auto md:opacity-100 md:translate-x-0 md:flex md:items-center">
                        <div class="flex flex-col md:flex-row md:mx-6">
                            {/* <a class="my-2 text-gray-700 transition-colors duration-300 transform  hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0" href="#">Home</a> */}
                            {/* <a class="my-2 text-gray-700 transition-colors duration-300 transform dark: hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0" href="#">Shop</a> */}
                            <a class="my-2 text-gray-700 transition-colors duration-300 transform dark: hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0" href="#">Services</a>
                            <a class="my-2 text-gray-700 transition-colors duration-300 transform dark: hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0" href="/signin">Login</a>
                            <a class="w-full px-5 py-2 text-sm tracking-wider text-white uppercase transition-colors duration-300 transform bg-blue-600 rounded-lg lg:w-auto hover:bg-blue-500 focus:outline-none focus:bg-blue-500" href='/signup'>Try Now</a>
                        </div>

                        {/* <div class="flex justify-center md:block">
                                <a class="relative text-gray-700 transition-colors duration-300 transform dark: hover:text-gray-600 dark:hover:text-gray-300" href="#">
                                    <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.70711 15.2929C4.07714 15.9229 4.52331 17 5.41421 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM9 19C9 20.1046 8.10457 21 7 21C5.89543 21 5 20.1046 5 19C5 17.8954 5.89543 17 7 17C8.10457 17 9 17.8954 9 19Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>

                                    <span class="absolute top-0 left-0 p-1 text-xs text-white bg-blue-500 rounded-full"></span>
                                </a>
                            </div> */}
                    </div>

                    {open && (

                        <div x-cloak class="absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white md:bg-transparent md:dark:bg-transparent md:mt-0 md:p-0 md:top-0 md:relative md:w-auto md:opacity-100 md:translate-x-0 md:flex md:items-center">

                            <div class="flex flex-col md:flex-row md:mx-6">
                                <a class="my-2 text-gray-700 transition-colors duration-300 transform  hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0" href="#">Home</a>
                                {/* <a class="my-2 text-gray-700 transition-colors duration-300 transform dark: hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0" href="#">Shop</a> */}
                                <a class="my-2 text-gray-700 transition-colors duration-300 transform dark: hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0" href="#">Services</a>
                                <a class="my-2 text-gray-700 transition-colors duration-300 transform dark: hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0" href="#">Login</a>

                                <a class="my-2 text-gray-700 transition-colors duration-300 transform dark: hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0" href="/signup">Try Now</a>
                            </div>

                            {/* <div class="flex justify-center md:block">
                                <a class="relative text-gray-700 transition-colors duration-300 transform dark: hover:text-gray-600 dark:hover:text-gray-300" href="#">
                                    <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.70711 15.2929C4.07714 15.9229 4.52331 17 5.41421 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM9 19C9 20.1046 8.10457 21 7 21C5.89543 21 5 20.1046 5 19C5 17.8954 5.89543 17 7 17C8.10457 17 9 17.8954 9 19Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>

                                    <span class="absolute top-0 left-0 p-1 text-xs text-white bg-blue-500 rounded-full"></span>
                                </a>
                            </div> */}
                        </div>
                    )}



                </div>
            </nav>

            <div class="container px-6 py-16 mx-auto">
                <div class="items-center lg:flex">
                    <div class="w-full lg:w-1/2">
                        <div class="lg:max-w-lg">
                            <h1 class="text-3xl font-semibold text-gray-800 dark:text-black lg:text-4xl">Experience iNotes: <br /> Your <span class="text-blue-500 ">All-in-One Solution</span></h1>

                            <p class="mt-3 text-gray-600 dark:text-black-400">Unlock the power of seamless note-taking, translation, transcription, and more with our feature-packed iNotes application.</p>

                            <a class="w-full px-5 py-2 mt-6 text-sm tracking-wider text-white uppercase transition-colors duration-300 transform bg-blue-600 rounded-lg lg:w-auto hover:bg-blue-500 focus:outline-none focus:bg-blue-500" href="/signup">Try Now</a>
                        </div>
                    </div>

                    <div class="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2">
                        <img class="w-full h-full lg:max-w-3xl" src="https://merakiui.com/images/components/Catalogue-pana.svg" alt="Catalogue-pana.svg" />
                    </div>
                </div>
            </div>
        </header>
    )
}
export default Hero;