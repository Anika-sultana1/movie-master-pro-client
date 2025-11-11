import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import useAxios from '../../Hooks/useAxios';
import { Link } from 'react-router';

const TopRatedMovies = () => {
  const axios = useAxios();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get('/movies/top-rated')
      .then(res => setMovies(res.data))
      .catch(err => console.error(err));
  }, [axios]);

  return (
    <div className="p-4 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4 text-center my-10">Top Rated Movies</h2>
      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }}
        spaceBetween={20}
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
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-[180px] bg-gray-300 flex items-center justify-center">
                <img src={movie.posterUrl} alt={movie.title} className="object-cover h-full w-full" />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-bold">{movie.title}</h3>
                  <span className="bg-yellow-400 text-black text-sm font-semibold px-2 py-1 rounded">
                    Ratings: {movie.rating}
                  </span>
                </div>
                <p className="text-sm text-gray-700 line-clamp-3 mb-3">{movie.plotSummary}</p>
                <Link to={`/movies/${movie._id}`}><button className="btn btn-primary w-full">View Movie Details</button></Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TopRatedMovies;
