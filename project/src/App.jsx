import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
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
import Loader from "./components/Loader.jsx"; // Import Loader

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      <Loader /> {/* Add Rocket Preloader */}
      <CustomCursor />
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/project2" element={<Project2 />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  );
}

export default App;
