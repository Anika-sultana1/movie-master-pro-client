
import React, { useEffect, useState } from 'react';
import useAxios from '../../Hooks/useAxios'; 
import { HiUsers } from 'react-icons/hi';
import { PiFilmSlateFill } from 'react-icons/pi';




const StatsSection = () => {
    const axios = useAxios();
    const [stats, setStats] = useState({ totalMovies: 0, totalUsers: 0 });
  

    useEffect(() => {
       
        axios.get('/stats') 
            .then(res => {
                console.log('reslt', res)
                setStats(res.data); 
              
            })
           
    }, [axios]);


    return (
        <div className="py-16 bg-gray-900 text-white">
            <h2 className="text-3xl font-bold text-center mb-10 flex items-center justify-center gap-2 "><PiFilmSlateFill /> MovieMaster Pro - By The Numbers</h2>
            <div className="flex justify-center space-x-8 max-w-4xl mx-auto">
               <div  className="text-center p-6 bg-gray-800 rounded-xl shadow-lg w-64 transform transition duration-500 hover:scale-105  flex flex-col justify-center items-center">
                 <div className="text-5xl mb-2">
                     <img width="48" height="48" src="https://img.icons8.com/emoji/48/movie-camera-emoji.png" alt="movie-camera-emoji"/>
                   </div>
                
                 <h1 className="text-6xl font-extrabold text-teal-400">{stats.totalMovies}</h1>
                 <p className="text-lg mt-2 text-gray-400 uppercase tracking-widest">Total Movies</p>
               </div>
                <div  className="text-center p-6 bg-gray-800 rounded-xl shadow-lg w-64 transform transition duration-500 hover:scale-105 flex flex-col justify-center items-center">
                   <div className="text-5xl mb-2">
                    <HiUsers />
                   </div>
                   
                    <h1 className="text-6xl font-extrabold text-teal-400">{stats.totalUsers}</h1>
                    <p className="text-lg mt-2 text-gray-400 uppercase tracking-widest">Active Users</p>
                </div>
            </div>
        </div>
    );
};

export default StatsSection;