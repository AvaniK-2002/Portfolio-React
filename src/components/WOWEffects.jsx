// WOW Enhancement Components for Extraordinary Visual Features
import React from 'react';
import { motion } from 'framer-motion';

// 1. Floating Particles Component
export const FloatingParticles = ({ count = 20 }) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-purple-400 rounded-full opacity-60"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
};

// 2. Interactive Constellation Background
export const ConstellationBackground = ({ nodeCount = 30 }) => {
  const nodes = Array.from({ length: nodeCount }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg className="w-full h-full">
        {nodes.map((node, i) =>
          nodes.slice(i + 1).map((otherNode, j) => {
            const distance = Math.sqrt(
              Math.pow(node.x - otherNode.x, 2) + Math.pow(node.y - otherNode.y, 2)
            );
            
            if (distance < 15) {
              return (
                <motion.line
                  key={`${i}-${j}`}
                  x1={`${node.x}%`}
                  y1={`${node.y}%`}
                  x2={`${otherNode.x}%`}
                  y2={`${otherNode.y}%`}
                  stroke="rgba(168, 85, 247, 0.2)"
                  strokeWidth="1"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 2, delay: Math.random() * 2 }}
                />
              );
            }
            return null;
          })
        )}
        
        {nodes.map((node, i) => (
          <motion.circle
            key={node.id}
            cx={`${node.x}%`}
            cy={`${node.y}%`}
            r="2"
            fill="rgba(168, 85, 247, 0.6)"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.1,
            }}
          />
        ))}
      </svg>
    </div>
  );
};

// 3. Liquid Animation Background
export const LiquidBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
        style={{ left: "10%", top: "20%" }}
        animate={{ x: [0, 100, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"
        style={{ right: "10%", bottom: "20%" }}
        animate={{ x: [0, -80, 0], y: [0, 60, 0], scale: [1, 0.8, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        className="absolute w-64 h-64 bg-pink-500/20 rounded-full blur-3xl"
        style={{ left: "50%", top: "50%" }}
        animate={{ x: [0, 60, -60, 0], y: [0, -40, 40, 0], scale: [1, 1.1, 0.9, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 5 }}
      />
    </div>
  );
};

// 4. Section-based Storytelling Animation
export const StorytellingSection = ({ sections }) => {
  return (
    <div className="relative">
      {sections.map((section, index) => (
        <motion.div
          key={index}
          className="min-h-screen flex items-center justify-center"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="text-center max-w-4xl mx-auto p-8"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {section.content}
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

// 5. Animated Gradient Border Component
export const AnimatedBorder = ({ children, speed = 3, colors = ['#a855f7', '#3b82f6', '#ec4899'] }) => {
  return (
    <div className="relative p-[2px] rounded-2xl">
      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: `linear-gradient(${speed * 360}deg, ${colors.join(', ')})`,
        }}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 20 / speed,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <div className="relative bg-gray-900 rounded-2xl">
        {children}
      </div>
    </div>
  );
};

// 6. Magnetic Cursor Effect
export const MagneticCursor = ({ children, strength = 0.3 }) => {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const ref = React.useRef(null);

  React.useEffect(() => {
    const updateMousePosition = (e) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) * strength;
        const deltaY = (e.clientY - centerY) * strength;
        setMousePosition({ x: deltaX, y: deltaY });
      }
    };

    const resetPosition = () => {
      setMousePosition({ x: 0, y: 0 });
    };

    const element = ref.current;
    if (element) {
      element.addEventListener('mousemove', updateMousePosition);
      element.addEventListener('mouseleave', resetPosition);
      
      return () => {
        element.removeEventListener('mousemove', updateMousePosition);
        element.removeEventListener('mouseleave', resetPosition);
      };
    }
  }, [strength]);

  return (
    <motion.div
      ref={ref}
      style={{
        x: mousePosition.x,
        y: mousePosition.y,
      }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
    >
      {children}
    </motion.div>
  );
};

// 7. Particle System for Interactive Backgrounds
export const ParticleSystem = ({ count = 50, interactive = true }) => {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    speedX: (Math.random() - 0.5) * 0.5,
    speedY: (Math.random() - 0.5) * 0.5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute bg-purple-400 rounded-full opacity-60"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            x: [0, particle.speedX * 100, 0],
            y: [0, particle.speedY * 100, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 10 + Math.random() * 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
};

// 8. Smooth Scroll Progress Indicator
export const ScrollProgress = ({ height = '4px', color = 'linear-gradient(to right, #a855f7, #3b82f6)' }) => {
  const [scrollProgress, setScrollProgress] = React.useState(0);

  React.useEffect(() => {
    const updateScrollProgress = () => {
      const currentProgress = window.scrollY;
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      
      if (scrollHeight) {
        setScrollProgress((currentProgress / scrollHeight) * 100);
      }
    };

    window.addEventListener('scroll', updateScrollProgress);
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50"
      style={{ height }}
    >
      <motion.div
        className="h-full rounded-full"
        style={{
          width: `${scrollProgress}%`,
          background: color,
        }}
        initial={{ width: 0 }}
        animate={{ width: `${scrollProgress}%` }}
        transition={{ duration: 0.1 }}
      />
    </motion.div>
  );
};

// 9. Morphing Shape Background
export const MorphingShapes = ({ count = 3 }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full blur-xl"
          style={{
            width: `${200 + i * 100}px`,
            height: `${200 + i * 100}px`,
            left: `${10 + i * 30}%`,
            top: `${20 + i * 20}%`,
          }}
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -80, 60, 0],
            scale: [1, 1.2, 0.8, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 15 + i * 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 2,
          }}
        />
      ))}
    </div>
  );
};

// 10. Text Reveal Animation
export const TextReveal = ({ children, delay = 0, direction = 'up' }) => {
  const directionVariants = {
    up: { y: 50, opacity: 0 },
    down: { y: -50, opacity: 0 },
    left: { x: 50, opacity: 0 },
    right: { x: -50, opacity: 0 },
  };

  return (
    <motion.div
      initial={directionVariants[direction]}
      whileInView={{ x: 0, y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  );
};