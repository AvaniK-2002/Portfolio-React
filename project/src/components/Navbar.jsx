import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUser, FaCode, FaProjectDiagram, FaEnvelope, FaBars, FaTimes, FaFileAlt } from "react-icons/fa";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.nav
      className="fixed w-full z-50 bg-black bg-opacity-80 shadow-md"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <NavLink to="/" className="flex items-center">
        <img src={`${import.meta.env.BASE_URL}Images/logo.png`} alt="Logo" 
        className="h-10 w-auto" />
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 text-gray-100">
          <NavLink to="/about" className="nav-link flex items-center hover:text-gray-300">
            <FaUser className="mr-2" /> About
          </NavLink>
          <NavLink to="/skills" className="nav-link flex items-center hover:text-gray-300">
            <FaCode className="mr-2" /> Skills
          </NavLink>
          <NavLink to="/projects" className="nav-link flex items-center hover:text-gray-300">
            <FaProjectDiagram className="mr-2" /> Technical-Projects
          </NavLink>
          <NavLink to="/project2" className="nav-link flex items-center hover:text-gray-300">
            <FaProjectDiagram className="mr-2" /> UI/UX-Projects
          </NavLink>
          
          <NavLink to="/contact" className="nav-link flex items-center hover:text-gray-300">
            <FaEnvelope className="mr-2" /> Contact
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-100 focus:outline-none" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div 
          className="md:hidden flex flex-col bg-black text-gray-100 space-y-4 p-4 absolute w-full left-0 top-16 shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <NavLink to="/about" className="flex items-center hover:text-gray-300" onClick={() => setMenuOpen(false)}>
            <FaUser className="mr-2" /> About
          </NavLink>
          <NavLink to="/skills" className="flex items-center hover:text-gray-300" onClick={() => setMenuOpen(false)}>
            <FaCode className="mr-2" /> Skills
          </NavLink>
          <NavLink to="/projects" className="flex items-center hover:text-gray-300" onClick={() => setMenuOpen(false)}>
            <FaProjectDiagram className="mr-2" /> Technical-Projects
          </NavLink>
          <NavLink to="/project2" className="flex items-center hover:text-gray-300" onClick={() => setMenuOpen(false)}>
            <FaProjectDiagram className="mr-2" /> UI/UX-Projects
          </NavLink>
          <NavLink to="/contact" className="flex items-center hover:text-gray-300" onClick={() => setMenuOpen(false)}>
            <FaEnvelope className="mr-2" /> Contact
          </NavLink>
        </motion.div>
      )}
    </motion.nav>
  );
}

export default Navbar;
