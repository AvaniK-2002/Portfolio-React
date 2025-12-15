import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaUser, FaCode, FaProjectDiagram, FaEnvelope, FaBars, FaTimes, FaFileAlt } from "react-icons/fa";
import { useScrollReveal, useResponsiveAnimation } from "../hooks/useAnimations";
import { cardHoverVariants, microInteractionVariants } from "../lib/animations";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { isMobile } = useResponsiveAnimation();

  // Scroll-based navbar styling
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const menuItems = [
    { path: "/about", icon: FaUser, label: "About" },
    { path: "/skills", icon: FaCode, label: "Skills" },
    { path: "/projects", icon: FaProjectDiagram, label: "Technical-Projects" },
    { path: "/project2", icon: FaProjectDiagram, label: "UI/UX-Projects" },
    { path: "/contact", icon: FaEnvelope, label: "Contact" }
  ];

  return (
    <motion.nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-black/90 backdrop-blur-md shadow-2xl border-b border-purple-500/20" 
          : "bg-black/80 shadow-md"
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        duration: 0.6, 
        ease: [0.25, 0.46, 0.45, 0.94] 
      }}
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Enhanced Logo with micro-interactions */}
        <NavLink to="/" className="flex items-center group">
          <motion.img 
            src={`${import.meta.env.BASE_URL}Images/logo.png`} 
            alt="Logo" 
            className="h-10 w-auto"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          />
          <motion.div
            className="absolute inset-0 bg-purple-500/20 rounded-full blur-lg opacity-0 group-hover:opacity-100"
            transition={{ duration: 0.3 }}
          />
        </NavLink>

        {/* Desktop Menu with Enhanced Animations */}
        <div className="hidden md:flex space-x-8 text-gray-100">
          {menuItems.map((item, index) => {
            const IconComponent = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <NavLink 
                key={item.path}
                to={item.path} 
                className="nav-link relative flex items-center group overflow-hidden"
              >
                <motion.div
                  className="flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  variants={microInteractionVariants}
                >
                  <motion.div
                    className={`p-2 rounded-lg transition-colors ${
                      isActive 
                        ? "bg-purple-600/30 text-purple-300" 
                        : "text-gray-300 group-hover:text-white group-hover:bg-purple-600/20"
                    }`}
                    whileHover={{ 
                      boxShadow: "0 0 20px rgba(168, 85, 247, 0.4)",
                      rotate: [0, -5, 5, 0]
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <IconComponent className="mr-2" size={16} />
                  </motion.div>
                  <span className={`font-medium transition-colors ${
                    isActive ? "text-purple-300" : "text-gray-300 group-hover:text-white"
                  }`}>
                    {item.label}
                  </span>
                </motion.div>
                
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500"
                    layoutId="navbar-indicator"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Enhanced Mobile Menu Button */}
        <motion.button 
          className="md:hidden text-gray-100 focus:outline-none relative z-50"
          onClick={() => setMenuOpen(!menuOpen)}
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence mode="wait">
            {menuOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <FaTimes size={24} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <FaBars size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Enhanced Mobile Menu with Slide Animation */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            className="md:hidden absolute w-full left-0 top-full bg-black/95 backdrop-blur-md border-b border-purple-500/20 shadow-2xl"
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ 
              duration: 0.3, 
              ease: [0.25, 0.46, 0.45, 0.94] 
            }}
          >
            <motion.div 
              className="flex flex-col space-y-1 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {menuItems.map((item, index) => {
                const IconComponent = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <motion.div
                    key={item.path}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <NavLink 
                      to={item.path} 
                      className={`flex items-center p-3 rounded-lg transition-all ${
                        isActive 
                          ? "bg-purple-600/30 text-purple-300" 
                          : "text-gray-300 hover:text-white hover:bg-purple-600/20"
                      }`}
                      onClick={() => setMenuOpen(false)}
                    >
                      <motion.div
                        className="p-2 rounded-lg mr-3"
                        whileHover={{ 
                          scale: 1.1,
                          boxShadow: "0 0 15px rgba(168, 85, 247, 0.4)"
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <IconComponent size={18} />
                      </motion.div>
                      <span className="font-medium">{item.label}</span>
                    </NavLink>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar;
