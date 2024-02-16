import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import useStore from './VariablesStore';

import Chat from './components/Chat';
import Login from './components/Login';
import Signup from './components/Signup';
import LandingPage from './components/LandingPage';
import PrivateRoutes from './utils/PrivateRoutes';

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
import UserHome from './UserHome';

import Navbar from './components/Navbar';
import SideBar from './components/SideBar';

import Routing from './Routing';


import { SearchX } from 'lucide-react';
import Optic from './components/Optic';

const URL = 'http://127.0.0.1:8000/';
// const SURL= 'https://mira-signup-back.vercel.app/';
function App() {
  const publicRoutes = ['/', '/signin', '/signup']
  const privateRoutes = ['/new',
    '/library','/translation','/text2speech','/summarize','/livetranscription',
    '/query','/subtitles','/storage','/about','/askOptic'

  ]
  const [isLoggedIn, setLoggedIn] = useState(localStorage.getItem('access_token') !== null ? true : false);

  useEffect(() => {
    signInSuccessHandler();
    window.process = {
      ...window.process,
    };
  }, []);

  const signInSuccessHandler = () => {
    const token = localStorage.getItem('access_token');
    setLoggedIn((token !== null) ? true : false);
  }

  const onLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
  }

  return (
    <>
      <Router>
        {publicRoutes.includes(window.location.pathname) && (
          <Routes>
            <Route path="/signin" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<LandingPage />} />
          </Routes>
        )}
        {privateRoutes.includes(window.location.pathname) && (
          <div className="h-[100vh] bg-[rgba(239,252,252,0.9)]">
            <Navbar />
            <div className='flex h-[91%]'>
              <SideBar />
              <div className="bg-white  w-full shadow-custom rounded-xl">
                <div id="scrollbar" className="flex flex-wrap justify-center h-full overflow-y-scroll scrollbar">
                  <Routes>
                    <Route path={`/new`} element={<Main />} />
                    <Route path="/library" element={<Library />} />
                    <Route path="/translation" element={<Translation />} />
                    <Route path="/text2speech" element={<Text2speech />} />
                    <Route path="/summarize" element={<Summary />} />
                    <Route path="/livetranscription" element={<LiveTranscription />} />
                    <Route path="/query" element={<Querying />} />
                    <Route path="/subtitles" element={<Subtitles />} />
                    <Route path="/askOptic" element={<Optic />} />
                    <Route path="/storage" element={<Storage />} />
                    <Route path="/about" element={<About />} />
                  </Routes>
                </div>
              </div>
            </div>
          </div>
        ) }
        
        {!publicRoutes.includes(window.location.pathname) && !privateRoutes.includes(window.location.pathname) &&  (
          <div className='w-full h-[100vh] flex items-center text-center justify-center '>
            <div className='flex w-[50%]  justify-center font-mono '>
              <SearchX
                className='mx-4 '
              />
              <div className='text-red-600 font-bold text-md'>
                Page not found
              </div>
            </div>
          </div>
        )

        }
      </Router>



    </>

    // <Router>
    //   <Routes>
    //     <Route path="/signin" element={<Login />} />
    //     <Route path="/signup" element={<Signup />} />
    //     <Route path="/" element={<LandingPage />} />
    //     <Route path="/subtitles" element={<Subtitles />} />
    //     {/* <Route path='/home' element={<Home />} />
    //       <Route path='/home/content' element={<Content/>} /> */}
    //     <Route element={<PrivateRoutes />}>
    //       <Route element={<Chat URL={URL} />} path='/chat' exact />
    //       <Route path="/home" element={<UserHome />} />
    //     </Route>
    //     {/* <Route
    //         path="/chat"
    //         element={
    //           localStorage.getItem('access_token') ? (
    //             <Chat URL={URL} />
    //           ) : (
    //             <Login isLogin={handleLogin} URL={URL} />
    //           )
    //         }
    //       /> */}
    //   </Routes>
    // </Router>
  );
}

export default App;

