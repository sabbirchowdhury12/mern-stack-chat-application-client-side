import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ChatContact from "../components/ChatContact";
import ChatSheet from "../components/ChatSheet";
import { allUsersRoute } from "../utils/APIRoutes";
import { io } from "socket.io-client";
import img from "../assets/hi.gif";
import loader from "../assets/loading.gif";

const Chat = () => {
  const socket = useRef();
  // eslint-disable-next-line
  const [currentUser, SetCurrentUser] = useState(
    JSON.parse(localStorage.getItem("Chat-App-User"))
  );
  const [contacts, setContacts] = useState([]);
  const [currentChatUser, setCurrentChatUser] = useState(undefined);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // console.log(currentUser);
  //check user is availe or not
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io("https://chat-application-server-g5d5.onrender.com");
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      if (currentUser && currentUser.isProfileImageSet) {
        const { data } = await axios.get(
          `${allUsersRoute}/${currentUser._id}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("Chat-token")}`,
              email: currentUser.email,
            },
          }
        );

        setContacts(data);
        setLoading(false);
      } else {
        navigate("/profile");
      }
    };
    // call the function
    fetchData().catch(console.error);
  }, [currentUser, loading]);

  return (
    <>
      {loading ? (
        <Container>
          <img src={loader} alt="" srcSet="" />
          <h1 className={"loading"}>loading....</h1>
        </Container>
      ) : (
        <Container>
          <div className="container">
            <ChatContact
              currentUser={currentUser}
              setCurrentChatUser={setCurrentChatUser}
              contacts={contacts}
            />
            {currentChatUser ? (
              <ChatSheet
                currentChatUser={currentChatUser}
                currentUser={currentUser}
                socket={socket}
              />
            ) : (
              <div className="chat-image">
                {" "}
                <p>select one for chat</p>
                <img src={img} height={300} alt="" />
              </div>
            )}
          </div>
        </Container>
      )}
    </>
  );
};

export default Chat;

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }

  .chat-image {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    flex-direction: column;

    p {
      color: #fff;
      margin-bottom: 20px;
    }
  }

  .loading {
    color: white;
  }
`;
