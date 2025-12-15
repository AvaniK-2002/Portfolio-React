import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, Phone, MapPin, Loader2 } from 'lucide-react';
import ParticlesBackground from '../components/ParticlesBackground';

function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => setIsSubmitting(false), 2000);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      value: '+91 8975810845',
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'avkulkrni2002@gmail.com',
      link: 'mailto:avkulkrni2002@gmail.com',
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Nanded, India',
      link: 'https://maps.google.com',
    },
  ];

  return (
    <motion.div
      className="min-h-screen relative overflow-hidden bg-[#0a0a0a] text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ParticlesBackground />
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />

      <div className="max-w-7xl mx-auto pt-32 pb-20 px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-100 mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Have a project in mind or just want to chat? Feel free to reach out!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-transparent border border-purple-400 rounded-2xl shadow-xl p-8 backdrop-blur-md">
              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-transparent text-white"
                    placeholder="Your Name"
                  />
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-transparent text-white"
                    placeholder="abc@example.com"
                  />
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border border-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-transparent text-white resize-none"
                    placeholder="Your message here..."
                  ></textarea>
                </motion.div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-purple-900 text-white px-8 py-4 rounded-lg hover:bg-purple-700 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 border border-purple-500 hover:border-purple-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="lg:sticky lg:top-32"
          >
            <div className="space-y-8">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.title}
                  href={info.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <div className="group bg-transparent border border-gray-400 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-purple-300 rounded-lg group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
                        <info.icon size={24} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-300">
                          {info.title}
                        </h3>
                        <p className="text-gray-400">{info.value}</p>
                      </div>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Footer Section */}
        <motion.div
          className="mt-12 p-8 bg-gradient-to-br from-purple-900 to-purple-1000 rounded-2xl text-white text-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <h3 className="text-2xl font-bold mb-4">
            Let's create something amazing together!
          </h3>
          <p className="text-blue-100">
            I'm always open to discussing new projects, creative ideas, or
            opportunities to be part of your vision.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Contact;
