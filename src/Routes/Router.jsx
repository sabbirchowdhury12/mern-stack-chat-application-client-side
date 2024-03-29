import Chat from "../pages/Chat";
import React from "react";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { createBrowserRouter } from "react-router-dom";
import Profile from "../pages/Profile";
import Password from "../pages/Password";
import ErrorPage from "../pages/ErrorPage";

export const router = createBrowserRouter([
    {
        errorElement: <ErrorPage />
    },
    {
        path: '/',
        element: <Chat />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/profile',
        element: <Profile />
    },
    {
        path: '/password',
        element: <Password />
    }
]);