import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, ExternalLink, Github } from 'lucide-react';
import ParticlesBackground from '../components/ParticlesBackground';

function Projects() {
  const projects = [
    {
      title: 'FreshCart-Hub',
      description: 'Created an all-encompassing e-commerce platform tailored for effortless online grocery shopping. The site includes a diverse product catalog, a user-friendly shopping cart, and a secure checkout process to ensure an enjoyable shopping experience.',
      image: '/Images/Projects/cart.png',
      tech: ['HTML', 'CSS', 'PHP', 'MySQL', 'JavaScript'],
      github: 'https://github.com/AvaniK-2002/FreshCart-Hub',
      live: ''
    },
    {
      title: 'Object Detection',
      description: 'Leveraging deep learning models such as Faster R-CNN with TensorFlow, annotated datasets, and robust video processing to ensure accurate, efficient detection. Used Python, TensorFlow, PyTorch, OpenCV for video handling, and Roboflow for dataset annotation.',
      image: '/Images/Projects/object.jpg',
      tech: ['Python', 'OpenCV', 'Tensorflow', 'Keras','NMS','VGG16'],
      github: 'https://github.com',
      live: ''
    },
    {
      title: 'Healthcare System',
      description: 'I developed a web-based Healthcare System using HTML, CSS, JavaScript, and Python-based machine learning models for disease prediction, achieving over 90% prediction accuracy. Integrated Google Maps API for nearby hospital searches and a secure community chat feature.',
      image: '/Images/Projects/health.png',
      tech: ['HTML', 'ML', 'Python', 'JavaScript'],
      github: 'https://github.com/AvaniK-2002/Predicare',
      live: ''
    },
    {
      title: 'SpamGuard',
      description: 'Engineered an SMS spam detection website to classify messages as spam or non-spam, reaching an 85% accuracy rate and significantly enhancing user experience by filtering out spam messages.',
      image: '/Images/Projects/spam.jpg',
      tech: ['HTML', 'JavaScript', 'Python', 'Scikit-learn', 'CSS'],
      github: 'https://github.com/AvaniK-2002/SpamGuard',
      live: ''
    },
    {
      title: 'EventSelect-Pro',
      description: 'Developed EventMaster, a user-friendly event management website that streamlines event creation, registration, and venue selection.',
      image: '/Images/Projects/event.png',
      tech: ['HTML', 'JavaScript', 'PHP', 'MySQL', 'CSS'],
      github: 'https://github.com/AvaniK-2002/EventSelect-Pro-',
      live: ''
    },
    {
      title: 'my-paintings',
      description: 'A visually appealing portfolio website showcasing my artwork, built using HTML, CSS, and JavaScript. Features include an interactive gallery, smooth animations, and a responsive design, ensuring an immersive user experience',
      image: '/Images/Projects/Screenshot 2025-03-21 135536.png',
      tech: ['HTML', 'JavaScript',  'CSS'],
      github: 'https://github.com/AvaniK-2002/my-paintings',
      live: 'https://my-paintings.vercel.app/'
    }
  ];

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

      <motion.section 
        className="min-h-screen relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative pt-32 pb-20 px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Briefcase className="text-blue-400" size={28} />
              <h2 className="text-4xl font-bold text-white">Featured Projects</h2>
            </div>
            <p className="text-gray-300 text-xl max-w-2xl mx-auto">
              Explore some of my recent work and personal projects
            </p>
          </motion.div>

          <div className="max-w-7xl mx-auto space-y-32">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}
              >
                <motion.div 
                  className="flex-1 relative group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="rounded-xl shadow-2xl w-full object-cover aspect-video"
                  />
                  <div className="absolute inset-0 bg-blue-600/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
                
                <div className="flex-1 space-y-6">
                  <motion.h3 className="text-3xl font-bold text-white">{project.title}</motion.h3>
                  <motion.p className="text-gray-300 text-lg">{project.description}</motion.p>
                  <motion.div className="flex flex-wrap gap-3">
                    {project.tech.map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">{tech}</span>
                    ))}
                  </motion.div>
                  <motion.div 
                    className="flex gap-6 pt-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 + 0.5 }}
                  >
                    <a 
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                    >
                      <Github size={20} />
                      <span>View Code</span>
                    </a>
                    <a 
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                    >
                      <ExternalLink size={20} />
                      <span>Live Demo</span>
                    </a>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}

export default Projects;
