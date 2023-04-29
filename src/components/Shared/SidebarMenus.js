import React from 'react';
import { Link } from 'react-router-dom';

const SidebarMenus = () => {
    return (
        <div className='flex flex-col gap-2'>
            <Link className='w-full' to={'/'}><li className='btn btn-sm md:btn-md btn-outline border-[#28c76f] text-[#28c76f85] hover:bg-[#28C76F38] hover:text-black hover:border-none rounded-full w-full'>ToDo Groups</li></Link>
            <Link className='w-full' to={'/todos'}><li className='btn btn-sm md:btn-md btn-outline btn-info rounded-full w-full'>My ToDos</li></Link>
            <Link className='w-full' to={'/completed'}><li className='btn btn-sm md:btn-md btn-outline btn-success rounded-full w-full'>Completed</li></Link>
            <Link className='w-full' to={'/processing'}><li className='btn btn-sm md:btn-md btn-outline btn-warning rounded-full w-full'>Processing</li></Link>
            <Link className='w-full' to={'/not-completed'}><li className='btn btn-sm md:btn-md btn-outline btn-error rounded-full w-full'>Not Completed</li></Link>
        </div>
    );
};

export default SidebarMenus;