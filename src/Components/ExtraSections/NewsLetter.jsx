import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IoPaperPlaneOutline } from "react-icons/io5";
import { toast } from 'react-toastify';

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      toast.success("Thank you for subscribing! ");
      setEmail("");
    }
  };

  return (
    <section className="py-20 px-6 ">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-teal-500 to-teal-700 p-8 md:p-16 text-white shadow-2xl shadow-teal-500/20"
      >
     
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-black/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
          
      
          <div className="text-center lg:text-left max-w-xl">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-5xl font-black italic mb-4"
            >
              Don't Miss the <br /> <span className="text-teal-100 underline">Next Premiere!</span>
            </motion.h2>
            <p className="text-teal-50 opacity-90 text-lg">
              Subscribe to our newsletter and get the latest updates on top-rated movies, 
              exclusive reviews, and cinephile news directly to your inbox.
            </p>
          </div>

      
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="w-full max-w-md bg-white/10 backdrop-blur-md p-2 rounded-[2rem] border border-white/20"
          >
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                required
                placeholder="Enter your email address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-transparent px-6 py-4 outline-none text-white placeholder:text-teal-100 font-medium"
              />
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="bg-white text-teal-600 font-black px-8 py-4 rounded-2xl flex items-center justify-center gap-2 transition-all hover:bg-teal-50"
              >
                Join Now <IoPaperPlaneOutline className="text-xl" />
              </motion.button>
            </form>
          </motion.div>
        </div>

        <p className="text-center mt-12 text-teal-100/60 text-xs font-bold tracking-widest uppercase">
          NO SPAM. ONLY PURE CINEMATIC MAGIC.
        </p>
      </motion.div>
    </section>
  );
};

export default Newsletter;