import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from "styled-components";
import ChatContact from '../components/ChatContact';
import ChatSheet from '../components/ChatSheet';
import { allUsersRoute } from '../utilities/APIRoutes';


const Chat = () => {

    const [currentUser, SetCurrentUser] = useState(JSON.parse(localStorage.getItem('Chat-App-User')));
    const [contacts, setContacts] = useState([]);
    const [currentChatUser, setCurrentChatUser] = useState(undefined);
    const navigate = useNavigate();


    // console.log(currentUser);
    //check user is availe or not
    useEffect(() => {
        if (!currentUser) {
            navigate('/login');
        }
    }, []);


    useEffect(() => {
        // declare the data fetching function
        const fetchData = async () => {
            if (currentUser) {
                const { data } = await axios.get(`${allUsersRoute}/${currentUser._id}`);
                setContacts(data);
            };
        };
        // call the function
        fetchData()
            // make sure to catch any error
            .catch(console.error);
    }, [currentUser]);


    return (
        <div>
            <Link to='/register'>Register</Link>
            <Link to='/login'>Login</Link>
            <Link to='/profile'>profile</Link>

            <>
                {contacts.length &&
                    <Container>
                        <div className="container">
                            <ChatContact currentUser={currentUser} setCurrentChatUser={setCurrentChatUser} contacts={contacts} />
                            {
                                currentChatUser &&
                                <ChatSheet currentChatUser={currentChatUser} currentUser={currentUser} />
                            }
                        </div>

                    </Container>
                }
            </>
        </div>
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
`;