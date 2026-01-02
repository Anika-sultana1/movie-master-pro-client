import React from "react";
import { motion } from "framer-motion";

const FullScreenLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <motion.div
        className="w-20 h-20 border-4 border-t-teal-500 border-b-teal-300 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
      ></motion.div>
     <span className="loading loading-spinner loading-xl text-center"></span>
    </div>
  );
};

export default FullScreenLoader;
