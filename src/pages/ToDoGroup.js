import React from 'react';

const ToDoGroup = () => {
    return (
        <div>
            <div className='mx-8'>
                <h3 className='text-2xl font-semibold my-5'>ToDo Groups</h3>
                <div className='grid grid-cols-2 md:grid-cols-3 gap-3'>
                    <div className='bg-[#28C76F38] text-[#6A6A6A] px-4 py-3 rounded-2xl'>
                        <h5 className='text-lg font-semibold'>Business Task</h5>
                        <p className='text-xs'>Business task can refer to either a series of worksheets for ....</p>
                        <progress className="progress progress-success w-full" value="50" max="100"></progress>
                        <p className='text-black font-bold text-xs'>50% Complete</p>
                        <p className='text-black font-bold text-xs'>50% Processing</p>
                    </div>
                    <div className='bg-[#28C76F38] text-[#6A6A6A] px-4 py-3 rounded-2xl'>
                        <h5 className='text-lg font-semibold'>Business Task</h5>
                        <p className='text-xs'>Business task can refer to either a series of worksheets for ....</p>
                        <progress className="progress progress-success w-full" value="50" max="100"></progress>
                        <p className='text-black font-bold text-xs'>50% Complete</p>
                        <p className='text-black font-bold text-xs'>50% Processing</p>
                    </div>
                    <div className='bg-[#28C76F38] text-[#6A6A6A] px-4 py-3 rounded-2xl'>
                        <h5 className='text-lg font-semibold'>Business Task</h5>
                        <p className='text-xs'>Business task can refer to either a series of worksheets for ....</p>
                        <progress className="progress progress-success w-full" value="50" max="100"></progress>
                        <p className='text-black font-bold text-xs'>50% Complete</p>
                        <p className='text-black font-bold text-xs'>50% Processing</p>
                    </div>
                </div>
            </div>
            <div className='w-12 h-12 md:w-auto rounded-full bg-[#E4CE00] text-white text-4xl absolute right-8 bottom-8 flex items-center justify-center md:pl-2 cursor-pointer'>+ <span className='hidden md:block text-lg px-2 font-bold'>Create Group</span></div>
        </div>
    );
};

export default ToDoGroup;