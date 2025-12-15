import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, ExternalLink, Eye, Star, ArrowRight, Palette, Figma, Smartphone, Monitor, Sparkles, Layers, Zap } from 'lucide-react';
import ParticlesBackground from '../components/ParticlesBackground';
import { ConstellationBackground, FloatingParticles } from '../components/WOWEffects';
import { 
  useScrollReveal, 
  useResponsiveAnimation, 
  useMagnetic,
  useIntersection 
} from '../hooks/useAnimations';
import { 
  revealVariants, 
  staggerContainer, 
  staggerItem, 
  cardHoverVariants,
  microInteractionVariants,
  modalVariants,
  imageHoverVariants,
  textVariants
} from '../lib/animations';

// Enhanced Project Card Component with Shared Layout Transitions
const ProjectCard = ({ project, index, onViewDetails }) => {
  const { isMobile, reducedMotion } = useResponsiveAnimation();
  const { ref: cardRef, isInView } = useScrollReveal();
  const { ref: magneticRef, position, handleMouseMove, handleMouseLeave } = useMagnetic(0.2);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const isEven = index % 2 === 0;
  const categoryColors = {
    'Mobile App': 'from-pink-500 to-rose-500',
    'Web App': 'from-blue-500 to-cyan-500',
    'Design System': 'from-purple-500 to-violet-500',
    'Creative': 'from-green-500 to-emerald-500'
  };

  return (
    <motion.div
      ref={cardRef}
      className={`flex flex-col ${
        isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
      } gap-8 lg:gap-12 items-center group`}
      variants={revealVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ delay: index * 0.15 }}
      layout
    >
      {/* IMAGE SECTION with enhanced interactions */}
      <motion.div
        ref={magneticRef}
        className="flex-1 relative cursor-pointer overflow-hidden rounded-3xl"
        style={{
          x: position.x * (isMobile ? 0.3 : 0.8),
          y: position.y * (isMobile ? 0.3 : 0.8),
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => onViewDetails(project)}
        variants={cardHoverVariants}
        initial="rest"
        whileHover="hover"
        whileTap="tap"
        layout
      >
        <motion.div
          className="relative overflow-hidden rounded-3xl shadow-2xl"
          layoutId={`project-image-${index}`}
        >
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-3xl"
            variants={imageHoverVariants}
            initial="rest"
            whileHover="hover"
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
          
          {/* Enhanced overlay with animated gradient */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent rounded-3xl"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          />
          
          {/* Floating project category badge */}
          <motion.div
            className={`absolute top-4 left-4 px-4 py-2 bg-gradient-to-r ${
              categoryColors[project.category] || 'from-purple-500 to-blue-500'
            } text-white text-sm font-medium rounded-full shadow-lg backdrop-blur-sm`}
            initial={{ opacity: 0, y: -20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            {project.category}
          </motion.div>
        </motion.div>
        
        {/* Floating action buttons */}
        <AnimatePresence>
          {(isInView || !reducedMotion) && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100"
              initial={{ opacity: 0, scale: 0.8 }}
              whileHover={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4 }}
            >
              <motion.div
                className="flex gap-4"
                variants={staggerContainer}
                initial="hidden"
                whileHover="visible"
              >
                <motion.button
                  className="p-4 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300 border border-white/20"
                  variants={staggerItem}
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Eye size={24} />
                </motion.button>
                {project.live && (
                  <motion.a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300 border border-white/20"
                    variants={staggerItem}
                    whileHover={{ scale: 1.2, rotate: -10 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink size={24} />
                  </motion.a>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced hover glow effect */}
        <motion.div
          className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          animate={{
            scale: [1, 1.02, 1],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </motion.div>

      {/* CONTENT SECTION with enhanced animations */}
      <motion.div 
        className="flex-1 space-y-6"
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ delay: 0.2 + index * 0.1 }}
      >
        <motion.div variants={staggerItem}>
          <motion.h3 
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 group-hover:text-purple-200 transition-colors leading-tight"
            whileHover={{ x: 8 }}
            transition={{ duration: 0.3 }}
          >
            {project.title}
          </motion.h3>
          
          <motion.p 
            className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6"
            variants={staggerItem}
          >
            {project.description}
          </motion.p>
        </motion.div>

        {/* Enhanced Tech Stack with animated badges */}
        <motion.div 
          className="flex flex-wrap gap-3"
          variants={staggerItem}
        >
          {project.tech.map((tech, techIndex) => (
            <motion.span
              key={tech}
              className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 
                       text-purple-200 rounded-full text-sm font-medium border border-purple-500/30
                       hover:from-purple-500/30 hover:to-blue-500/30 transition-all duration-300
                       backdrop-blur-sm cursor-default"
              whileHover={{ 
                scale: 1.1,
                boxShadow: "0 0 20px rgba(168, 85, 247, 0.4)",
                y: -2
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + techIndex * 0.1 }}
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>

        {/* Enhanced Action Button */}
        <motion.div 
          className="pt-4"
          variants={staggerItem}
        >
          {project.live && (
            <motion.a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 
                       text-white rounded-xl font-medium hover:from-purple-700 hover:to-blue-700 
                       transition-all duration-300 shadow-lg hover:shadow-xl group"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 30px rgba(168, 85, 247, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Figma size={20} className="group-hover:rotate-12 transition-transform duration-300" />
              <span>View Design</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowRight size={16} />
              </motion.span>
            </motion.a>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// Enhanced Modal Component for Project Details
const ProjectModal = ({ project, isOpen, onClose }) => {
  const { ref: modalRef, isInView } = useIntersection(0.5);
  
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* Enhanced backdrop with blur */}
          <motion.div
            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          
          {/* Modal Content */}
          <motion.div
            ref={modalRef}
            className="relative bg-gray-900/95 backdrop-blur-lg border border-purple-500/30 rounded-3xl 
                     max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            layoutId={`project-modal-${project.id}`}
          >
            {/* Modal Header */}
            <motion.div 
              className="sticky top-0 z-10 p-6 border-b border-purple-500/20 bg-gray-900/95 backdrop-blur-lg rounded-t-3xl"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                    {project.title}
                  </h2>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-purple-600/20 text-purple-200 rounded-full text-sm border border-purple-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <motion.button
                  onClick={onClose}
                  className="p-3 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ✕
                </motion.button>
              </div>
            </motion.div>

            {/* Modal Body */}
            <motion.div 
              className="p-6 space-y-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {/* Project Image */}
              <motion.div
                className="relative overflow-hidden rounded-2xl"
                layoutId={`project-image-${project.id}`}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 sm:h-80 lg:h-96 object-cover"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
              </motion.div>

              {/* Project Details */}
              <div className="grid md:grid-cols-2 gap-8">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <Palette className="text-purple-400" size={20} />
                    Design Highlights
                  </h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start gap-2">
                      <Star className="text-yellow-400 mt-1 flex-shrink-0" size={16} />
                      <span>User-centered design approach with extensive research</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Star className="text-yellow-400 mt-1 flex-shrink-0" size={16} />
                      <span>Responsive design across all device sizes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Star className="text-yellow-400 mt-1 flex-shrink-0" size={16} />
                      <span>Accessible design following WCAG guidelines</span>
                    </li>
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <Zap className="text-blue-400" size={20} />
                    Key Features
                  </h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start gap-2">
                      <Sparkles className="text-purple-400 mt-1 flex-shrink-0" size={16} />
                      <span>Intuitive user interface with seamless interactions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Sparkles className="text-purple-400 mt-1 flex-shrink-0" size={16} />
                      <span>Modern design language with consistent visual hierarchy</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Sparkles className="text-purple-400 mt-1 flex-shrink-0" size={16} />
                      <span>Optimized for performance and user experience</span>
                    </li>
                  </ul>
                </motion.div>
              </div>
              
              {/* Action Buttons */}
              <motion.div 
                className="flex gap-4 pt-6 border-t border-purple-500/20"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {project.live && (
                  <motion.a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 
                             text-white rounded-xl font-medium hover:from-purple-700 hover:to-blue-700 
                             transition-all duration-300 shadow-lg hover:shadow-xl"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink size={20} />
                    View Full Design
                  </motion.a>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Enhanced Section Component
const Section = ({ title, subtitle, projects, onViewDetails }) => (
  <motion.div 
    className="max-w-7xl mx-auto space-y-16 lg:space-y-32"
    variants={staggerContainer}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
  >
    <motion.div className="text-center mb-12 lg:mb-20" variants={staggerItem}>
      <motion.h2 
        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        {title}
      </motion.h2>
      <motion.p 
        className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed"
        variants={staggerItem}
      >
        {subtitle}
      </motion.p>
    </motion.div>

    {projects.map((project, index) => (
      <ProjectCard
        key={project.title}
        project={project}
        index={index}
        onViewDetails={onViewDetails}
      />
    ))}
  </motion.div>
);

function Project2() {
  const [selectedProject, setSelectedProject] = useState(null);
  const { isMobile, reducedMotion } = useResponsiveAnimation();

  const uiuxProjects = [
    {
      id: 1,
      title: 'Ice Cream Ordering App UI',
      description:
        'A delightful mobile app UI design for an ice cream ordering experience. Features complete user journey including home screen, product customization, checkout, and order success. Designed with soft gradients, playful 3D visuals, and intuitive interactions.',
      image: `${import.meta.env.BASE_URL}/Images/Projects/Ice cream ordering app UI showcase.png`,
      tech: ['Figma', 'UI Design', 'Mobile UX', 'Prototyping'],
      live: 'https://www.figma.com/design/COBYso1RDa5ZiRDrPDzR4g/Frozia?m=auto&t=PMsmNYggQsLxDJYG-6',
      category: 'Mobile App'
    },
    {
      id: 2,
      title: 'Tailor Craft – Custom Suit App UI',
      description:
        'An advanced fashion-tech UI concept that allows users to design custom suits. Includes fabric selection, design studio, monogram customization, virtual try-on, and an AI tailoring assistant. Designed in both dark and light themes with premium aesthetics.',
      image: `${import.meta.env.BASE_URL}/Images/Projects/tailor.png`,
      tech: ['Figma', 'UX Research', 'Design Systems', 'Mobile Design'],
      live: 'https://www.figma.com/design/wDdPghAQHRSNTu7BCn6fTZ/Untitled?m=auto&t=PMsmNYggQsLxDJYG-6',
      category: 'Mobile App'
    },
    {
      id: 3,
      title: 'Portfolio UI/UX Design',
      description:
        'A personal portfolio design created in Figma to showcase UI/UX work, prototypes, and case studies with a clean and modern layout. Features responsive design patterns and interactive elements.',
      image: `${import.meta.env.BASE_URL}/Images/Projects/port.png`,
      tech: ['Figma', 'Portfolio Design', 'Responsive Layout'],
      live: 'https://www.figma.com/design/LG1Njly9Uo3aziEGimorCS/Untitled',
      category: 'Design System'
    },
    {
      id: 4,
      title: 'Clavent – Fintech Conference Website UI',
      description:
        'A modern landing page UI design for a Fintech Conference event. Focuses on clear information hierarchy, strong CTA placement, and professional branding suitable for fintech audiences. Includes event highlights, speakers, sponsors, and registration flow.',
      image: `${import.meta.env.BASE_URL}/Images/Projects/fintech.png`,
      tech: ['UI Design', 'Event Website', 'Responsive Layout', 'Canva'],
      live: 'https://www.canva.com/design/DAGjIGVSuV4/baN2qk3AEciZu2h7GbPCKg/edit',
      category: 'Web App'
    },
    {
      id: 5,
      title: 'Course Management Dashboard UI',
      description:
        'A comprehensive dashboard UI design for course and student management, emphasizing clarity, admin usability, and structured data visualization. Features modern card layouts and intuitive navigation patterns.',
      image: `${import.meta.env.BASE_URL}/Images/Projects/dashboard (1).png`,
      tech: ['Figma', 'Dashboard Design', 'Data Visualization', 'Admin UI'],
      live: 'https://www.figma.com/design/2p18wM9IC7zqWyydpT5q1l',
      category: 'Web App'
    },
    {
      id: 6,
      title: 'My Paintings – Creative UI',
      description:
        'A creative portfolio design showcasing digital paintings and artwork with expressive visuals and interactive presentation. Designed to highlight artistic creativity with immersive gallery experiences.',
      image: `${import.meta.env.BASE_URL}/Images/Projects/paint.png`,
      tech: ['Canva', 'Creative Design', 'Gallery Layout', 'Art Portfolio'],
      live: 'https://www.canva.com/design/DAF3Wp8-CC8/1qvE-JJEjSzP873B5OAgjA/edit',
      category: 'Creative'
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
      {!isMobile && <ConstellationBackground nodeCount={30} />}
      {!isMobile && !reducedMotion && <FloatingParticles count={25} />}

      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      <div className="relative pt-32 pb-32 px-4 sm:px-8 space-y-20 lg:space-y-40">
        
        {/* Enhanced Header Section */}
        <motion.div
          className="text-center mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div
            className="flex items-center justify-center gap-4 mb-6"
            variants={staggerItem}
          >
            <motion.div
              className="p-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-lg"
              whileHover={{ 
                scale: 1.1, 
                rotate: 360,
                boxShadow: "0 0 30px rgba(168, 85, 247, 0.6)"
              }}
              transition={{ duration: 0.6 }}
            >
              <Palette className="text-white w-8 h-8" />
            </motion.div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-tight">
              <motion.span
                variants={textVariants}
                custom={0}
                className="inline-block mr-3 gradient-text"
              >
                UI/UX
              </motion.span>
              <motion.span
                variants={textVariants}
                custom={1}
                className="inline-block"
              >
                Projects
              </motion.span>
            </h1>
          </motion.div>
          
          <motion.p
            variants={textVariants}
            custom={2}
            className="text-lg sm:text-xl text-purple-300 max-w-3xl mx-auto leading-relaxed"
          >
            A curated collection of UI/UX design projects showcasing user flows, visual systems, 
            and creative problem-solving across various domains and platforms.
          </motion.p>
        </motion.div>

        {/* Projects Grid */}
        <div className="space-y-32">
          <Section
            
            projects={uiuxProjects}
            onViewDetails={setSelectedProject}
          />
        </div>

        {/* Enhanced Call to Action */}
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="relative overflow-hidden rounded-3xl p-8 lg:p-12"
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-3xl"
              animate={{
                background: [
                  "linear-gradient(135deg, rgba(147, 51, 234, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%)",
                  "linear-gradient(135deg, rgba(236, 72, 153, 0.2) 0%, rgba(147, 51, 234, 0.2) 100%)",
                  "linear-gradient(135deg, rgba(147, 51, 234, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%)"
                ]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <div className="relative bg-gray-900/50 backdrop-blur-sm border border-purple-500/30 rounded-3xl p-8">
              <motion.div
                className="inline-flex p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6"
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Layers className="text-white" size={32} />
              </motion.div>
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                Love what you see?
              </h2>
              <p className="text-purple-200 text-lg leading-relaxed mb-6">
                These designs represent my passion for creating meaningful user experiences. 
                Let's collaborate to bring your vision to life with thoughtful design and attention to detail.
              </p>
              <motion.a
                href="mailto:avkulkrni2002@gmail.com"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 
                         text-white rounded-xl font-medium hover:from-purple-700 hover:to-pink-700 
                         transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Let's Work Together</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight size={20} />
                </motion.span>
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />

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

export default Project2;
