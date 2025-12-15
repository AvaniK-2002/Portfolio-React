import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, ExternalLink, Github, Eye, Star, ArrowRight } from 'lucide-react';
import ParticlesBackground from '../components/ParticlesBackground';
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
  imageHoverVariants
} from '../lib/animations';

// Enhanced Project Card Component with Shared Layout Transitions
const ProjectCard = ({ project, index, onViewDetails }) => {
  const { isMobile, reducedMotion } = useResponsiveAnimation();
  const { ref: cardRef, isInView } = useScrollReveal();
  const { ref: magneticRef, position, handleMouseMove, handleMouseLeave } = useMagnetic(0.2);
  
  const isEven = index % 2 === 0;

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
        className="flex-1 relative cursor-pointer overflow-hidden rounded-2xl"
        style={{
          x: position.x * (isMobile ? 0.5 : 1),
          y: position.y * (isMobile ? 0.5 : 1),
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
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-2xl shadow-2xl"
          variants={imageHoverVariants}
          layoutId={`project-image-${index}`}
        />
        
        {/* Enhanced overlay with gradient and blur */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-transparent to-transparent rounded-2xl"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Floating action buttons */}
        <AnimatePresence>
          {(isInView || !reducedMotion) && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100"
              initial={{ opacity: 0, scale: 0.8 }}
              whileHover={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="flex gap-4"
                variants={staggerContainer}
                initial="hidden"
                whileHover="visible"
              >
                <motion.button
                  className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                  variants={staggerItem}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Eye size={20} />
                </motion.button>
                {project.github && (
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                    variants={staggerItem}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Github size={20} />
                  </motion.a>
                )}
                {project.live && (
                  <motion.a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                    variants={staggerItem}
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink size={20} />
                  </motion.a>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Project type badge */}
        <motion.div
          className="absolute top-4 left-4 px-3 py-1 bg-purple-600/80 backdrop-blur-sm rounded-full text-white text-sm font-medium"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 + index * 0.1 }}
        >
          {project.category || 'Project'}
        </motion.div>
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
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 group-hover:text-purple-200 transition-colors"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
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
              className="px-3 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 
                       text-purple-200 rounded-full text-sm font-medium border border-purple-500/30
                       hover:from-purple-500/30 hover:to-blue-500/30 transition-all duration-300"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 15px rgba(168, 85, 247, 0.4)"
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + techIndex * 0.1 }}
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>

        {/* Enhanced Action Buttons */}
        <motion.div 
          className="flex gap-6 pt-4"
          variants={staggerItem}
        >
          {project.github && (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors group"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <Github size={20} className="group-hover:text-purple-400 transition-colors" />
              <span>View Code</span>
              <motion.span
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.a>
          )}
          {project.live && (
            <motion.a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors group"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <ExternalLink size={20} className="group-hover:text-blue-400 transition-colors" />
              <span>Live Demo</span>
              <motion.span
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
              >
                →
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
          {/* Backdrop with blur */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          
          {/* Modal Content */}
          <motion.div
            ref={modalRef}
            className="relative bg-gray-900/95 backdrop-blur-sm border border-purple-500/30 rounded-3xl 
                     max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            layoutId={`project-modal-${project?.id}`}
          >
            {project && (
              <>
                {/* Modal Header */}
                <motion.div 
                  className="p-6 border-b border-purple-500/20"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                        {project.title}
                      </h2>
                      <p className="text-gray-300">
                        {project.description}
                      </p>
                    </div>
                    <motion.button
                      onClick={onClose}
                      className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      ✕
                    </motion.button>
                  </div>
                </motion.div>

                {/* Modal Body */}
                <motion.div 
                  className="p-6 space-y-6"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {/* Project Image */}
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-64 sm:h-80 object-cover rounded-2xl"
                    layoutId={`project-image-${project.id}`}
                  />
                  
                  {/* Project Details */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-3">Technologies Used</h3>
                      <div className="flex flex-wrap gap-2">
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
                    
                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-4">
                      {project.github && (
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Github size={20} />
                          View Code
                        </motion.a>
                      )}
                      {project.live && (
                        <motion.a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <ExternalLink size={20} />
                          Live Demo
                        </motion.a>
                      )}
                    </div>
                  </div>
                </motion.div>
              </>
            )}
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

function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  const majorProjects = [
    {
      id: 1,
      title: 'CRM System',
      description:
        'Developed an internal CRM system to manage customer data, workflows, and interactions efficiently. Focused on usability, data organization, and secure access.',
      image: `${import.meta.env.BASE_URL}/Images/Projects/crm.webp`,
      tech: ['React', 'Node.js', 'MongoDB'],
      github: 'https://github.com/AvaniK-2002/CRM',
      live: '',
      category: 'Enterprise'
    },
    {
      id: 2,
      title: 'Employee Management System',
      description:
        'Built an Employee Management System to manage employee records, roles, and access control. Improved operational efficiency for internal teams.',
      image: `${import.meta.env.BASE_URL}/Images/Projects/ems.png`,
      tech: ['React', 'Next.js', 'MongoDB', 'TypeScript', 'Express.js'],
      github: 'https://github.com/AvaniK-2002/EMS',
      live: '',
      category: 'Internal Tool'
    },
    {
      id: 3,
      title: 'Warehouse Management System',
      description:
        'Designed a warehouse management application for inventory tracking, stock updates, and internal reporting with a clean and responsive interface.',
      image: `${import.meta.env.BASE_URL}/Images/Projects/warehouse.png`,
      tech: ['React', 'Next.js', 'MongoDB', 'TypeScript', 'Express.js'],
      github: 'https://github.com/AvaniK-2002/Warehouse_Management',
      live: '',
      category: 'Logistics'
    },
    {
      id: 4,
      title: 'Car Agency Management System',
      description:
        'Developed a car agency management system to handle car listings, bookings, and agency operations with a structured backend and intuitive UI.',
      image: `${import.meta.env.BASE_URL}/Images/Projects/car.png`,
      tech: ['TypeScript', 'Next.js', 'Tailwind CSS'],
      github: 'https://github.com/AvaniK-2002/Car_agency',
      live: 'https://car-agency-sable.vercel.app/',
      category: 'Automotive'
    }
  ];

  const otherProjects = [
    {
      id: 5,
      title: 'Object Detection',
      description:
        'Deep learning–based object detection system using Faster R-CNN with TensorFlow and OpenCV for video processing.',
      image: `${import.meta.env.BASE_URL}/Images/Projects/object.jpg`,
      tech: ['Python', 'TensorFlow', 'OpenCV'],
      github: 'https://github.com',
      live: '',
      category: 'AI/ML'
    },
    {
      id: 6,
      title: 'Healthcare System',
      description:
        'Healthcare web app integrating ML-based disease prediction and Google Maps API for nearby hospitals.',
      image: `${import.meta.env.BASE_URL}/Images/Projects/health.png`,
      tech: ['HTML', 'CSS', 'JavaScript', 'Python', 'ML'],
      github: 'https://github.com/AvaniK-2002/Predicare',
      live: '',
      category: 'Healthcare'
    },
    {
      id: 7,
      title: 'SpamGuard',
      description:
        'SMS spam detection system using machine learning achieving 85% classification accuracy.',
      image: `${import.meta.env.BASE_URL}/Images/Projects/spam.jpg`,
      tech: ['Python', 'Scikit-learn', 'JavaScript'],
      github: 'https://github.com/AvaniK-2002/SpamGuard',
      live: '',
      category: 'Security'
    },
    {
      id: 8,
      title: 'FreshCart-Hub',
      description:
        'Full-stack e-commerce platform for online grocery shopping featuring product catalog, cart management, and secure checkout.',
      image: `${import.meta.env.BASE_URL}/Images/Projects/cart.png`,
      tech: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
      github: 'https://github.com/AvaniK-2002/FreshCart-Hub',
      live: '',
      category: 'E-commerce'
    }
  ];

  const creativeProjects = [
    {
      id: 9,
      title: 'My Paintings',
      description:
        'Personal art portfolio featuring interactive gallery, animations, and responsive design.',
      image: `${import.meta.env.BASE_URL}/Images/Projects/Screenshot 2025-03-21 135536.png`,
      tech: ['HTML', 'CSS', 'JavaScript'],
      github: 'https://github.com/AvaniK-2002/my-paintings',
      live: 'https://my-paintings.vercel.app/',
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

      <div className="relative pt-32 pb-32 px-4 sm:px-8 space-y-20 lg:space-y-40">
        <Section
          title="Major & Latest Projects"
          subtitle="Recent, production-style projects most relevant to real-world development"
          projects={majorProjects}
          onViewDetails={setSelectedProject}
        />

        <Section
          title="Other Professional Projects"
          subtitle="Additional projects demonstrating technical depth and versatility"
          projects={otherProjects}
          onViewDetails={setSelectedProject}
        />

        <Section
          title="Creative & Personal"
          subtitle="Projects showcasing creativity and personal interests"
          projects={creativeProjects}
          onViewDetails={setSelectedProject}
        />
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </motion.div>
  );
}

export default Projects;
