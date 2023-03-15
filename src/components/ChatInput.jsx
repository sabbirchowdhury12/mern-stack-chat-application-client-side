import React, { useState } from 'react';
import styled from "styled-components";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from 'react-icons/io';
import Picker from "emoji-picker-react";
import { TfiGallery } from "react-icons/tfi";
import { TbThumbUpFilled } from "react-icons/tb";

const ChatInput = ({ handleSendMessage }) => {

  const [emojPicker, setEmojPicker] = useState(false);
  const [message, setMessage] = useState('');

  const handleEmojPicker = async () => {
    setEmojPicker(!emojPicker);
  };

  const handleEmojiMessage = async (emoji) => {
    console.log(message);
    let emojis = message;
    emojis += emoji.emoji;
    console.log(emojis);
    setMessage(emojis);
  };

  const handleSubmitMessage = (e) => {
    e.preventDefault();
    if (message.length > 0) {
      handleSendMessage(message);
      setMessage('');
    }
  };



  return (
    <Container>
      <div className="button-container">
        <div className="emoji">

          <BsEmojiSmileFill onClick={handleEmojPicker} />
          {
            emojPicker && <Picker onEmojiClick={handleEmojiMessage} />
          }
        </div>
      </div>
      <div className='gallery'>
        <TfiGallery size={20} />
      </div>
      <form className="input-container" onSubmit={(e) => handleSubmitMessage(e)}>
        <input
          type="text"
          placeholder="type your message here"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">
          <IoMdSend />
        </button>
      </form>
      <div className='thumb'>
        <TbThumbUpFilled size={30} />
      </div>
    </Container >
  );
};

const Container = styled.div`
display: grid;
align-items: center;
grid-template-columns: 5% 5% 85% 5%;
background-color: #080420;
padding: 0 2rem;
@media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0rem 1rem;
    gap: 1rem;
  }

  .button-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: white;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.4rem;
        color: #C0EEF2;
        cursor: pointer;
      }
      .EmojiPickerReact  {
        position: absolute;
        top: -500px;
        background-color: #080420;
        box-shadow: 0 5px 10px #9a86f3;
        border-color: #9a86f3;
        .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: #080420;
          width: 5px;
          &-thumb {
            background-color: #9a86f3;
          }
        }
        .epr-category-nav {
          button {
            filter: contrast(0);
          }
        }
        .epr-search {
          background-color: transparent;
          border-color: #9a86f3;
        }
        .emoji-group:before {
          background-color: #080420;
        }
      }
    }
  }

  .gallery{
    color: #C0EEF2;
  }
.thumb{
  color: #FFC83D;
  margin-left: 10px;
}
  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;
    input {
      width: 90%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;
      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #C0EEF2;
      border: none;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
      svg {
        font-size: 2rem;
        color: black;
      }
    }
  }
`;

export default ChatInput;

