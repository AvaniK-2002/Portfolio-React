import React from "react";
import { motion } from "framer-motion";
import { Briefcase, ExternalLink } from "lucide-react";
import ParticlesBackground from "../components/ParticlesBackground";

function Project2() {
  const projects = [
    {
      title: "Portfolio",
      description:
        "A Figma portfolio is a digital showcase of your UI/UX design work, prototypes, and case studies, highlighting your skills and creativity.",
      image: "/Images/Projects/port.png",
      tech: ["Figma"],
      live: "https://www.figma.com/design/LG1Njly9Uo3aziEGimorCS/Untitled?m=auto&t=3uHTcJk3ibtlOrBN-6",
    },
    {
      title: "Pet-Health",
      description:
        "A paw-some fusion of care and creativity—where design meets devotion for happy, healthy pets!",
      image: "/Images/Projects/pet.png",
      tech: ["Canva"],
      live: "https://www.canva.com/design/DAGQwZqE2U4/qE48OojcHnHcvjvIliwmrg/edit",
    },
    {
      title: "Safety-App",
      description:
        "Empowering safety with seamless design—because every woman deserves to feel secure, always!",
      image: "/Images/Projects/safe.png",
      tech: ["Canva"],
      live: "https://www.canva.com/design/DAF9cTN1vPA/XAOIZuIPu1lBbNEmquRGXQ/edit",
    },
    {
      title: "Course-Management",
      description:
        "Streamlining learning with an intuitive course management design—where education meets innovation!",
      image: "/Images/Projects/dashboard (1).png",
      tech: ["Figma"],
      live: "https://www.figma.com/design/2p18wM9IC7zqWyydpT5q1l/Bylogin---Login-And-Register-Page-(Community)?m=auto&t=3uHTcJk3ibtlOrBN-6",
    },
    {
      title: "My-Paints",
      description:
        "Brushing creativity into pixels—an artistic portfolio that speaks through colors and strokes!",
      image: "/Images/Projects/paint.png",
      tech: ["Canva"],
      live: "https://www.canva.com/design/DAF3Wp8-CC8/1qvE-JJEjSzP873B5OAgjA/edit",
    },
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
              Explore some of my recent work and personal projects.
            </p>
          </motion.div>

          <div className="max-w-7xl mx-auto space-y-32">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className={`flex flex-col ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } gap-12 items-center`}
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
                  <h3 className="text-3xl font-bold text-white">{project.title}</h3>
                  <p className="text-gray-300 text-lg">{project.description}</p>
                  <div className="flex flex-wrap gap-3">
                    {(project.tech || []).map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-6 pt-4">
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                      >
                        <ExternalLink size={20} />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}

export default Project2;
