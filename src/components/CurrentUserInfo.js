import React from 'react';
import styled from "styled-components";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { RxAvatar } from "react-icons/rx";
import { ImBlocked } from "react-icons/im";
import { CgLogOff } from "react-icons/cg";
import { Link, useNavigate } from 'react-router-dom';


const data = [
    {
        icon: <MdDriveFileRenameOutline />,
        text: 'Edit Profile',
        button: <IoIosArrowForward />
    },
    {
        icon: <RxAvatar />,
        text: 'Set New Avarter',
        button: <IoIosArrowForward />
    },
    // {
    //     icon: "👍",
    //     text: 'Emoji',
    //     button: <IoIosArrowForward />
    // },
    {
        icon: <ImBlocked />,
        text: 'Block List',
        button: <IoIosArrowForward />
    },
];


const CurrentUserInfo = () => {

    const navigate = useNavigate();
    const handleLogout = async () => {
        // const id = await JSON.parse(
        //     localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        // )._id;
        localStorage.clear();
        navigate("/login");
        // const data = await axios.get(`${logoutRoute}/${id}`);
        // if (data.status === 200) {
        //     localStorage.clear();
        //     navigate("/login");
        // }
    };

    return (
        <Container>

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

            <div className='logout' >
                <CgLogOff />
                <label onClick={handleLogout}> Logout</label>
            </div>
        </Container>
    );
};


const Container = styled.div`
    position: absolute;
    width: 250px;
    right: 0;
    background: rgba(18, 112, 18, 0.867);
    top: 50px;
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

      .logout{
        display: flex;
        align-items: center;
        gap: 10px;
        margin-top: 14px;
        justify-content: center;
        font-weight: bold;
        font-size: 20px;
        color: #537FE7
    }

`;

export default CurrentUserInfo;