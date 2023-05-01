import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Navbar from '../../components/Shared/Navbar';
import SidebarMenus from '../../components/Shared/SidebarMenus';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../contexts/AuthProvider';

const Main = () => {
    const { user, logOut } = useContext(AuthContext);

    const handleLogout = () => {
        logOut()
            .then(() => {
                toast.success('Successfully Logged Out!');
                localStorage.clear();
            }).catch(() => { });
    }
    return (
        <div className="drawer drawer-mobile max-w-[1440px] mx-auto">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                {/* <!-- Navbar --> */}
                <Navbar />
                <div className='flex'>
                    {/* Sidebar for medium and large devices */}
                    <div className="drawer-side hidden md:block border-t border-r rounded-lg min-h-screen dark:border-gray-700 mt-2">
                        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                        <ul className="menu p-4 m-1 w-48 bg-base-100 text-base-content gap-2">
                            {/* <!-- Sidebar content here --> */}
                            <SidebarMenus />
                        </ul>
                    </div>
                    {/* <!-- Page content here --> */}
                    <Outlet />
                </div>

            </div>

            {/* Sidebar for small devices */}
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-60 bg-base-100 text-base-content gap-2 md:hidden">
                    {/* <!-- Sidebar content here --> */}
                    <SidebarMenus />
                    <div className='flex flex-row items-center justify-center gap-2'>
                        {
                            user ?
                                <Link>
                                    <button onClick={handleLogout} className='btn btn-sm btn-error rounded-full text-white'>Logout</button>
                                </Link>
                                :
                                <>
                                    <Link to={`/login`} >
                                        <button className='btn btn-sm btn-info rounded-full text-white'>Login</button>
                                    </Link>
                                    <Link to={`/register`} >
                                        <button className='btn btn-sm btn-success rounded-full text-white'>Sign Up</button>
                                    </Link>
                                </>
                        }
                    </div>
                </ul>

            </div>
        </div>
    );
};

export default Main;