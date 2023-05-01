import React from 'react';
import { Link } from 'react-router-dom';

const ToDoGroupCard = ({ group }) => {

    const { _id, todoGroupName, groupDescription } = group;

    return (
        <Link to={`/group/${_id}?groupName=${todoGroupName}`}>
            <div className='bg-[#28C76F38] text-[#6A6A6A] px-4 py-3 rounded-2xl cursor-pointer active:scale-105 duration-200 flex flex-col justify-center gap-1'>
                <h5 className='text-sm font-semibold'>{todoGroupName.length > 20 ? todoGroupName.slice(0, 20)+'...' : todoGroupName}</h5>
                <p className='text-xs'>{groupDescription.length > 58 ? groupDescription.slice(0, 58)+'...' : groupDescription}</p>
                <progress className="progress progress-success w-full my-3" value="50" max="100"></progress>
                <p className='text-black font-bold text-xs'>50% Complete</p>
                <p className='text-black font-bold text-xs'>50% Processing</p>
            </div>
        </Link>
    );
};

export default ToDoGroupCard;