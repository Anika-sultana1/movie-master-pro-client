import React from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import error404 from '../../assets/error-404.png';

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-secondary px-4">
      
      {/* Animated Image */}
      <motion.img
        src={error404}
        alt="404 Error"
        className="w-64 sm:w-96 h-64 sm:h-96 object-contain mb-6"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 10 }}
      />

      {/* Animated Heading */}
      <motion.h1
        className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-2 text-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Oops! Page Not Found
      </motion.h1>

      {/* Subtext */}
      <motion.p
        className="text-gray-600 mb-6 text-center max-w-md"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </motion.p>

      {/* Go Back Button */}
      <motion.button
        onClick={handleGoBack}
        className="px-6 py-3 bg-primary text-white rounded-2xl font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Go Back
      </motion.button>

      {/* Optional: small decorative dots or shapes */}
      <div className="absolute bottom-10 flex gap-2">
        <span className="w-2 h-2 bg-teal-400 rounded-2xl animate-ping"></span>
        <span className="w-2 h-2 bg-blue-500 rounded-2xl animate-ping delay-200"></span>
        <span className="w-2 h-2 bg-purple-500 rounded-2xl animate-ping delay-400"></span>
      </div>

    </div>
  );
};

export default ErrorPage;
