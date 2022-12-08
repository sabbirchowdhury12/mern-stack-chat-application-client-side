import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Buffer } from 'buffer';
import styled from 'styled-components';
import toast from 'react-hot-toast';
import { setProfileRoute } from '../utilities/APIRoutes';

const Profile = () => {

  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSeletedProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const api = `https://api.multiavatar.com`;

  const setProfile = async () => {
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
        user.isprofileImageSet = true;
        user.profileImage = data.profile;
        localStorage.setItem('Chat-App-User', JSON.stringify(user));
      }
      else {
        toast.error('something wrong please try again');
      }

    }

  };

  useEffect(() => {
    return async () => {
      const data = [];
      for (let i = 0; i < 4; i++) {
        const image = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}`,
        );
        // console.log(image);
        const buffer = new Buffer(image.data);
        // console.log(buffer);
        data.push(buffer.toString("base64"));
      }
      setProfiles(data);
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
              select your profile
            </div>
            <div className="avatars">
              {
                profiles.map((profle, inx) => {
                  return (
                    <div key={inx}
                      className={`avatar ${selectedProfile === inx ? 'selected' : undefined}`}
                    >
                      <img
                        src={`data:image/svg+xml;base64,${profle}`}
                        alt="avatar"
                        onClick={() => setSeletedProfile(inx)}
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
    h1 {
      color: white;
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
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
`;


export default Profile;