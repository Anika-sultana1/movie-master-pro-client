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
   
        const watchlistItems = watchlistResult.data;

        const movieRequests = watchlistItems.map(item => axios.get(`/movies/${item.movieId}`));
        const responses = await Promise.all(movieRequests);
        const moviesData = responses.map((res, idx) => ({
          ...res.data,
          watchlistId: watchlistItems[idx]._id, 
        }));

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

  const handleDelete = (watchlistId) => {
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
        axiosSecure.delete(`/watchlist/${watchlistId}`)
          .then(res => {
            if (res.data.deletedCount > 0) {
              setMovies(movies.filter(movie => movie.watchlistId !== watchlistId));
              toast.success("Removed from Watchlist");
            }
          })
          .catch(err => console.log(err));
      }
    });
  }

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center bg-dark">
      <div className="alert alert-warning w-fit shadow-lg">
        <span>Please login to view your watchlist.</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-secondary pb-20 pt-28 px-4 md:px-10 lg:px-32">
      <title>MOVIEMASTERpro | Watchlist</title>
      <div className="max-w-6xl mx-auto mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-5xl font-black text-white tracking-tight">
            My <span className="text-primary">Watchlist</span>
          </h2>
          <p className="text-gray-400 mt-2 italic">You have {movies.length} movies saved to watch later.</p>
        </div>
      
      </div>

      {loading ? (
        <FullScreenLoader />
      ) : movies.length === 0 ? (
        <div className="text-center bg-secondary p-20 rounded-2xl border-2 border-dashed border-gray-700">
          <h3 className="text-2xl text-gray-500 font-semibold">Your watchlist is empty!</h3>
          <Link to="/all-movies" className="btn btn-primary mt-6">Explore Movies</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8">
          <AnimatePresence>
            {movies.map((movie) => (
              <motion.div
                key={movie.watchlistId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                layout
                className="card card-side bg-secondary shadow-2xl overflow-hidden group border border-white/5"
              >
              <figure className="relative w-40 sm:w-48 md:w-56 flex-shrink-0">
  <div className="w-full h-full aspect-[2/3] overflow-hidden">
    <img
      src={movie.posterUrl}
      alt={movie.title}
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
    />
  </div>

  <div className="absolute inset-0 bg-dark opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
    <FaPlayCircle className="text-white text-5xl" />
  </div>
</figure>


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

                    <button 
                      onClick={() => handleDelete(movie.watchlistId)}
                      className=" btn-circle btn-ghost text-error hover:bg-error/20 hidden md:flex"
                      title="Remove from watchlist"
                    >
                      <FaTrashAlt size={20} />
                    </button>
                  </div>

                  <p className="text-gray-400 mt-4 line-clamp-2 md:line-clamp-3 text-sm md:text-base italic">
                    {movie.plotSummary}
                  </p>

                  <div className="card-actions justify-end mt-6 items-center gap-4">
                    <Link to={`/movies/${movie._id}`} className="btn btn-primary btn-sm md:btn-md rounded-2xl shadow-lg shadow-primary/20">
                      View Details
                    </Link>
                    <button 
                      onClick={() => handleDelete(movie.watchlistId)}
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
