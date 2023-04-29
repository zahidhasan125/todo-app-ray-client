import { createBrowserRouter } from "react-router-dom";
import Main from "../../layout/Main/Main";
// import Todos from "../../pages/Todos";
import ToDoGroup from "../../pages/ToDoGroup";
import Todos from "../../pages/Todos";
import ToDosByGroup from "../../pages/ToDosByGroup";

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
                element: <ToDosByGroup />,
                loader: ({params})=> fetch(`http://localhost:5000/group/${params.id}`)
            }
        ]
    }
])