import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/logo.svg';
import axios from 'axios';
import { loginRoute } from '../utilities/APIRoutes';
import toast from 'react-hot-toast';

const Login = () => {

    const [values, setValues] = useState({
        userName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const navigate = useNavigate();


    //handle submit---------
    const handleSubmit = async (event) => {
        event.preventDefault();
        const { userName, email, password } = values;
        console.log(values);

        const { data } = await axios.post(loginRoute, {
            userName,
            email,
            password
        });


        if (data.status === false) {
            toast.error(data.message);
        }
        if (data.status === true) {
            console.log(data);
            toast.success('suucees');
            // localStorage.setItem('Chat-App', JSON.stringify(data.user));
            // navigate('/');
        }



    };


    //handle user data/value--------------
    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };




    return (
        <>
            <FromContainer>
                <form onSubmit={(event) => handleSubmit(event)}>
                    <div className="brand">
                        <img src={logo} alt="" />
                        <h2>brand</h2>
                    </div>
                    <input type="text" placeholder='Username' name='userName' onChange={(e) => handleChange(e)} />
                    <input type="password" placeholder='Password' name='password' onChange={(e) => handleChange(e)} />
                    <button type='submit'> Login</button>
                    <span>
                        Don't have any account? Please <Link to='/register'>Register.</Link>
                    </span>
                </form>
            </FromContainer>
        </>
    );
};

const FromContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: #131324;
    .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
        height: 5rem;
    }
    h2 {
        color: white;
        text-transform: uppercase;
    }
    }
    form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
    }
    input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
        border: 0.1rem solid #997af0;
        outline: none;
    }
    }
    button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    }
    span {
    color: white;
    text-transform: uppercase;
    a {
        color: #4e0eff;
        text-decoration: none;
        font-weight: bold;
    }
    }
`;

export default Login;