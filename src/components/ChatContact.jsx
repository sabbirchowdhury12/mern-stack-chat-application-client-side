import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { IoMdSend } from 'react-icons/io';



const ChatContact = ({ contacts, setCurrentChatUser, currentUser }) => {

  // const [currentUserName, setCurrentUserName] = useState(undefined);
  // const [currentUserProfile, setCurrentUserProfile] = useState('');
  const [selectedUser, setSelectedUser] = useState(undefined);


  console.log(currentUser);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await JSON.parse(
  //       localStorage.getItem('Chat-App-User')
  //     );
  //     setCurrentUserName(data.userName);
  //     setCurrentUserProfile(data.profileImage);

  //   };
  //   // call the function
  //   fetchData()
  //     // make sure to catch any error
  //     .catch(console.error);

  // }, []);


  const changeUserId = (ind, contact) => {
    setSelectedUser(ind);
    setCurrentChatUser(contact);
  };
  // const changeCurrentChat = (index, contact) => {
  //   setCurrentSelected(index);
  //   changeChat(contact);
  // };

  return (
    <>
      {
        currentUser &&
        <Container>
          <div className='profile'>
            <p>CHAT APP</p>
            <div className="brand">
              <div className="current-user">
                <div className="avatar">
                  <img
                    src={`data:image/svg+xml;base64,${currentUser.profileImage}`}
                    alt="avatar"
                  />
                </div>

              </div>
              <div className="username flex justify-between">
                <h3>{currentUser.userName}</h3>
              </div>
            </div>
            <form className="input-container">
              <input
                type="text"
                placeholder="search"
              />

            </form>
          </div>
          <div className="contacts">
            {
              contacts.map((contact, ind) => {
                return (
                  <div className={`contact ${ind === selectedUser ? "selected" : undefined}`}
                    key={contact._id}
                    onClick={() => changeUserId(ind, contact)}
                  >
                    <div className='avatar'>
                      <img src={`data:image/svg+xml;base64,${contact.profileImage}`} alt="" />
                    </div>
                    <div className='username'>
                      <h3>{contact.userName}</h3>
                    </div>
                  </div>
                );
              })
            }
          </div>
        </Container>
      }
    </>
  );
};

export default ChatContact;

const Container = styled.div`
  display: grid;
  grid-template-rows: 25% 75% ;
  overflow: hidden;
  gap: 2rem;
  background-color: #181823;
  .profile{
    padding: 0.4rem;
    //  background-color: ;;
    padding: 0px;
  }
  p{
    text-align: center;
    padding: 1rem;
    color: white
  }
  .input-container {
    margin: 1rem 0;
    width: 100%;
    border-radius: 1rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;
    input {
      width: 90%;
      background-color: transparent;
      color: white;
      padding: 0.7rem;
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
  }
   
      
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 1rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }

    
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff34;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
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
    .selected {
      background-color: #537FE7;
    }
  }
  .current-user {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      dispaly: flex;
    
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;