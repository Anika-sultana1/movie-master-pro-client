import React from 'react';
import { motion } from 'framer-motion';
import HeroSection from '../HeroSections/HeroSection';
import Banner from '../Banner/Banner';
import StatsSection from '../StatesSection/StateSection';
import TopRatedMovies from '../TopRatedMovie/TopRatedMovies';
import RecentlyAdded from '../RecentlyAdded/RecentlyAdded';
import GenreSection from '../Genre/GenreSection';
import AboutPlatform from '../AboutPlatform/About';
import Services from '../ExtraSections/Services';
import Blog from '../ExtraSections/Blog';
import PrivacyPollicy from '../ExtraSections/PrivacyPollicy';
import Contact from '../ExtraSections/Contact';
import Cookie from '../ExtraSections/Cookie';
import Testimonials from '../ExtraSections/Testimonial';
import Newsletter from '../ExtraSections/NewsLetter';

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

const Home = () => {
  return (
    <div className="bg-secondary">
<title>MOVIEMASTERpro | Home</title>
      <motion.div id="banner" initial="hidden" animate="visible" variants={fadeInUp}>
        <Banner />
      </motion.div>

      <motion.div id="hero" initial="hidden" whileInView="visible" variants={fadeInUp} viewport={{ once: true }}>
        <HeroSection />
      </motion.div>

      <motion.div id="stats" initial="hidden" whileInView="visible" variants={fadeInUp} viewport={{ once: true }}>
        <StatsSection />
      </motion.div>

      <motion.div id="topRated" initial="hidden" whileInView="visible" variants={fadeInUp} viewport={{ once: true }}>
        <TopRatedMovies />
      </motion.div>

      <motion.div id="recent" initial="hidden" whileInView="visible" variants={fadeInUp} viewport={{ once: true }}>
        <RecentlyAdded />
      </motion.div>

      <motion.div id="genre" initial="hidden" whileInView="visible" variants={fadeInUp} viewport={{ once: true }}>
        <GenreSection />
      </motion.div>

      <motion.div id="about" initial="hidden" whileInView="visible" variants={fadeInUp} viewport={{ once: true }}>
        <AboutPlatform />
      </motion.div>

      <motion.div id="services" initial="hidden" whileInView="visible" variants={fadeInUp} viewport={{ once: true }}>
        <Services />
      </motion.div>

      <motion.div id="blog" initial="hidden" whileInView="visible" variants={fadeInUp} viewport={{ once: true }}>
        <Blog />
      </motion.div>

      <motion.div id="testimonial" initial="hidden" whileInView="visible" variants={fadeInUp} viewport={{ once: true }}>
        <Testimonials></Testimonials>
      </motion.div>
      <motion.div id="news-letter" initial="hidden" whileInView="visible" variants={fadeInUp} viewport={{ once: true }}>
        <Newsletter></Newsletter>
      </motion.div>
      <motion.div id="contact" initial="hidden" whileInView="visible" variants={fadeInUp} viewport={{ once: true }}>
        <Contact />
      </motion.div>


    </div>
  );
};

export default Home;
