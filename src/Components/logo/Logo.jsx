import React from 'react';
import { PiFilmSlateFill } from 'react-icons/pi';
import { Link } from 'react-router';

const Logo = () => {
    return (
        <div className=" w-[200px] flex items-center gap-2 text-xl font-semibold">
<Link to='/'>
        <PiFilmSlateFill className="text-teal-500 text-2xl" /></Link>
       <Link to='/'>
        <span>Movie Master Pro</span></Link>
      </div>
    );
};

export default Logo;