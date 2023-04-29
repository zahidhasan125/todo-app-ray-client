import React from 'react';
import ToDoGroupCard from '../components/ToDoGroupCard/ToDoGroupCard';

const ToDoGroup = () => {

    const taskGroups = [
        {
            _id: 1,
            groupName: 'Business ToDo',
            desc: 'Business task can refer to either a series of worksheets for ....'
        },
        {
            _id: 2,
            groupName: 'ToDo Project - Front end',
            desc: 'Business task can refer to either a series of worksheets for ....'
        },
        {
            _id: 3,
            groupName: 'Personal ToDo',
            desc: "There's nothing quite like building projects to grow as a developer"
        }
    ];

    const handleCreateGroup = (event) => {
        event.preventDefault();
        const form = event.target;
        const todoGroupName = form.todoGroupName.value;
        const todoDescription = form.todoDescription.value;
        const newGroup = { todoGroupName, todoDescription };

        console.log(newGroup);
    }
    return (
        <div>
            <div className='mx-8 my-10'>
                <h3 className='text-2xl font-semibold mb-5'>ToDo Groups</h3>
                <div className='grid grid-cols-2 md:grid-cols-3 gap-3'>

                    {
                        taskGroups.map(group => <ToDoGroupCard key={group?._id} group={group} />)
                    }

                </div>
            </div>

            <label htmlFor="my-modal-3" className='w-12 h-12 md:w-auto rounded-full bg-[#E4CE00] text-white text-4xl absolute right-8 bottom-8 flex items-center justify-center md:pl-2 cursor-pointer'>+<span className='hidden md:block text-lg px-2 font-bold'>Create Group</span></label>

            {/* Add group Modal */}
            <div>
                {/* The button to open modal */}
                {/* <label htmlFor="my-modal-3" className="btn">open modal</label> */}
                {/* Put this part before </body> tag */}
                <input type="checkbox" id="my-modal-3" className="modal-toggle" />
                <div className="modal">
                    <div className="modal-box relative w-80">
                        <label htmlFor="my-modal-3" className="text-[#E4CE00] absolute right-3 top-2 cursor-pointer">✕</label>
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
                                <textarea type="text" name='todoDescription' placeholder="Type group description..." className="textarea textarea-xs w-full max-w-xs border-b-[#E4CE00] border-base-100 rounded-none text-md" ></textarea>
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <button type='submit' className="btn btn-warning rounded-full text-white">Create Group</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ToDoGroup;