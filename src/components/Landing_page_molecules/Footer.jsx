import React from "react";
import{
    FaFacebookSquare,
    FaGithubSquare,
    FaInstagram,
    FaTwitterSquare

} from 'react-icons/fa'
function Footer(){
    return(
        <div className="bg-black">
            <div className="max-w-[1240px] mx-auto py-16 px-4 grid lg:grid-cols-2 gap-8 text-gray-300">
                <div>
                    <h1 className='w-full text-3xl font-bold text-[#00df9e]'>INOTES.</h1>
                    <p className="md:text-[1rem] text-left p-0 py-4 m-0">Unlock the power of seamless note-taking, translation, transcription, and more with our feature-packed iNotes application.</p>
                    <div className="flex justify-between md:w-[75%] my-6">
                        <FaFacebookSquare className="cursor-pointer" size={30}/>
                        <FaInstagram className="cursor-pointer" size={30}/>
                        <FaTwitterSquare className="cursor-pointer" size={30}/>
                        <FaGithubSquare className="cursor-pointer" size={30}/>
                    </div>
                </div>
                <div className="lg:col-span-3 flex justify-between">
                    <div>
                        <h6 className="font-medium text-gray-408">How it works</h6>
                        <ul>
                            <li className="py-2 text-sm">Signing up</li>
                            <li className="py-2 text-sm">Try now</li>
                            <li className="py-2 text-sm">Join community</li>
                            <li className="py-2 text-sm">Ask optic</li>
                            <li className="py-2 text-sm">Unlock resources</li>
                        </ul>
                    </div>
                    <div>
                        <h6 className="font-medium text-gray-408">Services</h6>
                        <ul>
                            <li className="py-2 text-sm">Transcription</li>
                            <li className="py-2 text-sm">Translate</li>
                            <li className="py-2 text-sm">Text to Speech</li>
                            <li className="py-2 text-sm">Summarize</li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default Footer;