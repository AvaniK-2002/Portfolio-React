import React from 'react';
import { motion } from 'framer-motion';
import ParticlesBackground from '../components/ParticlesBackground';

function Home() {
  return (
    <motion.div 
      className="min-h-screen relative overflow-hidden bg-[#0a0a0a]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ParticlesBackground />
      
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      
      {/* Added space below navbar */}
      <motion.section className="relative min-h-screen flex items-center justify-center px-8 pt-24">
        <div className="max-w-7xl w-full mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
            
            {/* Left Content */}
            <motion.div 
              className="lg:flex-1 w-full relative z-10 text-center lg:text-left"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mb-8"
              >
                <motion.h2 
                  className="text-2xl text-purple-400 font-medium mb-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  👋 Welcome to my portfolio
                </motion.h2>
                <motion.h1 
                  className="text-5xl lg:text-7xl font-bold mb-6 text-white text-glow"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Hi, I'm <span className="gradient-text">Avani Kulkarni</span>
                  <br />Software Developer
                </motion.h1>
                <motion.p 
                  className="text-xl text-purple-200 max-w-2xl mx-auto lg:mx-0"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  I craft beautiful and functional web experiences with modern technologies. 
                  Specializing in creating responsive and user-friendly applications.
                </motion.p>

                {/* 🚀 Download Resume Button */}
                <motion.a
  href={`${import.meta.env.BASE_URL}Images/AVANI_KULKARNI_8975810845.pdf`}  
  download="Avani_Kulkarni_Resume.pdf"
  className="mt-8 inline-block px-6 py-3 text-lg font-semibold 
             text-white bg-purple-600 rounded-lg shadow-lg 
             hover:bg-purple-700 transition-all duration-300 
             animate-glow border-2 border-purple-500"
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
>
  📄 Download Resume
</motion.a>
              </motion.div>
            </motion.div>

            {/* Right Image Section with Amoeba Shape */}
            <motion.div 
              className="lg:flex-1 w-full max-w-6xl relative"  
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="relative flex justify-center items-center">
                {/* Glowing Effect (Directly Under Image, No Gaps) */}
                <motion.div 
                  className="absolute w-[350px] h-[350px] rounded-full bg-purple-500 
                             blur-[40px] opacity-75 transition-all duration-300 
                             hover:blur-[90px] hover:opacity-100" 
                />

                {/* Extra Large Profile Image (Perfect Overlap) */}
                <motion.img 
                  src={`${import.meta.env.BASE_URL}Images/images.png`}    
                  alt="Profile"
                  className="relative z-10 w-[420px] h-[420px] object-cover rounded-full"
                  whileHover={{ scale: 1.08 }}  // Bigger Zoom on Hover
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>

          </div>
        </div>
      </motion.section>

      {/* CSS Included Inside JSX */}
      <style jsx>{`
        /* Shine effect on hover */
        @keyframes shine {
          0% { filter: brightness(1); }
          100% { filter: brightness(1.3); }
        }
        .hover\\:animate-shine:hover {
          animation: shine 0.5s ease-in-out forwards;
        }
        .animate-glow {
          box-shadow: 0 0 15px rgba(128, 0, 128, 0.7);
        }
      `}</style>

    </motion.div>
  );
}

export default Home;
