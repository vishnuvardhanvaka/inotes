import React from "react";
import SideBar from "./components/SideBar";
import Navbar from "./components/Navbar";

import Main from './components/Main';
import Library from './components/Library';
import Summary from './components/Summary';
import Translation from './components/Translation';
import Storage from './components/Storage';
import Text2speech from './components/Text2speech';
import LiveTranscription from './components/LiveTranscription';
import Querying from './components/Querying';
import Subtitles from './components/Subtitles';
import About from './components/About';

import DisplayContainer from "./components/DisplayContainer";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function UserHome() {
    return (
        <>
            <div className="h-[100vh] bg-[rgb(250_255_255_/_90%)]">
                <Navbar />
                <div className='flex h-[91%]'>
                    <SideBar />
                    <div className="bg-white  w-full shadow-custom rounded-xl">
                        <div id="scrollbar" className="flex flex-wrap justify-center h-full overflow-y-scroll scrollbar p-2">
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default UserHome;