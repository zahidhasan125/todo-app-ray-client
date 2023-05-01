import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';

const LoginForm = () => {

    const { signIn  } = useContext(AuthContext);
    const handleLogin = async (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const pass = form.password.value;

        signIn(email, pass)
        
    }
    return (
        <form onSubmit={handleLogin}>
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
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