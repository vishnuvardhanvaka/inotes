import React, { useState, useEffect } from 'react'
import axios from "axios";
import { API } from '../ApiClient'
import "./Scrollbar.css";
import { DownloadCloud, Loader, CheckCheck, RefreshCw, Copy } from 'lucide-react';



function Summary() {
    const [summary, setSummary] = useState('')
    const [copied, setCopied] = useState(false)
    const [content, setContent] = useState('')
    const [title, setTitle] = useState('')
    const user_folder = localStorage.getItem('user_folder')
    const [error, setError] = useState(false)
    const [spin, setSpin] = useState(false)

    async function summarization() {
        const URL = API + "getSummary/";
        const form = new FormData();
        form.append('content', content)
        try {
            const formResponse = await axios.post(URL, form);
            if (formResponse.status === 200) {
                const formData = formResponse.data;
                setSummary(formData.summary)
                setTitle(formData.title)
                setSpin(false)
            }
        } catch (error) {
            setSpin(false)
            setError(true)
            setSummary(error.message)
            console.error('Error: *******', error, typeof (error));
        }
    }

    async function copyToClipboard() {
        try {

            await navigator.clipboard.writeText(summary);
            setCopied(true)
        } catch (err) {
            console.error('Unable to copy text to clipboard', err);
        }
    };
    return (
        <div className=' w-full h-full flex flex-col items-center'>
            <div className='text-center m-1 text-3xl items-center justify-center'>
                Summarization
            </div>
            <div className='w-[80%]'>
                {/* <label for="Description" class="block text-sm text-gray-600">content</label> */}

                <textarea
                    id="scrollbar-textArea"
                    placeholder="Paste/Enter the content you want to summarize."
                    value={content}
                    onChange={(e) => { setContent(e.target.value); }}
                    className="block mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-4 h-48 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300">

                </textarea>

                {/* <p class="mt-3 text-xs text-gray-400 dark:text-gray-600">Enter the content you want to summarize</p> */}
            </div>

            <button
                onClick={(e) => { summarization(e); setSpin(true); setSummary(''); setError(false) }}
                className="my-4 flex items-center px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                {/* <svg class="w-5 h-5 mx-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
                </svg> */}
                <RefreshCw className={`h-[30px] w-[30px] ${spin ? "animate-spin" : ""}`} />

                <span class="mx-1">Summarize</span>
            </button>
            {/* <button class="px-6 py-2 my-4 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                Summarize
            </button> */}

            <label for="Description" className="block text-md text-center text-gray-600">{title}</label>
            <div className='w-[70%] relative flex'>
                <textarea
                    id="scrollbar-textArea"
                    placeholder={spin ? "Summarizing..." : "Find your summary here."}
                    value={summary}
                    onChange={(e) => { setSummary(e.target.value); setCopied(false) }}
                    className={`block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-4 h-64 py-2.5 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 ${error ? "text-red-600" : "text-gray-300"}  dark:focus:border-blue-300`}>

                </textarea>

                {copied ? (
                    <CheckCheck
                        className='absolute right-0 h-4 mt-4 mx-2 text-green-400' />

                ) : (
                    <Copy
                        onClick={copyToClipboard}
                        className='absolute right-0 h-4 mt-4 mx-2 cursor-pointer text-white' />

                )}


                {/* <p class="mt-3 text-xs text-gray-400 dark:text-gray-600">Enter the content you want to summarize</p> */}
            </div>
        </div>
    )
}
export default Summary;