import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useAxios from "../../Hooks/useAxios";

const AllMovies = () => {
    const axios = useAxios();
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        axios
            .get("/movies")
            .then((result) => {
                console.log(result.data);
                setMovies(result.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [axios]);

    return (
        <section className="pt-24 pb-20 bg-gray-100 min-h-screen">
            <div className="max-w-6xl mx-auto px-6">

                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl font-bold text-center mb-10 text-gray-900"
                >
                    All <span className="text-teal-600">Movies</span>
                </motion.h2>


                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {movies.map((movie, index) => (
                        <motion.div
                            key={movie._id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05, duration: 0.5 }}
                            whileHover={{ scale: 1.05 }}
                            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
                        >
                            <img
                                src={movie.posterUrl}
                                alt={movie.title}
                                className="w-full h-64 object-cover"
                            />

                            <div className="p-5 flex flex-col flex-grow">
                                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                                    {movie.title}
                                </h3>
                                <p className="text-gray-600 text-sm flex-grow">
                                    {movie.plotSummary?.length > 100
                                        ? movie.plotSummary.slice(0, 100) + "..."
                                        : movie.plotSummary}
                                </p>
                                <button className="mt-4 w-full py-2 bg-teal-600 text-white font-medium rounded-xl hover:bg-teal-700 transition">
                                    View Details
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>


                {movies.length === 0 && (
                    <p className="text-center text-gray-500 mt-16">
                        No movies found. Please add some to your database.
                    </p>
                )}
            </div>
        </section>
    );
};

export default AllMovies;
