import { useEffect, useState } from "react";
import useAxios from "../../Hooks/useAxios";
import SingleMovie from "./SingleMovie";
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper/modules';

const HeroSection = () => {
  const axios = useAxios();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get('/movies')
      .then(res => {
        console.log('data is', res.data);
        setMovies(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="w-full py-10">
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{ clickable: true }}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        {movies.map(movie => (
          <SwiperSlide key={movie._id} style={{ width: "300px" }}>
            <SingleMovie movie={movie} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSection;
