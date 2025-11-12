import React from 'react';
import { FcSearch } from "react-icons/fc";
import { motion } from "framer-motion";

import action from '../../assets/icons8-action-50.png';
import drama from '../../assets/icons8-drama-48.png';
import comedy from '../../assets/icons8-comedy-48.png';
import sci_fi from '../../assets/icons8-science-fiction-48.png';
import Thriller from '../../assets/icons8-thriller-100.png';
import Romance from '../../assets/icons8-romance-48.png';
import Horror from '../../assets/icons8-horror-48.png';
import Fantasy from '../../assets/icons8-fantasy-48.png';
import Documentary from '../../assets/icons8-document-64.png';
import { toast } from 'react-toastify';

const staticGenres = [
  { name: "Action", icon: action },
  { name: "Drama", icon: drama },
  { name: "Comedy", icon: comedy },
  { name: "Sci-Fi", icon: sci_fi },
  { name: "Thriller", icon: Thriller },
  { name: "Romance", icon: Romance },
  { name: "Horror", icon: Horror },
  { name: "Fantasy", icon: Fantasy },
  { name: "Documentary", icon: Documentary },
];

const GenreSection = () => {

  const handleGenreClick = (genreName) => {
    console.log(`Navigating to genre: ${genreName}`);
    toast(`You clicked ${genreName}. This should now filter the movies!`);
  };


  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.4, type: "spring" },
    }),
  };

  return (
    <div className="py-20 my-10 bg-gray-700 text-white">
      <h2 className="text-4xl font-extrabold mb-12 text-white flex justify-center items-center gap-4">
        <FcSearch /> Browse By Genre
      </h2>

      <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto px-4">
        {staticGenres.map((genre, index) => (
          <motion.button
            key={genre.name}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            whileHover={{ scale: 1.15, rotate: 3 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleGenreClick(genre.name)}
            className="flex items-center justify-center gap-4
                       p-3 px-5 rounded-4xl bg-gray-800 text-lg font-semibold 
                       hover:bg-teal-600 transition duration-300 ease-in-out
                       shadow-lg"
          >
            <img src={genre.icon} alt={genre.name} className="w-10 h-10 mb-2" />
            <span>{genre.name}</span>
          </motion.button>
        ))}
      </div>

      <p className="text-center mt-12 text-gray-400">
        Click on any genre to explore movies.
      </p>
    </div>
  );
};

export default GenreSection;
