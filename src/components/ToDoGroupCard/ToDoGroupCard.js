import React from 'react';
import { Link } from 'react-router-dom';

const ToDoGroupCard = ({ group }) => {

    const { _id, groupName, desc } = group;

    return (
        <Link to={`/group/${_id}?groupName=${groupName}`}>
            <div className='bg-[#28C76F38] text-[#6A6A6A] px-4 py-3 rounded-2xl cursor-pointer active:scale-105 duration-200 flex flex-col justify-center gap-1'>
                <h5 className='text-sm font-semibold'>{groupName.length > 20 ? groupName.slice(0, 20)+'...' : groupName}</h5>
                <p className='text-xs'>{desc.length > 58 ? desc.slice(0, 58)+'...' : desc}</p>
                <progress className="progress progress-success w-full my-3" value="50" max="100"></progress>
                <p className='text-black font-bold text-xs'>50% Complete</p>
                <p className='text-black font-bold text-xs'>50% Processing</p>
            </div>
        </Link>
    );
};

export default ToDoGroupCard;