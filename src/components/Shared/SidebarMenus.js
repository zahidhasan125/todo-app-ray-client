import React from 'react';

const SidebarMenus = () => {
    return (
        <div  className='flex flex-col gap-2'>
            <li className='btn btn-sm md:btn-md btn-outline border-[#28c76f] text-[#28c76f85] hover:bg-[#28C76F38] hover:text-black hover:border-none rounded-full'>ToDo Groups</li>
            <li className='btn btn-sm md:btn-md btn-outline btn-info rounded-full'>My ToDos</li>
            <li className='btn btn-sm md:btn-md btn-outline btn-success rounded-full'>Completed</li>
            <li className='btn btn-sm md:btn-md btn-outline btn-warning rounded-full'>Processing</li>
            <li className='btn btn-sm md:btn-md btn-outline btn-error rounded-full'>Not Completed</li>
        </div>
    );
};

export default SidebarMenus;