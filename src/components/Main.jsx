import React, { useState, useRef, useEffect } from 'react';
import useStore from '../VariablesStore';
import axios from "axios";
import { API } from '../ApiClient'

import settingsIcon from "./icons/settingIcon.png";
import successTick from "./icons/successTick.png";
import share from "./icons/share.png";
import cloudDownload from "./icons/downloadIcon.png";

import { DownloadCloud, Loader, CheckSquare, RefreshCw, RotateCw, Loader2 } from 'lucide-react';

function Main(props) {
    const [fileList, setFileList] = useState(null);
    const [shouldHighlight, setShouldHighlight] = useState(false);
    const [inputType, setInputType] = useState('');
    const [extractType, setExtractType] = useState('');
    const [title, setTitle] = useState("*")
    const [topics, setTopics] = useState(0)
    const [pages, setPages] = useState(0)
    const [generateNotes, setGenerateNotes] = useState(false);
    const [topicSegmentation, setTopicSegmentation] = useState(false);
    const [querying, setQuerying] = useState(false);
    const [summarizing, setSummarizing] = useState(false);

    const { startProcess, name, toggleStartProcess, resetStartProcess, changeName, getName } = useStore();

    const [pdf_data, setPdfData] = useState();
    const [subitlesData, setSubtitlesData] = useState();

    useEffect(() => {
        localStorage.setItem('TAB', 'MAIN')
    }, [])


    const [link, setLink] = useState('')
    const preventDefaultHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const refContainer = useRef(null);
    const [progress, setProgress] = useState(0)
    const uploading = progress > 0 && progress < 100;
    const user_folder = localStorage.getItem('user_folder')


    const base64ToBlob = (base64_data) => {
        const byteCharacters = atob(base64_data);
        const byteNumbers = new Array(byteCharacters.length);

        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], { type: 'application/pdf' });
    };
    const download_pdf = (base64_data) => {
        const blob = base64ToBlob(base64_data);
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = title;

        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }

    const downloadSubtitles = (base64_data) => {
        const blob = new Blob([base64_data], { type: 'text/srt' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = JSON.stringify(title) + '.srt' || 'subtitles.srt';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
    };

    async function extractText() {
        const GEN_URL = API + "extractText/";
        const gendata = new FormData();
        gendata.append('user_folder', user_folder)
        try {
            const genResponse = await axios.post(GEN_URL, gendata);
            if (genResponse.status === 200) {
                const genData = genResponse.data;
                setSubtitlesData(genData.subtitles_data)
                setGenerateNotes(true)
                // var topicResponse = topicModelling()
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async function topicModelling() {
        const TOP_URL = API + "topicModel/";
        const gendata = new FormData();
        gendata.append('user_folder', user_folder)
        try {
            const topicResponse = await axios.post(TOP_URL, gendata);
            if (topicResponse.status === 200) {
                setTopicSegmentation(true)
                const tData = topicResponse.data;
                setTitle(tData.title)
                setPages(tData.num_pages)
                setTopics(tData.topic_count)
                setPdfData(tData.pdf_data)
                query(tData.title)
            }

        } catch (error) {
            console.error('Error:', error);
        }
    }

    async function query(text_title) {
        const QUE_URL = API + "querying/";
        const querydata = new FormData();
        querydata.append('title', text_title)
        querydata.append('user_folder', user_folder)
        querydata.append('email', localStorage.getItem('email'))
        try {
            const queryResponse = await axios.post(QUE_URL, querydata);
            const qData = queryResponse.data;
            if (queryResponse.status === 200) {
                setQuerying(true)
                localStorage.setItem('current_storage', qData.remaining_storage)
                // props.setStorage(qData.remaining_storage)
            }
            return qData
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async function summarize() {
        const SUM_URL = API + "summarizing/";
        const querydata = new FormData();
        try {
            const sumResponse = await axios.post(SUM_URL, querydata);
            if (sumResponse.status === 200) {
                // setSummarizing(true)
            }
            const sData = sumResponse.data;
            return sData
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleUpload = async () => {
        const UPLOAD_URL = API + "upload/";
        const data = new FormData();
        for (let i = 0; i < fileList.length; i++) {
            data.append("files", fileList[i]);
        }
        data.append('subs', false)
        data.append('user_folder', localStorage.getItem('user_folder'))
        try {
            const upResponse = await axios.post(UPLOAD_URL, data, {
                onUploadProgress(e) {
                    const progress = e.progress ?? 0;
                    setProgress(progress * 100);
                    if (progress * 100 >= 100) {
                        setFileList(null);
                    }
                },
            });
            toggleStartProcess(startProcess)

            setGenerateNotes(false)
            setTopicSegmentation(false)
            setPdfData(null)
            setSubtitlesData(null)
            setTitle('')
            setPages(0)
            setTopics(0)
            setQuerying(false)

            extractText()
            topicModelling()
            // refContainer.current.scrollIntoView({ behavior: "smooth" });
            // var genResponse = extractText()
            // var topicResponse = topicModelling()
        } catch (error) {
            console.error('Error:', error);
        }

    };
    async function linkUpload() {
        const LinkExtract_URL = API + "linkExtract/";
        const gendata = new FormData();
        gendata.append('link', link)
        gendata.append('user_folder', user_folder)
        toggleStartProcess(startProcess)
        try {
            setGenerateNotes(false)
            setTopicSegmentation(false)
            setPdfData(null)
            setSubtitlesData(null)
            setTitle('')
            setPages(0)
            setTopics(0)
            setQuerying(false)
            const upResponse = await axios.post(LinkExtract_URL, gendata);
            const genData = upResponse.data;

            extractText()
            topicModelling()
            // refContainer.current.scrollIntoView({ behavior: "smooth" });
            // var tt=query()
            // var genResponse = extractText()
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <>
            <div className='w-full justify-center'>
                {!startProcess && (
                    <div
                        className={`w-full h-full flex items-center p-4 cursor-pointer text-violet-500 rounded-lg transition-colors ${shouldHighlight ? "border-violet-500 border-2 border-dashed bg-violet-100" : "border-violet-100"}`}
                        onDragOver={(e) => {
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
                            setFileList(files);
                            setShouldHighlight(false);
                        }}
                    >


                        <div className=" w-full p-5">

                            <div className='mx-auto w-[30%] flex mt-5 justify-around'>
                                <div className='border border-gray-300 px-6 py-2 rounded-xl'>
                                    <input
                                        className='cursor-pointer'
                                        type='radio' name='extractType' value='local' onChange={(e) => { setExtractType('local') }} />
                                    <label className='ml-2' for="html">Upload</label>
                                </div>
                                <div className='border border-gray-300 px-6 py-2 rounded-xl'>
                                    <input
                                        className='cursor-pointer'
                                        type='radio' name='extractType' value='link' onChange={(e) => { setExtractType('link') }} />
                                    <label className='ml-2' for="html">Link</label>
                                </div>

                            </div>
                            {
                                extractType === 'link' && inputType != null &&
                                (
                                    <div className='mx-auto w-[30%] flex mt-10 justify-center'>
                                        <input
                                            className='border w-full border-gray-500 rounded-md p-2 pl-5'
                                            type='text'
                                            onChange={(e) => { setLink(e.target.value) }}
                                            placeholder='https:// Link to extract'
                                        />
                                        <button onClick={linkUpload} className='bg-blue-500 hover:bg-blue-600 text-white font-sembold py-2 px-4 ml-4 rounded-md'>Start</button>
                                    </div>
                                )
                            }

                            {
                                extractType === 'local' && inputType != null &&
                                // (
                                //     <div className='mt-10'>
                                //         <label for="dropzone-file" class="flex flex-col items-center w-full max-w-lg p-5 mx-auto mt-2 text-center bg-white border-2 border-gray-300 border-dashed cursor-pointer  rounded-xl">
                                //             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-gray-500 ">
                                //                 <path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                                //             </svg>

                                //             <h2 class="mt-1 font-medium tracking-wide text-gray-700 ">Recording File</h2>

                                //             <p class="mt-2 text-xs tracking-wide text-gray-500 ">Upload or darg & drop your file mp4, mkv, mp3 or wav. </p>

                                //             <input id="dropzone-file" type="file" class="hidden" />
                                //         </label>
                                //     </div>
                                // )
                                (

                                    <div className="flex flex-col items-center">
                                        {!fileList ? (
                                            <label for="dropzone-file" className="flex flex-col items-center w-full max-w-lg p-5 mx-auto mt-2 text-center bg-white border-2 border-gray-300 border-dashed cursor-pointer  rounded-xl">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-gray-500 ">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                                                </svg>
                                                <h2 className="mt-1 font-medium tracking-wide text-gray-700 ">Recording File</h2>
                                                <p className="mt-2 text-xs tracking-wide text-gray-500 ">Upload or drag & drop your file mp4, mkv, mp3 or wav. </p>
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
                                                    <button
                                                        className={`bg-violet-500 text-violet-50 px-2 py-1 rounded-md ${uploading ? "pointer-events-none opacity-40 w-full" : ""}`}
                                                        onClick={() => {
                                                            handleUpload();
                                                        }}
                                                    >
                                                        {uploading
                                                            ? `Uploading...  ( ${progress.toFixed(2)}% )`
                                                            : "Upload"
                                                        }
                                                    </button>
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
                                )
                            }
                        </div>

                    </div>
                )}

                {startProcess && (

                    <div ref={refContainer} className='w-full h-full  flex justify-center items-center'>
                        <div className='flex h-full w-full  justify-around items-center m-5'>
                            <div class="flex flex-col h-[70%] w-[25%] max-w-xl p-8 space-y-8 text-center bg-white border-2 border-gray-200 rounded-lg lg:mx-4">
                                {/* <div class="flex-shrink-0">
            <h2 class="inline-flex items-center justify-center px-2 font-semibold tracking-tight text-blue-400 uppercase rounded-lg bg-gray-50 dark:bg-gray-700">
                Casual
            </h2>
        </div> */}
                                <div className='flex items-center'>
                                    {!generateNotes ? (
                                        <div>
                                            {/* <img src={settingsIcon} alt="Reload page" className="h-10 px-[10px] py-0" /> */}
                                            <Loader2 className="h-[30px] w-[30px] text-blue-800 animate-spin" />
                                        </div>
                                    ) : (
                                        <div className='bg-white'>
                                            {/* <img src={successTick} alt="Reload page" className="h-10 px-[10px] py-0" /> */}
                                            <CheckSquare className="h-10 text-green-500" />
                                        </div>
                                    )

                                    }

                                    <div className='ml-5'>
                                        Extracting Text
                                    </div>

                                </div>
                                <div className='flex items-center'>
                                    {!generateNotes ? (
                                        <div>
                                            {/* <img src={settingsIcon} alt="Reload page" className="h-10 px-[10px] py-0" /> */}
                                            <Loader2 className="h-[30px] w-[30px] text-blue-800 animate-spin" />
                                        </div>
                                    ) : (
                                        <div className='bg-white'>
                                            {/* <img src={successTick} alt="Reload page" className="h-10 px-[10px] py-0" /> */}
                                            <CheckSquare className="h-10 text-green-500" />
                                        </div>
                                    )

                                    }

                                    <div className='ml-5'>
                                        Generating subtitles
                                    </div>

                                </div>


                                <div className='flex items-center'>
                                    {!topicSegmentation ? (
                                        <div>
                                            {/* <img src={settingsIcon} alt="Reload page" className="h-10 px-[10px] py-0" /> */}
                                            <Loader2 className="h-[30px] w-[30px] text-blue-800 animate-spin" />
                                        </div>
                                    ) : (
                                        <div className='bg-white'>
                                            {/* <img src={successTick} alt="Reload page" className="h-10 px-[10px] py-0" /> */}
                                            <CheckSquare className="h-10 text-green-500" />
                                        </div>
                                    )

                                    }
                                    <div className='ml-5'>
                                        Topic Segmentation
                                    </div>
                                </div>



                                <div className='flex items-center'>
                                    {!topicSegmentation ? (
                                        <div>
                                            {/* <img src={settingsIcon} alt="Reload page" className="h-10 px-[10px] py-0" /> */}
                                            <Loader2 className="h-[30px] w-[30px] text-blue-800 animate-spin" />
                                        </div>
                                    ) : (
                                        <div className='bg-white'>
                                            {/* <img src={successTick} alt="Reload page" className="h-10 px-[10px] py-0" /> */}
                                            <CheckSquare className="h-10 text-green-500" />
                                        </div>
                                    )

                                    }
                                    <div className='flex ml-5'>
                                        Summarizing
                                    </div>
                                </div>

                                <div className='flex items-center'>
                                    {!querying ? (
                                        <div>
                                            {/* <img src={settingsIcon} alt="Reload page" className="h-10 px-[10px] py-0" /> */}
                                            <Loader2 className="h-[30px] w-[30px] text-blue-800 animate-spin" />
                                        </div>
                                    ) : (
                                        <div className='bg-white'>
                                            {/* <img src={successTick} alt="Reload page" className="h-10 px-[10px] py-0" /> */}
                                            <CheckSquare className="h-10 text-green-500" />
                                        </div>
                                    )

                                    }
                                    <div className='flex ml-5'>
                                        Querying
                                    </div>
                                </div>
                            </div>


                            <div className="flex flex-col w-[40%] h-[100%] justify-center items-center max-w-xl p-8 space-y-8 text-center bg-white rounded-lg lg:mx-4">
                                <div className="w-[100%] h-[42%] flex flex-col items-center max-w-xl p-5 text-center bg-white border-2 border-gray-200 rounded-lg">
                                    <div className='flex m-2 justify-center'>
                                        <div className='font-semibold'>Title: </div>
                                        <div className='flex text-left ml-2'>
                                            {title}
                                        </div>
                                    </div>
                                    <div className='flex items-center m-2 justify-center'>
                                        <div className='font-semibold'>Topics: </div>
                                        <div className='flex ml-5'>
                                            {topics}
                                        </div>
                                    </div>
                                    <div className='flex items-center m-2 justify-center'>
                                        <div className='font-semibold'>Pages: </div>
                                        <div className='flex ml-5'>
                                            {pages}
                                        </div>
                                    </div>
                                    <div className='flex justify-around w-[70%] p-1 mt-5 '>
                                        <div className='bg-white hover:bg-gray-200 p-1 rounded-xl md:cursor-pointer'>
                                            {/* <img src={cloudDownload} alt="Reload page" onClick={(e) => { download_pdf(pdf_data) }} className="h-8 px-[10px] py-0" /> */}
                                            {pdf_data != null && (
                                                <button
                                                    className='flex items-center bg-blue-300 px-2 py-1 rounded-lg'
                                                    onClick={(e) => { download_pdf(pdf_data) }}
                                                >
                                                    PDF
                                                    <DownloadCloud className='text-black ml-2' />
                                                </button>

                                            )

                                            }

                                        </div>
                                        <div className='bg-white hover:bg-gray-200 p-1 rounded-xl md:cursor-pointer'>
                                            {/* <img src={cloudDownload} alt="Reload page" onClick={(e) => { download_pdf(pdf_data) }} className="h-8 px-[10px] py-0" /> */}
                                            {subitlesData != null && (
                                                <button
                                                    className='flex items-center bg-blue-300 px-2 py-1 rounded-lg'
                                                    data-toggle="tooltip"
                                                    data-placement="bottom"
                                                    title={`${title}.srt`}
                                                    onClick={(e) => { downloadSubtitles(subitlesData) }}
                                                >Subtitles <DownloadCloud className='text-black ml-2' />
                                                </button>
                                            )

                                            }

                                        </div>
                                    </div>
                                </div>
                                {/* <button className=" w-[40%] h-[10%] text-center hover:bg-gray-200 bg-violet border-2 border-gray-200 rounded-lg">
            Go to notes
        </button> */}

                            </div>

                        </div>

                    </div>

                )
                }



            </div >

        </>
    );
};

export default Main;
