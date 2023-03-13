import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { resetEmailRoute, resetPasswordRoute } from '../utilities/APIRoutes';

const ResetPassword = ({ email }) => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [error, setError] = useState('');
    const navigate = useNavigate();


    const handlePassword = async (data) => {
        const { otp, password, confirmPassword } = data;
        console.log(otp, password, email);

        if (password !== confirmPassword) {
            setError('password and confirm password must be same');
            return;
        }
        const { data: result } = await axios.post(resetPasswordRoute, {
            email, password, otp
        });
        if (result.status === true) {
            toast.success(result.message);
            navigate('/login');
        }

        if (result.status === false) {
            toast.error(result.message);
        }
    };
    return (

        <form onSubmit={handleSubmit(handlePassword)}>
            <div className="brand">
                {/* // <img src={logo} alt="" /> */}
                <h2>CHAT APP</h2>
            </div>
            <input
                {
                ...register('otp', {
                    required: true
                })
                }
                type="otp" placeholder='OTP' name='otp' />
            {errors.otp && <p>OTP is required</p>}
            <input
                {
                ...register('password', {
                    required: true
                })
                }
                type="password" placeholder='Password' name='password' />
            {errors.email && <p>email is required</p>}
            <input
                {
                ...register('confirmPassword', {
                    required: true
                })
                }
                type="password" placeholder='Confirm Password' name='confirmPassword' />
            {errors.confirmPassword && <p>Confirm Password is required</p>}
            <p>{error}</p>

            <button type='submit'> Change Password</button>
        </form>


    );
};

export default ResetPassword;

// const FromContainer = styled.div`
//     height: 100vh;
//     width: 100vw;
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     gap: 1rem;
//     align-items: center;
//     // background-color: #131324;
//     .brand {
//     display: flex;
//     align-items: center;
//     gap: 1rem;
//     justify-content: center;
//     img {
//         height: 5rem;
//     }
//     h2 {
//         color: white;
//         text-transform: uppercase;
//     }
//     }
//     form {
//     display: flex;
//     flex-direction: column;
//     gap: 2rem;
//     background-color: black;
//     border-radius: 2rem;
//     padding: 3rem 5rem;
//     }
//     input {
//     background-color: transparent;
//     padding: 1rem;
//     border: 0.1rem solid #4e0eff;
//     border-radius: 0.4rem;
//     color: white;
//     width: 100%;
//     font-size: 1rem;
//     &:focus {
//         border: 0.1rem solid #997af0;
//         outline: none;
//     }
//     }
//     button {
//     background-color: #4e0eff;
//     color: white;
//     padding: 1rem 2rem;
//     border: none;
//     font-weight: bold;
//     cursor: pointer;
//     border-radius: 0.4rem;
//     font-size: 1rem;
//     text-transform: uppercase;
//     }
//     span {
//     color: white;
//     text-transform: uppercase;
//     a {
//         color: #4e0eff;
//         text-decoration: none;
//         font-weight: bold;
//     }
//     }
// `;