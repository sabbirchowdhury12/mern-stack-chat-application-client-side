import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { loginRoute } from "../utils/APIRoutes";
import Loading from "../components/loader";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  //get user from local storage
  useEffect(() => {
    if (localStorage.getItem("Chat-App-User")) {
      navigate("/");
    }
  }, []);

  //handle login
  const handleLogin = async (data) => {
    setLoading(true);
    const { userName, password } = data;
    const { data: result } = await axios.post(loginRoute, {
      userName,
      password,
    });
    if (result.status === false) {
      setLoading(false);
      setError(result.message);
    }
    if (result.status === true) {
      setLoading(false);
      setError("");
      toast.success("login seccuss");
      localStorage.setItem("Chat-App-User", JSON.stringify(result.person));
      navigate("/profile");
    }
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
            {...register("userName", {
              required: true,
            })}
            type="text"
            placeholder="Username"
            name="userName"
          />
          {errors.userName && <p>User name is required</p>}
          <input
            {...register("password", {
              required: true,
            })}
            type="password"
            placeholder="Password"
            name="password"
          />
          {errors.password && <p>User name is required</p>}
          <p>{error}</p>
          <p className="forget-password">
            {" "}
            <Link to="/password" className="forget-password">
              Forget Password
            </Link>
          </p>

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
          {/* <button type="submit"> Login</button> */}
          <span>
            Don't have any account? Please <Link to="/register">Register.</Link>
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

  .forget-password {
    text-align: end;
    color: #c0eef2;
  }

  button {
    // background-color: #4e0eff;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    background-color: #537fe7;
    color: #c0eef2;
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

export default Login;
