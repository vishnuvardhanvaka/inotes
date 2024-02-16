import React, { useEffect, useState } from 'react'
import starred from "../pics/new_starred.png";
import { API } from '../ApiClient';
import axios from "axios";
import PDFcontainer from './PDFcontainer';
import { Loader2,PackageOpen } from 'lucide-react';


function Library() {
    const [files, setFiles] = useState([])
    const [clicked, setClicked] = useState(false)
    const [clickedFile, setClickedFile] = useState()
    const [startLoading, setStartLoading] = useState(false)
    const [noData,setNoData]=useState(false)
    
    useEffect(() => {
        getFiles();
    }, []);

    async function getFiles() {
        setStartLoading(true)
        const URL = API + "getFiles/";
        const form = new FormData();

        form.append('email', localStorage.getItem('email'))
        form.append('user_folder', localStorage.getItem('user_folder'))
        try {
            const filesRes = await axios.post(URL, form);
            if (filesRes.status === 200) {
            }
            const files = filesRes.data;
            if (files.files.length===0){
                setNoData(true)
                
            }
            setFiles(files.files)
        } catch (error) {
            console.error('Error:', error);
        }
        setStartLoading(false)
    }

    return (
        <div className=' w-full h-full '>
            <div className='text-center m-1 text-3xl items-center justify-center'>
                Library
            </div>
            {!clicked && (
                <div className=' w-full  overflow-y-scroll scrollbar'>
                    {files.length > 0 && (
                        <div className=' flex flex-wrap '>
                            {files.map((file, index) => {
                                const title = file.title
                                // file.name.length > 10
                                //     ? `${file.name.slice(0, 10)}...${file.name.slice(-4)}`
                                //     : file.name;
                                return (
                                    <div className='border rounded-xl m-4 p-2 w-[30%] justify-center flex flex-col  '>
                                        <div key={index} onClick={(e) => { setClicked(true); setClickedFile(file) }} className='rounded-xl shadow-[rgba(50,50,93,0.25)_0px_2px_5px_-1px,rgba(0,0,0,0.3)_0px_1px_3px_-1px] cursor-pointer hover:bg-[rgb(220_240_240_/_90%)] hover:transition-[0.3s]'>
                                            <h1 className=' p-5 item-center text-center'>{title}</h1>
                                        </div>
                                        {/* <img src={starred} alt="Reload page" className="mx-auto px-[5px] py-0 m-2 cursor-pointer hover:bg-[rgb(220_240_240_/_90%)] hover:transition-[0.3s] rounded-xl" /> */}
                                    </div>

                                );
                            })}
                        </div>
                    )}
                </div>
            )}
            {startLoading && (
                <div className='h-[80%] items-center flex justify-center text-center'>
                    <Loader2 
                    className='animate-spin h-10 w-10 text-blue-600'
                    />
                </div>
            )}

            {noData && (
                <div className='h-[80%] items-center flex justify-center text-center'>
                    <PackageOpen 
                    className='mx-2'
                    />
                    <h3>No docs found</h3>
                </div>
            )}
            {clicked && (
                <div className='h-[90%]'>
                    <PDFcontainer file={clickedFile} />
                </div>
            )}
        </div>
    )
}
export default Library;