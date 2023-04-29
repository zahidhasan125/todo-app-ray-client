import React from 'react';
import { useLoaderData, useSearchParams } from 'react-router-dom';
import ToDo from '../components/ToDosByGroup/ToDo';

const ToDosByGroup = () => {

    const toDosByGroup = useLoaderData();

    const [searchParams] = useSearchParams();
    const groupName = searchParams.get('groupName');

    return (
        <div className='mx-8 my-10'>
            <h3 className='text-2xl font-semibold mb-5'>{groupName}</h3>
            {
                toDosByGroup?.map(toDo => <ToDo key={toDo._id} />)          
            }

        </div>
    );
};

export default ToDosByGroup;