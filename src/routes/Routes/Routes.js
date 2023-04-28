import { createBrowserRouter } from "react-router-dom";
import Main from "../../layout/Main/Main";
import Todos from "../../pages/Todos";
import ToDoGroup from "../../pages/ToDoGroup";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            {
                path: '/',
                element: <ToDoGroup />
            }
        ]
    }
])