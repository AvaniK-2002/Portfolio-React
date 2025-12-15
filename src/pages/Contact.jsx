import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Send, Phone, MapPin, Loader2, MessageCircle, Github, Linkedin, Twitter, Sparkles, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import ParticlesBackground from '../components/ParticlesBackground';
import { FloatingParticles, LiquidBackground } from '../components/WOWEffects';
import { 
  useScrollReveal, 
  useResponsiveAnimation, 
  useMagnetic, 
  useParallax,
  useIntersection 
} from '../hooks/useAnimations';
import { 
  revealVariants, 
  staggerContainer, 
  staggerItem, 
  cardHoverVariants,
  microInteractionVariants,
  modalVariants,
  textVariants,
  gradientVariants
} from '../lib/animations';
import { sendEmail, validateFormData, isEmailConfigured } from '../lib/emailService';

// Enhanced Animated Input Component
const AnimatedInput = ({ 
  label, 
  type = 'text', 
  placeholder, 
  icon: Icon, 
  value, 
  onChange, 
  delay = 0,
  isTextarea = false,
  required = false,
  error = '',
  touched = false
}) => {
  const [focused, setFocused] = useState(false);
  const { ref: magneticRef, position, handleMouseMove, handleMouseLeave } = useMagnetic(0.1);
  
  const showError = touched && error;
  
  return (
    <motion.div
      ref={magneticRef}
      className="relative group"
      style={{
        x: position.x,
        y: position.y,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      variants={revealVariants}
      initial="hidden"
      animate="visible"
      transition={{ delay }}
    >
      <motion.label 
        className={`block text-sm font-medium mb-2 transition-colors duration-200 ${
          showError ? 'text-red-400' : focused ? 'text-purple-400' : 'text-gray-200'
        }`}
        animate={{ 
          color: showError ? '#f87171' : focused ? '#a855f7' : '#e5e7eb',
          scale: focused ? 1.05 : 1
        }}
        transition={{ duration: 0.2 }}
      >
        {label} {required && <span className="text-red-400">*</span>}
      </motion.label>
      
      <div className="relative">
        {Icon && (
          <motion.div
            className={`absolute left-4 top-1/2 transform -translate-y-1/2 z-10 transition-colors duration-200 ${
              showError ? 'text-red-400' : focused ? 'text-purple-400' : 'text-gray-300'
            }`}
            animate={{ 
              color: showError ? '#f87171' : focused ? '#a855f7' : '#d1d5db',
              scale: focused ? 1.1 : 1
            }}
            transition={{ duration: 0.2 }}
          >
            <Icon size={20} />
          </motion.div>
        )}
        
        {isTextarea ? (
          <motion.textarea
            value={value}
            onChange={onChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className={`w-full ${Icon ? 'pl-12' : 'pl-4'} pr-4 py-4 rounded-xl 
                       border transition-all duration-300 resize-none
                       bg-gray-900/80 text-white placeholder-gray-400
                       ${showError 
                         ? 'border-red-500 bg-red-500/10 shadow-lg shadow-red-500/25' 
                         : focused 
                           ? 'border-purple-500 bg-purple-500/10 shadow-lg shadow-purple-500/25' 
                           : 'border-gray-600 hover:border-gray-500'
                       }`}
            placeholder={placeholder}
            rows={6}
            whileFocus={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          />
        ) : (
          <motion.input
            type={type}
            value={value}
            onChange={onChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className={`w-full ${Icon ? 'pl-12' : 'pl-4'} pr-4 py-4 rounded-xl 
                       border transition-all duration-300
                       bg-gray-900/80 text-white placeholder-gray-400
                       ${showError 
                         ? 'border-red-500 bg-red-500/10 shadow-lg shadow-red-500/25' 
                         : focused 
                           ? 'border-purple-500 bg-purple-500/10 shadow-lg shadow-purple-500/25' 
                           : 'border-gray-600 hover:border-gray-500'
                       }`}
            placeholder={placeholder}
            whileFocus={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          />
        )}
        
        {/* Animated border glow */}
        <motion.div
          className={`absolute inset-0 rounded-xl opacity-0 pointer-events-none transition-opacity duration-300 ${
            showError 
              ? 'bg-gradient-to-r from-red-500 to-pink-500' 
              : 'bg-gradient-to-r from-purple-500 to-blue-500'
          }`}
          animate={{ 
            opacity: showError || focused ? 0.1 : 0,
            scale: showError || focused ? 1.02 : 1
          }}
          transition={{ duration: 0.3 }}
        />
      </div>
      
      {/* Error message */}
      {showError && (
        <motion.p
          className="text-red-400 text-xs mt-1 flex items-center gap-1"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <XCircle size={12} />
          {error}
        </motion.p>
      )}
    </motion.div>
  );
};

// Notification Component
const Notification = ({ type, message, onClose }) => {
  const icons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertCircle,
  };

  const colors = {
    success: 'from-green-500 to-emerald-500',
    error: 'from-red-500 to-pink-500',
    warning: 'from-yellow-500 to-orange-500',
  };

  const Icon = icons[type];

  return (
    <motion.div
      className={`fixed top-4 right-4 z-50 p-4 rounded-xl shadow-2xl border backdrop-blur-sm ${
        type === 'success' 
          ? 'bg-green-500/20 border-green-500/30 text-green-100'
          : type === 'error'
            ? 'bg-red-500/20 border-red-500/30 text-red-100'
            : 'bg-yellow-500/20 border-yellow-500/30 text-yellow-100'
      }`}
      initial={{ opacity: 0, x: 100, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.8 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="flex items-center gap-3">
        <motion.div
          className={`p-2 rounded-full bg-gradient-to-r ${colors[type]}`}
          whileHover={{ scale: 1.1 }}
        >
          <Icon size={20} className="text-white" />
        </motion.div>
        <div className="flex-1">
          <p className="font-medium">{message}</p>
        </div>
        <motion.button
          onClick={onClose}
          className="text-current hover:opacity-70 transition-opacity"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <XCircle size={16} />
        </motion.button>
      </div>
    </motion.div>
  );
};

// Enhanced Contact Card Component
const ContactCard = ({ info, index }) => {
  const { ref: cardRef, isInView } = useScrollReveal();
  const { ref: magneticRef, position, handleMouseMove, handleMouseLeave } = useMagnetic(0.2);
  
  return (
    <motion.div
      ref={cardRef}
      className="group cursor-pointer"
      variants={revealVariants}
      initial="visible"
      animate="visible"
      transition={{ delay: index * 0.1 }}
    >
      <motion.div
        ref={magneticRef}
        className="relative overflow-hidden"
        style={{
          x: position.x * 0.5,
          y: position.y * 0.5,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        variants={cardHoverVariants}
        initial="rest"
        whileHover="hover"
        whileTap="tap"
      >
        <div className="flex items-center gap-4 p-6 bg-gradient-to-br from-gray-900/90 to-gray-800/90 
                       backdrop-blur-sm border border-purple-500/30 rounded-2xl 
                       hover:border-purple-500/50 transition-all duration-500 group">
          
          {/* Icon with animated background */}
          <motion.div
            className="p-4 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl shadow-lg"
            whileHover={{ 
              rotate: 360,
              scale: 1.1,
              boxShadow: "0 0 30px rgba(168, 85, 247, 0.6)"
            }}
            transition={{ duration: 0.6 }}
          >
            <info.icon className="text-white" size={24} />
          </motion.div>
          
          {/* Content */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-purple-200 transition-colors">
              {info.title}
            </h3>
            <p className="text-gray-100 group-hover:text-white transition-colors font-medium">
              {info.value}
            </p>
          </div>
          
          {/* Hover arrow indicator */}
          <motion.div
            className="opacity-0 group-hover:opacity-100"
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Send className="text-purple-400" size={16} />
          </motion.div>
        </div>
        
        {/* Animated background glow */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          animate={{
            scale: [1, 1.02, 1],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </motion.div>
    </motion.div>
  );
};

function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [notification, setNotification] = useState(null);
  
  const { isMobile, reducedMotion } = useResponsiveAnimation();
  const { ref: heroRef, isInView: heroInView } = useScrollReveal();
  const { ref: formRef, isInView: formInView } = useIntersection(0.3);
  const { ref: parallaxRef, offsetY } = useParallax(20);

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      value: '+91 8975810845',
      link: 'tel:+918975810845',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'avkulkrni2002@gmail.com',
      link: 'mailto:avkulkrni2002@gmail.com',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Nanded, India',
      link: 'https://maps.google.com',
      color: 'from-purple-500 to-pink-500'
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      name: 'GitHub',
      url: 'https://github.com/AvaniK-2002',
      color: 'hover:text-gray-200'
    },
    {
      icon: Linkedin,
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/avani-kulkarni-6a4972253?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3B%2FHBB1a2aQ%2F6su%2FaVeo47tg%3D%3D',
      color: 'hover:text-blue-400'
    },
    
  ];

  // Email configuration check
  const emailConfigured = isEmailConfigured();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const validation = validateFormData(formData);
    setErrors(validation.errors);
    setTouched({ name: true, email: true, message: true });

    if (!validation.isValid) {
      setNotification({
        type: 'error',
        message: 'Please fix the errors in the form before submitting.'
      });
      return;
    }

    if (!emailConfigured) {
      setNotification({
        type: 'error',
        message: 'Email service is not configured. Please check the EMAILJS_SETUP.md file for instructions.'
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const result = await sendEmail(formData);
      
      if (result.success) {
        setNotification({
          type: 'success',
          message: result.message
        });
        setFormData({ name: '', email: '', message: '' });
        setErrors({});
        setTouched({});
      } else {
        setNotification({
          type: 'error',
          message: result.message
        });
      }
    } catch (error) {
      setNotification({
        type: 'error',
        message: 'An unexpected error occurred. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field) => (e) => {
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleBlur = (field) => () => {
    setTouched(prev => ({
      ...prev,
      [field]: true
    }));

    // Validate individual field
    const validation = validateFormData(formData);
    setErrors(prev => ({
      ...prev,
      [field]: validation.errors[field] || ''
    }));
  };

  const closeNotification = () => {
    setNotification(null);
  };

  return (
    <motion.div
      className="min-h-screen relative overflow-hidden bg-[#0a0a0a] text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <ParticlesBackground />
      {!isMobile && <LiquidBackground />}
      {!isMobile && !reducedMotion && <FloatingParticles count={20} />}
      
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      {/* Notifications */}
      <AnimatePresence>
        {notification && (
          <Notification
            type={notification.type}
            message={notification.message}
            onClose={closeNotification}
          />
        )}
      </AnimatePresence>

      <div 
        className="relative pt-32 pb-20 px-4 sm:px-8"
        ref={parallaxRef}
        style={{ y: offsetY * 0.02 }}
      >
        <div className="max-w-7xl mx-auto">
          
          {/* Enhanced Hero Section */}
          <motion.div
            ref={heroRef}
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
                <MessageCircle className="text-white w-8 h-8" />
              </motion.div>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-tight">
                <motion.span
                  variants={textVariants}
                  custom={0}
                  className="inline-block mr-3 gradient-text"
                >
                  Let's
                </motion.span>
                <motion.span
                  variants={textVariants}
                  custom={1}
                  className="inline-block"
                >
                  Connect
                </motion.span>
              </h1>
            </motion.div>
            
            <motion.p
              variants={textVariants}
              custom={2}
              className="text-lg sm:text-xl text-purple-300 max-w-3xl mx-auto leading-relaxed"
            >
              Have a project in mind or just want to chat? I'd love to hear from you. 
              Let's create something amazing together!
            </motion.p>

            
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            
            {/* Enhanced Contact Form */}
            <motion.div
              ref={formRef}
              variants={staggerContainer}
              initial="visible"
              animate="visible"
            >
              <motion.div
                className="relative group"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
              >
                {/* Animated background glow */}
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-500"
                  animate={{ 
                    opacity: [0.2, 0.3, 0.2],
                    scale: [1, 1.02, 1]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                
                <div className="relative bg-gray-900/80 backdrop-blur-sm border border-purple-500/30 rounded-3xl shadow-2xl p-8">
                  <motion.h2 
                    className="text-2xl font-bold text-white mb-6 flex items-center gap-3"
                    variants={staggerItem}
                  >
                    <Sparkles className="text-purple-400" size={24} />
                    Send me a message
                  </motion.h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <AnimatedInput
                      label="Your Name"
                      type="text"
                      placeholder="John Doe"
                      icon={Mail}
                      value={formData.name}
                      onChange={handleInputChange('name')}
                      onBlur={handleBlur('name')}
                      delay={0.1}
                      required
                      error={errors.name}
                      touched={touched.name}
                    />

                    <AnimatedInput
                      label="Email Address"
                      type="email"
                      placeholder="john@example.com"
                      icon={Mail}
                      value={formData.email}
                      onChange={handleInputChange('email')}
                      onBlur={handleBlur('email')}
                      delay={0.2}
                      required
                      error={errors.email}
                      touched={touched.email}
                    />

                    <AnimatedInput
                      label="Your Message"
                      placeholder="Tell me about your project or just say hello..."
                      icon={MessageCircle}
                      value={formData.message}
                      onChange={handleInputChange('message')}
                      onBlur={handleBlur('message')}
                      delay={0.3}
                      isTextarea
                      required
                      error={errors.message}
                      touched={touched.message}
                    />

                    <motion.button
                      type="submit"
                      disabled={isSubmitting || !formData.name || !formData.email || !formData.message || !emailConfigured}
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 
                               rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 
                               flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed
                               border border-purple-500 hover:border-purple-400 shadow-lg hover:shadow-xl
                               transform hover:scale-105 active:scale-95"
                      whileHover={{ 
                        scale: 1.02,
                        boxShadow: "0 10px 30px rgba(168, 85, 247, 0.4)"
                      }}
                      whileTap={{ scale: 0.98 }}
                      variants={staggerItem}
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          >
                            <Loader2 size={20} />
                          </motion.div>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send size={20} />
                          <span>{emailConfigured ? 'Send Message' : 'Demo Mode'}</span>
                          <motion.span
                            animate={{ x: [0, 3, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            →
                          </motion.span>
                        </>
                      )}
                    </motion.button>
                  </form>
                </div>
              </motion.div>
            </motion.div>

            {/* Enhanced Contact Information - Always Visible */}
            <motion.div 
              className="space-y-8"
              variants={staggerContainer}
              initial="visible"
              animate="visible"
            >
              <motion.div variants={staggerItem}>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Sparkles className="text-purple-400" size={24} />
                  Get in touch
                </h2>
                <p className="text-gray-200 leading-relaxed mb-8">
                  I'm always open to discussing new projects, creative ideas, or 
                  opportunities to be part of your vision. Feel free to reach out!
                </p>
              </motion.div>

              {/* Contact Cards */}
              <motion.div className="space-y-6" variants={staggerContainer}>
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={info.title}
                    href={info.link}
                    target={info.link.startsWith('http') ? '_blank' : '_self'}
                    rel={info.link.startsWith('http') ? 'noopener noreferrer' : ''}
                    className="block"
                    variants={staggerItem}
                  >
                    <ContactCard info={info} index={index} />
                  </motion.a>
                ))}
              </motion.div>

              {/* Social Links */}
              <motion.div variants={staggerItem}>
                <h3 className="text-xl font-semibold text-white mb-4">Follow me</h3>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 bg-white/10 rounded-xl text-gray-300 ${social.color} 
                               hover:bg-white/20 transition-all duration-300 border border-white/10 
                               hover:border-white/20`}
                      whileHover={{ 
                        scale: 1.1, 
                        rotate: 360,
                        boxShadow: "0 5px 20px rgba(255, 255, 255, 0.2)"
                      }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <social.icon size={20} />
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              {/* Call to Action Card */}
              <motion.div
                className="relative overflow-hidden"
                variants={staggerItem}
                whileHover={{ scale: 1.02 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-2xl"
                  animate={{
                    background: [
                      "linear-gradient(135deg, rgba(147, 51, 234, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%)",
                      "linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(147, 51, 234, 0.2) 100%)",
                      "linear-gradient(135deg, rgba(147, 51, 234, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%)"
                    ]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                <div className="relative bg-gray-900/50 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6 text-center">
                  <motion.div
                    className="inline-flex p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-4"
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Sparkles className="text-white" size={24} />
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Let's create something amazing!
                  </h3>
                  <p className="text-purple-200 text-sm leading-relaxed">
                    I'm excited to collaborate on projects that make a difference. 
                    Let's discuss how we can bring your ideas to life!
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

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

export default Contact;
