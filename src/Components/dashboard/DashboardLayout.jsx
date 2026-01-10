import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router';
import Logo from '../logo/Logo';
import { CiSettings } from "react-icons/ci";
import { MdManageHistory, MdLogout } from 'react-icons/md';
import { BsCollectionPlay } from 'react-icons/bs';
import { HiHome, HiMenuAlt2 } from 'react-icons/hi';
import useRole from '../../Hooks/useRole';
import { toast } from 'react-toastify';
import useAuth from '../../Hooks/useAuth';

const DashboardLayout = () => {
  const { role } = useRole();

  const {logOutUser} = useAuth();
  const navigate = useNavigate();

const navLinkStyles = ({ isActive }) =>
  `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
    isActive
      ? 'bg-primary text-white shadow-md pointer-events-none'
      : 'text-secondary hover:bg-secondary hover:text-white'
  }`;



  const handleLogOut = () => {
    logOutUser()
      .then(() => {
        toast.success('Log Out Success!');
        navigate('/login');
      })
      .catch(() => toast.error('Log Out Failed'));
  };

  return (
    <div className="drawer lg:drawer-open bg-base-200 min-h-screen font-sans">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

   
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <nav className="navbar bg-base-100 border-b border-base-300 px-4 sticky top-0 z-10">
          <div className="flex-1 gap-2">
            <label
              htmlFor="dashboard-drawer"
              className="btn btn-ghost btn-circle lg:hidden"
            >
              <HiMenuAlt2 size={24} />
            </label>
            <div className="lg:hidden">
                <Logo />
            </div>
          </div>
          
     
        </nav>

        {/* Page content */}
        <main className="p-6 md:p-8 flex-grow">
          <div className="bg-base-100 rounded-2xl shadow-sm min-h-[calc(100vh-140px)] p-6">
            <Outlet />
          </div>
        </main>
      </div>

  
      <div className="drawer-side z-20">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

        <aside className="w-72 bg-base-100 border-r border-base-300 min-h-full flex flex-col">
          {/* Sidebar Logo Section */}
          <div className="p-6 hidden lg:block border-b border-base-200">
            <Logo />
          </div>

          <ul className="menu p-4 gap-2 flex-grow">
            <p className="text-xs font-bold text-gray-400 uppercase px-4 mb-2">Main Menu</p>
            
            {/* Dashboard Home */}
            <li>
              <NavLink to="/dashboard" end className={navLinkStyles}>
                <HiHome size={22} />
                <span className="font-medium">Dashboard</span>
              </NavLink>
            </li>

            {/* My Movies */}
            <li>
              <NavLink to="/dashboard/my-movies" className={navLinkStyles}>
                <BsCollectionPlay size={20} />
                <span className="font-medium">My Movies</span>
              </NavLink>
            </li>

            {/* Admin Section */}
            {role === 'admin' && (
              <>
                <div className="divider px-4 opacity-50"></div>
                <p className="text-xs font-bold text-gray-400 uppercase px-4 mb-2">Admin Tools</p>
                <li>
                  <NavLink to="/dashboard/movie-management" className={navLinkStyles}>
                    <MdManageHistory size={22} />
                    <span className="font-medium">Movie Management</span>
                  </NavLink>
                </li>
              </>
            )}
          </ul>

          {/* Bottom Menu */}
          <div className="p-4 border-t border-base-200">
             <ul className="menu p-0 gap-2">
                <li>
                  <NavLink to="/dashboard/profile-settings" className={navLinkStyles}>
                    <CiSettings size={22} className="font-bold" />
                    <span className="font-medium">Settings</span>
                  </NavLink>
                </li>
                <li>
                  <button onClick={handleLogOut} className="flex items-center gap-3 px-4 py-3 rounded-lg text-error hover:bg-error/10 transition-all duration-300 mt-1">
                    <MdLogout size={22} />
                    <span className="font-medium">Logout</span>
                  </button>
                </li>
             </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default DashboardLayout;