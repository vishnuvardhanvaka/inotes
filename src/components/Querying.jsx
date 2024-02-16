import { React, useState, useRef } from 'react';
import axios, { CancelToken, isCancel } from "axios";
import { API } from '../ApiClient'
import { RefreshCw, Radiation } from 'lucide-react';
import PDFcontainer from './PDFcontainer';
import PdfViewer from './PdfViewer';


function Querying() {
    const cancleFileupload = useRef()

    const user_folder = localStorage.getItem('user_folder')
    const [shouldHighlight, setShouldHighlight] = useState(false);
    const [spin, setSpin] = useState(false)
    const [filename, setFilename] = useState()
    const [fileList, setFileList] = useState(null);
    const [file, setFile] = useState([])
    const [progress, setProgress] = useState(0)
    const [searchCreated, setSearchCreated] = useState(false)
    const [processing, setProcessing] = useState(false)
    const uploading = progress > 0 && progress < 100;
    const preventDefaultHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };


    async function getFile(pdf_id) {
        const URL = API + "getFile/";
        const form = new FormData();

        form.append('pdf_id', pdf_id)
        form.append('user_folder', localStorage.getItem('user_folder'))
        try {
            const filesRes = await axios.post(URL, form);
            if (filesRes.status === 200) {
                const file = filesRes.data;
                setFile(file.file)
                setSearchCreated(true)
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleUpload = async () => {
        const UPLOAD_URL = API + "queryUploaded/";
        const data = new FormData();
        for (let i = 0; i < fileList.length; i++) {
            data.append("files", fileList[i]);
            setFilename(fileList[i].name)
        }

        data.append('email', localStorage.getItem('email'))
        data.append('user_folder', localStorage.getItem('user_folder'))

        try {
            const formResponse = await axios.post(UPLOAD_URL, data, {
                onUploadProgress(e) {
                    const progress = e.progress ?? 0;
                    setProgress(progress * 100);
                    if (progress * 100 >= 100) {
                        setFileList(null);
                        setProcessing(true)
                    }
                },
                cancelToken: new CancelToken(cancel => cancleFileupload.current = cancel)
            });
            if (formResponse.status === 200) {
                const formData = formResponse.data;
                // setSearchCreated(true)

                getFile(formData.pdf_id)
            }
            setSpin(false)
            setProcessing(false)


        } catch (error) {
            if (isCancel) {
                console.log('File upload is cancelled !')
            }
            setProcessing(false)
            setSpin(false)
        }
    };

    function cancelUpload() {
        if (cancleFileupload.current) {
            cancleFileupload.current("File upload is cancelled")
            setFileList(null);
            setProcessing(true)
            setProgress(0);
        }
    }

    return (
        <div className=' w-full h-full'>
            <div className='text-center text-3xl items-center justify-center'>
                Chat with your doc
            </div>
            {!searchCreated && (
                
            <div className='w-full h-[90%] flex flex-col items-center'>
                <div
                    className={`w-full h-full flex flex-col justify-center items-center p-4  text-violet-500 rounded-lg transition-colors ${shouldHighlight ? "border-violet-500 border-2 border-dashed bg-violet-100" : "border-violet-100"}`}
                    onDragOver={(e) => {
                        if (!processing)
                            preventDefaultHandler(e);
                        setShouldHighlight(true);
                    }}
                    onDragEnter={(e) => {
                        preventDefaultHandler(e);
                        setShouldHighlight(true);
                    }}
                    onDragLeave={(e) => {
                        preventDefaultHandler(e);
                        setShouldHighlight(false);
                    }}
                    onDrop={(e) => {
                        preventDefaultHandler(e);
                        const files = Array.from(e.dataTransfer.files);
                        // handleFileChange(e)
                        setFileList(files);
                        setShouldHighlight(false);
                    }}
                >
                    <div className=" w-full">

                        {!processing ? (
                            <div className="flex flex-col items-center">
                                {!fileList ? (
                                    <label for="dropzone-file" className="flex flex-col items-center w-full max-w-lg p-5 mx-auto mt-2 text-center bg-white border-2 border-gray-300 border-dashed cursor-pointer  rounded-xl">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-gray-500 ">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                                        </svg>
                                        <h2 className="mt-1 font-medium tracking-wide text-gray-700 ">Document File</h2>
                                        <p className="mt-2 text-xs tracking-wide text-gray-500 ">Upload or drag & drop your file pdf,txt. </p>
                                        <input id="dropzone-file" onChange={(e) => {
                                            const files = Array.from(e.target.files);
                                            setFileList(files);
                                            setShouldHighlight(false);
                                        }} type="file" className="hidden" />
                                    </label>
                                ) : (
                                    <>
                                        {!uploading && (
                                            <>
                                                <p>Files to Upload</p>
                                                {fileList.map((file, i) => {
                                                    return <span key={i}>{file.name}</span>;
                                                })}
                                            </>
                                        )}
                                        <div className="flex gap-2 mt-2">
                                            {uploading && (
                                                <div className='flex'>
                                                    <button
                                                        className={`bg-red-600 mx-4 text-violet-50 px-2 py-1 rounded-md`}
                                                        onClick={(e) => {
                                                            cancelUpload()
                                                        }}
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        className={`bg-violet-600 text-violet-50 px-2 py-1 rounded-md ${uploading ? "pointer-events-none  w-full" : ""}`}
                                                        onClick={() => {
                                                            handleUpload();
                                                        }}
                                                    >
                                                        {progress.toFixed(2)}%

                                                    </button>
                                                </div>
                                            )
                                            }
                                            {!uploading && (
                                                <button
                                                    className="border border-violet-500 px-2 py-1 rounded-md"
                                                    onClick={() => {
                                                        setFileList(null);
                                                    }}
                                                >
                                                    Clear
                                                </button>
                                            )}
                                        </div>
                                        <div>
                                            {uploading && (
                                                <div>
                                                    {fileList.map((file, index) => {
                                                        const fileName =
                                                            file.name.length > 10
                                                                ? `${file.name.slice(0, 10)}...${file.name.slice(-4)}`
                                                                : file.name;
                                                        return (
                                                            <div key={index}>
                                                                <p className='text-bold'>
                                                                    {fileName}
                                                                </p>
                                                                <div className="flex items-center cursor-pointer px-5 py-0 rounded-[0_30px_30px_0] hover:transition-[0.3s] hover:bg-[whitesmoke]">
                                                                    <div className="w-[200px] bg-[rgb(230,230,230)] h-full rounded-[40px]">
                                                                        <div className={`h-[3.5px] bg-[dodgerblue] rounded-[40px]`}
                                                                            style={{ width: `${Math.floor(progress)}%` }}></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>

                        ) : (
                            <div className="flex flex-col items-center w-full max-w-lg p-5 mx-auto mt-2 text-center bg-white cursor-default  rounded-xl">
                                <div className='flex  '>
                                    <h2 className="mt-1 font-medium tracking-wide text-gray-700 "> </h2>
                                    <Radiation
                                        className=' mx-4 h-8 w-8 animate-spin'
                                    />
                                </div>
                                <p className="mt-2 text-xs tracking-wide text-gray-500 ">generating your vectors please wait ...</p>
                            </div>
                        )
                        }
                        
                    </div>

                    <div className='flex w-full justify-evenly p-4 mt-10'>
                        <button
                            disabled={spin}
                            onClick={(e) => {
                                if (fileList !== null) {
                                    handleUpload();
                                    setSpin(true);
                                }
                            }}
                            className={`flex items-center px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform ${spin || fileList === null ? "bg-blue-400 rounded-lg cursor-default" : "bg-blue-600 rounded-lg cursor-pointer focus:ring-blue-300 focus:ring focus:ring-opacity-80 hover:bg-blue-500"}   focus:outline-none `}>
                            <RefreshCw className={`h-[30px] w-[30px] ${spin ? "animate-spin" : ""}`} />
                            <span class="mx-1">Chat</span>
                        </button>
                    </div>

                </div>

            </div>
            )}

            {searchCreated && (
                <div className='h-[90%]'>
                    <PDFcontainer file={file} />
                </div>
            )}


        </div>


    )
}
export default Querying;

