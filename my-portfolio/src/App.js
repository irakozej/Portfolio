// App.js
import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import ProjectCard from "./components/ProjectCard";
import ProjectModal from "./components/ProjectModal";
import sampleProjects from "./data/sampleProjects";
import axios from "axios";
import { motion } from "framer-motion";

export default function App() {
  // dark mode: load from localStorage or system preference
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved) return saved === "dark";
      return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) root.classList.add("dark");
    else root.classList.remove("dark");
    try { localStorage.setItem("theme", darkMode ? "dark" : "light"); } catch {}
  }, [darkMode]);

  // projects: try to fetch from API, fallback to sampleProjects
  const [projects, setProjects] = useState(sampleProjects);
  useEffect(() => {
    let mounted = true;
    axios.get("/api/projects").then((res) => {
      if (!mounted) return;
      if (Array.isArray(res.data) && res.data.length) setProjects(res.data);
    }).catch(() => {
      // keep sampleProjects as fallback
    });
    return () => { mounted = false; };
  }, []);

  // modal state
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen transition-colors duration-300">
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Hero */}
      <header id="home" className="pt-24">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto px-4 text-center py-20"
        >
          <h1 className="text-4xl md:text-6xl font-bold">Hi, I’m Jean Paul</h1>
          <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Software Engineer • Machine Learning enthusiast • Building useful, beautiful apps.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <a href="#projects" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-full shadow">
              View My Work
            </a>
            <a href="#contact" className="px-5 py-3 rounded-full border hover:bg-gray-100 dark:hover:bg-gray-800">
              Contact
            </a>
          </div>
        </motion.div>
      </header>

      {/* About */}
      <section id="about" className="px-4">
        <div className="max-w-4xl mx-auto text-center py-12">
          <h2 className="text-2xl font-bold">About Me</h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            I graduated from University of Rwanda and study at African Leadership University. I build
            full-stack apps, dashboards, and ML prototypes. This portfolio is built with React + Tailwind.
          </p>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="bg-gray-50 dark:bg-gray-800 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-8">Selected Projects</h3>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } }
            }}
          >
            {projects.map((p) => (
              <motion.div key={p.id} variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}>
                <ProjectCard project={p} onOpen={setSelectedProject} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="px-4">
        <div className="max-w-3xl mx-auto text-center py-12">
          <h3 className="text-2xl font-bold">Contact</h3>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Email: <a href="mailto:jeanpaul@example.com" className="text-blue-500">jeanpaul@example.com</a></p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-900 py-6 mt-8">
        <div className="max-w-6xl mx-auto text-center text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} Jean Paul. All rights reserved.
        </div>
      </footer>

      {/* Modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
}
