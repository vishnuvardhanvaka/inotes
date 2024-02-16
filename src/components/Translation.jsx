import React, { useState, useEffect } from 'react'
import axios from "axios";
import { API } from '../ApiClient';
import { Languages } from '../Languagecodes'
import "./Scrollbar.css";
import { DownloadCloud, Loader, CheckCheck, RefreshCw, Copy } from 'lucide-react';


function Translation() {
    var targetLanguages = [
        'India', 'Germany', 'USA', 'China', 'Brazil', 'Australia', 'Canada', 'France', 'Japan', 'Mexico',
        'Nigeria', 'Russia', 'South Africa', 'Spain', 'Sweden', 'Switzerland', 'United Kingdom', 'Argentina', 'Italy', 'Netherlands',
    ];
    var sourceLanguages = [
        'India', 'Germany', 'USA', 'China', 'Brazil', 'Australia', 'Canada', 'France', 'Japan', 'Mexico',
        'Nigeria', 'Russia', 'South Africa', 'Spain', 'Sweden', 'Switzerland', 'United Kingdom', 'Argentina', 'Italy', 'Netherlands',
    ];
    const [translatedText, setTranslatedText] = useState('')
    const [copied, setCopied] = useState(false)
    const [content, setContent] = useState('')
    const user_folder = localStorage.getItem('user_folder')
    const [targetLanguage, setTargetLanguage] = useState('te')
    const [soruceLanguage, setSourceLanguage] = useState('none')
    const [error, setError] = useState(false)
    const [spin, setSpin] = useState(false)

    async function translation() {
        const URL = API + "getTranslated/";
        const form = new FormData();
        form.append('content', content)
        form.append('target_language', targetLanguage)
        form.append('source_language', soruceLanguage)
        try {
            const formResponse = await axios.post(URL, form);
            if (formResponse.status === 200) {
                const formData = formResponse.data;
                setTranslatedText(formData.translated_text)
                setSpin(false)
            }
        } catch (error) {
            setSpin(false)
            setError(true)
            setTranslatedText(error.message)
            console.error('Error: *******', error, typeof (error));
        }
    }

    async function copyToClipboard() {
        try {
            await navigator.clipboard.writeText(translatedText);
            setCopied(true)
        } catch (err) {
            console.error('Unable to copy text to clipboard', err);
        }
    };
    return (
        <div className=' w-full h-full flex flex-col items-center'>
            <div className='text-center m-1 text-3xl items-center justify-center'>
                Translation
            </div>
            <div className='w-[80%]'>
                <textarea
                    id="scrollbar-textArea"
                    placeholder="Paste/Enter the content you want to translate."
                    value={content}
                    onChange={(e) => { setContent(e.target.value); }}
                    className="block mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-4 h-48 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300">

                </textarea>

                {/* <p class="mt-3 text-xs text-gray-400 dark:text-gray-600">Enter the content you want to summarize</p> */}
            </div>

            <div className='flex my-2  items-center justify-around w-full'>

                <div>
                    <select
                        // className="my-4 flex items-center px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                        name='source_language'
                        className='border-2 h-10 cursor-pointer'

                        id="scrollbar-chat"
                        onChange={(e) => {
                            setSourceLanguage(e.target.value)
                        }}
                    >
                        <option value="" disabled selected>
                            Source Language
                        </option>
                        {Object.keys(Languages).map((languageName, index) => (
                            <option key={index} value={Languages[languageName]}>
                                {languageName}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    onClick={(e) => { translation(e); setSpin(true); setTranslatedText(''); setError(false) }}
                    className="my-4 flex items-center px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                    {/* <svg class="w-5 h-5 mx-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
                </svg> */}
                    <RefreshCw className={`h-[30px] w-[30px] ${spin ? "animate-spin" : ""}`} />

                    <span class="mx-1">Translate</span>
                </button>

                <div>
                    <select
                        name='target_language'
                        className='border-2 h-10 cursor-pointer'
                        id="scrollbar-chat"
                        onChange={(e) => {
                            setTargetLanguage(Languages[e.target.value])
                        }}
                    >
                        <option value="" disabled selected>
                            Target Language
                        </option>
                        {Object.keys(Languages).map((languageName, index) => (
                            <option key={index} value={targetLanguages[languageName]}>
                                {languageName}
                            </option>
                        ))}
                    </select>
                </div>


            </div>

            {/* <button class="px-6 py-2 my-4 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                Summarize
            </button> */}

            {/* <label for="Description" className="block text-md text-center text-gray-600">{title}</label> */}
            <div className='w-[70%] relative flex'>
                <textarea
                    id="scrollbar-textArea"
                    placeholder={spin ? "Translating..." : "Find your translated text here."}
                    value={translatedText}
                    onChange={(e) => { setTranslatedText(e.target.value); setCopied(false) }}
                    className={`block w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-4 h-64 py-2.5 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 ${error ? "text-red-600" : "text-gray-300"}  dark:focus:border-blue-300`}>
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
export default Translation;