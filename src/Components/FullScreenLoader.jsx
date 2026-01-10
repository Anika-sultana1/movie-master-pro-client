import React from "react";
import { motion } from "framer-motion";

const FullScreenLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-secondary backdrop-blur-sm">
      <title>MOVIEMASTERpro | Loading</title>
      <motion.div
        className="w-20 h-20 border-4 border-t-primary border-b-primary rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
      ></motion.div>

    </div>
  );
};

export default FullScreenLoader;
