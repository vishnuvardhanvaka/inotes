import React, { useEffect, useState, createContext } from "react";
import { NavLink } from "react-router-dom";
import useStore from "../VariablesStore";
import { API } from '../ApiClient'
import axios from "axios";

import add_icon from "../pics/add_icon.png";
import DisplayContainer from "./DisplayContainer";


import { Languages, BookOpenText, Speech, MessageCircleQuestion, Library, Cloudy, Subtitles, Mic,ScanEye } from 'lucide-react';

function SideBar() {

  const ThemeContext = createContext('light');
  const [current_tab, setCurrentTab] = useState('')
  const [current_storage, setCurrentStorage] = useState(localStorage.getItem('current_storage'))

  const { startProcess, toggleStartProcess, resetStartProcess,setStorage,getStorage } = useStore()
  
  // useEffect(()=>{
  //   setCurrentStorage(localStorage.getItem('current_storage'))
  // },[])
  // useEffect(() => {
  //   const storage = localStorage.getItem('current_storage');
  //   setCurrentStorage(storage);
  // }, [current_storage]);

  useEffect(() => {
    
    getUser(localStorage.getItem('email'))
  }, [current_tab]);

  async function getUser(email) {
    const URL = API + "getUser/";
    const form = new FormData();
    form.append('email', email)
    try {
        const formResponse = await axios.post(URL, form);
        if (formResponse.status===200){
          const data = formResponse.data;
          localStorage.setItem('email', data.email)
          localStorage.setItem('username', data.username)
          localStorage.setItem('current_storage',data.current_storage)
          setStorage(data.current_storage)

        }
    } catch (error) {
        console.error('Error:', error);
    }
}

  return (
    <>
      <div className="flex ">
        <div className="h-[calc(100vh_-_115px)] px-2.5 py-5">
          <NavLink
            to={{ pathname: `/new` }}
            onClick={(e) => {
              setCurrentTab('MAIN'); localStorage.setItem('TAB', 'MAIN');
              resetStartProcess()
            }}
            className={`bg-transparent w-[140px] flex items-center cursor-pointer h-[50px] shadow-[rgba(50,50,93,0.25)_0px_2px_5px_-1px,rgba(0,0,0,0.3)_0px_1px_3px_-1px] justify-center rounded-[30px] border-[none] hover:transition-[0.3s] hover:shadow-[rgba(0,0,0,0.15)_0px_15px_25px,rgba(0,0,0,0.05)_0px_5px_10px] ${localStorage.getItem('TAB') === 'MAIN' ? "bg-[rgb(227, 239, 255)]" : ""}`}
          >
            <img className="h-[30px]" src={add_icon} alt="Reload page" />
            <p className="text-[black] text-[15px] p-2.5 m-0">New</p>
          </NavLink>

          <div className="-ml-2.5 mx-0 my-[5px]">
            <NavLink
              to={{ pathname: `/library` }}
              onClick={(e) => { setCurrentTab('LIBRARY'); localStorage.setItem('TAB', 'LIBRARY') }}
              className={`flex items-center px-5 py-2.5 rounded-[0_30px_30px_0] hover:transition-[0.3s] ${localStorage.getItem('TAB') === 'LIBRARY' ? "bg-[rgba(168,231,231,0.9)]" : "hover:bg-[whitesmoke] cursor-pointer"}`}>
              {/* <img src={library} alt="Reload page" className="h-5 px-[5px] py-0" /> */}
              <Library className="h-5 px-[2px] py-0" />
              <h3 className="text-[#503e3e] text-sm px-2.5 py-0">My Library</h3>
            </NavLink>

            {/* <div
          onClick={(e) => { setCurrentTab('HOME') }}
          className={`flex items-center px-5 py-2.5 rounded-[0_30px_30px_0] hover:transition-[0.3s] ${current_tab==='HOME' ? "bg-[rgb(220_240_240_/_90%)]":"hover:bg-[whitesmoke] cursor-pointer"}`}>
            <img src={home} alt="Reload page" className="h-5 px-[5px] py-0" />
            <h3 className="text-[#503e3e] text-sm px-2.5 py-0">Book Store</h3>
          </div> */}

            <NavLink
              to={{ pathname: `/translation` }}
              onClick={(e) => { setCurrentTab('TRANSLATION'); localStorage.setItem('TAB', 'TRANSLATION') }}
              className={`flex items-center px-5 py-2.5 rounded-[0_30px_30px_0] hover:transition-[0.3s] ${localStorage.getItem('TAB') === 'TRANSLATION' ? "bg-[rgba(168,231,231,0.9)]" : "hover:bg-[whitesmoke] cursor-pointer"}`}>
              {/* <img src={library} alt="Reload page" className="h-5 px-[5px] py-0" /> */}
              <Languages className="h-5 px-[2px] py-0" />
              <h3 className="text-[#503e3e] text-sm px-2.5 py-0">Translate</h3>
            </NavLink>

            <NavLink
              to={{ pathname: `/text2speech` }}
              onClick={(e) => { setCurrentTab('TEXT2SPEECH'); localStorage.setItem('TAB', 'TEXT2SPEECH') }}
              className={`flex items-center px-5 py-2.5 rounded-[0_30px_30px_0] hover:transition-[0.3s] ${localStorage.getItem('TAB') === 'TEXT2SPEECH' ? "bg-[rgba(168,231,231,0.9)]" : "hover:bg-[whitesmoke] cursor-pointer"}`}>
              {/* <img src={library} alt="Reload page" className="h-5 px-[5px] py-0" /> */}
              <Speech className="h-5 px-[2px] py-0" />
              <h3 className="text-[#503e3e] text-sm px-2.5 py-0">Text to Speech</h3>
            </NavLink>

            <NavLink
              to={{ pathname: `/summarize` }}
              onClick={(e) => { setCurrentTab('SUMMARY'); localStorage.setItem('TAB', 'SUMMARY') }}
              className={`flex items-center px-5 py-2.5 rounded-[0_30px_30px_0] hover:transition-[0.3s] ${localStorage.getItem('TAB') === 'SUMMARY' ? "bg-[rgba(168,231,231,0.9)]" : "hover:bg-[whitesmoke] cursor-pointer"}`}>
              {/* <img src={starred} alt="Reload page" className="h-5 px-[5px] py-0" /> */}
              <BookOpenText className="h-5 px-[2px] py-0" />
              <h3 className="text-[#503e3e] text-sm px-2.5 py-0">Summarize</h3>

            </NavLink>

            <NavLink
              to={{ pathname: `/livetranscription` }}
              onClick={(e) => { setCurrentTab('LIVETRANSCRIPTION'); localStorage.setItem('TAB', 'LIVETRANSCRIPTION') }}
              className={`flex items-center px-5 py-2.5 rounded-[0_30px_30px_0] hover:transition-[0.3s] ${localStorage.getItem('TAB') === 'LIVETRANSCRIPTION' ? "bg-[rgba(168,231,231,0.9)]" : "hover:bg-[whitesmoke] cursor-pointer"}`}>
              {/* <img src={starred} alt="Reload page" className="h-5 px-[5px] py-0" /> */}
              <Mic className="h-5 px-[2px] py-0" />
              <h3 className="text-[#503e3e] text-sm px-2.5 py-0">Live Transcription</h3>

            </NavLink>

            <NavLink
              to={{ pathname: `/query` }}
              onClick={(e) => { setCurrentTab('QUERY'); localStorage.setItem('TAB', 'QUERY') }}
              className={`flex items-center px-5 py-2.5 rounded-[0_30px_30px_0] hover:transition-[0.3s] ${localStorage.getItem('TAB') === 'QUERY' ? "bg-[rgba(168,231,231,0.9)]" : "hover:bg-[whitesmoke] cursor-pointer"}`}>
              {/* <img src={trash} alt="Reload page" className="h-5 px-[5px] py-0" /> */}
              <MessageCircleQuestion className="h-5 px-[2px] py-0" />
              <h3 className="text-[#503e3e] text-sm px-2.5 py-0">Query</h3>
            </NavLink>

            <NavLink
              to={{ pathname: `/subtitles` }}
              onClick={(e) => { setCurrentTab('SUBTITLES'); localStorage.setItem('TAB', 'SUBTITLES') }}
              className={`flex items-center px-5 py-2.5 rounded-[0_30px_30px_0] hover:transition-[0.3s] ${localStorage.getItem('TAB') === 'SUBTITLES' ? "bg-[rgba(168,231,231,0.9)]" : "hover:bg-[whitesmoke] cursor-pointer"}`}>
              <Subtitles className="h-5 px-[2px] py-0" />
              <h3 className="text-[#503e3e] text-sm px-2.5 py-0">Subtitles</h3>

            </NavLink>

            
            <NavLink
              to={{ pathname: `/askOptic` }}
              onClick={(e) => { setCurrentTab('OPTIC'); localStorage.setItem('TAB', 'OPTIC') }}
              className={`flex items-center px-5 py-2.5 rounded-[0_30px_30px_0] hover:transition-[0.3s] ${localStorage.getItem('TAB') === 'OPTIC' ? "bg-[rgba(168,231,231,0.9)]" : "hover:bg-[whitesmoke] cursor-pointer"}`}>
              <ScanEye className="h-5 px-[2px] py-0" />
              <h3 className="text-[#503e3e] text-sm px-2.5 py-0">Optic</h3>

            </NavLink>


            <NavLink
              to={{ pathname: `/storage`, details: { setCurrentStorage: setCurrentStorage } }}
              onClick={(e) => { setCurrentTab('STORAGE'); localStorage.setItem('TAB', 'STORAGE') }}
            >
              <div className={`flex items-center px-5 py-2.5 rounded-[0_30px_30px_0] hover:transition-[0.3s] ${localStorage.getItem('TAB') === 'STORAGE' ? "bg-[rgba(168,231,231,0.9)]" : "hover:bg-[whitesmoke] cursor-pointer"}`}>
                {/* <img src={cloud} alt="Reload page" className="h-5 px-[5px] py-0" /> */}
                <Cloudy className="h-5 px-[2px] py-0" />
                <h3 className="text-[#503e3e] text-sm px-2.5 py-0">Storage ({(((100000000 - parseInt(getStorage(), 10)) / 100000000) * 100).toFixed(1)}% full)</h3>
              </div>
            </NavLink>

            <div>
              <div className="flex items-center px-5 py-0 rounded-[0_30px_30px_0] hover:transition-[0.3s] hover:bg-[whitesmoke]">
                <div className="w-[200px] bg-[rgb(230,230,230)] h-full rounded-[40px] my-2">
                  {/* <div className={`w-[15%] h-[3.5px] bg-[dodgerblue] rounded-[40px]`}></div><br></br> */}
                  <div className={`h-[4px] ${((100000000 - getStorage()) / 100000000).toFixed(2) * 100 > 70 ? "bg-[rgb(255,201,92)]" : "bg-[dodgerblue]"}  rounded-[40px]`} style={{ width: `${((100000000 - getStorage()) / 100000000).toFixed(2) * 100}%` }}></div>
                </div>
              </div>

              <NavLink
                to={{ pathname: `/storage`, details: { setCurrentStorage: setCurrentStorage } }}
                onClick={(e) => { setCurrentTab('STORAGE'); localStorage.setItem('TAB', 'STORAGE') }}
              >
                <div className="text-[grey] text-lg text-center m-0 ">
                  <p className="text-[grey] text-sm text-center mx-0">{((100000000 - getStorage()) / (1000 * 1000)).toFixed(2)} MB of 100 MB Used</p>
                </div>
              </NavLink>

              <button className="block mx-auto my-auto text-sm font-semibold text-[#2d2aff] cursor-pointer w-3/5 border p-2.5 px-0 rounded-[20px] border-solid border-[silver] hover:transition-[0.3s] hover:bg-[rgb(220_240_240_/_90%)]">Get more storage</button>
            </div>
          </div>
        </div>
        {/* <div className="w-full">
        <DisplayContainer tab={current_tab} setCurrentStorage={setCurrentStorage} startProcess={startProcess} setStartProcess={setStartProcess}/>
      </div> */}
      </div>
    </>
  );
}
export default SideBar;
