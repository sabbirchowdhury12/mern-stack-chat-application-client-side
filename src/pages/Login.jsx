import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/logo.svg';
import axios from 'axios';
import { loginRoute } from '../utilities/APIRoutes';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [error, setError] = useState('');
    const navigate = useNavigate();

    //get local storage item
    useEffect(() => {
        if (localStorage.getItem('Chat-App-User')) {
            navigate('/');
        }
    }, []);


    const handleLogin = async (data) => {
        const { userName, password } = data;


        const { data: result } = await axios.post(loginRoute, {
            userName, password
        });

        if (result.status === false) {
            setError(result.message);
        }
        if (result.status === true) {
            setError('');
            toast.success('login seccuss');
            localStorage.setItem('Chat-App-User', JSON.stringify(result.person));
            navigate('/profile');
        }
    };


    return (
        <>
            <FromContainer>
                <form onSubmit={handleSubmit(handleLogin)}>
                    {/* <div className="brand">
                        <img src={logo} alt="" />
                        <h2>brand</h2>
                    </div> */}
                    <input
                        {
                        ...register('userName', {
                            required: true
                        })
                        }
                        type="text" placeholder='Username' name='userName' />
                    {errors.userName && <p>User name is required</p>}
                    <input
                        {
                        ...register('password', {
                            required: true
                        })
                        }
                        type="password" placeholder='Password' name='password' />
                    {errors.password && <p>User name is required</p>}
                    <p> <Link to='/password'>Forget Password</Link></p>
                    <p>{error}</p>
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
    // background-color: #131324;
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
    background-color: black;
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