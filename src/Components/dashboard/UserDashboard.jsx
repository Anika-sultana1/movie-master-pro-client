import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  HiOutlineFilm,
  HiOutlineHeart,
  HiOutlinePlusCircle,
  HiOutlineUserCircle,
  HiArrowTrendingUp,
  HiOutlineTrash,
  HiOutlinePencilSquare,
  HiEllipsisVertical,
} from "react-icons/hi2";
import { motion, AnimatePresence } from "framer-motion"; 
import Logo from "../logo/Logo";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const UserDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const [myMovies, setMyMovies] = useState([]);
  const [stats, setStats] = useState({ totalMovies: 0, totalUsers: 0 });
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);


  useEffect(() => {
    const loadData = async () => {
    
        axiosSecure.get("/stats")
        .then(res=> setStats(res.data))
        

        axiosSecure.get("/movies/my-collection")
        .then(res=> {
        setMyMovies((res.data) ? res.data : []);
        setLoading(false);
        
        })
  
      .catch ((err) =>{
        console.error("Dashboard load failed:", err);
        setLoading(false)
    
      })

    }
  loadData();
  }, [axiosSecure]);


  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This movie will be permanently removed!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444", 
      cancelButtonColor: "#3B82F6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/movies/${id}`);
          if (res.data?.deletedCount > 0) {
            setMyMovies((prev) => prev.filter((m) => m._id !== id));
            Swal.fire("Deleted!", "Movie has been removed.", "success");
          }
        } catch (err) {
          Swal.fire("Error!", "Something went wrong while deleting.",err);
        }
      }
    });
  };

  const displayedMovies = showAll ? myMovies : myMovies.slice(0, 5);

  const statCards = [
    { label: "Total Movies (Global)", value: stats.totalMovies, icon: <HiOutlineFilm />, color: "text-primary" },
    { label: "My Contribution", value: myMovies.length, icon: <HiOutlinePlusCircle />, color: "text-secondary" },
    { label: "Active Users", value: stats.totalUsers, icon: <HiOutlineUserCircle />, color: "text-accent" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="min-h-screen bg-base-100 p-4 md:p-8 lg:p-12 pt-24 font-sans"
    >
      <div className="max-w-7xl mx-auto">
        
<title>MOVIEMASTERpro | Dashboard</title>
        <motion.header 
          initial={{ y: -50 }} animate={{ y: 0 }}
          className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 bg-base-200/50 p-6 rounded-[2.5rem] border border-base-300 backdrop-blur-md shadow-sm"
        >
          <div className="flex items-center gap-6">
           <Link to='/'> 
            <div className="bg-white dark:bg-base-100 p-4 rounded-3xl shadow-lg ring-1 ring-base-300">
              <Logo />
            </div></Link>
            <div className="hidden md:block h-12 w-[2px] bg-base-300" />
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-black italic tracking-tight">Studio Pro</h1>
              <p className="text-[10px] uppercase font-bold tracking-widest opacity-40">System Dashboard</p>
            </div>
          </div>

          <Link to="/movies/add">
            <motion.button 
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="btn btn-primary rounded-2xl gap-2 px-10 border-none shadow-lg shadow-primary/20"
            >
              <HiOutlinePlusCircle className="text-xl" /> Add New Movie
            </motion.button>
          </Link>
        </motion.header>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {statCards.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="card bg-base-200 border border-base-300 hover:shadow-xl transition-all group overflow-hidden"
            >
              <div className="card-body flex-row items-center justify-between p-8">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] font-black opacity-50 mb-1">{s.label}</p>
                  <h2 className="text-5xl font-black tracking-tighter">{s.value}</h2>
                </div>
                <div className={`text-5xl p-5 bg-base-100 rounded-3xl ${s.color} shadow-inner group-hover:scale-110 transition-transform`}>
                  {s.icon}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

   
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-center px-4">
              <h3 className="text-2xl font-black flex items-center gap-3 italic">
                <HiArrowTrendingUp className="text-primary" /> My Collection
              </h3>
              {myMovies.length > 5 && (
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="btn btn-sm btn-ghost rounded-full px-6 hover:bg-primary/10 transition-colors"
                >
                  {showAll ? "Collapse" : "View All"}
                </button>
              )}
            </div>

            <motion.div 
              layout
              className="bg-base-200/50 rounded-[2.5rem] p-4 md:p-8 border border-base-300 shadow-inner"
            >
              {loading ? (
                <div className="flex flex-col items-center py-20 gap-4">
                  <span className="loading loading-infinity loading-lg text-primary" />
                  <p className="text-xs font-bold opacity-30 uppercase tracking-[0.3em]">Accessing DB</p>
                </div>
              ) : myMovies.length ? (
                <div className="overflow-x-auto">
                  <table className="table border-separate border-spacing-y-4">
                    <thead>
                      <tr className="text-[10px] font-black uppercase tracking-widest opacity-40 border-none">
                        <th>Movie Title</th>
                        <th className="hidden md:table-cell">Category</th>
                        <th>Rating</th>
                        <th className="text-center">Manage</th>
                      </tr>
                    </thead>
                    <AnimatePresence>
                      <tbody>
                        {displayedMovies.map((movie) => (
                          <motion.tr 
                            layout
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            key={movie._id} className="bg-base-100 group shadow-sm hover:shadow-md transition-shadow"
                          >
                            <td className="font-bold rounded-l-3xl py-6 pl-8">{movie.title}</td>
                            <td className="hidden md:table-cell">
                              <span className="badge badge-ghost border-none bg-base-200 font-medium py-3 px-4">
                                {Array.isArray(movie.genre) ? movie.genre.join(", ") : movie.genre}
                              </span>
                            </td>
                            <td className="text-amber-500 font-black">⭐ {movie.rating}</td>
                            <td className="text-center rounded-r-3xl pr-8">
                              <div className="dropdown dropdown-left">
                                <label tabIndex={0} className="btn btn-ghost btn-xs btn-circle group-hover:bg-base-200">
                                  <HiEllipsisVertical className="text-xl" />
                                </label>
                                <ul tabIndex={0} className="dropdown-content z-50 menu p-2 shadow-2xl bg-base-100 rounded-2xl w-44 border border-base-300">
                                  <li>
                                    <Link to={`/movies/update/${movie._id}`} className="flex gap-3 text-info py-3 font-bold hover:bg-info/10">
                                      <HiOutlinePencilSquare className="text-lg" /> Edit Details
                                    </Link>
                                  </li>
                                  <li>
                                    <button onClick={() => handleDelete(movie._id)} className="flex gap-3 text-error py-3 font-bold hover:bg-error/10">
                                      <HiOutlineTrash className="text-lg" /> Remove Movie
                                    </button>
                                  </li>
                                </ul>
                              </div>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </AnimatePresence>
                  </table>
                </div>
              ) : (
                <div className="text-center py-20 space-y-4">
                  <HiOutlineFilm className="text-6xl mx-auto opacity-10" />
                  <p className="opacity-40 italic">Start your collection by adding a movie.</p>
                </div>
              )}
            </motion.div>
          </div>

      
          <div className="space-y-8">
            <h3 className="text-2xl font-black flex gap-3 italic px-4">
              <HiOutlineHeart className="text-secondary" /> Navigation
            </h3>

            <div className="card bg-base-200 p-6 border border-base-300 rounded-[2.5rem] shadow-sm">
                <div className="space-y-4">
                    <Link to="/myWatchlist">
                        <motion.button 
                            whileHover={{ x: 10 }}
                            className="btn btn-block bg-base-100 h-16 border-none rounded-2xl shadow-sm text-left justify-start gap-4 hover:bg-secondary hover:text-white transition-all"
                        >
                            <div className="p-2 bg-secondary/10 rounded-xl group-hover:bg-white/20">
                                <HiOutlineHeart className="text-xl" />
                            </div>
                            My Watchlist
                        </motion.button>
                    </Link>
                    <Link to="/allMovies">
                        <motion.button 
                            whileHover={{ x: 10 }}
                            className="btn btn-block bg-base-100 h-16 border-none rounded-2xl shadow-sm text-left justify-start gap-4 hover:bg-primary hover:text-white transition-all"
                        >
                            <div className="p-2 bg-primary/10 rounded-xl">
                                <HiOutlineFilm className="text-xl" />
                            </div>
                            Explore All
                        </motion.button>
                    </Link>
                </div>
            </div>

            <div className="p-10 bg-neutral text-neutral-content rounded-[3rem] relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                    <HiOutlineFilm className="text-[10rem] rotate-12" />
                </div>
                <p className="text-xl italic font-serif leading-relaxed relative z-10">"Every great film should seem new every time you see it."</p>
                <div className="mt-8 flex items-center gap-4">
                    <div className="w-10 h-[2px] bg-primary"></div>
                    <p className="text-xs font-black uppercase tracking-widest text-primary">Cinephile Hub</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UserDashboard;