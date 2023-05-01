import React, { useContext, useState } from 'react';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import { ImAttachment } from 'react-icons/im';
import { useQuery } from '@tanstack/react-query';
import Loader from '../Shared/Loader';
import ToDo from '../ToDosByGroup/ToDo';
import { AuthContext } from '../../contexts/AuthProvider';

const ProcessingToDos = () => {

    const [selectedStartDate, setSelectedStartDate] = useState(new Date());
    const [selectedEndDate, setSelectedEndDate] = useState(new Date());
    const { user } = useContext(AuthContext);
    const [showCreateToDoModal, setShowCreateToDoModal] = useState(false);

    const formatDate = (date) => {
        return format(date, 'dd MMM yyyy');
    }
    const { data: myToDos = [], isLoading, refetch } = useQuery({
        queryKey: ['myToDos', user.email],
        queryFn: async () => {
            const data = await getAllToDoByGroup();
            return data;
        }

    })

    const getAllToDoByGroup = async () => {
        const res = await fetch(`http://192.168.1.105:5000/mytodos?email=${user.email}`, {
            headers: {
                authorization: `${localStorage.getItem('todoAccessToken')}`
            }
        });
        const data = await res.json();
        return data;
    }



    const handleCreateToDo = async (event) => {
        event.preventDefault();
        const form = event.target;
        const taskName = form.taskName.value;
        const desc = form.todoDescription.value;
        const todoDescription = desc.split('|');
        const attached = form.file.files[0];
        const startDate = new Date(selectedStartDate.getTime());
        const endDate = new Date(selectedEndDate.getTime());

        if (attached) {
            function uploadImage(imageFile) {
                const formData = new FormData();
                formData.append('image', imageFile);

                fetch(`https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imgbbKey}`, {
                    method: 'POST',
                    body: formData,
                })
                    .then(response => response.json())
                    .then(imgData => {
                        console.log(imgData)
                        if (imgData.success) {
                            const toDoData = {
                                taskName,
                                todoDescription,
                                startDate,
                                endDate,
                                attachment: imgData.data.url,
                                user: user.email,
                                createdAt: new Date()
                            };
                            fetch(`http://localhost:5000/create`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    authorization: `${localStorage.getItem('todoAccessToken')}`
                                },
                                body: JSON.stringify(toDoData)
                            })
                                .then(res => res.json())
                                .then(data => {
                                    console.log(data)

                                    if (data.acknowledged) {
                                        refetch();
                                        setShowCreateToDoModal(false);
                                    }
                                })

                        }
                    })
                    .catch(error => console.error(error));
            }

            uploadImage(attached);
        } else {
            const toDoData = {
                taskName,
                todoDescription,
                startDate,
                endDate,
                user: user?.email,
                createdAt: new Date()
            };
            const res = await fetch(`http://localhost:5000/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `${localStorage.getItem('todoAccessToken')}`
                },
                body: JSON.stringify(toDoData)
            })
            const data = await res.json();
            if (data.acknowledged) {
                refetch();
                setShowCreateToDoModal(false);
            }
            console.log(data)
        }


    }
    const processingToDos = myToDos.filter(item => item.completedData?.isCompleted !== true);

    return (
        <div className='mx-8 my-10 w-full'>
            {
                isLoading &&
                <Loader />
            }
            <h3 className='text-2xl font-semibold mb-5'>Processing ToDos</h3>
            {
                processingToDos?.map(toDo => <ToDo key={toDo._id} toDo={toDo} refetch={refetch} />)
            }

            {/* Add ToDo button */}
            <label htmlFor="add-todo-modal" onClick={() => setShowCreateToDoModal(!showCreateToDoModal)} className='w-12 h-12 md:w-auto rounded-full bg-[#E4CE00] text-white text-4xl absolute right-8 bottom-8 flex items-center justify-center md:px-3 cursor-pointer'>
                <span className='md:pl-2'>+</span>
                <span className='hidden md:block text-lg px-2 font-bold'>Create New ToDo</span>
            </label>
            {/* Add ToDo Modal */}
            {
                showCreateToDoModal &&
                <div>
                    {/* The button to open modal */}
                    {/* <label htmlFor="add-todo-modal" className="btn">open modal</label> */}
                    {/* Put this part before </body> tag */}
                    <input type="checkbox" id="add-todo-modal" className="modal-toggle" />
                    <div className="modal">
                        <div className="modal-box relative w-80">
                            <label htmlFor="add-todo-modal" className="text-[#E4CE00] absolute right-3 top-2 cursor-pointer">✕</label>
                            <form onSubmit={handleCreateToDo}>
                                <div className="form-control w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text ml-2 text-xs text-[#E4CE00] font-semibold">ToDo Name *</span>
                                    </label>
                                    <input type="text" name='taskName' placeholder="Enter todo name" className="input input-sm w-full max-w-xs border-b-[#E4CE00] border-base-100 rounded-none font-bold text-lg" required />
                                </div>
                                <div className="form-control w-full max-w-xs my-12">
                                    <label className="label">
                                        <span className="label-text ml-2 text-xs text-[#E4CE00] font-semibold">Description</span>
                                    </label>
                                    <textarea type="text" name='todoDescription' placeholder="Type todo description..." className="textarea textarea-xs w-full max-w-xs border-b-[#E4CE00] border-base-100 rounded-none text-md" ></textarea>
                                </div>

                                {/* Start & End Date  */}

                                <div className='flex justify-between gap-2 mb-7'>
                                    <div className='border border-[#E4CE00] rounded-md flex flex-col items-center px-1 py-2'>
                                        <p className='font-extrabold text-sm border-b w-full text-center'>Start Date</p>
                                        <DatePicker
                                            selected={selectedStartDate}
                                            onSelect={date => setSelectedStartDate(date)}
                                            selectsStart
                                            startDate={selectedStartDate}
                                            endDate={selectedEndDate}
                                            placeholderText="Start Date"
                                            dateFormat="dd MMM yyyy"
                                            value={selectedStartDate && formatDate(selectedStartDate)}
                                            className='w-full text-center cursor-pointer'
                                        />
                                    </div>

                                    <div className='border border-[#E4CE00] rounded-md flex flex-col items-center px-1 py-2'>
                                        <p className='font-extrabold text-sm border-b w-full text-center'>End Date</p>
                                        <DatePicker
                                            selected={selectedEndDate}
                                            onSelect={date => setSelectedEndDate(date)}
                                            selectsEnd
                                            startDate={selectedStartDate}
                                            endDate={selectedEndDate}
                                            minDate={selectedStartDate}
                                            placeholderText="End Date"
                                            dateFormat="dd MMM yyyy"
                                            value={selectedEndDate && formatDate(selectedEndDate)}
                                            className='w-full text-center cursor-pointer'
                                        />
                                    </div>
                                </div>

                                <div className="form-control w-full max-w-xs mb-10">
                                    <label htmlFor='file' className="label w-full border border-[#E4CE00] rounded-md">
                                        <div className='flex items-center gap-1 max-w-2/3 ml-1'>
                                            <ImAttachment className='dark:text-white' />
                                            <p className='text-sm font-semibold'>Attach File</p>
                                        </div>
                                    </label>
                                    <input type="file" name='file' id='file' placeholder="Enter todo name" className="input input-sm w-full max-w-xs border-[#E4CE00] rounded-none font-bold text-lg hidden" />
                                </div>

                                <div className="form-control w-full max-w-xs">
                                    <button type='submit' className="btn btn-warning rounded-full text-white">Add ToDo</button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default ProcessingToDos;