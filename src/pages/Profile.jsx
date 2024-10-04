import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import toast from "react-hot-toast";
import { setProfileRoute } from "../utils/APIRoutes";
import { useNavigate } from "react-router-dom";
import loader from "../assets/loader.gif"; // Make sure this path is correct
import Loading from "../components/loader";

const Profile = () => {
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  // const [avartarLoading, setAvartarLoading] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // check user availability
  useEffect(() => {
    if (!localStorage.getItem("Chat-App-User")) {
      navigate("/login");
    }
  }, []);

  // check if the user already has a profile image
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("Chat-App-User"));
    if (data && data.isProfileImageSet) {
      navigate("/");
    }
  }, []);

  const setProfile = async () => {
    if (selectedProfile === null) {
      toast.error("Please select a avatar");
    } else {
      setLoading(true);
      const user = await JSON.parse(localStorage.getItem("Chat-App-User"));

      try {
        const { data } = await axios.post(`${setProfileRoute}/${user._id}`, {
          profileImage: profiles[selectedProfile],
        });

        if (data.isSet) {
          toast.success("Profile updated successfully");
          user.isProfileImageSet = true;
          user.profileImage = data.profile;
          localStorage.setItem("Chat-App-User", JSON.stringify(user));
          navigate("/");
        } else {
          toast.error("Something went wrong, please try again");
        }
      } catch (error) {
        toast.error("Error while setting profile image");
      } finally {
        setLoading(false);
      }
    }
  };

  // Generate random avatars
  useEffect(() => {
    setIsLoading(true);
    const fetchAvatars = async () => {
      const avatarImages = [];
      for (let i = 0; i < 4; i++) {
        const avatarUrl = `https://api.multiavatar.com/${Math.round(
          Math.random() * 10000
        )}.png`;
        avatarImages.push(avatarUrl);
      }
      setProfiles(avatarImages);
      setIsLoading(false);
    };
    fetchAvatars();
  }, []);

  return (
    <Container>
      {isLoading ? (
        <img src={loader} alt="Loading avatars..." />
      ) : (
        <>
          <div className="title-container">
            <h2>Select Your Profile</h2>
          </div>
          <div className="avatars">
            {profiles.map((profile, ind) => (
              <div
                key={ind}
                className={`avatar ${
                  selectedProfile === ind ? "selected" : ""
                }`}
              >
                <img
                  src={profile}
                  alt="avatar"
                  onClick={() => setSelectedProfile(ind)}
                />
              </div>
            ))}
          </div>
        </>
      )}

      <button disabled={loading} className="submit-btn" onClick={setProfile}>
        {loading ? (
          <>
            {" Adding... "}
            <Loading />
          </>
        ) : (
          "Add Profile"
        )}
      </button>
    </Container>
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
      color: #e9f8f9;
      text-transform: uppercase;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;
    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        width: 6rem;
        border-radius: 50%;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #537fe7;
    }
  }
  .submit-btn {
    background-color: #537fe7;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #537fe7;
    }
  }
  h1 {
    color: white;
  }
`;

export default Profile;
