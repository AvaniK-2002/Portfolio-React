import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Loader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Timeout removed - controlled by parent App component for faster loading
    setTimeout(() => setLoading(false), 1500); // Quick fade out
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 flex items-center justify-center bg-[#0a0a0a] z-50"
        >
          <div className="relative flex items-center justify-center w-32 h-32">
            {/* Top Dot */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="absolute top-0 w-8 h-8 border-4 border-purple-500 rounded-full animate-glow"
            />
            {/* Bottom Dot */}
            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="absolute bottom-0 w-8 h-8 border-4 border-purple-500 rounded-full animate-glow"
            />
            {/* Left Dot */}
            <motion.div
              animate={{ x: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="absolute left-0 w-8 h-8 border-4 border-purple-500 rounded-full animate-glow"
            />
            {/* Right Dot */}
            <motion.div
              animate={{ x: [10, -10, 10] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="absolute right-0 w-8 h-8 border-4 border-purple-500 rounded-full animate-glow"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
