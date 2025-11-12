import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import useAuth from '../../Hooks/useAuth';
import { PiFilmSlateFill } from 'react-icons/pi';
import { toast } from 'react-toastify';
import { FaPlus } from 'react-icons/fa';
import { motion } from "framer-motion";

const Navbar = () => {

  const links = (
    <>
      <NavLink className='m-2' to='/'>Home</NavLink>
      <NavLink className='m-2' to='/allMovies'>All Movies</NavLink>
      <NavLink className='m-2' to='/myCollection'>My Collection</NavLink>
    </>
  );

  const { user, logOutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOutUser()
      .then(() => {
        toast.success('Log Out Success!');
       
        navigate('/login');
      })
      .catch((error) => {
        console.log(error);
        toast.error('Log Out Failed')
      });
  };

  return (
    <div className="navbar fixed top-0 left-0 right-0 z-50 bg-base-100 shadow-md">

      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round"
                strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow">
            {links}
          </ul>
        </div>

        <div className="flex items-center gap-2 text-xl font-semibold">
          <PiFilmSlateFill className="text-teal-500 text-2xl" />
          <span>Movie Master Pro</span>
        </div>
      </div>

 
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>


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
                <span className="hidden md:inline">Add Movie</span>
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
              <li><a>Settings</a></li>
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
  );
};

export default Navbar;
