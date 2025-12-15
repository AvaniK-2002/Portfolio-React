import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, useAnimation } from 'framer-motion';
import { 
  Code2, 
  Globe, 
  Server, 
  Database, 
  Cloud, 
  Zap,
  ArrowDown,
  Star,
  Github,
  ExternalLink,
  BookOpen,
  Cpu,
  Layers,
  Sparkles,
  Award,
  TrendingUp
} from 'lucide-react';
import ParticlesBackground from '../components/ParticlesBackground';

function Skills() {
  const containerRef = useRef(null);
  const timelineRef = useRef(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [hoveredMilestone, setHoveredMilestone] = useState(null);
  const controls = useAnimation();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const timelineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const timelineOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  const milestones = [
    {
      id: 'foundations',
      title: 'Foundations',
      subtitle: 'Building the Core',
      icon: BookOpen,
      color: 'from-purple-400 to-blue-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
      position: 'left',
      year: '2020',
      description: 'Mastering the fundamental building blocks of web development',
      skills: [
        { name: 'JavaScript', level: 'Expert', projects: 'E-commerce Platform, Portfolio Sites' },
        { name: 'Python', level: 'Advanced', projects: 'Data Analysis Scripts, Automation Tools' },
        { name: 'HTML5', level: 'Expert', projects: 'Semantic Markup, Accessibility Features' },
        { name: 'CSS3', level: 'Advanced', projects: 'Responsive Layouts, Animations' }
      ]
    },
    {
      id: 'frontend',
      title: 'Frontend Mastery',
      subtitle: 'Crafting Beautiful Interfaces',
      icon: Globe,
      color: 'from-blue-400 to-cyan-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30',
      position: 'right',
      year: '2021',
      description: 'Creating modern, responsive user experiences with cutting-edge frameworks',
      skills: [
        { name: 'React', level: 'Expert', projects: 'Dashboard Applications, SPA Development' },
        { name: 'Next.js', level: 'Advanced', projects: 'SEO-Optimized Sites, Server-Side Rendering' },
        { name: 'Tailwind CSS', level: 'Advanced', projects: 'Utility-First Styling, Design Systems' }
      ]
    },
    {
      id: 'backend',
      title: 'Backend Systems',
      subtitle: 'Building Robust APIs',
      icon: Server,
      color: 'from-purple-500 to-violet-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
      position: 'left',
      year: '2022',
      description: 'Developing scalable server-side applications and RESTful APIs',
      skills: [
        { name: 'Node.js', level: 'Advanced', projects: 'REST APIs, Real-time Applications' },
        { name: 'Express.js', level: 'Advanced', projects: 'Middleware Development, API Routing' },
        { name: 'Flask', level: 'Intermediate', projects: 'Micro-services, API Prototyping' }
      ]
    },
    {
      id: 'databases',
      title: 'Databases',
      subtitle: 'Data Architecture',
      icon: Database,
      color: 'from-cyan-400 to-blue-500',
      bgColor: 'bg-cyan-500/10',
      borderColor: 'border-cyan-500/30',
      position: 'right',
      year: '2022',
      description: 'Designing efficient data models and optimizing database performance',
      skills: [
        { name: 'MongoDB', level: 'Advanced', projects: 'Document Stores, Aggregation Pipelines' },
        { name: 'MySQL', level: 'Advanced', projects: 'Relational Data Modeling, Query Optimization' }
      ]
    },
    {
      id: 'devops',
      title: 'DevOps & Practices',
      subtitle: 'Production Excellence',
      icon: Cloud,
      color: 'from-purple-600 to-blue-600',
      bgColor: 'bg-purple-600/10',
      borderColor: 'border-purple-600/30',
      position: 'left',
      year: '2023',
      description: 'Implementing modern deployment strategies and development workflows',
      skills: [
        { name: 'Git', level: 'Expert', projects: 'Version Control, Branch Strategies' },
        { name: 'CI/CD', level: 'Intermediate', projects: 'GitHub Actions, Automated Testing' },
        { name: 'Deployment', level: 'Advanced', projects: 'Vercel, Netlify, Docker' }
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const milestoneVariants = {
    hidden: (direction) => ({
      opacity: 0,
      x: direction === 'left' ? -150 : 150,
      scale: 0.8,
      rotateY: direction === 'left' ? -15 : 15
    }),
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180, opacity: 0 },
    visible: {
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: 0.3
      }
    }
  };

  const skillVariants = {
    hidden: { opacity: 0, y: 20, x: -10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  const timelineDotVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: i * 0.2 + 0.5,
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    })
  };

  return (
    <motion.section 
      ref={containerRef}
      className="min-h-screen relative bg-[#0a0a0a] overflow-hidden pt-20 pb-10"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <ParticlesBackground />
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Perfect Header with proper spacing */}
        <motion.div
          className="text-center mb-16 pt-8"
        >
          <motion.div 
            className="flex items-center justify-center gap-4 mb-6"
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <motion.div 
              className="p-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl shadow-lg"
              animate={{ 
                boxShadow: [
                  "0 0 20px rgba(128, 0, 128, 0.3)",
                  "0 0 40px rgba(128, 0, 128, 0.5)",
                  "0 0 20px rgba(128, 0, 128, 0.3)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Cpu className="text-white md:w-8 md:h-8 w-6 h-6" />
            </motion.div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
              Developer Journey
            </h2>
          </motion.div>
          
          <motion.p
            className="text-gray-300 max-w-3xl mx-auto text-base md:text-lg leading-relaxed px-4"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            A timeline of my technical evolution, from fundamental concepts to advanced full-stack development
          </motion.p>
        </motion.div>

        {/* Timeline Container - Responsive */}
        <div className="max-w-7xl mx-auto relative mb-12 md:mb-20">
          
          {/* Desktop Timeline Line - Hidden on mobile/tablet */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1" style={{ height: 'calc(100% - 2rem)' }}>
            <div className="w-full h-full bg-gradient-to-b from-purple-700 via-blue-600 to-purple-700 rounded-full opacity-30" />
            <motion.div
              className="w-full bg-gradient-to-b from-purple-400 via-blue-400 to-purple-400 rounded-full shadow-lg"
              style={{
                height: timelineHeight,
                boxShadow: "0 0 20px rgba(128, 0, 128, 0.5)"
              }}
            />
          </div>

          {/* Mobile/Tablet Timeline Line - Vertical layout */}
          <div className="md:hidden absolute left-6 top-0 bottom-0 w-1">
            <div className="w-full h-full bg-gradient-to-b from-purple-700 via-blue-600 to-purple-700 rounded-full opacity-30" />
            <motion.div
              className="w-full bg-gradient-to-b from-purple-400 via-blue-400 to-purple-400 rounded-full shadow-lg"
              style={{
                height: timelineHeight,
                boxShadow: "0 0 20px rgba(128, 0, 128, 0.5)"
              }}
            />
          </div>

          {/* Timeline Milestones - Responsive Layout */}
          <div className="space-y-12 md:space-y-24 py-4 md:py-8">
            {milestones.map((milestone, index) => {
              const IconComponent = milestone.icon;
              const isLeft = milestone.position === 'left';
              
              return (
                <motion.div
                  key={milestone.id}
                  className="relative flex items-center"
                  variants={milestoneVariants}
                  custom={milestone.position}
                  onHoverStart={() => setHoveredMilestone(milestone.id)}
                  onHoverEnd={() => setHoveredMilestone(null)}
                >
                  {/* Desktop Timeline Node - Centered */}
                  <motion.div
                    className="hidden md:block absolute left-1/2 transform -translate-x-1/2 z-10"
                    variants={timelineDotVariants}
                    custom={index}
                  >
                    <motion.div
                      className={`p-3 lg:p-4 ${milestone.bgColor} rounded-full border-2 ${milestone.borderColor} backdrop-blur-sm relative`}
                      whileHover={{
                        scale: 1.2,
                        rotate: 360,
                        boxShadow: "0 0 30px rgba(128, 0, 128, 0.6)"
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <IconComponent className={`text-transparent bg-gradient-to-r ${milestone.color} bg-clip-text`} size={24} />
                      
                      <motion.div
                        className={`absolute inset-0 rounded-full bg-gradient-to-r ${milestone.color} opacity-20`}
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.2, 0, 0.2]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.3
                        }}
                      />
                    </motion.div>
                  </motion.div>

                  {/* Mobile/Tablet Timeline Node - Left aligned */}
                  <motion.div
                    className="md:hidden absolute left-6 transform -translate-x-1/2 z-10"
                    variants={timelineDotVariants}
                    custom={index}
                  >
                    <motion.div
                      className={`p-2 ${milestone.bgColor} rounded-full border-2 ${milestone.borderColor} backdrop-blur-sm relative`}
                      whileHover={{
                        scale: 1.2,
                        rotate: 360,
                        boxShadow: "0 0 30px rgba(128, 0, 128, 0.6)"
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <IconComponent className={`text-transparent bg-gradient-to-r ${milestone.color} bg-clip-text`} size={16} />
                      
                      <motion.div
                        className={`absolute inset-0 rounded-full bg-gradient-to-r ${milestone.color} opacity-20`}
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.2, 0, 0.2]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.3
                        }}
                      />
                    </motion.div>
                  </motion.div>

                  {/* Milestone Card - Responsive */}
                  <motion.div
                    className={`
                      w-full group cursor-pointer
                      ${isLeft ? 'md:mr-auto md:pr-16' : 'md:ml-auto md:pl-16'}
                      md:max-w-md ml-12 md:ml-0
                    `}
                    whileHover={{
                      scale: 1.02,
                      y: -4,
                      rotateY: isLeft ? 2 : -2
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30
                    }}
                  >
                    <div className={`
                      relative bg-white/10 backdrop-blur-sm border-2 ${milestone.borderColor} rounded-xl md:rounded-2xl
                      p-4 md:p-6 lg:p-8
                      hover:bg-white/20 transition-all duration-500
                      ${hoveredMilestone === milestone.id ? 'shadow-2xl shadow-purple-500/30' : ''}
                    `}>
                      
                      {/* Card Header - Responsive */}
                      <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-6">
                        <motion.div
                          className={`p-2 md:p-3 ${milestone.bgColor} rounded-lg md:rounded-xl relative overflow-hidden flex-shrink-0`}
                          whileHover={{
                            rotate: [0, -10, 10, 0],
                            scale: 1.1
                          }}
                          transition={{ duration: 0.5 }}
                        >
                          <IconComponent className={`text-transparent bg-gradient-to-r ${milestone.color} bg-clip-text md:w-5 md:h-5 w-4 h-4`} />
                          
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                            initial={{ x: "-100%" }}
                            whileHover={{
                              x: "100%",
                              transition: { duration: 0.6 }
                            }}
                          />
                        </motion.div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 md:gap-3 mb-2">
                            <h3 className="text-lg md:text-xl font-semibold text-white group-hover:text-purple-200 transition-colors leading-tight">
                              {milestone.title}
                            </h3>
                            <motion.span
                              className="text-xs px-2 md:px-3 py-1 bg-purple-600/50 text-purple-200 rounded-full border border-purple-500/30 w-fit"
                              whileHover={{ scale: 1.1, backgroundColor: "rgba(147, 51, 234, 0.7)" }}
                            >
                              {milestone.year}
                            </motion.span>
                          </div>
                          <p className="text-sm text-gray-300 mb-2 font-medium">
                            {milestone.subtitle}
                          </p>
                          <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
                            {milestone.description}
                          </p>
                        </div>
                      </div>

                      {/* Enhanced Skills List - Responsive */}
                      <div className="space-y-3 md:space-y-4">
                        <div className="flex items-center gap-2 mb-3 md:mb-4">
                          <Star className="text-yellow-400 md:w-4 md:h-4 w-3 h-3" />
                          <span className="text-sm md:text-sm font-medium text-gray-200">Skills & Projects</span>
                        </div>
                        
                        {milestone.skills.map((skill, skillIndex) => (
                          <motion.div
                            key={skill.name}
                            variants={skillVariants}
                            custom={skillIndex}
                            className="group/skill"
                            onHoverStart={() => setHoveredSkill(skill.name)}
                            onHoverEnd={() => setHoveredSkill(null)}
                          >
                            <div className="flex items-start justify-between mb-2 gap-2">
                              <span className="text-sm md:text-sm font-medium text-gray-100 group-hover/skill:text-white transition-colors leading-tight">
                                {skill.name}
                              </span>
                              <motion.span
                                className={`
                                  text-xs px-2 md:px-3 py-1 rounded-full font-medium flex-shrink-0
                                  ${skill.level === 'Expert' ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-yellow-900' :
                                    skill.level === 'Advanced' ? 'bg-gradient-to-r from-purple-400 to-blue-400 text-white' :
                                    'bg-gradient-to-r from-blue-400 to-cyan-400 text-blue-900'
                                  }
                                `}
                                whileHover={{ scale: 1.1 }}
                              >
                                {skill.level}
                              </motion.span>
                            </div>
                            
                            <p className="text-xs md:text-xs text-gray-400 mb-3 group-hover/skill:text-gray-300 transition-colors leading-relaxed">
                              {skill.projects}
                            </p>
                            
                            {/* Enhanced hover effect for project details */}
                            {hoveredSkill === skill.name && (
                              <motion.div
                                initial={{ opacity: 0, height: 0, y: -10 }}
                                animate={{ opacity: 1, height: 'auto', y: 0 }}
                                exit={{ opacity: 0, height: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="mt-3 p-3 md:p-4 bg-purple-900/30 rounded-lg border border-purple-500/30 backdrop-blur-sm"
                              >
                                <div className="flex items-center gap-2 mb-2 md:mb-3">
                                  <Github size={12} className="text-purple-400 md:w-3.5 md:h-3.5 w-3 h-3" />
                                  <span className="text-xs text-purple-300 font-medium">Real-world applications</span>
                                  <ExternalLink size={10} className="text-purple-400 md:w-3 md:h-3 w-2.5 h-2.5" />
                                </div>
                                <p className="text-xs text-gray-300 leading-relaxed">
                                  Applied in production environments with measurable impact on user experience and system performance.
                                </p>
                                
                                {/* Animated progress indicator */}
                                <motion.div
                                  className="mt-2 md:mt-3 h-1 bg-gray-700 rounded-full overflow-hidden"
                                  initial={{ width: 0 }}
                                  animate={{ width: "100%" }}
                                  transition={{ duration: 0.5, delay: 0.1 }}
                                >
                                  <motion.div
                                    className={`h-full bg-gradient-to-r ${milestone.color} rounded-full`}
                                    initial={{ width: 0 }}
                                    animate={{ width: "85%" }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                  />
                                </motion.div>
                              </motion.div>
                            )}
                          </motion.div>
                        ))}
                      </div>

                      {/* Enhanced Hover Glow Effect */}
                      <motion.div 
                        className={`
                          absolute inset-0 bg-gradient-to-br ${milestone.color} opacity-0 
                          group-hover:opacity-10 transition-opacity duration-500 rounded-2xl
                        `}
                        whileHover={{ opacity: 0.15 }}
                      />
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        
      </div>
    </motion.section>
  );
}

export default Skills;
