import React from "react";
import icon from "./icons/ConvertedLogo20.svg";
import search from "../pics/search.png";
import filters from "../pics/filters.png";
import interrogation from "../pics/interrogation.png"
import settings from "../pics/settings.png"
import list from "../pics/list.png";
import { FaRegUser } from "react-icons/fa";


import { Link, NavLink } from 'react-router-dom';

import { HelpCircle, Bolt, User } from 'lucide-react';

function Navbar() {
  return (
    <>
      <nav className="">
        <ul className="flex items-center p-1">
          <li className="list-none">

            <NavLink
            to={{pathname:`/new`}}
             className="flex w-[20vw] items-center">
                <img className="h-[40px]" src={icon} alt="Reload page" />
                <p className="text-3xl text-[grey] font-bold px-2.5 py-0 mx-0">iNotes</p>
            </NavLink>
          </li>

          <li className="list-none">
            <div className="hidden md:flex items-center w-[calc(60vw_-_300px)] h-full justify-center bg-[rgb(220_240_240_/_90%)] mx-[30px] my-0 px-5 py-0 rounded-[30px]">
              <button>
                <img src={search} alt="Reload page" className="h-5 opacity-70" />
              </button>

              <input className="w-[100%] h-auto bg-transparent text-base p-[12px] border-[none] outline-none placeholder-opacity-60 font-" aria-label="Search in Drive" autoCapitalize="off" autoComplete="off" autoCorrect="off" spellCheck="false" aria-expanded="false" aria-haspopup="true" aria-live="off" aria-owns="gs_sbt50" type="text" placeholder="Search for notes" />
              {/* <button>
                <img src={filters} alt="Reload page" className="opacity" />
              </button> */}
            </div>
          </li>

          <li className="list-none">
            <div className="w-[30vw] flex items-center justify-end">
              <NavLink
              
              to={{pathname:`/`}}
               className="flex cursor-pointer w-8 h-8 items-center justify-center mx-[5px] my-0 p-[5px] rounded-[50%] border-[none] hover:bg-[rgb(231,231,231)]">
                <HelpCircle alt='Reload page' className="opacity h-7 w-7" />
               </NavLink>
              <button className="flex cursor-pointer w-8 h-8 items-center justify-center mx-[5px] my-0 p-[5px] rounded-[50%] border-[none] hover:bg-[rgb(231,231,231)]"><Bolt alt='Reload page' className="opacity" /></button>
              <div className="flex cursor-pointer w-8 h-8 items-center justify-center mx-[5px] my-0 p-[5px] rounded-[50%] border-[none] hover:bg-[rgb(231,231,231)]">
                <User className="h-7 w-7" />
              </div>
            </div>
          </li>
        </ul>
      </nav>
    </>
  );
}
export default Navbar;