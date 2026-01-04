import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { HiOutlineUsers, HiOutlineFilm, HiOutlineTrash, HiOutlineShieldCheck, HiOutlineCog6Tooth } from "react-icons/hi2";
import Swal from "sweetalert2";
import { Link } from "react-router";
import { FaStar } from "react-icons/fa";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({ totalMovies: 0, totalUsers: 0 });
  const [loading, setLoading] = useState(true);


  const chartData = [
    { name: 'Movies', value: stats.totalMovies },
    { name: 'Users', value: stats.totalUsers },
  ];

  useEffect(() => {
    const fetchAdminData = async () => {
   
        // Fetch stats
        axiosSecure.get("/stats")
        .then(res=>  {
          setStats(res.data)
          setLoading(false)
        })
  
        axiosSecure.get('/users')
        .then(res=> {
          setUsers(res?.data)
          setLoading(false)
        })
  
       .catch((err)=> {
        console.error("Admin data fetch failed", err);
        setLoading(false);
      })
    };
    fetchAdminData();
  }, [axiosSecure]);

  const handleDeleteUsers = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Admin actions cannot be reverted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.delete(`/users/${id}`);
        setUsers(users.filter((m) => m._id !== id));
        Swal.fire("Deleted!", "Movie removed by Admin.", "success");
      }
    });
  };

const nonAdminUsers = users.filter(user => user.role !== 'admin');

  if (loading) return <div className="min-h-screen flex justify-center items-center"><span className="loading loading-bars loading-lg text-teal-500"></span></div>;

  return (
    <div className="min-h-screen bg-base-100 p-6 lg:p-12 pt-28">
      <title>MOVIEMASTERpro | Dashboard</title>
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-4xl font-black italic text-teal-600">Admin Control Panel</h1>
            <p className="opacity-50 uppercase tracking-widest text-xs font-bold">Manage Users & Content</p>
          </div>
    <div className="flex flex-wrap items-center gap-3">
  {/* Profile Settings */}
  <Link to="/dashboard/profile-settings">
    <button className="btn btn-outline btn-sm rounded-full gap-2">
      <HiOutlineCog6Tooth className="text-lg" />
      Profile Settings
    </button>
  </Link>

  {/* Movie Management */}
  <Link to="/dashboard/movie-management">
    <button className="btn btn-outline btn-sm rounded-full gap-2">
      <HiOutlineFilm className="text-lg" />
      Movie Management
    </button>
  </Link>

  {/* System Badge */}
  <div className="badge badge-error gap-2 px-4 py-3 font-bold text-white">
    <HiOutlineShieldCheck /> System Secure
  </div>
</div>

        </header>

        {/* --- Admin Stats --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <motion.div whileHover={{ scale: 1.02 }} className="bg-teal-500 text-white p-8 rounded-[2.5rem] shadow-xl flex justify-between items-center">
            <div>
              <p className="text-sm uppercase font-bold opacity-80">Database Movies</p>
              <h2 className="text-5xl font-black">{stats.totalMovies}</h2>
            </div>
            <HiOutlineFilm className="text-7xl opacity-20" />
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} className="bg-gray-800 text-white p-8 rounded-[2.5rem] shadow-xl flex justify-between items-center">
            <div>
              <p className="text-sm uppercase font-bold opacity-80">Registered Users</p>
              <h2 className="text-5xl font-black">{stats.totalUsers}</h2>
            </div>
            <HiOutlineUsers className="text-7xl opacity-20" />
          </motion.div>
        </div>

        <div className="bg-base-200 rounded-[3rem] p-8 border border-base-300">
          <h3 className="text-2xl font-black mb-6 flex items-center gap-3">
            <HiOutlineFilm className="text-teal-500" /> Global Content Management
          </h3>
          <div className="overflow-x-auto">

                    {/* --- Quick Stats Chart --- */}
        <div className="bg-base-200 rounded-[3rem] p-8 border border-base-300 mb-12">
          <h3 className="text-2xl font-black mb-6">Quick Stats Overview</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#14B8A6" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>


            <table className="table w-full border-separate border-spacing-y-3">
              <thead>
                <tr className="text-xs uppercase opacity-50">
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
    
                {nonAdminUsers.map((user) => (
                  <tr key={user._id} className="bg-base-100 shadow-sm">
                    <td className="font-bold rounded-l-2xl">{user.name}</td>
                    <td className="text-xs opacity-70">{user.email}</td>
                    <td className="text-amber-500 font-bold"> {user.role}</td>
                    <td className="text-center rounded-r-2xl">
                      <button 
                        onClick={() => handleDeleteUsers(user._id)}
                        className="btn btn-circle btn-ghost text-error hover:bg-error/10"
                      >
                        <HiOutlineTrash size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;