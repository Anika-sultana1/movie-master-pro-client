import React from 'react';
import useAuth from '../../Hooks/useAuth'
import { Navigate } from 'react-router';

const PrivateRoutes = ({children}) => {

    const {user, loading} = useAuth()

if(loading){
    return  <span className="loading loading-spinner text-success"></span>
}

if(user){
    return children;
}

    return <Navigate state={location?.pathname} to='/login'></Navigate>
};

export default PrivateRoutes;