import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Briefcase, MapPin, Mail, Phone, Calendar, Award, Target, Zap } from 'lucide-react';
import ParticlesBackground from '../components/ParticlesBackground';
import { FloatingParticles, ConstellationBackground } from '../components/WOWEffects';
import { 
  useScrollReveal, 
  useResponsiveAnimation, 
  useMagnetic, 
  useParallax,
  useSectionScroll,
  useIntersection 
} from '../hooks/useAnimations';
import { 
  revealVariants, 
  staggerContainer, 
  staggerItem, 
  cardHoverVariants,
  microInteractionVariants,
  timelineVariants,
  textVariants,
  gradientVariants
} from '../lib/animations';

function About() {
  const { isMobile, reducedMotion } = useResponsiveAnimation();
  const { ref: heroRef, isInView: heroInView } = useScrollReveal();
  const { ref: parallaxRef, offsetY } = useParallax(30);
  const { ref: magneticRef, position, handleMouseMove, handleMouseLeave } = useMagnetic(0.2);
  const { ref: skillsRef, isInView: skillsInView } = useIntersection(0.3);
  const { activeSection } = useSectionScroll();

  const personalInfo = [
    { label: 'Name', value: 'Avani Kulkarni', icon: User },
    { label: 'Email', value: 'avkulkrni2002@gmail.com', icon: Mail },
    { label: 'Location', value: 'Nanded, India', icon: MapPin },
    { label: 'Experience', value: 'Associate Level', icon: Award },
    { label: 'Availability', value: 'Open to Opportunities', icon: Target }
  ];

  const techStack = [
    'React.js', 'Next.js', 'TypeScript', 'Node.js', 'Express.js', 
    'MongoDB', 'Python', 'Flask', 'Git', 'CI/CD', 'Tailwind CSS', 'Framer Motion'
  ];

  const experiences = [
    {
      title: 'Web Developer',
      company: 'Ajinkya Creatiion Pvt Ltd',
      period: 'Sep 2024 – Present',
      type: 'Full-time',
      color: 'from-purple-500 to-blue-500',
      achievements: [
        'Built and maintained 5+ full-stack web applications using React.js, Next.js, Node.js, Express.js, and MongoDB',
        'Implemented CI/CD pipelines using GitHub Actions and deployed applications on Vercel and Netlify, reducing release time by 40%',
        'Worked on internal systems including Warehouse Management, CRM, and Employee Management applications',
        'Took ownership of features from development to deployment with 100% uptime'
      ],
      skills: ['React.js', 'Next.js', 'Node.js', 'MongoDB', 'CI/CD']
    },
    {
      title: 'Web Developer Intern',
      company: 'Abell Electro-Soft Technologies Pvt. Ltd.',
      period: 'Jan 2025 – Jul 2025',
      type: 'Internship',
      color: 'from-blue-500 to-cyan-500',
      achievements: [
        'Designed 20+ UI screens for dashboards, authentication, and workflows',
        'Improved user navigation efficiency by 25% through UI and layout optimization',
        'Collaborated with a 4-member agile team to deliver sprint-based UI fixes',
        'Created responsive designs that increased mobile user engagement by 30%'
      ],
      skills: ['UI/UX Design', 'React', 'Responsive Design', 'Agile']
    },
    {
      title: 'Web Developer Intern',
      company: 'CodeClause',
      period: 'Sep 2023 – Oct 2023',
      type: 'Internship',
      color: 'from-cyan-500 to-purple-500',
      achievements: [
        'Developed 3 responsive websites using HTML, CSS, and JavaScript',
        'Improved page load speed by 30% through performance optimization',
        'Followed Git branching standards, reducing merge conflicts by 30%',
        'Implemented SEO best practices that improved search rankings by 40%'
      ],
      skills: ['HTML/CSS', 'JavaScript', 'Performance Optimization', 'SEO']
    }
  ];

  const highlights = [
    {
      icon: Zap,
      title: 'Performance Expert',
      description: 'Optimized applications achieving 95+ Lighthouse scores',
      color: 'text-yellow-400'
    },
    {
      icon: Target,
      title: 'User-Focused',
      description: '25% improvement in user navigation efficiency',
      color: 'text-green-400'
    },
    {
      icon: Award,
      title: 'Quality Deliverer',
      description: '100% feature ownership from development to deployment',
      color: 'text-purple-400'
    }
  ];

  return (
    <motion.div
      className="min-h-screen relative overflow-hidden bg-[#0a0a0a]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <ParticlesBackground />
      {!isMobile && <ConstellationBackground nodeCount={25} />}
      {!isMobile && !reducedMotion && <FloatingParticles count={15} />}

      {/* Enhanced Hero Section */}
      <section 
        ref={heroRef}
        className="min-h-screen flex items-center px-4 sm:px-8 pt-20 sm:pt-24"
      >
        <div className="max-w-7xl mx-auto w-full">
          
          {/* Animated Header */}
          <motion.div
            className="text-center mb-16"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="flex items-center justify-center gap-4 mb-6"
              variants={staggerItem}
            >
              <motion.div
                className="p-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl shadow-lg"
                whileHover={{ 
                  scale: 1.1, 
                  rotate: 360,
                  boxShadow: "0 0 30px rgba(168, 85, 247, 0.6)"
                }}
                transition={{ duration: 0.6 }}
              >
                <User className="text-white w-8 h-8" />
              </motion.div>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-tight">
                <motion.span
                  variants={textVariants}
                  custom={0}
                  className="inline-block mr-3 gradient-text"
                >
                  About
                </motion.span>
                <motion.span
                  variants={textVariants}
                  custom={1}
                  className="inline-block"
                >
                  Me
                </motion.span>
              </h1>
            </motion.div>
            
            <motion.p
              variants={textVariants}
              custom={2}
              className="text-lg sm:text-xl text-purple-300 max-w-3xl mx-auto leading-relaxed"
            >
              Associate Software Developer passionate about creating exceptional user experiences 
              and building scalable solutions that make a real impact.
            </motion.p>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            
            {/* Left Content - Story & Tech Stack */}
            <motion.div 
              className="space-y-8"
              variants={staggerContainer}
              initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
            >
              <motion.div variants={staggerItem}>
                <motion.h2 
                  className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full" />
                  My Journey
                </motion.h2>
                
                <div className="space-y-6">
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl blur opacity-20"
                      animate={{ 
                        opacity: [0.2, 0.4, 0.2],
                        scale: [1, 1.02, 1]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                    <div className="relative bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6">
                      <p className="text-gray-300 leading-relaxed mb-4">
                        🚀 Associate Software Developer with hands-on experience in building,
                        deploying, and maintaining full-stack web applications using React.js, 
                        Next.js, TypeScript, Node.js, Express.js, and Flask. I focus on writing
                        clean, scalable code, creating responsive user interfaces, and integrating
                        reliable backend APIs to deliver real-world solutions.
                      </p>
                      <p className="text-gray-300 leading-relaxed">
                        I've worked on multiple internal systems such as Warehouse Management,
                        CRM, and Employee Management applications, taking ownership of features 
                        end-to-end. My experience includes CI/CD automation using GitHub Actions,
                        modern deployment platforms like Vercel and Netlify, and collaborative
                        development in agile team environments.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Enhanced Tech Stack */}
              <motion.div variants={staggerItem}>
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Zap className="text-purple-400" size={20} />
                  Tech Stack
                </h3>
                <motion.div 
                  className="flex flex-wrap gap-3"
                  variants={staggerContainer}
                >
                  {techStack.map((tech, index) => (
                    <motion.span
                      key={tech}
                      className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 
                               text-purple-200 rounded-full text-sm font-medium border border-purple-500/30
                               hover:from-purple-500/30 hover:to-blue-500/30 transition-all duration-300
                               backdrop-blur-sm"
                      variants={staggerItem}
                      whileHover={{ 
                        scale: 1.1,
                        boxShadow: "0 0 20px rgba(168, 85, 247, 0.4)",
                        y: -2
                      }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>

              {/* Highlights Section */}
              <motion.div variants={staggerItem}>
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Award className="text-purple-400" size={20} />
                  Key Highlights
                </h3>
                <div className="grid gap-4">
                  {highlights.map((highlight, index) => (
                    <motion.div
                      key={highlight.title}
                      className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-purple-500/20
                               hover:bg-white/10 transition-all duration-300 group cursor-pointer"
                      whileHover={{ 
                        scale: 1.02, 
                        y: -2,
                        boxShadow: "0 10px 30px rgba(168, 85, 247, 0.2)"
                      }}
                      variants={staggerItem}
                    >
                      <motion.div
                        className={`p-3 bg-white/10 rounded-xl ${highlight.color}`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <highlight.icon size={24} />
                      </motion.div>
                      <div>
                        <h4 className="font-semibold text-white group-hover:text-purple-200 transition-colors">
                          {highlight.title}
                        </h4>
                        <p className="text-sm text-gray-400">{highlight.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Right Content - Personal Info */}
            <motion.div 
              className="space-y-8"
              variants={staggerContainer}
              initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
            >
              {/* Profile Image with Magnetic Effect */}
              <motion.div 
                ref={magneticRef}
                className="relative flex justify-center cursor-pointer"
                style={{
                  x: position.x * (isMobile ? 0.5 : 1),
                  y: position.y * (isMobile ? 0.5 : 1),
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                variants={staggerItem}
              >
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-3xl blur-xl"
                    animate={{ 
                      opacity: [0.3, 0.6, 0.3],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <img
                    src={`${import.meta.env.BASE_URL}Images/about.png`}
                    alt="Avani Kulkarni"
                    className="relative w-64 h-64 sm:w-80 sm:h-80 object-cover rounded-3xl shadow-2xl"
                  />
                  
                  {/* Floating status indicator */}
                  <motion.div
                    className="absolute -bottom-4 -right-4 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      boxShadow: [
                        "0 0 0 0 rgba(34, 197, 94, 0.7)",
                        "0 0 0 10px rgba(34, 197, 94, 0)",
                        "0 0 0 0 rgba(34, 197, 94, 0)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="w-6 h-6 bg-green-400 rounded-full" />
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Personal Information Cards */}
              <motion.div 
                className="space-y-4"
                variants={staggerContainer}
              >
                {personalInfo.map((info, index) => (
                  <motion.div
                    key={info.label}
                    className="group cursor-pointer"
                    variants={staggerItem}
                    whileHover={{ scale: 1.02, x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm border border-purple-500/20 rounded-xl 
                                   hover:bg-white/10 hover:border-purple-500/40 transition-all duration-300">
                      <motion.div
                        className="p-2 bg-purple-500/20 rounded-lg text-purple-400"
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <info.icon size={20} />
                      </motion.div>
                      <div className="flex-1">
                        <div className="text-sm text-gray-400">{info.label}</div>
                        <div className="text-white font-medium group-hover:text-purple-200 transition-colors">
                          {info.value}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Experience Timeline */}
      <motion.section 
        className="py-20 px-4 sm:px-8"
        ref={parallaxRef}
        style={{ y: offsetY * 0.05 }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2 
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6"
              variants={staggerItem}
            >
              Professional Journey
            </motion.h2>
            <motion.p 
              className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed"
              variants={staggerItem}
            >
              A timeline of my growth as a developer, from learning fundamentals to delivering enterprise solutions
            </motion.p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <motion.div
              className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 via-blue-500 to-purple-500 rounded-full"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: "easeOut" }}
            />

            {/* Experience Items */}
            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.company}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                >
                  {/* Timeline Dot */}
                  <motion.div
                    className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rounded-full border-4 border-purple-500 z-10"
                    whileHover={{ scale: 1.5, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  />

                  {/* Content Card */}
                  <motion.div
                    className={`w-full md:w-5/12 ml-12 md:ml-0 ${
                      index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'
                    }`}
                    whileHover={{ 
                      scale: 1.02,
                      y: -5,
                      boxShadow: "0 20px 40px rgba(168, 85, 247, 0.3)"
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="bg-gray-900/80 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6 hover:bg-gray-900/90 transition-all duration-300">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-white mb-1">{exp.title}</h3>
                          <p className="text-purple-300 font-medium">{exp.company}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Calendar size={16} className="text-gray-400" />
                            <span className="text-sm text-gray-400">{exp.period}</span>
                            <span className={`px-2 py-1 text-xs rounded-full bg-gradient-to-r ${exp.color} text-white`}>
                              {exp.type}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Achievements */}
                      <ul className="space-y-2 mb-4">
                        {exp.achievements.map((achievement, achIndex) => (
                          <motion.li
                            key={achIndex}
                            className="flex items-start gap-2 text-gray-300"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: achIndex * 0.1 }}
                          >
                            <span className="text-purple-400 mt-1.5 text-xs">▶</span>
                            <span className="text-sm leading-relaxed">{achievement}</span>
                          </motion.li>
                        ))}
                      </ul>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill, skillIndex) => (
                          <motion.span
                            key={skill}
                            className="px-3 py-1 bg-purple-500/20 text-purple-200 rounded-full text-xs border border-purple-500/30"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: skillIndex * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

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

        @media (prefers-reduced-motion: reduce) {
          .gradient-text {
            animation: none;
          }
        }
      `}</style>
    </motion.div>
  );
}

export default About;
