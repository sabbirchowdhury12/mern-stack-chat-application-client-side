import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { jwt, loginRoute } from '../utilities/APIRoutes';
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
            handleJWT(result.person.userName, result.person.email);
            navigate('/profile');
        }
    };


    const handleJWT = (name, email) => {

        axios.post(jwt, {
            name, email
        },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((result) => {
                localStorage.setItem('Chat-token', result.data.token);
            })
            .catch((error) => {
                console.log(error);
            });
    };


    return (
        <>
            <FromContainer>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="brand">
                        {/* <img src={logo} alt="" /> */}
                        <h2>chat app</h2>
                    </div>
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
                    <p>{error}</p>
                    <p className='forget-password'> <Link to='/password' className='forget-password'>Forget Password</Link></p>

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
    background-color: #181823;
    .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
        height: 5rem;
    }
    h2 {
        color:  #537FE7;
        text-transform: uppercase;
    }
    }
    form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #181823;
    box-shadow: 0.3rem 0.3rem 1px #C0EEF2;
    border-radius: 2rem;
    padding: 3rem 5rem;
    }
    input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #537FE7;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
        // border: 0.1rem solid #997af0;
        border: 0.1rem solid #C0EEF2;
        outline: none;
    }
    }
 
    .forget-password{
        text-align: end;
        color: #C0EEF2;
    }

    button {
    // background-color: #4e0eff;
    background-color: #537FE7;
    color: #C0EEF2;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    }
    span {
    color: #C0EEF2;
    text-transform: uppercase;
    a {
        color: #537FE7;
        text-decoration: none;
        font-weight: bold;
    }
    }
`;

export default Login;