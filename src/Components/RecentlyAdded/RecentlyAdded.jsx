import React, { useEffect, useState } from 'react';
import useAxios from '../../Hooks/useAxios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Parallax, Pagination, Navigation, Autoplay } from 'swiper/modules';
import { motion } from "framer-motion";
import { Link } from 'react-router';

const RecentlyAdded = () => {
  const axios = useAxios();
  const [recentlyAdded, setRecentlyAdded] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0); 

  useEffect(() => {
    axios
      .get('/movies/recentlyAdded')
      .then(result => setRecentlyAdded(result.data))
      .catch(err => console.log(err));
  }, [axios]);

  return (
    <div className="px-5 py-5">
      <h1 className="text-xl bg-black rounded-r-2xl w-[200px]  text-gray-400 font-bold p-2 my-2 ">Recently Added</h1>

      <Swiper
        speed={600}
        parallax={true}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Parallax, Pagination, Navigation, Autoplay]}
          autoplay={{
          delay: 2000,
          disableOnInteraction: false, 
        }}
        className="mySwiper"
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
      >
        {recentlyAdded.map((movie) => (
          <SwiperSlide key={movie._id}>
            <div
              className="w-full h-[400px] md:h-[500px] rounded-2xl bg-cover bg-center relative"
              style={{ backgroundImage: `url(${movie.posterUrl})` }}
              data-swiper-parallax="-23%"
            >
              <div className="absolute inset-0 bg-black/40 rounded-2xl flex flex-col justify-end p-6">
                
                
                <motion.h2
                  key={activeIndex} 
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1.5 }}
                  className="text-3xl md:text-5xl font-bold text-white mb-2"
                  data-swiper-parallax="-300"
                >
                  {movie.title}
                </motion.h2>

               
                <motion.p
                  key={activeIndex + "-p"}
                  initial={{ x: -200, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1.5, delay: 0.3 }}
                  className="text-white mb-4"
                  data-swiper-parallax="-200"
                >
                  {movie.plotSummary}
                </motion.p>

             
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
                  whileHover={{ scale: 1.1, rotate: 3 }}
                  whileTap={{ scale: 0.9 }}
                  className="btn-primary w-full max-w-xs"
                  data-swiper-parallax="-100"
                >
                  <Link to={`/movies/${movie._id}`}>View movie details</Link>
                </motion.button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default RecentlyAdded;
