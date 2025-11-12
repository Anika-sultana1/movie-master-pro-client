import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaStar, FaCalendarAlt, FaTags } from "react-icons/fa";
import useAxios from "../../Hooks/useAxios";
import { Link } from "react-router";


const AllMovies = () => {
const [loading, setLoading] = useState(true)

  const axios = useAxios();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
setLoading(true)

    axios
      .get("/movies")
      .then((result) => {
        console.log(result.data);
        
        setMovies(result.data);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false)
      });
  }, [axios]);

  return (
    <section className="pt-24 pb-20 bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-10 text-white"
        >
          Explore <span className="text-teal-400">Movies</span>
        </motion.h2>
{
  loading ? 
<span className="loading loading-spinner loading-xl text-center"></span> : 
       ' '
}
 <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie, index) => (
            <motion.div
              key={movie._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
              className="relative group rounded-2xl overflow-hidden shadow-lg cursor-pointer"
            >
        
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-110"
              />

      
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100"></div>

              <div className="absolute bottom-0 left-0 p-4 text-white w-full">
                <h3 className="text-xl font-bold mb-1">{movie.title}</h3>
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <span className="flex items-center gap-1">
                    <FaStar className="text-yellow-400" /> {movie.rating || "N/A"}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaTags className="text-teal-400" /> {movie.genre || "Unknown"}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaCalendarAlt className="text-gray-300" /> {movie.releaseYear || "----"}
                  </span>
                </div>

                <p className="text-sm text-gray-300 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2">
                  {movie.plotSummary?.length > 120
                    ? movie.plotSummary.slice(0, 120) + "..."
                    : movie.plotSummary}
                </p>

                <Link to={`/movies/${movie._id}`}><button className="mt-3 w-full py-1.5 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition">
                  View Details
                </button></Link>
              </div>
            </motion.div>
          ))}
        </div>

      
        {movies.length === 0 && (
          <p className="text-center text-gray-400 mt-16">
            No movies found. Please add some to your database.
          </p>
        )}
      </div>
    
    </section>
  );
};

export default AllMovies;
