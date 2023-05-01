import React from 'react';

const EditModal = ({ handleEditGroup, setShowEditGroupModal, showEditGroupModal, groupData }) => {
    
    const { todoGroupName, groupDescription } = groupData;
    return (
        <div>
            <div>
                {/* The button to open modal */}
                {/* <label htmlFor="edit-group-modal" className="btn">open modal</label> */}
                {/* Put this part before </body> tag */}
                <input type="checkbox" id="edit-group-modal" className="modal-toggle" />
                <div className="modal">
                    <div className="modal-box relative w-80">
                        <label htmlFor="edit-group-modal" onClick={() => setShowEditGroupModal(!showEditGroupModal)} className="text-[#E4CE00] absolute right-3 top-2 cursor-pointer">✕</label>
                        <form onSubmit={handleEditGroup}>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text ml-2 text-xs text-[#E4CE00] font-semibold">Edit Group Name *</span>
                                </label>
                                <input type="text" name='todoGroupName' defaultValue={todoGroupName} placeholder="Enter group name" className="input input-sm w-full max-w-xs border-b-[#E4CE00] border-base-100 rounded-none font-bold text-lg" required />
                            </div>
                            <div className="form-control w-full max-w-xs my-12">
                                <label className="label">
                                    <span className="label-text ml-2 text-xs text-[#E4CE00] font-semibold">Edit Description</span>
                                </label>
                                <textarea type="text" name='groupDescription' defaultValue={groupDescription} placeholder="Type group description..." className="textarea textarea-xs w-full max-w-xs border-b-[#E4CE00] border-base-100 rounded-none text-md" ></textarea>
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <button type='submit' className="btn btn-warning rounded-full text-white">Update Group</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditModal;