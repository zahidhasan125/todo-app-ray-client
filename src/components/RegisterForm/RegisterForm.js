import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import { toast } from 'react-hot-toast';

const RegisterForm = () => {

    const { createUser } = useContext(AuthContext);

    const handleRegister = (event) => {
        toast.success('Hello')
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const pass = form.password.value;

        const registerData = { email, pass };
        fetch(`http://192.168.1.105:5000/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registerData)
        })
            .then(response => response.json())
            .then(registerRes => {
                if (registerRes.acknowledged) {
                    createUser(email, pass)
                        .then(result => {
                            console.log(result.user)
                            localStorage.setItem('todoAccessToken', `Bearer ${registerRes?.todoAccessToken}`);
                            toast.success('Registration Successful!')
                        })
                        .catch(err => {
                            toast.error(err.message)
                        })
                } else {
                    toast.error(registerRes.message)
                }
            })


    }
    return (
        <form onSubmit={handleRegister}>
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <h4 className='text-center text-3xl font-bold uppercase pt-4'>Register</h4>
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
                        <button type='submit' className="btn btn-primary">Register</button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default RegisterForm;