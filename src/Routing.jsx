import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

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

import Navbar from './components/Navbar';
import SideBar from './components/SideBar';

function Routing(){
    return(
        <>
        <Router>
        <div className="h-[100vh] bg-[rgb(250_255_255_/_90%)]">
          <Navbar />
          <div className='flex h-[91%]'>
            <SideBar />
            <div className="bg-white  w-full shadow-custom rounded-xl">
              <div id="scrollbar" className="flex flex-wrap justify-center h-full overflow-y-scroll scrollbar p-2">
                <Routes>
                  <Route path="/new" element={<Main />} />
                  <Route path="/library" element={<Library />} />
                  <Route path="/translation" element={<Translation />} />
                  <Route path="/text2speech" element={<Text2speech />} />
                  <Route path="/summarize" element={<Summary />} />
                  <Route path="/livetranscription" element={<LiveTranscription />} />
                  <Route path="/query" element={<Querying />} />
                  <Route path="/subtitles" element={<Subtitles />} />
                  <Route path="/storage" element={<Storage />} />
                  <Route path="/about" element={<About />} />
                </Routes>
              </div>
            </div>
          </div>
        </div>
      </Router >
        </>
    )
}
export default Routing;
