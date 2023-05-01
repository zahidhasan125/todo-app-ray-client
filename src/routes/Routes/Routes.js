import { createBrowserRouter } from "react-router-dom";
import Main from "../../layout/Main/Main";
import ToDoGroup from "../../pages/ToDoGroup";
import Todos from "../../pages/Todos";
import ToDosByGroup from "../../pages/ToDosByGroup";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import PrivateRoutes from "./PrivateRoutes/PrivateRoutes";
import Completed from "../../pages/Completed";
import Processing from "../../pages/Processing";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            {
                path: '/',
                element: <PrivateRoutes><ToDoGroup /></PrivateRoutes>
            },
            {
                path: '/todos',
                element: <PrivateRoutes><Todos /></PrivateRoutes>
            },
            {
                path: '/completed',
                element: <PrivateRoutes><Completed /></PrivateRoutes>
            },
            {
                path: '/processing',
                element: <PrivateRoutes><Processing /></PrivateRoutes>
            },
            {
                path: `/group/:id`,
                element: <PrivateRoutes><ToDosByGroup /></PrivateRoutes>
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            }
        ]
    }
])