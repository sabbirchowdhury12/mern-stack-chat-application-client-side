import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import styled from "styled-components";
import { getAllMsgRoute, sendMsgRoute } from '../utilities/APIRoutes';
import ChatInput from './ChatInput';
import { IoCall, IoVideocam } from "react-icons/io5";
// import { IoMdSend, IoCall, IoVideocam } from 'react-icons/io';
import { v4 as uuidv4 } from "uuid";
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import ChatUserInfo from './ChatUserInfo';




const ChatSheet = ({ currentChatUser, currentUser, socket }) => {

  const [allMessage, setAllMessage] = useState([]);
  const [arrivalMessage, setArraivalMessage] = useState(null);
  const scrollRef = useRef();
  const [hidden, setHidden] = useState(false);


  useEffect(() => {

    const fetchData = async () => {

      const data = await JSON.parse(
        localStorage.getItem('Chat-App-User')
      );

      const response = await axios.post(getAllMsgRoute, {
        from: data._id,
        to: currentChatUser._id,
      });
      setAllMessage(response.data);

    };

    fetchData()
      .catch(console.error);
  }, [currentChatUser]);


  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentChatUser) {
        await JSON.parse(
          localStorage.getItem('Chat-App-User')
        )._id;
      }
    };
    getCurrentChat();
  }, [currentChatUser]);

  const handleSendMessage = async (msg) => {

    const data = await JSON.parse(
      localStorage.getItem('Chat-App-User')
    );

    socket.current.emit("send-msg", {
      to: currentChatUser._id,
      from: data._id,
      message: msg,
    });

    await axios.post(sendMsgRoute, {
      from: currentUser._id,
      to: currentChatUser._id,
      message: msg,
    });

    const messages = [...allMessage];
    messages.push({ mySelf: true, message: msg });
    setAllMessage(messages);
  };


  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recived", (msg) => {
        setArraivalMessage({ mySelf: false, message: msg });
      });
    }
  }, []);


  useEffect(() => {
    arrivalMessage && setAllMessage((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  // useEffect(() => {
  //   scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  // }, [allMessage]);

  return (
    <>
      {
        currentChatUser === undefined ? 'hi' :
          <Container>
            <div className="chat-header">
              <div className='user-details'>
                <div className='avatar'>
                  <img src={currentChatUser.profileImage} alt="" />
                </div>
                <div className="username">
                  <h3>{currentChatUser.userName}</h3>
                </div>
              </div>

              <div className='chat-icon'>
                <IoCall />
                <IoVideocam />
                <label onClick={() => setHidden(!hidden)}>
                  <HiOutlineDotsHorizontal />
                </label>
              </div>

            </div>
            <div className="chat-messages">
              {
                allMessage.map((message) => {
                  return (
                    <div ref={scrollRef} key={uuidv4()}>
                      <div
                        className={`message ${message.mySelf ? "sended" : "recieved"
                          }`}
                      >
                        <div className="content ">
                          <p>{message.message}</p>
                        </div>
                      </div>
                    </div>
                  );
                })
              }
            </div>
            {hidden &&
              <ChatUserInfo currentChatUser={currentChatUser} />
            }
            <ChatInput handleSendMessage={handleSendMessage}></ChatInput>
          </Container>
      }
    </>
  );
};

export default ChatSheet;

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  position: relative;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
    .chat-icon{
      display: flex;
      gap: 1rem;
      font-size: 1.6rem;
      color: white; 
    }

    .box{
      margin: 0;
      width: 200px;
      z-index: 100;
      margin-top: 10px;
      background: rgba(18, 112, 18, 0.867);
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    color: white;
    font-size: 1.6rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
        p{
          color: #ffffff
        }
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #4f04ff21;
      }
    }
  }
`;