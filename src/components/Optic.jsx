import { React, useState, useRef } from 'react';
import axios, { CancelToken, isCancel } from "axios";
import { API } from '../ApiClient'
import { DownloadCloud, RefreshCw, Radiation, CheckCheck, Copy } from 'lucide-react';

// import ReactPlayer from 'react-player'

function Optic() {

    const user_folder = localStorage.getItem('user_folder')
    const [shouldHighlight, setShouldHighlight] = useState(false);
    const [spin, setSpin] = useState(false)
    const [imageInfo, setImageInfo] = useState()
    // const [filename, setFilename] = useState()
    const [fileList, setFileList] = useState(null);
    const [progress, setProgress] = useState(0)
    const [filePath, setFilePath] = useState('')
    const [uploaded, setUploaded] = useState(false)

    const [error, setError] = useState('')
    const [copied, setCopied] = useState(false)

    const [query, setQuery] = useState('')
    const cancleFileupload = useRef()

    const [processing, setProcessing] = useState(false)
    // const [videoUrl, setVideoUrl] = useState(null);
    const uploading = progress > 0 && progress < 100;
    const preventDefaultHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };


    async function copyToClipboard() {
        try {

            await navigator.clipboard.writeText(imageInfo);
            setCopied(true)
        } catch (err) {
            console.error('Unable to copy text to clipboard', err);
        }
    };

    async function askOptic() {
        const URL = API + "askOptic/";
        const form = new FormData();
        form.append('query', query)
        form.append('img_path', filePath)
        try {
            const formresponse = await axios.post(URL, form);
            if (formresponse.status === 200) {
                const formData = formresponse.data;
                setImageInfo(formData.img_info)
                setProcessing(false)
                setSpin(false)
                setCopied(false)

            }
        } catch (error) {
            setSpin(false)
            setProcessing(false)
            setError(error)
            console.error('Error:', error);
        }
    }

    const handleUpload = async () => {
        const UPLOAD_URL = API + "upload_file/";
        const data = new FormData();
        for (let i = 0; i < fileList.length; i++) {
            data.append("files", fileList[i]);
            // setFilename(fileList[i].name)
        }
        data.append('user_folder', localStorage.getItem('user_folder'))

        try {
            const upResponse = await axios.post(UPLOAD_URL, data, {
                onUploadProgress(e) {
                    const progress = e.progress ?? 0;
                    setProgress(progress * 100);
                    if (progress * 100 >= 100) {
                        // setFileList(null);
                        setProcessing(true)
                    }
                },
                cancelToken: new CancelToken(cancel => cancleFileupload.current = cancel)

            });
            if (upResponse.status === 200) {
                const formData = upResponse.data;
                setUploaded(true)
                setProcessing(false)
                setFilePath(formData.file_path)

            }
        } catch (error) {
            if (isCancel) {
                console.log('File upload is cancelled !')
            }
            setError(error)
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
        <div className=' w-full h-full flex flex-col items-center'>
            <div className='text-center m-1 text-3xl items-center justify-center'>
                Ask Optic
            </div>
            <div
                className={`w-full flex flex-col justify-center items-center p-4  text-violet-500 rounded-lg transition-colors ${shouldHighlight ? "border-violet-500 border-2 border-dashed bg-violet-100" : "border-violet-100"}`}
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
                    setUploaded(false)
                    setFileList(files);
                    setShouldHighlight(false);
                }}
            >
                <div className=" w-full">

                    {(
                        <div className="flex flex-col items-center">
                            {!fileList ? (
                                <label for="dropzone-file" className="flex flex-col items-center w-full max-w-lg p-5 mx-auto mb-2 text-center bg-white border-2 border-gray-300 border-dashed cursor-pointer  rounded-xl">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-gray-500 ">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                                    </svg>
                                    <h2 className="mb-1 font-medium tracking-wide text-gray-700 ">Image</h2>
                                    <p className="mb-2 text-xs tracking-wide text-gray-500 ">Upload or drag & drop your image jpg, png, jpeg or tiff. </p>
                                    <input id="dropzone-file" onChange={(e) => {
                                        const files = Array.from(e.target.files);
                                        setFileList(files);
                                        setShouldHighlight(false);
                                    }}

                                        type="file" className="hidden" />

                                </label>
                            ) : (
                                <>
                                    {fileList.map((file, index) => (
                                        <div
                                            className='w-[100%] flex  justify-center'
                                            key={index}>
                                            <img className='w-[30%] rounded-2xl' src={URL.createObjectURL(file)} alt={`Uploaded ${file.name}`} />
                                        </div>
                                    ))}
                                    {processing && (
                                        <div className="flex flex-col items-center w-full max-w-lg p-5 mx-auto mb-2 text-center bg-white cursor-default  rounded-xl">
                                            <div className='flex  '>
                                                <h2 className="mb-1 font-medium tracking-wide text-gray-700 "> </h2>
                                                <Radiation
                                                    className=' mx-4 h-8 w-8 animate-spin'
                                                />
                                            </div>
                                            {/* <p className="mt-2 text-xs tracking-wide text-gray-500 ">please wait ...</p> */}
                                        </div>
                                    )}
                                    {!uploading && !processing && !uploaded && (
                                        <>
                                            <p>Image to Upload</p>
                                            {fileList.map((file, i) => {
                                                return <span key={i}>{file.name}</span>;
                                            })}

                                        </>
                                    )}
                                    <div className="flex gap-2 w-full  justify-center mb-1">
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
                                                    }}
                                                >
                                                    {progress.toFixed(2)}%

                                                </button>
                                            </div>
                                        )
                                        }
                                        {!uploading && !processing && !uploaded && (
                                            <div className='my-2 w-[50%] text-center'>
                                                <button
                                                    className={`bg-violet-600 mx-4 text-violet-50 px-2 py-1 rounded-md ${uploading ? "pointer-events-none  w-full" : ""}`}
                                                    onClick={() => {
                                                        handleUpload();
                                                    }}
                                                >
                                                    Upload
                                                </button>
                                                <button
                                                    className="border border-violet-500 px-2 py-1 rounded-md"
                                                    onClick={() => {
                                                        setFileList(null);
                                                    }}
                                                >
                                                    Clear
                                                </button>
                                            </div>
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

                    )
                    }

                    {/* <div
                        className='h-[20%] w-[20%]'
                    >
                    </div> */}

                </div>


                <div className='flex w-full justify-center my-2 items-center'>
                    <div className='w-[70%] relative flex'>
                        <textarea
                            id="scrollbar-textArea"
                            placeholder={"Ask question about your image."}
                            value={query}
                            onChange={(e) => { setQuery(e.target.value); }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    askOptic()
                                    setSpin(true);
                                }
                            }}
                            className={`block mb-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-4 py-2.5 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 text-gray-300  dark:focus:border-blue-300`}>

                        </textarea>
                    </div>
                    <div>
                        <button
                            // disabled={spin}
                            onClick={(e) => {
                                if (fileList !== null && query !== '') {
                                    askOptic()
                                    setSpin(true);
                                }
                            }}
                            className={`flex mx-2 items-center px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform ${spin || fileList === null ? "bg-blue-400 rounded-lg cursor-default" : "bg-blue-600 rounded-lg cursor-pointer focus:ring-blue-300 focus:ring focus:ring-opacity-80 hover:bg-blue-500"} focus:outline-none `}>
                            <RefreshCw className={`h-[30px] w-[30px] ${spin ? "animate-spin" : ""}`} />
                            <span class="mx-1">Ask</span>
                        </button>
                    </div>
                </div>

                <div className='flex w-full justify-center p-4 mb-2'>
                    <div className='w-[90%] relative flex'>
                        <textarea
                            id="scrollbar-textArea"
                            placeholder={spin ? "Getting information..." : "About image."}
                            value={imageInfo}
                            onChange={(e) => { setCopied(false) }}
                            disabled={true}
                            className={`block  mb-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-4 h-52 py-2.5 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 text-gray-300  dark:focus:border-blue-300`}>
                        </textarea>

                        {copied ? (
                            <CheckCheck
                                className='absolute right-0 h-4 mt-4 mx-2 text-green-400'
                            />
                        ) : (
                            <Copy
                                onClick={copyToClipboard}
                                className='absolute right-0 h-4 mt-4 mx-2 cursor-pointer text-white'
                            />
                        )}

                    </div>

                </div>


            </div>

        </div>
    )
}
export default Optic;

