import React, { useEffect,useState } from "react";
import list_view from "../pics/list_view.jpg";
import info from "../pics/info.png";
import "./Scrollbar.css";
import DisplayCard from "./DisplayCard";

import Main from "./Main";
import Library from "./Library";
import Summary from "./Summary";
import Translation from "./Translation";
import Storage from "./Storage";
import Text2speech from "./Text2speech";
import LiveTranscription from "./LiveTranscription";
import Querying from "./Querying";
import Subtitles from "./Subtitles";

import { API } from '../ApiClient'
import axios from "axios";

function DisplayContainer(props) {

  const [activeTab, setActiveTab] = useState(localStorage.getItem('TAB') || 'MAIN');
  const [storage,setStorage]=useState(localStorage.getItem('current_storage'))
  const [startProcess,setStartProcess]=useState(false)

  useEffect(() => {
    props.setCurrentStorage(storage)
  }, [storage]);

  useEffect(() => {
    props.setStartProcess(startProcess)
  }, [startProcess]);
  

  useEffect(() => {
    const storedTab = localStorage.getItem('TAB');
    if (storedTab !== activeTab) {
      setActiveTab(storedTab || 'MAIN');
      getUser(localStorage.getItem('email'))
    }
  }, [activeTab]);

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
          props.setCurrentStorage(data.current_storage)

        }
    } catch (error) {
        console.error('Error:', error);
    }
}

  return (
    <>
      <div className="bg-white w-full shadow-custom rounded-xl mt-3">
        {/* <div className="flex px-2.5 py-[5px]">
          <p className="m-0 text-xl w-[90%]">Heading</p>

          <button className="bg-transparent h-10 w-10 flex cursor-pointer items-center justify-center rounded-[50%] border-[none] hover:transition-[0.3s] hover:bg-[whitesmoke]">
            <img src={list_view} alt="Reload page" className="h-5" />
          </button>

          <button className="bg-transparent h-10 w-10 flex cursor-pointer items-center justify-center rounded-[50%] border-[none] hover:transition-[0.3s] hover:bg-[whitesmoke]">
            <img src={info} alt="Reload page" className="h-5" />
          </button>
        </div> */}

        <div id="scrollbar" className="flex flex-wrap justify-center h-[calc(100vh_-_75px)] overflow-y-scroll scrollbar">
          
          {
            props.tab === 'MAIN' && (
              <Main setStorage={setStorage} startProcess={props.startProcess} setStartProcess={props.setStartProcess}/>
            )
          }
          {
            props.tab === 'LIBRARY' && (
              <Library />
            )
          }
          {
            props.tab === 'TEXT2SPEECH' && (
              <Text2speech />
            )
          }
          {
            props.tab === 'SUMMARY' && (
              <Summary />
            )
          }
          {
            props.tab === 'TRANSLATION' && (
              <Translation />
            )
          }
          {
            props.tab === 'LIVETRANSCRIPTION' && (
              <LiveTranscription />
            )
          }
          {
            props.tab === 'QUERY' && (
              <Querying />
            )
          }
          {
            props.tab === 'SUBTITLES' && (
              <Subtitles />
            )
          }
          {
            props.tab === 'STORAGE' && (
              <Storage />
            )
          }
        </div>
      </div>
    </>
  );
}
export default DisplayContainer;