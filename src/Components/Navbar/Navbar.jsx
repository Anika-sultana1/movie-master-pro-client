import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import useAuth from '../../Hooks/useAuth';
import { PiFilmSlateFill } from 'react-icons/pi';
import { toast } from 'react-toastify';
import { FaPlus } from 'react-icons/fa';
import { motion } from "framer-motion";
import { CiBoxList, CiHome } from "react-icons/ci";
import { BiMoviePlay } from "react-icons/bi";
import { BsCollectionPlay } from "react-icons/bs";

const Navbar = () => {

  const links = (
    <>
      <NavLink className={`flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-teal-100 hover:text-teal-700 transition-all`} to='/'>
        <CiHome className='text-lg' /> Home
      </NavLink>
      <NavLink className={`flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-teal-100 hover:text-teal-700 transition-all`} to='/allMovies'>
        <BiMoviePlay className='text-lg' /> All Movies
      </NavLink>
      <NavLink className={`flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-teal-100 hover:text-teal-700 transition-all`} to='/myCollection'>
        <BsCollectionPlay className='text-lg' /> My Collection
      </NavLink>
      <NavLink className={`flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-teal-100 hover:text-teal-700 transition-all`} to='/myWatchlist'>
        <CiBoxList className='text-lg' /> My Watchlist
      </NavLink>
    </>
  );

  const { user, logOutUser } = useAuth();
  const navigate = useNavigate();
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleToggle = () => setTheme(theme === "light" ? "dark" : "light");

  const handleLogOut = () => {
    logOutUser()
      .then(() => {
        toast.success('Log Out Success!');
        navigate('/login');
      })
      .catch(() => toast.error('Log Out Failed'));
  };

  return (
    <div className="navbar fixed top-0 left-0 right-0 z-50 bg-gray-300 shadow-md border-b border-gray-200 px-6 lg:px-8">
      

      <div className="navbar-start flex items-center gap-4">

        <div className="dropdown">
          <div tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round"
                strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex="-1" className="menu menu-sm dropdown-content bg-white rounded-lg mt-3 w-52 p-2 shadow-lg">
            {links}
          </ul>
        </div>

        {/* Logo */}
        <div className="flex items-center gap-2">
          <PiFilmSlateFill className="text-teal-500 text-3xl animate-pulse" />
          <span className="font-extrabold text-xl lg:text-2xl text-gray-900 hover:text-teal-600 transition-all">Movie Master Pro</span>
        </div>
      </div>

      {/* Center: Desktop Links */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">{links}</ul>
      </div>

      {/* Right: Search + Add + User */}
      <div className="navbar-end flex items-center gap-4">

      
      {user ? (
        <div className="navbar-end flex items-center gap-4">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-40 lg:w-52"
          />

 
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            whileHover={{ scale: 1.05 }}
          >
            <Link to="/movies/add">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 0px 10px rgba(45,212,191,0.6)",
                }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white font-medium rounded-lg shadow-md hover:bg-teal-600 transition-all"
              >
                <FaPlus className="text-white" />
                
              </motion.button>
            </Link>
          </motion.div>

 
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="User avatar"
                  src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow">
              <li><a>{user?.displayName}</a></li>
              <li onClick={handleToggle}>
{
  theme === "light" ? 
   <svg
    className="swap-on h-10 w-10 fill-current"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24">
    <path
      d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
  </svg> :   
   <svg
    className="swap-off h-10 w-10 fill-current"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24">
    <path
      d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
  </svg>
}

</li>
              <li onClick={handleLogOut}><a>Logout</a></li>
            </ul>
          </div>
        </div>
      ) : (
        <div className='navbar-end'>
          <button className='btn btn-primary'>
            <Link to='/login'>Login</Link> / <Link to='/register'>Register</Link>
          </button>
        </div>
      )}
      </div>
    </div>
  );
};

export default Navbar;
