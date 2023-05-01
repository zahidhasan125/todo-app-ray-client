import React, { useContext, useState } from 'react';
import ToDoGroupCard from '../components/ToDoGroupCard/ToDoGroupCard';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../contexts/AuthProvider';
import Loader from '../components/Shared/Loader';

const ToDoGroup = () => {

    const { user } = useContext(AuthContext);
    const [showCreateToDoGroupModal, setShowCreateToDoGroupModal] = useState(false);

    const { data: toDoGroups = [], isLoading, refetch } = useQuery({
        queryKey: ['toDoGroups', user?.email],
        queryFn: async () => {
            const data = await getAllToDoGroup();
            return data;
        }

    })

    const getAllToDoGroup = async () => {
        const res = await fetch(`http://192.168.1.105:5000/todo-groups?email=${user?.email}`, {
            headers: {
                authorization: `${localStorage.getItem('todoAccessToken')}`
            }
        });
        const data = await res.json();
        return data;
    }

    const handleCreateGroup = async (event) => {
        event.preventDefault();
        const form = event.target;
        const todoGroupName = form.todoGroupName.value;
        const groupDescription = form.groupDescription.value;

        const newGroup = {
            groupDescription,
            todoGroupName,
            user: user?.email,
            createdAt: new Date()
        };
        const res = await fetch(`http://192.168.1.105:5000/createGroup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `${localStorage.getItem('todoAccessToken')}`
            },
            body: JSON.stringify(newGroup)
        })
        const data = await res.json();
        if (data.acknowledged) {
            refetch();
            setShowCreateToDoGroupModal(false);
        }
    }
    return (
        <div>
            {isLoading && <Loader />}
            <div className='mx-8 my-10'>
                <h3 className='text-2xl font-semibold mb-5'>ToDo Groups</h3>
                <div className='grid grid-cols-2 md:grid-cols-3 gap-3'>

                    {
                        toDoGroups.map(group => <ToDoGroupCard key={group?._id} group={group} refetch={refetch} />)
                    }

                </div>
            </div>

            <label htmlFor="create-group-modal" onClick={() => setShowCreateToDoGroupModal(!showCreateToDoGroupModal)} className='w-12 h-12 md:w-auto rounded-full bg-[#E4CE00] text-white text-4xl absolute right-8 bottom-8 flex items-center justify-center md:px-3 cursor-pointer'>
                <label className='md:pl-2'>+</label>
                <span className='hidden md:block text-lg px-2 font-bold'>Create New Group</span>
            </label>

            {/* Add group Modal */}
            {
                showCreateToDoGroupModal &&
                <div>
                    {/* The button to open modal */}
                    {/* <label htmlFor="create-group-modal" className="btn">open modal</label> */}
                    {/* Put this part before </body> tag */}
                    <input type="checkbox" id="create-group-modal" className="modal-toggle" />
                    <div className="modal">
                        <div className="modal-box relative w-80">
                            <label htmlFor="create-group-modal" className="text-[#E4CE00] absolute right-3 top-2 cursor-pointer">✕</label>
                            <form onSubmit={handleCreateGroup}>
                                <div className="form-control w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text ml-2 text-xs text-[#E4CE00] font-semibold">ToDo Group Name *</span>
                                    </label>
                                    <input type="text" name='todoGroupName' placeholder="Enter group name" className="input input-sm w-full max-w-xs border-b-[#E4CE00] border-base-100 rounded-none font-bold text-lg" required />
                                </div>
                                <div className="form-control w-full max-w-xs my-12">
                                    <label className="label">
                                        <span className="label-text ml-2 text-xs text-[#E4CE00] font-semibold">Description</span>
                                    </label>
                                    <textarea type="text" name='groupDescription' placeholder="Type group description..." className="textarea textarea-xs w-full max-w-xs border-b-[#E4CE00] border-base-100 rounded-none text-md" ></textarea>
                                </div>
                                <div className="form-control w-full max-w-xs">
                                    <button type='submit' className="btn btn-warning rounded-full text-white">Create Group</button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>}
        </div>
    );
};

export default ToDoGroup;