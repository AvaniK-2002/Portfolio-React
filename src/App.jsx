import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Skills from "./pages/Skills.jsx";
import Projects from "./pages/Projects.jsx";
import Project2 from "./pages/Project2.jsx";
import Contact from "./pages/Contact.jsx";
import CustomCursor from "./components/CustomCursor.jsx";
import Loader from "./components/Loader.jsx";

function App() {
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setInitialLoad(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
      <CustomCursor />
      <Navbar />

      {/* Loader with AnimatePresence for smooth exit */}
      <AnimatePresence>
        {initialLoad && <Loader key="loader" />}
      </AnimatePresence>

      {/* MAIN ROUTES - Always rendered, revealed after loader fades */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/project2" element={<Project2 />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
