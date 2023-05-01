import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import toast from 'react-hot-toast'
import { useLocation, useNavigate } from 'react-router-dom';

const LoginForm = () => {

    const { userLogin } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const handleLogin = async (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const pass = form.password.value;

        const response = await fetch(`https://todo-ray-backend-server.vercel.app/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, pass })
        })
        const loginRes = await response.json();
        if (loginRes?.status === 'LoggedIn') {
            userLogin(email, pass)
                .then(result => {
                    console.log(result.user);
                    localStorage.setItem('todoAccessToken', `Bearer ${loginRes?.todoAccessToken}`);
                    toast.success('Login Successful!');
                    navigate(from, { replace: true });
                })
                .catch(err => {
                    toast.error(err.message)
                })
        } else {
            toast.error(loginRes.message)
        }

    }
    return (
        <form onSubmit={handleLogin}>
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <h4 className='text-center text-3xl font-bold uppercase pt-4'>Login</h4>
                <div className="card-body">
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text ml-2 text-xs text-[#E4CE00] font-semibold">Email *</span>
                        </label>
                        <input type="email" name='email' placeholder="Enter your email" className="input input-sm w-full max-w-xs border-b-[#E4CE00] border-base-100 rounded-none font-bold text-lg" required />
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text ml-2 text-xs text-[#E4CE00] font-semibold">Password *</span>
                        </label>
                        <input type="password" name='password' placeholder="Enter your password" className="input input-sm w-full max-w-xs border-b-[#E4CE00] border-base-100 rounded-none font-bold text-lg" required />
                    </div>
                    <div className="form-control mt-6">
                        <button type='submit' className="btn btn-primary">Login</button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default LoginForm;