import React from "react";
import pguide from '../assets/pguide.svg'
import expertAdvice from '../assets/expertAdvice.svg'
import csupport from '../assets/csupport.svg'
import resources from '../assets/resources.svg'
import translation from '../assets/translation.jpg'
import text2speech from '../assets/text2speech.jpg'
import summary from '../assets/summary.jpg'
import transcription from '../assets/transcription.png'
import query from '../assets/query.jpg'
import subtitles from '../assets/subtitles.png'
import livetrans from '../assets/live_transcription.jpg'
import vision from '../assets/vision.jpg'


function OurServices(){
    return(
        <div className="w-full py-[5rem] px-4 bg-white mx-auto">
            <div className="max-w-[1240px] mx-auto p-4 flex justify-center mb-4">
                <h1 className="md:text-4xl  sm:text-3xl text-2xl font-bold p-3 bg-[#00df9e] rounded-3xl">Our Services</h1>
            </div>
            <div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
                <img className="w-[350px] mx-auto my-4 rounded-3xl" src={transcription}  alt="/" />
                <div className="flex flex-col justify-center">
                    <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold py-2">Transcription</h1>
                    <p className="md:text-[1rem] text-left p-0 m-0">Convert spoken words into written text effortlessly with our Transcription feature. Simply upload audio files or record live conversations, and our advanced algorithms will accurately transcribe them into text. Seamlessly transcribe lectures, interviews, meetings, and more, saving you time and effort. Edit, search, and share transcriptions easily, making collaboration and organization a breeze. Our Transcription feature supports multiple languages and dialects, ensuring inclusivity and accessibility for all users. Experience seamless communication and documentation with our reliable Transcription feature, empowering you to capture and preserve valuable information effectively.</p>
                </div>
            </div>

            <div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
                <img className="w-[350px] mx-auto my-4 rounded-3xl" src={translation}  alt="/" />
                <div className="flex flex-col justify-center md:order-first">
                    <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold py-2">Translate</h1>
                    <p className="md:text-[1rem] text-left p-0 m-0">Unlock a world of possibilities with our Translation feature. Seamlessly translate text from one language to another with just a few clicks. Break down language barriers and connect with people from around the globe effortlessly. Whether you're traveling abroad or conducting international business, our Translation feature ensures clear and effective communication every time. Experience the convenience of instant translation, making language barriers a thing of the past.</p>
                </div>
                
            </div>

            <div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
                <img className="w-[350px] mx-auto my-4 rounded-3xl" src={text2speech}  alt="/" />
                <div className="flex flex-col justify-center">
                    <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold py-2">Text to Speech</h1>
                    <p className="md:text-[1rem] text-left p-0 m-0">Transform text into lifelike speech with our Text to Speech feature. Hear your documents, articles, and emails come to life with natural-sounding voices. Customize the pitch, speed, and accent to suit your preferences and needs. Enhance accessibility by listening to text instead of reading, making content more inclusive for everyone. Whether you're on the go or multitasking, our Text to Speech feature keeps you informed and engaged. Say goodbye to monotony and hello to a whole new auditory experience with our Text to Speech feature.</p>
                </div>
            </div>

            <div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
                <img className="w-[350px] mx-auto my-4 rounded-3xl" src={summary}  alt="/" />
                <div className="flex flex-col justify-center md:order-first">
                    <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold py-2">Summarize</h1>
                    <p className="md:text-[1rem] text-left p-0 m-0">Effortlessly condense lengthy texts into concise summaries with our Summary feature. Save time and extract key points from documents, articles, and reports with ease. Get a quick overview of complex information without the need for extensive reading. Whether you're conducting research or preparing presentations, our Summary feature streamlines the process and enhances productivity. Say goodbye to information overload and hello to clarity and efficiency with our intuitive Summary feature. Make informed decisions faster and stay ahead of the curve with our powerful summarization tool.</p>
                </div>
            </div>

            <div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
                <img className="w-[350px] mx-auto my-4 rounded-3xl" src={livetrans}  alt="/" />
                <div className="flex flex-col justify-center">
                    <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold py-2">Live Transcription</h1>
                    <p className="md:text-[1rem] text-left p-0 m-0">Experience real-time transcription of audio and video content, making meetings and lectures more accessible and efficient. Capture every word accurately, allowing for easy reference and review later on. Increase engagement and comprehension among participants by providing live transcripts during presentations and events. Say goodbye to note-taking and hello to seamless transcription with our Live Transcription feature. Stay organized and focused, knowing that every detail is being captured in real-time.</p>
                </div>
            </div>

            <div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
                <img className="w-[350px] mx-auto my-4 rounded-3xl" src={query}  alt="/" />
                <div className="flex flex-col justify-center md:order-first">
                    <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold py-2">Query</h1>
                    <p className="md:text-[1rem] text-left p-0 m-0">Get instant answers to your questions with our Query feature. Simply type in your query, and let our intelligent system provide you with accurate and relevant information. Whether you're looking for quick facts, definitions, or explanations, our Query feature has got you covered. Say goodbye to endless searching and hello to instant answers at your fingertips. Save time and effort by harnessing the power of our Query feature to find what you need, when you need it.</p>
                </div>
            </div>

            <div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
                <img className="w-[350px] mx-auto my-4 rounded-3xl" src={subtitles}  alt="/" />
                <div className="flex flex-col justify-center">
                    <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold py-2">Subtitles</h1>
                    <p className="md:text-[1rem] text-left p-0 m-0">Enhance accessibility and comprehension with our Subtitles feature. Enjoy videos and multimedia content with clear, accurate subtitles in multiple languages. Cater to diverse audiences and ensure that everyone can fully engage with your content. Improve retention and understanding by providing visual aids alongside audio content. Say goodbye to language barriers and hello to inclusive communication with our Subtitles feature. Elevate your content and reach a wider audience with our easy-to-use Subtitles feature.</p>
                </div>
            </div>

            <div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
                <img className="w-[350px] mx-auto my-4 rounded-3xl" src={vision}  alt="/" />
                <div className="flex flex-col justify-center md:order-first">
                    <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold py-2">Optic</h1>
                    <p className="md:text-[1rem] text-left p-0 m-0">Unlock the power of visual search with our Optic feature. Simply upload an image, and let our intelligent system analyze and identify objects, landmarks, and more. Discover new insights and information by exploring related content based on your image search. Whether you're researching, shopping, or exploring the world around you, our Optic feature makes visual discovery effortless. Say goodbye to endless scrolling and hello to instant insights with our Optic feature. Explore the world through a new lens and uncover hidden connections with our powerful visual search tool.</p>
                </div>
            </div>

            
        </div>
    )
}
export default OurServices;