import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ParticlesBackground from "../components/ParticlesBackground";

const roles = [
  "Software Developer",
  "Full Stack Web Developer",
  "UI / UX Focused Engineer",
];

function Home() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const heading = "Hi, I’m Avani Kulkarni";

  return (
    <motion.div
      className="min-h-screen relative overflow-hidden bg-[#0a0a0a]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <ParticlesBackground />

      {/* HERO */}
      <section className="min-h-screen flex items-center px-8 pt-24">
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-20 items-center">

          {/* LEFT CONTENT */}
          <div className="space-y-10 text-center lg:text-left">

            {/* STAGGERED HEADING */}
            <h1 className="text-5xl lg:text-7xl font-extrabold text-white leading-tight">
              {heading.split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ y: 30, opacity: 0, filter: "blur(6px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  transition={{
                    delay: i * 0.12,
                    duration: 0.8,
                    ease: "easeOut",
                  }}
                  className={`inline-block mr-3 ${
                    word === "Avani" || word === "Kulkarni"
                      ? "gradient-text"
                      : ""
                  }`}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            {/* ROLE FADE */}
            <div className="h-8 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={roleIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.6 }}
                  className="text-xl text-purple-300 tracking-wide"
                >
                  {roles[roleIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-lg text-gray-300 max-w-xl mx-auto lg:mx-0"
            >
              I build clean, modern, and user-focused web experiences using
              React, backend technologies, and thoughtful UI design.
            </motion.p>

            <motion.a
              href={`${import.meta.env.BASE_URL}/Images/Avani_Kulkarni_resume.pdf`}
              download
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-8 py-4 rounded-xl 
                         bg-purple-600 text-white font-semibold
                         shadow-[0_0_30px_rgba(168,85,247,0.5)]
                         transition-colors hover:bg-purple-700"
            >
              Download Resume
            </motion.a>
          </div>

          {/* RIGHT IMAGE WITH INTERACTIVITY */}
          <div className="relative flex justify-center items-center">

            {/* BASE GLOW */}
            <motion.div
              className="absolute w-[360px] h-[360px] rounded-full 
                         bg-purple-500/40 blur-[120px]"
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* FLOATING + INTERACTIVE IMAGE */}
            <motion.img
              src={`${import.meta.env.BASE_URL}Images/images.png`}
              alt="Avani Kulkarni"
              className="relative z-10 w-[420px] h-[420px] 
                         object-cover rounded-3xl cursor-pointer"
              animate={{
                y: [0, -28, 0],
                x: [0, 14, 0],
                rotate: [0, 1.5, 0],
              }}
              whileHover={{
                scale: 1.06,
                rotate: 0,
              }}
              whileTap={{ scale: 0.97 }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

        </div>
      </section>

      {/* STYLES */}
      <style jsx>{`
        .gradient-text {
          background: linear-gradient(
            120deg,
            #a855f7,
            #ec4899,
            #a855f7
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 6s linear infinite;
        }

        @keyframes shimmer {
          0% {
            background-position: 0% center;
          }
          100% {
            background-position: 200% center;
          }
        }
      `}</style>
    </motion.div>
  );
}

export default Home;
