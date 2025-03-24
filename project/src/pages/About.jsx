import React from 'react';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import { Parallax } from 'react-parallax';

function About() {
  return (
    <Parallax
      blur={0}
      bgImage="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80"
      strength={200}
      className="min-h-screen"
    >
      <motion.section 
        className="min-h-screen relative text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Dark Overlay for better readability */}
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative pt-32 pb-20 px-8">
          <motion.div 
            className="flex items-center gap-2 mb-12"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <User className="text-blue-400" size={28} />
            <h2 className="text-4xl font-bold">About Me</h2>
          </motion.div>

          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              <motion.p 
                className="text-xl leading-relaxed"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                🚀 Passionate Software Developer with expertise in full-stack web development, 
                specializing in React, Node.js, .NET, and SQL. I thrive on crafting scalable, 
                efficient, and secure applications that deliver seamless user experiences. With a keen eye for detail and performance optimization, 
                I turn complex challenges into innovative solutions.
              </motion.p>
              <motion.p 
                className="text-xl leading-relaxed"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                💡 Technology excites me, and I love exploring new trends, 
                contributing to open-source, and refining my skills to stay ahead. 
                Whether it's building dynamic web applications, optimizing backend architecture, 
                or enhancing UI/UX, I’m always ready to create impactful digital experiences.


              </motion.p>
              <motion.div
                className="flex gap-4 flex-wrap"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {['React', 'Python', 'JavaScript ', 'MongoDB', 'SQL Server'].map((tech, index) => (
                  <motion.span
                    key={tech}
                    className="px-4 py-2 bg-purple-700 text-white rounded-full font-medium"
                    whileHover={{ scale: 1.05 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>

            <motion.div 
              className="space-y-8"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {[
                { label: 'Name', value: 'Avani Kulkarni' },
                { label: 'Email', value: 'avkulkrni2002@gmail.com' },
                { label: 'Location', value: 'Nanded' },
                { label: 'Experience', value: 'Fresher' },
                { label: 'Availability', value: 'Open to opportunities' }
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  className="group"
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <div className="flex items-center gap-4 p-4 bg-white/20 rounded-xl shadow-md hover:bg-white/30 transition-all duration-300">
                    <div className="w-32 font-semibold">{item.label}:</div>
                    <div>{item.value}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>
    </Parallax>
  );
}

export default About;
