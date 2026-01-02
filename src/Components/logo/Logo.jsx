import React from 'react';
import { PiFilmSlateFill } from 'react-icons/pi';

const Logo = () => {
    return (
        <div className="md:ml-50 flex items-center gap-2 text-xl font-semibold">
        <PiFilmSlateFill className="text-teal-500 text-2xl" />
        <span>Movie Master Pro</span>
      </div>
    );
};

export default Logo;