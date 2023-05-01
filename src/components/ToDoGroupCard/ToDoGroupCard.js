import React, { useState } from 'react';
import { GoKebabVertical } from 'react-icons/go';
import { Link } from 'react-router-dom';
import Loader from '../Shared/Loader';
import EditModal from './EditModal';
import toast from 'react-hot-toast';

const ToDoGroupCard = ({ group, refetch }) => {

    const [isLoading, setIsLoading] = useState(false);
    const { _id, todoGroupName, groupDescription } = group;
    const [showEditGroupModal, setShowEditGroupModal] = useState(false);

    const handleDeleteGroup = (id) => {
        setIsLoading(true);
        fetch(`http://192.168.1.105:5000/delete-group?groupId=${id}`, {
            method: 'DELETE',
            headers: {
                authorization: localStorage.getItem('todoAccessToken')
            }
        }).then(res => res.json()).then(data => {
            if (data.deletedCount) {
                setIsLoading(false);
            }
        })
    }

    const handleEditGroup = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        const form = event.target;
        const todoGroupName = form.todoGroupName.value;
        const groupDescription = form.groupDescription.value;

        const updatedGroupData = {
            groupDescription,
            todoGroupName,
            updatedAt: new Date()
        };

        const res = await fetch(`http://192.168.1.105:5000/update-group?groupId=${_id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                authorization: `${localStorage.getItem('todoAccessToken')}`
            },
            body: JSON.stringify(updatedGroupData)
        })
        const data = await res.json();
        if (data.modifiedCount) {
            setIsLoading(false);
            setShowEditGroupModal(false);
            toast.success('Updated!');
            refetch();
        }

    }

    return (
        <div>
            <div className='bg-[#28C76F38] text-[#6A6A6A] px-4 py-3 rounded-2xl active:scale-105 duration-200 flex flex-col justify-center gap-1'>
                <div className='flex justify-between items-center'>
                    <Link to={`/group/${_id}?groupName=${todoGroupName}`}><h5 className='text-sm font-semibold'>{todoGroupName.length > 20 ? todoGroupName.slice(0, 20) + '...' : todoGroupName}</h5></Link>
                    {
                        isLoading && <Loader />
                    }
                    <div className={`dropdown dropdown-end`}>
                        <label tabIndex={0} className="btn btn-ghost btn-sm btn-circle">
                            <div className="indicator">
                                <GoKebabVertical className='text-md' />
                            </div>
                        </label>
                        <div tabIndex={0} className="card dropdown-content bg-base-100 shadow">
                            <div className="card-body p-0 shadow-md">
                                <div className="btn-group btn-group-vertical w-24">

                                    <label htmlFor="edit-group-modal" onClick={() => setShowEditGroupModal(!showEditGroupModal)} className="btn btn-sm btn-outline bg-base-100 text-xs font-semibold">Edit</label>

                                    <button onClick={() => handleDeleteGroup(_id)} className="btn btn-sm btn-outline bg-base-100 text-xs font-semibold">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Link to={`/group/${_id}?groupName=${todoGroupName}`}>
                    <p className='text-xs'>{groupDescription.length > 58 ? groupDescription.slice(0, 58) + '...' : groupDescription}</p>
                    <progress className="progress progress-success w-full my-3" value="50" max="100"></progress>
                    <p className='text-black font-bold text-xs'>50% Complete</p>
                    <p className='text-black font-bold text-xs'>50% Processing</p>
                </Link>



                {/* Edit group Modal */}

            </div>
            {
                showEditGroupModal &&
                <EditModal
                    handleEditGroup={handleEditGroup}
                    setShowEditGroupModal={setShowEditGroupModal}
                    showEditGroupModal={showEditGroupModal}
                    groupData={group}
                />}
        </div>

    );
};

export default ToDoGroupCard;