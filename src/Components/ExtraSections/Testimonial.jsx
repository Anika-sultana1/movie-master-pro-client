import React from 'react';
import { motion } from 'framer-motion';
import { HiStar } from 'react-icons/hi2';
import { FaQuoteLeft } from 'react-icons/fa';

const testimonials = [
  {
    id: 1,
    name: "Zubair Ahmed",
    role: "Movie Critic",
    image: "https://i.pravatar.cc/150?u=1",
    comment: "This platform is a game changer for cinephiles. Managing my collection has never been this smooth and aesthetic!",
    rating: 5
  },
  {
    id: 2,
    name: "Sara Islam",
    role: "Content Creator",
    image: "https://i.pravatar.cc/150?u=2",
    comment: "The UI is incredibly intuitive. I love how I can filter movies by genre and ratings so easily. Highly recommended!",
    rating: 4
  },
  {
    id: 3,
    name: "Rakib Hossain",
    role: "Casual Viewer",
    image: "https://i.pravatar.cc/150?u=3",
    comment: "The watchlist feature helps me keep track of my weekend plans. The dark mode is just the cherry on top!",
    rating: 5
  }
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-base-100 overflow-hidden pt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-teal-500 font-bold tracking-[0.3em] uppercase text-xs"
          >
            User Feedback
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black italic mt-3 dark:text-white"
          >
            What Our <span className="text-teal-500">Cinephiles</span> Say
          </motion.h2>
        </div>

      
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              whileHover={{ y: -10 }}
              className="relative bg-base-200 dark:bg-gray-800 p-8 rounded-[2.5rem] border border-base-300 dark:border-gray-700 shadow-xl group"
            >
     
              <div className="absolute top-6 right-8 text-teal-500/10 text-6xl group-hover:text-teal-500/20 transition-colors">
                <FaQuoteLeft />
              </div>

   
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <HiStar 
                    key={i} 
                    className={`text-lg ${i < item.rating ? "text-amber-400" : "text-gray-300"}`} 
                  />
                ))}
              </div>


              <p className="text-gray-600 dark:text-gray-300 italic mb-8 relative z-10 leading-relaxed">
                "{item.comment}"
              </p>

    
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl overflow-hidden ring-4 ring-teal-500/20">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-black text-gray-900 dark:text-white">{item.name}</h4>
                  <p className="text-xs font-bold text-teal-500 uppercase tracking-widest">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;