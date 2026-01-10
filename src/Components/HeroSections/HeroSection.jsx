import { useEffect, useState } from "react";
import useAxios from "../../Hooks/useAxios";
import SingleMovie from "./SingleMovie";
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import FullScreenLoader from "../FullScreenLoader";

const HeroSection = () => {
  const axios = useAxios();
  const [movies, setMovies] = useState([]);
const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    axios.get('/movies')
      .then(res => {
        setLoading(false)
    
        setMovies(res.data);
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      });
  }, [axios]);

  return (


    <div className="w-full my-20 md:my-28">
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
          loop:true
        }}
         modules={[EffectCoverflow, Pagination, Autoplay]}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false, 
        }}
        pagination={{ clickable: true }}
       
        className="mySwiper  "
      >
        {
        movies.map(movie => (
          <SwiperSlide key={movie._id} style={{ width: "300px" }}>
            <SingleMovie movie={movie} />
          </SwiperSlide>
        ))
        }
      </Swiper>
      {
  loading && <FullScreenLoader></FullScreenLoader>
}
    </div>
  );
};

export default HeroSection;
