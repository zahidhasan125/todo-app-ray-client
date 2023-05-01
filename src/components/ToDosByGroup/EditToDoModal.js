import React from 'react';
import { ImAttachment } from 'react-icons/im';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';

const EditToDoModal = ({ handleEditToDo, toDo, selectedStartDate, setSelectedStartDate, selectedEndDate, setSelectedEndDate }) => {

    const formatDate = (date) => {
        return format(date, 'dd MMM yyyy');
    }
    
    const { _id, completedData, taskName, todoDescription, startDate, endDate, attachment } = toDo;

    
    return (
        <div>
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
                                        value={selectedStartDate && formatDate(startDate)}
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
                                        value={selectedEndDate && formatDate(endDate)}
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
        </div>
    );
};

export default EditToDoModal;