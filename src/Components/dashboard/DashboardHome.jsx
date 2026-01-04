import React from 'react';
import useRole from '../../Hooks/useRole';
import FullScreenLoader from '../FullScreenLoader';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';

const DashboardHome = () => {
  const { role, roleLoading } = useRole();


  if (roleLoading) {
    return <FullScreenLoader />;
  }

if(role === 'user'){
  return <UserDashboard></UserDashboard>
}
if(role === 'admin'){
  return <AdminDashboard></AdminDashboard>
}
      return (
        <div className="min-h-screen flex items-center justify-center text-center p-4">
          <h2 className="text-2xl font-bold">Access Denied</h2>
          <p className="mt-2 text-gray-500">You do not have permission to view this page.</p>
        </div>
      );
  
};

export default DashboardHome;
