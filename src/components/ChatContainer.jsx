import React, { useEffect, useRef, useState } from "react";
import send_icon from "../pics/send.svg";
import loader from "../pics/loader.svg";
import "./Scrollbar.css";
import { Loader } from 'lucide-react';
import { API } from '../ApiClient';
import axios from "axios";
import { scroller } from 'react-scroll';


const ChatMessage = ({ user, message }) => {
    return (
        <div className={`mb-2 flex items-end text-start ${user === 'user' ? 'justify-end' : ''}`}>
            <div className={`p-2 rounded  w-fit max-w-md ${user === 'user' ? 'bg-blue-500 text-white rounded-br-none' : 'bg-gray-300 rounded-bl-none'} ${user==='loader'?'hidden':''}`}>
                {message}
            </div>
            <div className={`${user === 'loader'?'animate-spin':'hidden'}`}>
                <Loader />
            </div>
        </div>
        
    );
};

function ChatContainer(props) {

    let data = [['what is "fight or flight" this is vishnu vardhan gowd vaka talking to you very obidiently ?', '"Fight or flight" is a physiological response triggered by the body when it perceives a threat or danger. It is an instinctual reaction that prepares the body to either confront the threat (fight) or flee from it (flight). During this response, various physiological changes occur, such as increased heart rate, heightened senses, and the release of stress hormones like adrenaline, all aimed at helping the individual survive the perceived threat.'], ['role of adrenaline ?', 'The role of adrenaline in the "fight or flight" response is to prepare the body for immediate action in response to a perceived threat or danger. When adrenaline is released, it triggers a series of physiological changes in the body, such as increased heart rate, elevated blood pressure, and heightened alertness. These changes help to mobilize the body\'s resources and prepare it to either confront the threat or flee from it.']]
    const user_folder=localStorage.getItem('user_folder')
    const [chatHistory, setChatHistory] = useState([]);
    const [chatData,setChatData]=useState([]);
    var data2=[]
    const [query, setQuery] = useState('');
    const [loading,setLoading]=useState(false);
    const chatContainerRef=useRef()

    const messagesEndRef = useRef()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }
  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatHistory.length > 0) {
      const lastSentMessage = chatHistory[chatHistory.length - 1];
      scroller.scrollTo(lastSentMessage.id, {
        containerId: 'chat-container',
        duration: 500,
        smooth: true,
        offset: -50,
      });
    }
  }, [chatHistory]);

    useEffect(() => {
        makeHist()
    },[])

    const [data1, setData] = useState([
        ['qus1', 'ans1'],
        ['qus2', 'ans2'],
        // Add more data as needed
      ]);


    async function getAnswer() {
        const URL = API + "getAnswer/";
        const form = new FormData();
        form.append('query', query)
        // form.append('chat_history', chatData)
        form.append('user_folder', user_folder)
        form.append('pdf_id', props.file.pdf_id)
        form.append('chat_history', JSON.stringify(chatData))
        
        try {
            const response = await axios.post(URL, form);
            // const response = await axios.post(URL, {data: chatData,odd:data1,even:data2});
            if (response.status === 200) {
                let d= { user: 'bot', message: response.data.answer }
                // setChatHistory(updatedChatHistory);
                chatHistory.pop()
                chatHistory.push(d)
                setChatHistory(chatHistory)
                setLoading(false)
                setChatData((prev)=>[...prev,[query,response.data.answer]])
                localStorage.setItem('current_storage',response.data.state.remaining_storage)
            }
            const answerData = response.data;
        } catch (error) {
            console.error('Error:', error);
        }
    }

    function makeHist() {
        let rdata = props.file.chat_history.reverse()
        // let rdata = data.reverse()

        for (let i = 0; i < rdata.length; i++) {
            let d1 = { user: 'user', message: rdata[i][0] }
            let d2 = { user: 'bot', message: rdata[i][1] }
            setChatHistory((prevHist) => [...prevHist, d1])
            setChatHistory((prevHist) => [...prevHist, d2])
            setChatData((prev)=>[...prev,[rdata[i][0],rdata[i][1]]])

        }

    }

    return (
        <div>
            <div className="relative max-w-xl mx-auto mt-1 p-4 border rounded shadow">
                <div ref={messagesEndRef} id="scrollbar-chat" className="flex flex-col h-[68vh] pb-2 overflow-y-scroll scrollbar space-y-2">
                    {chatHistory.map((message, index) => (
                        <ChatMessage key={index} user={message.user} message={message.message} />
                    ))}
                </div>

                <div className="flex items-center  mt-2 sticky bottom-0 ">
                    <input
                        className="border-2 p-2 w-full pl-5"
                        type='text'
                        placeholder="Ask a question"
                        value={query}
                        onChange={(e) => { setQuery(e.target.value) }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                let d1 = { user: 'user', message: query }
                                let d2 = { user: 'loader', message: 'loading' }
                                chatHistory.push(d1)
                                chatHistory.push(d2)
                                setChatHistory(chatHistory)
                                scrollToBottom()
                                setQuery('')
                                setLoading(true)
                                getAnswer()
                            }
                        }}
                    />
                    <img src={send_icon} alt="Reload page" className="h-7 color-blue cursor-pointer px-[5px] py-0" />
                </div>

            </div>

        </div>
    );
}

export default ChatContainer;

