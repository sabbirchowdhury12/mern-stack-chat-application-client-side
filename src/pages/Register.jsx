import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { registerRoute } from "../utils/APIRoutes";
import toast from "react-hot-toast";
import axios from "axios";
import Loading from "../components/loader";

const Register = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //register
  const handleRegister = async (data) => {
    setLoading(true);
    const { userName, email, password, confirmPassword } = data;
    //handle password and confirm password
    if (password !== confirmPassword) {
      setError("Password and Confirm Password must be same");
      return;
    }
    setError("");
    //send user information to database
    const { data: result } = await axios.post(registerRoute, {
      userName,
      email,
      password,
    });

    if (result.status === false) {
      setLoading(false);
      setError(result.message);
    }
    if (result.status === true) {
      setLoading(false);
      setError("");
      toast.success("register success");
      localStorage.setItem("Chat-App-User", JSON.stringify(result.user));
      navigate("/");
    }
  };

  return (
    <>
      <FromContainer>
        <form onSubmit={handleSubmit(handleRegister)}>
          <div className="brand">
            {/* <img src={logo} alt="" /> */}
            <h2>Chat app</h2>
          </div>
          <input
            {...register("userName", { required: true })}
            type="text"
            placeholder="Username"
            name="userName"
          />
          {errors.userName && <p>User Name is required</p>}

          <input
            {...register("email", { required: true })}
            type="email"
            placeholder="Email"
            name="email"
          />
          {errors.email && <p>Email is required</p>}

          <input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be 6 characters long",
              },
              // pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'Password must have uppercase, number and special characters' }
            })}
            type="password"
            placeholder="Password"
            name="password"
          />
          {errors.password && <p>{errors.password.message}</p>}

          <input
            {...register("confirmPassword", { required: true })}
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
          />
          {errors.confirmPassword && <p>Confirm Password is Required</p>}
          <p>{error}</p>

          <button disabled={loading} className="w-full">
            {loading ? (
              <>
                {"Login"}
                <p>
                  <Loading />
                </p>
              </>
            ) : (
              "Login"
            )}
          </button>
          <span>
            Already have an account? Please <Link to="/login">Login</Link>
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
      border: 0.1rem solid #c0eef2;
      outline: none;
    }
  }
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    background-color: #537fe7;
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
    color: #c0eef2;
    text-transform: uppercase;
    a {
      color: #537fe7;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

export default Register;
