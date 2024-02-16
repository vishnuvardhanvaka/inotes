import React, { useState, useRef, useEffect } from 'react';
import { scroller } from 'react-scroll';
import { ReactComponent as SendIcon } from './icons/send5.svg';
import { useNavigate } from 'react-router-dom';
import chatcss from './Chat.module.css';
import { ReactComponent as MenuIcon } from './icons/menu.svg';
// import {ReactComponent as Logo} from './icons/logo.svg';




function Chat({ URL }) {

  const [loading, setloading] = useState(false)
  const navigate = useNavigate();
  const [highlight, sethighlight] = useState(false);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [rchatMessages, setRChatMessages] = useState([]);
  const [welcome, setWelcome] = useState(
    "Hi I am Mira,your compassionate companion on the journey of motherhood!🌟 We're here to illuminate your motherhood journey with support, guidance, and a listening ear. Whether you have questions about newborn care, breastfeeding, or adjusting to life as a new mom, I am here to help you. Just ask away, and let me be your guiding light through this beautiful and transformative chapter of your life. Together, we'll navigate the joys and challenges of motherhood with confidence and grace. 💖"
  );
  let alert = "In the embrace of a mother's love and the guidance of a father's care, a child finds the strength to conquer the world.";
  const [showWelcome, setShowWelcome] = useState(true);
  const chatContainerRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    const sentMessages = chatContainer.getElementsByClassName(chatcss.sent);
    if (sentMessages.length > 0) {
      const lastSentMessage = sentMessages[sentMessages.length - 1];
      scroller.scrollTo(lastSentMessage.id, {
        containerId: 'chat-container',
        duration: 500,
        smooth: true,
        offset: -50,
      });
    }
  }, [chatMessages]);
  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    const sentMessages = chatContainer.getElementsByClassName(chatcss.sent);
    if (sentMessages.length > 0) {
      const lastSentMessage = sentMessages[sentMessages.length - 1];
      scroller.scrollTo(lastSentMessage.id, {
        containerId: 'chat-container',
        duration: 500,
        smooth: true,
        offset: -50,
      });
    }
  }, [rchatMessages]);

  useEffect(() => {
    if (showWelcome) {
      setRChatMessages([welcome]);
    }
  }, [showWelcome, welcome]);

  const handleChange = (e) => {
    setMessage(e.target.value);
    if (e.target.value.trim() === '') {
      sethighlight(false);
    } else {
      sethighlight(true);
    }
  };

  async function handleResponse(query) {
    const form = new FormData();
    form.append('query', query)
    const fetchReq = {
      method: 'POST',
      headers: {
        'Constent-Type': 'application/json',
        'Authorization': `${'Bearer'} ${localStorage.getItem('access_token')}`,
      },
      body: form
    }
    const response = await fetch(URL + 'chat/', fetchReq)
    const status_code = response.status
    const data = await response.json()
    if (status_code===401){
      if(data.detail=="Signature has expired."){
        logout()
      }
    }
    if (status_code === 200) {
      if (data['products'] === true) {
        if (data['products'].length !== 0) {
          const mess = {
            products: data['response'],
            type: 'product_rec'
          }
          setRChatMessages([...rchatMessages, mess]);
        }
        else {
          const mess = {
            msg: "Sorry, I didn't understand for what product you are searching for !",
            type: 'text'
          }
          setRChatMessages([...rchatMessages, mess]);
        }
      }
      else if (data['products'] === false) {
        const mess = {
          msg: data['response'],
          type: 'text'
        }
        setRChatMessages([...rchatMessages, mess]);
      }
      setloading(false);
    }
    else {
      setRChatMessages([...rchatMessages, 'Server is Down']);
      setloading(false);
    }
  }



  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() !== '') {
      setloading(true)
      setShowWelcome(false);
      setChatMessages([...chatMessages, message]);
      handleResponse(message);
      setMessage('');
      sethighlight(false);
    }
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
  };


  function logout(e) {

    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('age');
    localStorage.removeItem('email');
    localStorage.removeItem('username');
    localStorage.removeItem('access_token');

    navigate('/signin');
  }
  function handlemenu() {
    setIsOpen(!isOpen)
  }


  return (
    <div className={chatcss.chatshell}>
      <div className={`${chatcss.overlay} ${isOpen ? chatcss.overcollapse : ''}`} onClick={isOpen ? handlemenu : null}></div>

      <header className={chatcss.chatheader}>
        <div>
          <div>
            <div className={`${chatcss.sidebar4} ${isOpen ? chatcss.collapse : ''}`}>
              <ul>

                <li><div className={chatcss.noSelect} onClick={logout}>Logout</div></li>
              </ul>
            </div>
          </div>

          <div className={chatcss.menuButton} onClick={handlemenu}>
            <MenuIcon />
          </div>
        </div>

        <div className={chatcss.logo}>
          <img src="./images/logo.png" alt="Logo" draggable='false' onContextMenu={handleContextMenu} />

        </div>
        <div className={chatcss.userprofile}>
          {'Hi ' + localStorage.getItem('username') + ' !'}
        </div>
      </header>

      <main className={chatcss.chatmain}>
        <div className={chatcss.chatcontainer}>
          <div className={chatcss.chatmessages} ref={chatContainerRef} id="chat-container">
            {showWelcome ? (
              <div className={chatcss.borderreceive}>
                <div className={chatcss.received1}>{rchatMessages[0]}</div>
              </div>
            ) : (
              chatMessages.map((msg, index) => (
                <div key={index}>
                  <div className={chatcss.bordersend}>
                    <div style={{ whiteSpace: 'pre-line' }} id={`sent-message-${index}`} className={chatcss.sent}>{msg}</div>
                  </div>
                  <div className={chatcss.borderreceive}>
                    {index === chatMessages.length - 1 && loading ? (
                      <div className={chatcss.loading}>
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    ) : (rchatMessages[index + 1].type == "product_rec" ? (
                      <div style={{ whiteSpace: 'pre-line' }} className={chatcss.received}>
                        <h4>Here are some of the products you can take a look into: </h4>
                        {
                          rchatMessages[index + 1].products.map(item =>
                            <a href={item.url} target="_blank" rel="noreferrer"><div style={{ whiteSpace: 'pre-line' }} className={chatcss.prod_rec} >

                              <img src={item.image_url} alt={item.title} style={{ maxWidth: '100px', maxHeight: '100px', }} /><br />
                              Title: {item.title}<br></br><br></br>
                              Price: {item.price}<br></br>
                              Rating: {item.rating}<br></br>
                              Reviews: {item.reviews}<br></br>
                            </div></a>

                          )
                        }
                      </div>
                    ) : (
                      <div style={{ whiteSpace: 'pre-line' }} className={chatcss.received}>{rchatMessages[index + 1].msg}</div>
                    )

                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className={chatcss.chatinput}>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={message}
                onChange={handleChange}
                placeholder="Send a message"

              />
              <button className={chatcss.noSelect} type="submit" disabled={loading}>
                <SendIcon className={highlight && !loading ? chatcss.sendicon1 : chatcss.sendicon2} />
              </button>
            </form>
            <p>{alert}</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Chat;

