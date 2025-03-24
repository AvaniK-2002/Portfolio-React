import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

function Footer() {
  return (
    <footer className="bg-white py-8">
      <div className="container mx-auto max-w-6xl px-4">
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-gray-600">© 2024 AvaniK. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <motion.a 
              href="https://github.com/avanik-2002" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-600 hover:text-gray-900"
              whileHover={{ scale: 1.2 }}
            >
              <Github size={20} />
            </motion.a>
            <motion.a 
              href="https://linkedin.com/in/avani-kulkarni-6a4972253" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-600 hover:text-gray-900"
              whileHover={{ scale: 1.2 }}
            >
              <Linkedin size={20} />
            </motion.a>
            <motion.a 
              href="mailto:avkulkrni2002@gmail.com" 
              className="text-gray-600 hover:text-gray-900"
              whileHover={{ scale: 1.2 }}
            >
              <Mail size={20} />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

export default Footer;