import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Buffer } from 'buffer';
import styled from 'styled-components';
import toast from 'react-hot-toast';
import { setProfileRoute } from '../utilities/APIRoutes';
import { useNavigate } from 'react-router-dom';

const Profile = () => {

    const [profiles, setProfiles] = useState([]);
    const [selectedProfile, setSeletedProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const api = `https://api.multiavatar.com`;
    const navigate = useNavigate();

    console.log(selectedProfile);
    // check user available or not
    useEffect(() => {
        if (!localStorage.getItem('Chat-App-User')) {
            navigate('/login');
        }
    });

    //set profile and user in local storage
    const setProfile = async () => {
        console.log(selectedProfile);
        if (selectedProfile === null) {
            toast.error('Please select a picture');
        } else {
            const user = await JSON.parse(localStorage.getItem('Chat-App-User'));
            console.log(user._id);
            const { data } = await axios.post(`${setProfileRoute}/${user._id}`, {
                profileImage: profiles[selectedProfile]
            });


            if (data.isSet) {
                toast.success('Profile done');
                user.isProfileImageSet = true;
                user.profileImage = data.profile;
                localStorage.setItem('Chat-App-User', JSON.stringify(user));
                navigate('/');
            }
            else {
                toast.error('something wrong please try again');
            }

        }
    };

    //load random avartar
    useEffect(() => {
        return async () => {
            const imageData = [];
            for (let i = 0; i < 2; i++) {
                const { data } = await axios.get(
                    `${api}/${Math.round(Math.random() * 1000)}`,
                );

                //make data image from svg
                // console.log(image);
                const buffer = new Buffer.from(data);
                // console.log(buffer);
                imageData.push(buffer.toString("base64"));
            }
            setProfiles(imageData);
            setIsLoading(false);
        };
    }, []);


    return (
        <div>
            {
                isLoading ? (
                    <Container>
                        <h2>loading....</h2>
                    </Container>
                ) : (

                    <Container>
                        <div className="title-container">
                            <h2>select your profile</h2>
                        </div>
                        <div className="avatars">
                            {
                                profiles.map((profle, ind) => {
                                    return (
                                        <div key={ind}
                                            className={`avatar ${selectedProfile === ind ? 'selected' : undefined}`}
                                        >
                                            <img
                                                src={`data:image/svg+xml;base64,${profle}`}
                                                alt="avatar"
                                                onClick={() => setSeletedProfile(ind)}
                                            />
                                        </div>
                                    );
                                })
                            }
                        </div>

                        <button className='submit-btn' onClick={setProfile}  >Add a Profile</button>
                    </Container>
                )
            }
        </div>
    );
};


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;
  .loader {
    max-inline-size: 100%;
  }
  .title-container {
    h2 {
      color: #E9F8F9;
      text-transform: uppercase;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;
    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #537FE7;
    }
  }
  .submit-btn {
    background-color: #537FE7;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #537FE7;
    }
  }
`;


export default Profile;