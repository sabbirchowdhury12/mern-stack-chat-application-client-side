import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { sendEmailRoute } from "../utils/APIRoutes";
import ResetPassword from "./ResetPassword";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Password = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showForm, setShowForm] = useState(true);
  const [email, setEmail] = useState("");

  const handlePassword = async (data) => {
    const { email } = data;
    setEmail(email);
    const { data: result } = await axios.post(sendEmailRoute, {
      email,
    });
    if (result.status === true) {
      toast.success(result.message);
      setShowForm(false);
    }
    if (result.status === false) {
      toast.error(result.message);
      setShowForm(true);
    }
  };

  return (
    <FromContainer>
      {showForm ? (
        <form onSubmit={handleSubmit(handlePassword)}>
          <div className="brand">
            {/* // <img src={logo} alt="" /> */}
            <h2>CHAT APP</h2>
          </div>
          <input
            {...register("email", {
              required: true,
            })}
            type="email"
            placeholder="Email"
            name="email"
          />
          {errors.Email && <p>email is required</p>}

          <div className="flex gap-20 justify-between">
            <Link to="/login">
              {" "}
              <button>Back</button>
            </Link>
            <span> </span>
            <button type="submit"> Send OTP</button>
          </div>
        </form>
      ) : (
        <ResetPassword email={email} />
      )}
    </FromContainer>
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
      color: #537fe7;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #181823;
    box-shadow: 0.3rem 0.3rem 1px #c0eef2;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #537fe7;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      // border: 0.1rem solid #997af0;
      border: 0.1rem solid #c0eef2;
      outline: none;
    }
  }
  button {
    // background-color: #4e0eff;
    background-color: #537fe7;
    color: #fff;
    padding: 0.8rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
  }
  span {
    color: #c0eef2;
    text-transform: uppercase;
    a {
      color: #537fe7;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

export default Password;
