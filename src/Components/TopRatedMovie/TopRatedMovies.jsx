import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import useAxios from '../../Hooks/useAxios';
import { Link } from 'react-router';
import { FaStar } from 'react-icons/fa';

const TopRatedMovies = () => {
  const axios = useAxios();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get('/movies/top-rated')
      .then(res => setMovies(res.data))
      .catch(err => console.error(err));
  }, [axios]);

  return (
    <div className="p-6  bg-gray-100">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-700">
        <span className="inline-block mt-10 bg-gradient-to-r from-teal-400 to-blue-500 text-white px-4 py-2 rounded-full shadow-lg">
          Top Rated Movies
        </span>
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
            <div className="bg-white h-[400px] rounded-2xl shadow-xl overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer">
              <div className="relative h-[220px]">
                <img 
                  src={movie.posterUrl} 
                  alt={movie.title} 
                  className="object-cover h-full w-full rounded-t-2xl transition-transform duration-500 hover:scale-110" 
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white font-semibold text-lg">
                  {movie.title}
                </div>
              </div>

              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-bold text-gray-800">{movie.title}</h3>
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black text-sm font-semibold px-3 py-1 rounded-full shadow">
                    <FaStar></FaStar> {movie.rating || "N/A"}
                  </span>
                </div>
                <p className="text-sm text-gray-600 line-clamp-3 mb-4">{movie.plotSummary}</p>
                <Link to={`/movies/${movie._id}`}>
                  <button className="w-full py-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg shadow transition-all">
                    View Movie Details
                  </button>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TopRatedMovies;
