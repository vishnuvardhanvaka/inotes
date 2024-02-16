import React,{useState} from "react";
import {AiOutlineClose,AiOutlineMenu} from 'react-icons/ai'
function Navbar(){
  const [nav,setnav]=useState(false)
  function handleNav(){
    setnav(!nav);
  }
    return(
    <div className="flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-black">
      <h1 className='w-full text-3xl font-bold text-[#00df9e]'>MIRA.</h1>
      <ul className="hidden md:flex">
        <li className="mr-2 p-4 cursor-pointer hover:scale-105 duration-300">Company</li>
        <li className="mr-2 p-4 cursor-pointer hover:scale-105 duration-300">Resources</li>
        <li className="mr-2 p-4 cursor-pointer hover:scale-105 duration-300"><a href="/home">Home</a></li>
        <li className="mr-2 p-4 cursor-pointer hover:scale-105 duration-300">About</li>
        <li className="p-4 cursor-pointer hover:scale-105 duration-300">Contact</li>
        <li className="p-4 cursor-pointer hover:scale-105 duration-300">
          
          {localStorage.getItem('isLoggedIn') ?
            <a href='/chat'>Login</a>
            :
            <a href='/signin'>Login</a>
          }
        </li>
      </ul>
      <div onClick={handleNav} className="block md:hidden hover:scale-105 cursor-pointer" >
        {nav ? <AiOutlineClose size={20}/> : <AiOutlineMenu size={20}/>}
        
      </div>
      <div className={nav ? "fixed left-0 top-0 w-[60%] border-r h-full border-r-gray-900 bg-white ease-in-out duration-500 md:hidden" : 'fixed left-[-100%] top-0 w-[60%] border-r h-full border-r-gray-900 bg-white ease-out duration-500'}>
      <h1 className='w-full m-4 text-3xl font-bold text-[#00df9e]'>MIRA.</h1>
      <ul className="p-4 uppercase">
        <li className="mb-4 p-4 border-b border-black cursor-pointer hover:bg-gray-200 hover:scale-105 duration-300"><a href="/home">Home</a></li>
        <li className="mb-4 p-4 border-b border-black cursor-pointer hover:bg-gray-200 hover:scale-105 duration-300">Company</li>
        <li className="mb-4 p-4 border-b border-black cursor-pointer hover:bg-gray-200 hover:scale-105 duration-300">Resources</li>
        <li className="mb-4 p-4 border-b border-black cursor-pointer hover:bg-gray-200 hover:scale-105 duration-300">About</li>
        <li className="mb-4 p-4 border-b border-black cursor-pointer hover:bg-gray-200 hover:scale-105 duration-300">Contact</li>
        {localStorage.getItem('isLoggedIn') ?
            <a href='/chat'><li className="mb-4 p-4 cursor-pointer hover:bg-gray-200 hover:scale-105 duration-300">Login</li></a>
            :
            <a href='/signin'><li className="mb-4 p-4 cursor-pointer hover:bg-gray-200 hover:scale-105 duration-300">Login</li></a>
        }
      </ul>
      </div>

    </div>
    )
}
export default Navbar;