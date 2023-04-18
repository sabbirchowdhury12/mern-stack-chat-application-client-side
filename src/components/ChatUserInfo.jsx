import React from 'react';
import styled from "styled-components";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { BsBellSlashFill } from "react-icons/bs";
import { ImBlocked } from "react-icons/im";

const data = [
    {
        icon: <MdDriveFileRenameOutline />,
        text: 'Edit Nickname',
        button: <IoIosArrowForward />
    },
    {
        icon: <BsBellSlashFill />,
        text: 'Mute',
        button: <IoIosArrowForward />
    },
    {
        icon: "👍",
        text: 'Emoji',
        button: <IoIosArrowForward />
    },
    {
        icon: <ImBlocked />,
        text: 'Block',
        button: <IoIosArrowForward />
    },
];

const ChatUserInfo = ({ currentChatUser }) => {

    const { profileImage, userName, } = currentChatUser;

    return (
        <Container>
            <div>
                <div className="avatar">
                    <img
                        src={`data:image/svg+xml;base64,${profileImage}`}
                        alt="avatar"
                    />
                </div>
                <div className="username">
                    <h3>{userName}</h3>
                </div>
            </div>
            <hr />
            <div>
                {
                    data.map(d => {
                        return <label className='box'>
                            <span> {d.icon}</span>
                            <p>{d.text}</p>
                            {d.button}
                        </label>;
                    })
                }
            </div>
        </Container>
    );
};

export default ChatUserInfo;


const Container = styled.div`
    position: absolute;
    width: 250px;
    right: 0;
    background: rgba(18, 112, 18, 0.867);
    top: 80px;
    background: white;
    padding: 1rem;
    text-align: center;
    .avatar {
        img {
          height: 3rem;
          border: 0.4rem solid #537FE7;
          border-radius: 50%
        }
      }
      .username {
        h3 {
          color: black;
          margin-top: 5px;
          margin-bottom: 10px;
        }
      }
      .box{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 1rem;

        p{
            color: black
        }
      }

`;