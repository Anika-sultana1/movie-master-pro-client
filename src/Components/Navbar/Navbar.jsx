import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router';
import useAuth from '../../Hooks/useAuth';
import { PiFilmSlateFill } from 'react-icons/pi';
import { toast } from 'react-toastify';
import { FaPlus } from 'react-icons/fa';
import { motion } from "framer-motion";
import { CiBoxList, CiHome, CiLogout } from "react-icons/ci";
import { BiCookie, BiMoviePlay } from "react-icons/bi";
import { BsCollectionPlay } from "react-icons/bs";
import { MdOutlineDashboardCustomize, MdOutlineFeaturedPlayList, MdOutlineHomeRepairService, MdOutlinePrivacyTip, MdOutlineRecentActors, MdOutlineRoundaboutLeft } from "react-icons/md";
import { RiContactsLine } from "react-icons/ri";
import { GrBlog } from "react-icons/gr";
import { IoStatsChartOutline } from "react-icons/io5";
import { GoCodeReview } from "react-icons/go";
import { AiOutlineMail } from "react-icons/ai";
import Logo from '../logo/Logo';


const Navbar = ({ setActiveSection, activeSection }) => {
  const { user, logOutUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); 
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || 'light');
  const [searchQuery, setSearchQuery] = useState("");

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

  const navItemClass = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2 rounded-2xl transition-all duration-300
     ${isActive
       ? "bg-primary hover:bg-primary-100 text-white shadow-md scale-[1.03]"
       : " text-highlight hover:bg-primary "
     }`;

const scrollItemClass = (id) => `
  flex items-center gap-2 px-3 py-2 rounded-2xl transition-all duration-300
  ${activeSection === id
    ? "bg-primary text-white shadow-md scale-[1.03] pointer-events-none"
    : "text-black bg-primary-100 hover:bg-primary hover:text-white"
  }
`;



  const handleScroll = (id) => {
    if (location.pathname !== '/') {
   
      navigate('/', { state: { scrollTo: id } });
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        setActiveSection(id);
      }
    }
  };

const publicLinks = [
  { to: "/", label: "Home", icon: <CiHome /> },
  { to: "/allMovies", label: "All Movies", icon: <BiMoviePlay /> },
];


  const defaultLinks = (
    <>
      <NavLink to="/about" className={navItemClass}><MdOutlineRoundaboutLeft /> About</NavLink>
      <NavLink to="/contact" className={navItemClass}><RiContactsLine /> Contact</NavLink>
      <NavLink to="/privacy-policy" className={navItemClass}><MdOutlinePrivacyTip /> Privacy Policy</NavLink>
      <NavLink to="/cookies" className={navItemClass}><BiCookie /> Cookie Policy</NavLink>
      <NavLink to="/blogs" className={navItemClass}><GrBlog /> Blog</NavLink>
      <NavLink to="/testimonial" className={navItemClass}><GoCodeReview /> Testimonial</NavLink>
      <NavLink to="/news-letter" className={navItemClass}><AiOutlineMail />News Letter</NavLink>
      <NavLink to="/services" className={navItemClass}><MdOutlineHomeRepairService /> Services</NavLink>
    </>
  );

  const userLinks = (
    <>
      <NavLink to="/myCollection" className={navItemClass}><BsCollectionPlay /> My Collection</NavLink>
      <NavLink to="/myWatchlist" className={navItemClass}><CiBoxList /> My Watchlist</NavLink>
      <NavLink to="/dashboard" className={navItemClass}><MdOutlineDashboardCustomize /> Dashboard</NavLink>
    </>
  );

const scrollLinks = [
  { id: "stats", label: "Stats", icon: <IoStatsChartOutline />},
  { id: "topRated", label: "Top Rated", icon: <BiMoviePlay /> },
  { id: "recent", label: "Recent", icon: <MdOutlineRecentActors/>},
  { id: "contact", label: "Contact", icon: <RiContactsLine /> },
  
  { id: "services", label: "Services", icon: <MdOutlineFeaturedPlayList /> },
  { id: "blog", label: "Blog", icon:<GrBlog /> },
  { id: "news-letter", label: "News Letter", icon:<AiOutlineMail />},
  { id: "testimonial", label: "Testimonial", icon:<GoCodeReview />},
  { id: "about", label: "About", icon:<MdOutlineRoundaboutLeft /> },
];


const handleSearch = (e) => {
  e.preventDefault();
  if (!searchQuery.trim()) return;
  

  console.log("Searching for:", searchQuery);
  navigate(`/allMovies?search=${searchQuery}`);
};

  return (
    <div className="navbar fixed top-0 left-0 right-0 z-50  shadow-md  px-6 lg:px-8">

      <div className="navbar-start flex items-center gap-4">

        <div className="dropdown">
          <div tabIndex={0} className="btn bg-primary lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round"
                strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
     <ul className="menu menu-sm dropdown-content bg-secondary rounded-2xl mt-3 w-56 p-3 shadow-xl gap-1">
  {publicLinks.map(link => (
    <NavLink key={link.to} to={link.to} className={navItemClass}>
      {link.icon}
      {link.label}
    </NavLink>
  ))}
  {user ? userLinks : defaultLinks}
</ul>

        </div>



      <div className="hidden md:flex items-center gap-2">
<Logo></Logo>
</div>

      </div>

<div className="navbar-center hidden lg:flex">
<ul className="menu menu-horizontal px-1 gap-2">
  {publicLinks.map(link => (
    <li key={link.to} className="relative group">
      {user ? (
     
        <NavLink to={link.to} className={navItemClass}>
          {link.icon}
          {link.label}
        </NavLink>
      ) : (
        
        <NavLink
          to={link.to}
          className="text-2xl text-gray-700 hover:text-teal-600"
        >
          {link.icon}

          <span
            className="absolute -bottom-10 left-1/2 -translate-x-1/2
            scale-0 group-hover:scale-100 transition-transform
            bg-black text-white text-xs px-3 py-1 rounded-2xl whitespace-nowrap"
          >
            {link.label}
          </span>
        </NavLink>
      )}
    </li>
  ))}

  {user
    ? userLinks
    : scrollLinks.map(link => (
        <li key={link.id} className="relative group">
          <button
            onClick={() => handleScroll(link.id)}
            className={scrollItemClass(link.id)}
          >
            <span className={`${activeSection === link.id ? 'bg-primary' : 'bg-primary-100'} text-xl`}>
              {link.icon}
            </span>
          </button>

          <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-white bg-gray-800 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
            {link.label}
          </span>
        </li>
      ))}
</ul>


</div>


     
      <div className="navbar-end flex items-center gap-4">
        {user ? (
          <>
        <form onSubmit={handleSearch}>
              <input 
    type="text" 
    placeholder="Search movies..." 
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="input input-bordered w-24 md:w-40 lg:w-52 h-10 transition-all focus:w-32 md:focus:w-60" 
  />
      </form>      <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              whileHover={{ scale: 1.05 }}
            >
              <Link to="/movies/add">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0px 0px 10px rgba(45,212,191,0.6)" }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-white font-medium rounded-2xl shadow-md transition-all"
                >
                  <FaPlus className="text-white" />
                </motion.button>
              </Link>
            </motion.div>

            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded--2xl">
                  <img alt="User avatar" src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"} />
                </div>
              </div>
              <ul tabIndex="-1" className="menu menu-sm dropdown-content bg-secondary rounded-box mt-3 w-52 p-2 shadow">
                <li><a>{user?.displayName}</a></li>
                <li className='cursor-pointer m-3 hover:text-secondary text-highlight' onClick={handleToggle}>
                  {theme === "light" ? " Light" : " Dark"}
                </li>
              <li className='my-1 border-t border-gray-200'>  {defaultLinks}</li>
                <li className='text-red-500' onClick={handleLogOut}><a><CiLogout /> Logout</a></li>
              </ul>
            </div>
          </>
        ) : (
          <div className='navbar-end'>
             <li className='cursor-pointer text-highlight m-2' onClick={handleToggle}>
                  {theme === "light" ? " Dark" : " Light"}
                </li>
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
