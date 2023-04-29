import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';

const Navbar = () => {
    return (
        <div className="w-full navbar bg-base-100 shadow-md">
            <div className="flex-none md:hidden">
                <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path d="M4 17H8M12 17H20M4 12H20M4 7H12M16 7H20" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </label>
            </div>
            <div className='w-full justify-center'>
                <input type="text" placeholder="Search..." className="input input-bordered input-[#E4CE00] w-full max-w-lg rounded-full bg-[#E4CE0059] px-6" />
                <AiOutlineSearch className='relative right-12 md:right-8 font-bold text-2xl cursor-pointer rounded-full' />
            </div>
            <div className="flex-none hidden md:block">
                <ul className="menu menu-horizontal gap-2">
                    {/* <!-- Navbar menu content here --> */}
                    <li><Link className='btn btn-info rounded-full text-white'>Login</Link></li>
                    <li><Link className='btn btn-success rounded-full text-white'>Sign Up</Link></li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;