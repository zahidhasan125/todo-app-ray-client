import { createBrowserRouter } from "react-router-dom";
import Main from "../../layout/Main/Main";
// import Todos from "../../pages/Todos";
import ToDoGroup from "../../pages/ToDoGroup";
import Todos from "../../pages/Todos";
import ToDosByGroup from "../../pages/ToDosByGroup";
import Login from "../../pages/Login";
import Register from "../../pages/Register";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            {
                path: '/',
                element: <ToDoGroup />
            },
            {
                path: '/todos',
                element: <Todos />
            },
            {
                path: `/group/:id`,
                element: <ToDosByGroup />
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