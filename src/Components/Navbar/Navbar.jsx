import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import useAuth from '../../Hooks/useAuth';
import { PiFilmSlateFill } from 'react-icons/pi';
import { toast } from 'react-toastify';

const Navbar = () => {

  const links = <>
    <NavLink className='m-2' to='/'>Home</NavLink>
    <NavLink className='m-2' to='/allMovies'>All Movies</NavLink>
    <NavLink className='m-2' to='/myCollection'>My Collection</NavLink>
  </>;

  const { user, logOutUser } = useAuth();
const navigate= useNavigate();

  const handleLogOut = ()=>{
   logOutUser()
   .then(result => {
    console.log(result)
    toast('Log Out Succed!')
    navigate('/login')
   })
   .catch(error => {
    console.log(error)
   })
  }

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
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            {links}
          </ul>
        </div>
  <div className=' flex items-center gap-2'>
     <PiFilmSlateFill />
        <a className="text-xl">Movie Master Pro</a>
  </div>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {links}
        </ul>
      </div>

      {user ? (
        <div className="navbar-end">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto"
            />
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="User avatar"
                    src={user?.photoURL}
                  />
                </div>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                <li>
                  <a className="justify-between">
                   {user?.displayName}
                  </a>
                </li>
                <li><a>Settings</a></li>
                <li onClick={handleLogOut}><a>Logout</a></li>
              </ul>
            </div>
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
