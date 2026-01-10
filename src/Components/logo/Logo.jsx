import React from 'react';
import { PiFilmSlateFill } from 'react-icons/pi';
import { Link } from 'react-router';

const Logo = () => {
    return (
        <div className=" w-[200px] flex items-center gap-2 text-xl font-semibold text-highlight">
<Link to='/'>
        <PiFilmSlateFill className="text-highlight text-2xl" /></Link>
       <Link to='/'>
        <span>Movie Master Pro</span></Link>
      </div>
    );
};

export default Logo;