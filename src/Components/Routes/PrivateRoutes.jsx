import React from 'react';
import useAuth from '../../Hooks/useAuth'
import { Navigate } from 'react-router';
import FullScreenLoader from '../FullScreenLoader';

const PrivateRoutes = ({children}) => {

    const {user, loading} = useAuth()

if(loading){
return <FullScreenLoader></FullScreenLoader>
}

if(user){
    return children;
}

    return <Navigate state={location?.pathname} to='/login'></Navigate>
};

export default PrivateRoutes;