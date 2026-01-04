import React, { useEffect, useState } from 'react';
import useAxios from '../../Hooks/useAxios'; 
import { HiUsers } from 'react-icons/hi';
import { PiFilmSlateFill } from 'react-icons/pi';
import { motion } from 'framer-motion';

const StatsSection = () => {
    const axios = useAxios();
    const [stats, setStats] = useState({ totalMovies: 0, totalUsers: 0 });

    useEffect(() => {
        axios.get('/stats') 
            .then(res => {
                setStats(res.data); 
            })
            .catch(err => console.error(err));
    }, [axios]);

    return (
        <section className="pt-20  text-white">
            <h2 className="text-2xl sm:text-3xl font-bold mb-12 flex items-center justify-center gap-3 text-teal-400">
                <PiFilmSlateFill className="text-4xl animate-pulse" /> MovieMaster Pro - By The Numbers
            </h2>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-8 max-w-5xl mx-auto">
                {/* Total Movies */}
                <motion.div 
                    className="text-center p-8 rounded-2xl shadow-2xl w-64 bg-gradient-to-br from-teal-500 to-blue-500 transform transition-transform hover:scale-105"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <img 
                        src="https://img.icons8.com/emoji/48/movie-camera-emoji.png" 
                        alt="Movies" 
                        className="mx-auto mb-4 w-12 h-12"
                    />
                    <motion.h1
                        className="text-6xl font-extrabold text-white"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        {stats.totalMovies}
                    </motion.h1>
                    <p className="mt-2 text-gray-100 uppercase tracking-widest font-semibold">Total Movies</p>
                </motion.div>

                {/* Total Users */}
                <motion.div
                    className="text-center p-8 rounded-2xl shadow-2xl w-64 bg-gradient-to-br from-purple-500 to-pink-500 transform transition-transform hover:scale-105"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                >
                    <HiUsers className="mx-auto mb-4 w-12 h-12 text-white" />
                    <motion.h1
                        className="text-6xl font-extrabold text-white"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        {stats.totalUsers}
                    </motion.h1>
                    <p className="mt-2 text-gray-100 uppercase tracking-widest font-semibold">Active Users</p>
                </motion.div>
            </div>
        </section>
    );
};

export default StatsSection;
