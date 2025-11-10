import React from "react";
import { motion } from "framer-motion";
import { FaFilm, FaStar, FaCloudDownloadAlt, FaUserFriends } from "react-icons/fa";

const AboutPlatform = () => {
  return (
    <section className="py-20 bg-gray-100 text-gray-800">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-6 text-gray-900"
        >
          About <span className="text-teal-600">MovieMaster Pro</span>
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="max-w-3xl mx-auto mb-12 text-lg text-gray-600"
        >
          MovieMaster Pro is a cutting-edge movie platform that helps you discover,
          explore, and manage your favorite movies with ease. From the latest blockbusters
          to timeless classics — everything you love, all in one place.
        </motion.p>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: <FaFilm />, title: "Vast Library", desc: "Access thousands of movies across all genres." },
            { icon: <FaStar />, title: "Top Rated Picks", desc: "Discover trending and critically acclaimed films." },
            { icon: <FaCloudDownloadAlt />, title: "Offline Mode", desc: "Save your favorites and watch anytime." },
            { icon: <FaUserFriends />, title: "Community", desc: "Join a community of movie lovers worldwide." },
          ].map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 150 }}
              className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg"
            >
              <div className="text-4xl text-teal-600 mb-3 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutPlatform;
