import React from 'react';
import { motion } from "framer-motion";
import { useSpring, animated } from '@react-spring/web';
import { Link } from 'react-router';
import bannerImg from '../../assets/backround.jpeg'

const Banner = () => {

  const bgSpring = useSpring({
    from: { transform: 'scale(1)' },
    to: { transform: 'scale(1.05)' },
    config: { duration: 5000 },
    loop: { reverse: true } 
  });

  return (
    <animated.div 
      style={bgSpring}
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
   style={{  ...bgSpring, 
        backgroundImage: `url(${bannerImg})`,
      }}
    >
   
      
      <div className="relative z-10 text-center px-4">
        <motion.h1
          className="text-6xl md:text-7xl text-highlight-100 text-highlight-hover font-bold "
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Hello there
        </motion.h1>

        <motion.p
          className="py-6 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1.2 }}
        >
          Discover. Watch. Enjoy. — Movie Master Pro brings your favorite films and latest releases to one place. Explore top picks, trending hits, and hidden gems, all at your fingertips.
        </motion.p>

        <motion.button
          className=" bg-primary mt-4"
          whileHover={{ scale: 1.1, rotate: 3 }}
          whileTap={{ scale: 0.9 }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Link to='/allMovies'> Get Started</Link>
        </motion.button>
      </div>
    </animated.div>
  );
};

export default Banner;
