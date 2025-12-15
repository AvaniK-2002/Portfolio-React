import React from 'react';
import { motion } from 'framer-motion';
import { Code2 } from 'lucide-react';
import ParticlesBackground from '../components/ParticlesBackground';

function Skills() {
  const skills = [
    { name: 'Frontend Development', items: [
      { name: 'React', level: '80%' },
      { name: 'JavaScript', level: '90%' },
      { name: 'CSS', level: '85%' },
      { name: 'HTML', level: '95%' }
    ]},
    { name: 'Backend Development', items: [
      { name: 'Node.js', level: '70%' },
      { name: 'Python', level: '80%' },
      { name: 'Java', level: '70%' },
      { name: 'PHP', level: '70%' }
    ]},
    { name: 'Database & Cloud', items: [
      { name: 'MySQL', level: '85%' },
      { name: 'MongoDB', level: '80%' },
      
    ]},
    { name: 'Tools & Others', items: [
      { name: 'Figma', level: '80%' },
      { name: 'Git', level: '90%' },
      { name: 'Canva', level: '75%' },
      { name: 'Visual studio', level: '85%' }
    ]}
  ];

  return (
    <motion.section 
      className="min-h-screen relative bg-[#0a0a0a] pt-32 pb-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ParticlesBackground />
      <div className="container mx-auto px-8 relative">
        <motion.div 
          className="flex items-center gap-2 mb-16"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Code2 className="text-bpurple-200" size={28} />
          <h2 className="text-4xl font-bold text-white">Technical Skills</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {skills.map((category, categoryIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.2 }}
              className="relative bg-[#111] p-8 rounded-2xl shadow-lg border border-gray-600 
              before:absolute before:top-0 before:left-0 before:w-full before:h-full 
              before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent 
              before:opacity-0 before:transition-opacity before:duration-700 
              hover:before:opacity-100 hover:shadow-purple-500/50 hover:shadow-2xl"
            >
              <h3 className="text-2xl font-semibold mb-6 text-white">{category.name}</h3>
              <div className="space-y-6">
                {category.items.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: (categoryIndex * 0.2) + (index * 0.1) }}
                  >
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300">{skill.name}</span>
                      <span className="text-purple-300 font-medium">{skill.level}</span>
                    </div>
                    <div className="h-2 bg-gray-600 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-purple-400 to-blue-600 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: skill.level }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Continuously learning and adapting to new technologies, 
            I strive to maintain expertise across the full stack development spectrum.
          </p>
        </motion.div>
      </div>

      {/* Keyframes for the shine effect */}
      <style>
        {`
          @keyframes shine {
            0% { opacity: 0; transform: translateX(-100%); }
            50% { opacity: 0.4; }
            100% { opacity: 0; transform: translateX(100%); }
          }

          .hover\\:before\\:opacity-100:hover::before {
            animation: shine 2s infinite;
          }
        `}
      </style>
    </motion.section>
  );
}

export default Skills;
