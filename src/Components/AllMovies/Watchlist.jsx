import React, { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxios from "../../Hooks/useAxios";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Link } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { FaTrashAlt, FaPlayCircle, FaCalendarAlt, FaClock } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import FullScreenLoader from "../FullScreenLoader";

const Watchlist = () => {
  const { user } = useAuth();
  const axios = useAxios();
  const axiosSecure = useAxiosSecure();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchWatchlist = async () => {
      try {
        setLoading(true);
        const watchlistResult = await axiosSecure.get("/watchlist");
        const movieIds = watchlistResult.data.map(item => item.movieId);

        // Promise.all ব্যবহার করা হয়েছে দ্রুত ডেটা ফেচ করার জন্য
        const movieRequests = movieIds.map(id => axios.get(`/movies/${id}`));
        const responses = await Promise.all(movieRequests);
        const moviesData = responses.map(res => res.data);

        setMovies(moviesData);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch your watchlist");
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlist();
  }, [axios, axiosSecure, user]);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#374151',
      confirmButtonText: 'Yes, delete it!',
      background: '#1f2937',
      color: '#fff'
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/watchlist/${id}`)
          .then(res => {
            if (res.data.deletedCount > 0) {
              setMovies(movies.filter(movie => movie._id !== id));
              toast.success("Removed from Watchlist");
            }
          })
          .catch(err => console.log(err));
      }
    });
  }

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="alert alert-warning w-fit shadow-lg">
        <span>Please login to view your watchlist.</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-base-300 pb-20 pt-28 px-4 md:px-10 lg:px-32">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-5xl font-black text-white tracking-tight">
            My <span className="text-primary">Watchlist</span>
          </h2>
          <p className="text-gray-400 mt-2 italic">You have {movies.length} movies saved to watch later.</p>
        </div>
        <div className="h-1 w-20 bg-primary rounded-full hidden md:block mb-3"></div>
      </div>

      {loading ? (
        <FullScreenLoader></FullScreenLoader>
      ) : movies.length === 0 ? (
        <div className="text-center bg-base-200 p-20 rounded-3xl border-2 border-dashed border-gray-700">
          <h3 className="text-2xl text-gray-500 font-semibold">Your watchlist is empty!</h3>
          <Link to="/all-movies" className="btn btn-primary mt-6">Explore Movies</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8">
          <AnimatePresence>
            {movies.map((movie) => (
              <motion.div
                key={movie._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                layout
                className="card card-side bg-base-100 shadow-2xl overflow-hidden group border border-white/5"
              >
                {/* Image Section with Overlay */}
                <figure className="relative w-1/3 md:w-56 overflow-hidden">
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <FaPlayCircle className="text-white text-5xl" />
                  </div>
                </figure>

                {/* Content Section */}
                <div className="card-body p-6 w-2/3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="card-title text-2xl md:text-3xl font-bold text-white group-hover:text-primary transition-colors">
                        {movie.title}
                      </h3>
                      <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-400 font-medium">
                        <span className="flex items-center gap-1"><FaCalendarAlt className="text-primary" /> {movie.releaseYear}</span>
                        <span className="flex items-center gap-1"><FaClock className="text-primary" /> {movie.duration} min</span>
                        <div className="badge badge-outline badge-sm uppercase tracking-wider">{movie.genre}</div>
                      </div>
                    </div>
                    
                    {/* Delete Button (Desktop) */}
                    <button 
                      onClick={() => handleDelete(movie._id)}
                      className="btn btn-circle btn-ghost text-error hover:bg-error/20 hidden md:flex"
                      title="Remove from watchlist"
                    >
                      <FaTrashAlt size={20} />
                    </button>
                  </div>

                  <p className="text-gray-400 mt-4 line-clamp-2 md:line-clamp-3 text-sm md:text-base italic">
                    {movie.plotSummary}
                  </p>

                  <div className="card-actions justify-end mt-6 items-center gap-4">
                    <Link to={`/movies/${movie._id}`} className="btn btn-primary btn-sm md:btn-md rounded-lg shadow-lg shadow-primary/20">
                      View Details
                    </Link>
                    
                    {/* Delete Button (Mobile) */}
                    <button 
                      onClick={() => handleDelete(movie._id)}
                      className="btn btn-error btn-outline btn-sm md:hidden"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default Watchlist;