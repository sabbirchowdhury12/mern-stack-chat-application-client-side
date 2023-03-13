import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import styled from "styled-components";
import { getAllMsgRoute, sendMsgRoute } from '../utilities/APIRoutes';
import ChatInput from './ChatInput';
import { IoCall, IoVideocam } from "react-icons/io5";
// import { IoMdSend, IoCall, IoVideocam } from 'react-icons/io';

import { HiOutlineDotsHorizontal } from 'react-icons/hi';




const ChatSheet = ({ currentChatUser, currentUser }) => {

  const [allMessage, setAllMessage] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.post(getAllMsgRoute, {
        from: currentUser._id,
        to: currentChatUser._id,
      });

      setAllMessage(data.data);
      console.log(data.data);
    };

    fetchData()
      .catch(console.error);
  }, [currentChatUser]);


  const handleSendMessage = async (msg) => {
    const { data } = await axios.post(sendMsgRoute, {
      from: currentUser._id,
      to: currentChatUser._id,
      message: msg,
    });
    console.log(data);
  };

  return (
    <>
      {
        currentChatUser === undefined ? "hi" :
          <Container>
            <div className="chat-header">
              <div className='user-details'>
                <div className='avatar'>
                  <img src={`data:image/svg+xml;base64,${currentChatUser.profileImage}`} alt="" />
                </div>
                <div className="username">
                  <h3>{currentChatUser.userName}</h3>
                </div>
              </div>
              <div className='chat-icon '>
                <IoCall />
                <IoVideocam />
                <HiOutlineDotsHorizontal />
              </div>
            </div>
            <div className="chat-messages">
              {
                allMessage.map((message, ind) => {
                  return (
                    <div key={ind}>
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
            {/* <ChatInput handleSendMessage={handleSendMessage}></ChatInput> */}
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
        background-color: #9900ff20;
      }
    }
  }
`;