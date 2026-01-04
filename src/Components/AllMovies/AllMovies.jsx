import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaStar, FaCalendarAlt, FaTags } from "react-icons/fa";
import useAxios from "../../Hooks/useAxios";
import { toast, ToastContainer } from "react-toastify";
import FullScreenLoader from "../FullScreenLoader";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const AllMovies = () => {
  const axios = useAxios();
  const {user}= useAuth()
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [minRating, setMinRating] = useState("");
  const axiosSecure = useAxiosSecure()
  const [maxRating, setMaxRating] = useState("");
  const [sort, setSort] = useState("addedAt_desc");

  // Pagination
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 12;

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const params = { search, genre, minRating, maxRating, sort, page, limit };
      const res = await axios.get("/movies/explore", { params });
      setMovies(res.data.movies);
      setTotal(res.data.total);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.error("Failed to load movies");
    }
  };


    const handleAddToWatchlist = async (movieId) => {
    if (!user) {
      toast.error('You need to log in first!');
      return; 
    }

  
      axiosSecure.post('/watchlist', { movieId })
      .then(res=> {
    

      if (res.data?.insertedId || res.data?.success) {
        toast.success('Added to Watchlist Successfully');
      } else {
        toast.info('Movie is already in your watchlist');
      }
      })
 
     .catch ((error)=> {
      console.error(error);
      toast.error(error.response?.data?.message || 'Something went wrong');
    })
  };

  useEffect(() => {
    fetchMovies();
  }, [search, genre, minRating, maxRating, sort, page]);

  const totalPages = Math.ceil(total / limit);

  return (
    <section className="pt-24 pb-20 min-h-screen">
      <title>MovieMASTERpro | Movies</title>
      <ToastContainer />
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-10 text-gray-700">
          Explore <span className="text-teal-400">Movies</span>
        </h2>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 rounded flex-1"
          />
          <input
            type="text"
            placeholder="Genre (comma separated)"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="border p-2 rounded flex-1"
          />
          <input
            type="number"
            placeholder="Min Rating"
            value={minRating}
            onChange={(e) => setMinRating(e.target.value)}
            className="border p-2 rounded w-28"
          />
          <input
            type="number"
            placeholder="Max Rating"
            value={maxRating}
            onChange={(e) => setMaxRating(e.target.value)}
            className="border p-2 rounded w-28"
          />
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="border p-2 rounded">
            <option value="addedAt_desc">Newest</option>
            <option value="addedAt_asc">Oldest</option>
            <option value="rating_desc">Rating High → Low</option>
            <option value="rating_asc">Rating Low → High</option>
            <option value="releaseYear_desc">Release Year ↓</option>
            <option value="releaseYear_asc">Release Year ↑</option>
          </select>
        </div>

        {loading ? (
          <FullScreenLoader />
        ) : (
          <>
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
                     <button
                  onClick={() => handleAddToWatchlist(movie._id)}
                  className="mt-2 w-full py-1.5 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
                >
                  Add to Watchlist
                </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8 gap-2">
                <button
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                  className="px-4 py-2 border rounded disabled:opacity-50"
                >
                  Prev
                </button>
                <span className="px-4 py-2">
                  Page {page} / {totalPages}
                </span>
                <button
                  onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={page === totalPages}
                  className="px-4 py-2 border rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default AllMovies;
