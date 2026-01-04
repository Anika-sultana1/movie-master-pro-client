import React from 'react';
import useRole from '../../Hooks/useRole';
import useAuth from '../../Hooks/useAuth';
import FullScreenLoader from '../FullScreenLoader';
import ErrorPage from '../ErrorPage/ErrorPage';



const AdminRoutes = ({children}) => {

const {role, roleLoading} =useRole()
const {user, loading} = useAuth();

if(!user || roleLoading || loading){
    return <FullScreenLoader></FullScreenLoader>
}

if(role !== 'admin'){
    return <ErrorPage></ErrorPage>
}

    return children
};

export default AdminRoutes;