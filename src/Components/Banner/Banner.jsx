import React from 'react';
import { motion } from "framer-motion";
import { useSpring, animated } from '@react-spring/web';

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
      className="hero bg-image min-h-screen bg-none bg-transparent"
    >
      <div className="hero-content text-center">
        <div className="max-w-md">
         
          <motion.h1
            className="text-7xl font-bold heading"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Hello there
          </motion.h1>

         
          <motion.p
            className="py-6 descri-style"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1.2 }}
          >
            Discover. Watch. Enjoy. — Movie Master Pro brings your favorite films and latest releases to one place. Explore top picks, trending hits, and hidden gems, all at your fingertips
          </motion.p>

    
          <motion.button
            className="btn btn-primary"
            whileHover={{ scale: 1.1, rotate: 3 }}
            whileTap={{ scale: 0.9 }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            Get Started
          </motion.button>
        </div>
      </div>
    </animated.div>
  );
};

export default Banner;
