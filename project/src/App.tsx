import React from 'react';
import { Github, Linkedin, Mail, ExternalLink, Code2, Briefcase, User, Download } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-sm z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <a href="#" className="text-2xl font-bold text-gray-800">Portfolio</a>
            <div className="hidden md:flex space-x-8">
              <a href="#about" className="text-gray-600 hover:text-gray-900">About</a>
              <a href="#skills" className="text-gray-600 hover:text-gray-900">Skills</a>
              <a href="#projects" className="text-gray-600 hover:text-gray-900">Technical-Projects</a>
              <a href="#projects" className="text-gray-600 hover:text-gray-900">UI/UX-Projects</a>
              <a href="#contact" className="text-gray-600 hover:text-gray-900">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex-1">
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Hi, I'm <span className="text-blue-600">John Doe</span>
                <br />Full Stack Developer
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                I craft beautiful and functional web experiences with modern technologies
              </p>
              <div className="flex gap-4">
                <a href="#contact" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
                  Contact Me
                </a>
                <a href="/resume.pdf" className="flex items-center gap-2 border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50 transition">
                  <Download size={20} />
                  Resume
                </a>
              </div>
              <div className="flex gap-6 mt-8">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                  <Github size={24} />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                  <Linkedin size={24} />
                </a>
                <a href="mailto:contact@example.com" className="text-gray-600 hover:text-gray-900">
                  <Mail size={24} />
                </a>
              </div>
            </div>
            <div className="flex-1">
              <img 
                src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&h=600" 
                alt="Profile" 
                className="rounded-full w-72 h-72 object-cover mx-auto shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex items-center gap-2 mb-8">
            <User className="text-blue-600" size={28} />
            <h2 className="text-3xl font-bold">About Me</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="text-gray-600 leading-relaxed">
                With over 5 years of experience in web development, I specialize in creating responsive and user-friendly applications. 
                I'm passionate about clean code, modern design patterns, and delivering exceptional user experiences.
              </p>
              <p className="text-gray-600 leading-relaxed mt-4">
                When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, 
                or sharing my knowledge through technical blog posts.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-20 font-semibold text-gray-700">Name:</div>
                <div>John Doe</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-20 font-semibold text-gray-700">Email:</div>
                <div>contact@example.com</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-20 font-semibold text-gray-700">From:</div>
                <div>San Francisco, CA</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gray-50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex items-center gap-2 mb-12">
            <Code2 className="text-blue-600" size={28} />
            <h2 className="text-3xl font-bold">Skills</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: 'React', level: '95%' },
              { name: 'TypeScript', level: '90%' },
              { name: 'Node.js', level: '85%' },
              { name: 'Python', level: '80%' },
              { name: 'PostgreSQL', level: '85%' },
              { name: 'AWS', level: '75%' },
              { name: 'Docker', level: '80%' },
              { name: 'GraphQL', level: '85%' },
            ].map((skill) => (
              <div key={skill.name} className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-3">{skill.name}</h3>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: skill.level }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex items-center gap-2 mb-12">
            <Briefcase className="text-blue-600" size={28} />
            <h2 className="text-3xl font-bold">Projects</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'E-Commerce Platform',
                description: 'A full-stack e-commerce solution with React, Node.js, and PostgreSQL',
                image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=800&h=500',
              },
              {
                title: 'Task Management App',
                description: 'Real-time task management application using React and Firebase',
                image: 'https://images.unsplash.com/photo-1540350394557-8d14678e7f91?auto=format&fit=crop&w=800&h=500',
              },
              {
                title: 'Weather Dashboard',
                description: 'Weather forecasting app with React and OpenWeather API',
                image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?auto=format&fit=crop&w=800&h=500',
              },
            ].map((project) => (
              <div key={project.title} className="bg-white rounded-lg overflow-hidden shadow-lg">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <a 
                    href="#" 
                    className="inline-flex items-center text-blue-600 hover:text-blue-700"
                  >
                    View Project <ExternalLink size={16} className="ml-1" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="project2" className="py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex items-center gap-2 mb-12">
            <Briefcase className="text-blue-600" size={28} />
            <h2 className="text-3xl font-bold">Projects</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'E-Commerce Platform',
                description: 'A full-stack e-commerce solution with React, Node.js, and PostgreSQL',
                image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=800&h=500',
              },
              {
                title: 'Task Management App',
                description: 'Real-time task management application using React and Firebase',
                image: 'https://images.unsplash.com/photo-1540350394557-8d14678e7f91?auto=format&fit=crop&w=800&h=500',
              },
              {
                title: 'Weather Dashboard',
                description: 'Weather forecasting app with React and OpenWeather API',
                image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?auto=format&fit=crop&w=800&h=500',
              },
            ].map((project) => (
              <div key={project.title} className="bg-white rounded-lg overflow-hidden shadow-lg">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <a 
                    href="#" 
                    className="inline-flex items-center text-blue-600 hover:text-blue-700"
                  >
                    View Project <ExternalLink size={16} className="ml-1" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex items-center gap-2 mb-12">
            <Mail className="text-blue-600" size={28} />
            <h2 className="text-3xl font-bold">Contact</h2>
          </div>
          <div className="max-w-xl mx-auto">
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-8">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600">© 2024 John Doe. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                <Github size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                <Linkedin size={20} />
              </a>
              <a href="mailto:contact@example.com" className="text-gray-600 hover:text-gray-900">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;