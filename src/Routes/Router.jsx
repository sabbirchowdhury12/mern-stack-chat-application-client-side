import Chat from "../pages/Chat";
import React from "react";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
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
    }
]);