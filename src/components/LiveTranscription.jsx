import React, { useState, useEffect } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import {CheckCheck, Mic, Copy, PlayCircle, PauseCircle, Eraser } from 'lucide-react';
import "./Scrollbar.css";
import {Languages} from '../Languagecodes';

const LiveTranscription = () => {
    const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
    const { transcript, interimTranscript, finalTranscript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
    const [textToCopy, setTextToCopy] = useState();
    const [copied, setCopied] = useState(false);
    const [content, setContent] = useState('');
    const [currentPointer, setCurrentPointer] = useState('')
    const [isRecording, setIsRecording] = useState(false);
    const [sourceLanguage, setSourceLanguage] = useState('en')
    // const [isCopied, setCopied] = useClipboard(textToCopy, {
    //     successDuration:1000
    // });
    useEffect(() => {
        setCopied(false)
    }, [transcript])

    useEffect(() => {
        setContent((prev) => [...prev, interimTranscript + '. '])
    }, [interimTranscript])


    if (!browserSupportsSpeechRecognition) {
        return null
    }
    async function copyToClipboard() {
        try {

            await navigator.clipboard.writeText(transcript);
            setCopied(true)
        } catch (err) {
            console.error('Unable to copy text to clipboard', err);
        }
    };

    return (
        <div className=' w-full h-full flex flex-col items-center'>
            <div className='text-center m-1 text-3xl items-center justify-center'>
                Live Transcription
            </div>
            <div className='w-[70%] relative flex'>
                <textarea
                    id="scrollbar-chat"
                    placeholder="Get the transcription here "
                    value={transcript}
                    className={`block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-4 h-[60vh] py-2.5 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 text-gray-300 dark:bg-gray-900 dark:focus:border-blue-300`}>
                </textarea>

                {copied ? (
                    <CheckCheck
                        className='absolute right-0 h-4 mt-4 mx-2 text-green-400' />

                ) : (
                    <Copy
                        onClick={copyToClipboard}
                        className='absolute right-0 h-4 mt-4 mx-2 cursor-pointer text-white' />

                )}
            </div>
            <div className='border w-[80%] flex justify-evenly items-center my-4'>
                <div onClick={resetTranscript} className='cursor-pointer hover:bg-gray-300 rounded-[100%] p-4'>
                    <Eraser
                        className='h-9 w-9 text-blue-600 cursor-pointer'
                    />

                </div>
                {isRecording ? (
                    <div onClick={(e) => { SpeechRecognition.stopListening(); setIsRecording(!isRecording) }} className='cursor-pointer hover:bg-gray-300 rounded-[100%] p-4'>
                        <PauseCircle
                            className='h-9 w-9 text-green-600 cursor-pointer'
                        />
                    </div>
                ) : (
                    <div className='cursor-pointer hover:bg-gray-300 rounded-[100%] p-4'>
                        <Mic
                            onClick={(e) => {
                                // startListening();
                                SpeechRecognition.startListening({ continuous: true, language: `${sourceLanguage}` })
                                setIsRecording(!isRecording)
                            }}
                            className='h-9 w-9 text-red-600 cursor-pointer'
                        />
                    </div>
                )
                }

                <div>
                    <select
                        // className="my-4 flex items-center px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                        name='language'
                        className='overflow-y-auto block cursor-pointer w-15 px-10 py-2 border-2 font-serif text-sm font-normal text-gray-700 truncate'
                        id="scrollbar-chat"
                        onChange={(e) => {
                            setSourceLanguage(e.target.value);
                        }}

                    >
                        <option
                            className="text-gray-500"
                            value="" disabled selected={false}>
                            Source Language
                        </option>
                        {Object.keys(Languages).map((languageName, index) => (
                            <option
                                selected={languageName === 'English'}
                                key={index}
                                value={Languages[languageName]}
                            >
                                {languageName}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default LiveTranscription;
