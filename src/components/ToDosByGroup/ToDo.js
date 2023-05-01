import React, { useContext, useState } from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { GoKebabVertical } from 'react-icons/go';
import { BsDownload } from 'react-icons/bs';
import { AiFillEye } from 'react-icons/ai';
import { ImAttachment } from 'react-icons/im';
import { format } from 'date-fns'
import { AuthContext } from '../../contexts/AuthProvider';
import Loader from '../Shared/Loader';
import DatePicker from 'react-datepicker';

const ToDo = ({ toDo, refetch }) => {

    const [showDetails, setShowDetails] = useState(false);
    const { _id, completedData, taskName, todoDescription, startDate, endDate, attachment } = toDo;
    const [isLoading, setIsLoading] = useState(false);
    const [showEditToDoModal, setShowEditToDoModal] = useState(false);

    const [selectedStartDate, setSelectedStartDate] = useState(new Date());
    const [selectedEndDate, setSelectedEndDate] = useState(new Date());


    const { user } = useContext(AuthContext);

    const formatDate = (date) => {
        return format(date, 'dd MMM yyyy');
    }

    const handleCompleteToDo = async (event) => {
        setIsLoading(true);
        event.preventDefault();
        const comment = event.target.comment.value;
        const completeData = { comment, isCompleted: completedData?.isCompleted ? false : true };

        fetch(`https://todo-ray-backend-server.vercel.app/update?todoId=${_id}&email=${user.email}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                authorization: localStorage.getItem('todoAccessToken')
            },
            body: JSON.stringify(completeData)
        }).then(res => res.json()).then(data => {
            if (data.modifiedCount) {
                setIsLoading(false);
                refetch();
            }
        })

    }

    const handleCheckBox = () => {
        setIsLoading(true);
        const completeData = { isCompleted: completedData?.isCompleted ? false : true };

        fetch(`https://todo-ray-backend-server.vercel.app/update?todoId=${_id}&email=${user.email}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                authorization: localStorage.getItem('todoAccessToken')
            },
            body: JSON.stringify(completeData)
        }).then(res => res.json()).then(data => {
            if (data.modifiedCount) {
                setIsLoading(false);
                refetch();
            }
        })
    }

    const handleDeleteToDo = (id) => {
        setIsLoading(true);
        fetch(`https://todo-ray-backend-server.vercel.app/delete?todoId=${id}&email=${user.email}`, {
            method: 'DELETE',
            headers: {
                authorization: localStorage.getItem('todoAccessToken')
            }
        }).then(res => res.json()).then(data => {
            if (data.deletedCount) {
                setIsLoading(false);

                refetch();
            }
        })
    }

    const handleEditToDo = event => {
        event.preventDefault();
        setIsLoading(true);
        const form = event.target;
        const taskName = form.taskName.value;
        const desc = form.todoDescription.value;
        const todoDescription = desc.split('|');
        const startDate = new Date(selectedStartDate.getTime());
        const endDate = new Date(selectedEndDate.getTime());
        const updatedToDoData = { taskName, todoDescription, startDate, endDate };

        fetch(`https://todo-ray-backend-server.vercel.app/update?todoId=${_id}&email=${user.email}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                authorization: localStorage.getItem('todoAccessToken')
            },
            body: JSON.stringify(updatedToDoData)
        }).then(res => res.json()).then(data => {
            if (data.modifiedCount) {
                setIsLoading(false);
                refetch();
            }
        })

    }

    return (
        <div className='mb-2 max-w-sm'>
            {isLoading ?
                <Loader />
                :
                <div className={`border border-[#6A6A6A] px-4 py-2 rounded-md ${completedData?.isCompleted && !showDetails && 'bg-[#28C76F]'}`}>

                    <div className={`flex gap-3 items-center`}>
                        <input type="checkbox" name="isCompleted" id="isCompleted" onChange={handleCheckBox} defaultChecked={completedData?.isCompleted} className={`checkbox checkbox-sm checkbox-warning rounded-none ${showDetails && 'hidden'}`} />
                        <div className={`flex items-center justify-between flex-grow ${completedData?.isCompleted && showDetails && 'bg-[#28C76F] rounded-md text-white'}`}>
                            <h4 className={`${completedData?.isCompleted && showDetails && 'pl-2 '} ${completedData?.isCompleted && 'text-white'} text-sm font-semibold`}>{taskName}</h4>
                            <div className={`flex items-center gap-4`}>
                                <div className={`dropdown dropdown-end ${showDetails || 'hidden'}`}>
                                    <label tabIndex={0} className="btn btn-ghost btn-sm btn-circle">
                                        <div className="indicator">
                                            <GoKebabVertical className='text-xl' />
                                        </div>
                                    </label>
                                    <div tabIndex={0} className="card dropdown-content bg-base-100 shadow">
                                        <div className="card-body p-0 shadow-md">
                                            <div className="btn-group btn-group-vertical w-24">
                                                <label htmlFor="add-todo-modal" onClick={() => setShowEditToDoModal(!showEditToDoModal)} className="btn btn-sm btn-outline bg-base-100 text-xs font-semibold">Edit</label>
                                                <button onClick={() => handleDeleteToDo(_id)} className="btn btn-sm btn-outline bg-base-100 text-xs font-semibold">Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {
                                    showDetails
                                        ?
                                        <div className=' btn btn-ghost btn-sm btn-circle'>
                                            <MdKeyboardArrowUp className='cursor-pointer text-2xl' onClick={() => setShowDetails(!showDetails)} />
                                        </div>
                                        :
                                        <div className=' btn btn-ghost btn-sm btn-circle'>
                                            <MdKeyboardArrowDown className='cursor-pointer text-2xl' onClick={() => setShowDetails(!showDetails)} />
                                        </div>

                                }

                            </div>
                        </div>
                    </div>
                    <div className={`${!showDetails && 'hidden'}`}>
                        <ol className='list-decimal ml-4 mt-4'>
                            {
                                todoDescription?.map((desc, idx) => <li key={idx} className='text-xs'>{desc}</li>)
                            }
                        </ol>

                        {/* Attachment Section */}

                        <div className='flex items-center gap-1 max-w-2/3 my-4 ml-1'>
                            <ImAttachment className='dark:text-white' />
                            <p className='text-sm font-semibold'>{attachment ? '1 ' : 'No '} File Attached</p>
                            {attachment &&
                                <div className='flex items-center justify-between gap-3 ml-6 text-[#E4CE00]'>
                                    <BsDownload className='cursor-pointer' />
                                    <AiFillEye className='cursor-pointer' />
                                </div>}
                        </div>

                        <div className='text-sm font-bold ml-1'>
                            <p>Start: {formatDate(new Date(startDate))}</p>
                            <p>End: {formatDate(new Date(endDate))}</p>
                        </div>
                        <form onSubmit={handleCompleteToDo} className='flex flex-col justify-center'>
                            <div className="form-control w-full max-w-xs mx-auto my-5">
                                <label className="label">
                                    <span className="label-text ml-2 text-xs text-[#E4CE00] font-semibold">Comment</span>
                                </label>
                                <textarea type="text" name='comment' placeholder="Type comment..." className="textarea textarea-xs w-full max-w-xs border-b-[#E4CE00] border-base-100 border-b-2 rounded-none text-md" ></textarea>
                            </div>

                            <button type='submit' className='btn btn-sm md:btn-md btn-warning rounded-full text-sm font-bold mb-4'>{completedData?.isCompleted ? 'Not Completed' : 'Complete ToDo'}</button>
                        </form>
                    </div>
                </div>
            }

            {/* Update ToDo Modal */}
            {
                showEditToDoModal &&
                <div>
                    {/* The button to open modal */}
                    {/* <label htmlFor="add-todo-modal" className="btn">open modal</label> */}
                    {/* Put this part before </body> tag */}
                    <input type="checkbox" id="add-todo-modal" className="modal-toggle" />
                    <div className="modal">
                        <div className="modal-box relative w-80">
                            <label htmlFor="add-todo-modal" className="text-[#E4CE00] absolute right-3 top-2 cursor-pointer">✕</label>
                            <form onSubmit={handleEditToDo}>
                                <div className="form-control w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text ml-2 text-xs text-[#E4CE00] font-semibold">ToDo Name *</span>
                                    </label>
                                    <input type="text" defaultValue={taskName} name='taskName' placeholder="Enter todo name" className="input input-sm w-full max-w-xs border-b-[#E4CE00] border-base-100 rounded-none font-bold text-lg" required />
                                </div>
                                <div className="form-control w-full max-w-xs my-12">
                                    <label className="label">
                                        <span className="label-text ml-2 text-xs text-[#E4CE00] font-semibold">Description</span>
                                    </label>
                                    <textarea type="text" name='todoDescription' placeholder="Type todo description..." className="textarea textarea-xs w-full max-w-xs border-b-[#E4CE00] border-base-100 rounded-none text-md" defaultValue={todoDescription.join('|')} ></textarea>
                                </div>

                                {/* Start & End Date  */}

                                {/* <div className='flex justify-between gap-2 mb-7'>
                                    <div className='border border-[#E4CE00] rounded-md flex flex-col items-center px-1 py-2'>
                                        <p className='font-extrabold text-sm border-b w-full text-center'>Start Date</p>
                                        <DatePicker
                                            selected={startDate}
                                            onSelect={date => setSelectedStartDate(date)}
                                            selectsStart
                                            startDate={startDate}
                                            endDate={endDate}
                                            placeholderText="Start Date"
                                            dateFormat="dd MMM yyyy"
                                            value={startDate && formatDate(startDate)}
                                            className='w-full text-center cursor-pointer'
                                        />
                                    </div>

                                    <div className='border border-[#E4CE00] rounded-md flex flex-col items-center px-1 py-2'>
                                        <p className='font-extrabold text-sm border-b w-full text-center'>End Date</p>
                                        <DatePicker
                                            selected={endDate}
                                            onSelect={date => setSelectedEndDate(date)}
                                            selectsEnd
                                            startDate={startDate}
                                            endDate={endDate}
                                            minDate={startDate}
                                            placeholderText="End Date"
                                            dateFormat="dd MMM yyyy"
                                            value={endDate && formatDate(endDate)}
                                            className='w-full text-center cursor-pointer'
                                        />
                                    </div>
                                </div> */}

                                {/* <div className="form-control w-full max-w-xs mb-10">
                                    <label htmlFor='file' className="label w-full border border-[#E4CE00] rounded-md">
                                        <div className='flex items-center gap-1 max-w-2/3 ml-1'>
                                            <ImAttachment className='dark:text-white' />
                                            <p className='text-sm font-semibold'>Attach File</p>
                                        </div>
                                    </label>
                                    <input type="file" name='file' id='file' placeholder="Enter todo name" className="input input-sm w-full max-w-xs border-[#E4CE00] rounded-none font-bold text-lg hidden" />
                                </div> */}

                                <div className="form-control w-full max-w-xs">
                                    <button type='submit' className="btn btn-warning rounded-full text-white">Update ToDo</button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default ToDo;