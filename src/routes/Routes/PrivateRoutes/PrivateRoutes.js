import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import Loader from '../../../components/Shared/Loader';

const PrivateRoutes = ({children}) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <Loader />;
    }
    if (!user) {
        return <Navigate to='/login' state={{ from: location }} replace></Navigate>
    }

    return children;
};

export default PrivateRoutes;