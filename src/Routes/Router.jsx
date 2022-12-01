import { createBrowserRouter, } from "react-router-dom";
import Chat from "../pages/Chat";
import Login from "../pages/Login";
import Register from "../pages/Register";
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