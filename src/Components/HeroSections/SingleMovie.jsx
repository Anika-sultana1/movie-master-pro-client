import React from 'react';
import { Link } from 'react-router';
import { motion } from "framer-motion";

const SingleMovie = ({movie}) => {

const {title, posterUrl,plotSummary} = movie;


    return (
 <motion.div
                  key={movie._id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  className="relative group rounded-2xl overflow-hidden shadow-lg cursor-pointer"
                >
                  <img
                    src={posterUrl}
                    alt={title}
                    className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100"></div>
                  <div className="absolute bottom-0 left-0 p-4 text-white w-full">
                    <h3 className="text-xl font-bold mb-1">{title}</h3>
                    <div className="flex items-center gap-3 text-sm text-gray-300">

                   
                      <span className="flex items-center gap-1">
                      {plotSummary || "----"}
                      </span>
                       
                    </div>
                <div className="card-actions justify-end">
      <button className="btn-primary w-full"><Link to={`/movies/${movie._id}`}>View movie details</Link></button>
    </div>
                  </div>
                </motion.div>
    );
};

export default SingleMovie;