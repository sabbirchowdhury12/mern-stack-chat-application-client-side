import React, { useState } from "react";
import styled from "styled-components";
import { IoSettingsSharp } from "react-icons/io5";
import CurrentUserInfo from "./CurrentUserInfo";

const ChatContact = ({ contacts, setCurrentChatUser, currentUser }) => {
  // const [currentUserName, setCurrentUserName] = useState(undefined);
  // const [currentUserProfile, setCurrentUserProfile] = useState('');
  const [selectedUser, setSelectedUser] = useState(undefined);
  const [hidden, setHidden] = useState(false);
  const [searchContact, setSearchContanct] = useState("");

  const changeUserId = (ind, contact) => {
    setSelectedUser(ind);
    setCurrentChatUser(contact);
  };

  // Filter contacts based on search input
  const filteredContacts = contacts.filter((contact) =>
    contact.userName.toLowerCase().includes(searchContact.toLowerCase())
  );

  return (
    <>
      {currentUser && (
        <Container>
          <div className="profile">
            <div className="header">
              <h2>CHAT APP</h2>
              <label onClick={() => setHidden(!hidden)}>
                <IoSettingsSharp className="icon" color="white" size={20} />
              </label>
            </div>
            <div className="brand">
              <div className="current-user">
                <div className="avatar">
                  <img src={currentUser.profileImage} alt="avatar" />
                </div>
              </div>
              <div className="username">
                <h3>{currentUser.userName}</h3>
              </div>
            </div>
            <form className="input-container">
              <input
                type="text"
                onChange={(e) => setSearchContanct(e.target.value)}
                placeholder="search"
              />
            </form>
          </div>
          <div className="contacts">
            {filteredContacts.map((contact, ind) => {
              return (
                <div
                  className={`contact ${
                    ind === selectedUser ? "selected" : undefined
                  }`}
                  key={contact._id}
                  onClick={() => changeUserId(ind, contact)}
                >
                  <div className="avatar">
                    <img src={contact.profileImage} alt="" />
                  </div>
                  <div className="username">
                    <h3>{contact.userName}</h3>
                  </div>
                  {hidden && <CurrentUserInfo currentUser={currentUser} />}
                </div>
              );
            })}
          </div>
        </Container>
      )}
    </>
  );
};

export default ChatContact;

const Container = styled.div`
  display: grid;
  grid-template-rows: 25% 75%;
  overflow: hidden;
  padding-bottom: 30px;
  gap: 2rem;
  background-color: #181823;
  position: relative;
  .profile {
    padding: 0.4rem;
    //  background-color: ;;
    padding: 0px;
  }
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    gap: 20px;

    h2 {
      color: white;
    }
  }
  p {
    text-align: center;
    padding: 1rem;
    color: white;
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
          width: 3rem;
          border-radius: 50%;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
    .selected {
      background-color: #537fe7;
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
        width: 4rem;
        border-radius: 50%;
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
