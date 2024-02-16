import React, { useEffect } from 'react'
import useStore from "../VariablesStore";

import { Languages, BookOpenText, Speech, MessageCircleQuestion, Library, Cloudy, Subtitles, Mic, ScanEye } from 'lucide-react';



function Storage() {
    const { startProcess, toggleStartProcess, resetStartProcess, setStorage, getStorage } = useStore()
    return (
        <div className=' w-full h-full flex flex-col items-center'>
            <div className='text-center m-1 text-3xl items-center justify-center'>
                Storage
            </div>
            <div className=' w-full h-full flex flex-col items-center justify-center'>
                <div className={`flex items-center px-5 py-2.5 rounded-3xl hover:transition-[0.3s]  bg-[rgba(168,231,231,0.9)] }`}>
                    {/* rounded-[0_30px_30px_0] */}
                    
                    <Cloudy className="h-5 px-[2px] py-0" />
                    <h3 className="text-[#503e3e] text-sm px-2.5 py-0">Storage ({(((100000000 - parseInt(getStorage(), 10)) / 100000000) * 100).toFixed(1)}% full)</h3>

                </div>
                
            </div>

        </div >
    )
}
export default Storage;