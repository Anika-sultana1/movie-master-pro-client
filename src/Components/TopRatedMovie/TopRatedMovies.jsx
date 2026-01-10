import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import useAxios from '../../Hooks/useAxios';
import { Link } from 'react-router';
import { motion } from "framer-motion";

const TopRatedMovies = () => {
  const axios = useAxios();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get('/movies/top-rated')
      .then(res => setMovies(res.data))
      .catch(err => console.error(err));
  }, [axios]);

  return (
    <div className="p-6 mt-20 md:mt-28  bg-secondary">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-700">
    
          Top Rated Movies
     
      </h2>

      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }}
        spaceBetween={24}
        slidesPerView={1}
        navigation
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        pagination={{ clickable: true }}
      >
        {movies.map(movie => (
          <SwiperSlide key={movie._id}>
          <motion.div
                  key={movie._id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  className="relative group rounded-2xl overflow-hidden shadow-lg cursor-pointer"
                >
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100"></div>
                  <div className="absolute bottom-0 left-0 p-4 text-white w-full">
                    <h3 className="text-xl font-bold mb-1">{movie.title}</h3>
                    <div className="flex items-center gap-3 text-sm text-gray-300">

                   
                      <span className="flex items-center gap-1">
                      {movie.plotSummary || "----"}
                      </span>
                       
                    </div>
                <div className="card-actions justify-end">
      <button className="btn-primary w-full"><Link to={`/movies/${movie._id}`}>View movie details</Link></button>
    </div>
                  </div>
                </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TopRatedMovies;
