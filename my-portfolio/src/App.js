// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import useDarkMode from "./hooks/useDarkMode";
import Navbar from "./components/Navbar";
import ProjectCard from "./components/ProjectCard";
import ProjectModal from "./components/ProjectModal";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Admin from "./pages/Admin";
import sampleProjects from "./data/sampleProjects";
import useSWR from "swr";
import axios from "axios";
import { motion } from "framer-motion";

const fetcher = (url) => axios.get(url).then(r => r.data);

export default function App() {
  const [darkMode, setDarkMode] = useDarkMode();

  // SWR: fetch projects from /api/projects, fallback to sampleProjects
  // revalidateOnFocus true and refreshInterval ensures auto-refresh
  const { data: projects, mutate } = useSWR("/api/projects", fetcher, {
    fallbackData: sampleProjects,
    revalidateOnFocus: true,
    refreshInterval: 5000
  });

  const [selectedProject, setSelectedProject] = React.useState(null);

  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

        <Routes>
          <Route path="/" element={
            <>
              {/* Hero */}
              <header id="home" className="pt-24">
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-5xl mx-auto px-4 text-center py-20">
                  <h1 className="text-4xl md:text-6xl font-bold">Hi, I’m Jean Paul</h1>
                  <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    Software Engineer • Machine Learning enthusiast • Building useful, beautiful apps.
                  </p>
                  <div className="mt-8 flex items-center justify-center gap-4">
                    <a href="#projects" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-full shadow">View My Work</a>
                    <a href="#contact" className="px-5 py-3 rounded-full border hover:bg-gray-100 dark:hover:bg-gray-800">Contact</a>
                  </div>
                </motion.div>
              </header>

              {/* About */}
              <section id="about" className="px-4">
                <div className="max-w-4xl mx-auto text-center py-12">
                  <h2 className="text-2xl font-bold">About Me</h2>
                  <p className="mt-4 text-gray-600 dark:text-gray-300">
                    I graduated from the University of Rwanda and study at African Leadership University. I build full-stack apps,
                    dashboards, and ML prototypes. This portfolio is built with React + Tailwind and is admin-driven.
                  </p>
                </div>
              </section>

              {/* Projects */}
              <section id="projects" className="bg-gray-50 dark:bg-gray-800 py-12 px-4">
                <div className="max-w-6xl mx-auto">
                  <h3 className="text-3xl font-bold text-center mb-8">Selected Projects</h3>

                  <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6"
                    initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}>
                    {projects?.map((p) => (
                      <motion.div key={p.id} variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}>
                        <ProjectCard project={p} onOpen={setSelectedProject} />
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </section>

              <Skills />
              <Experience />

              {/* Contact */}
              <section id="contact" className="px-4">
                <div className="max-w-3xl mx-auto text-center py-12">
                  <h3 className="text-2xl font-bold">Contact</h3>
                  <p className="mt-4 text-gray-600 dark:text-gray-300">Email: <a href="mailto:jeanpaul@example.com" className="text-blue-500">jeanpaul@example.com</a></p>
                </div>
              </section>

              <footer className="bg-gray-100 dark:bg-gray-900 py-6 mt-8">
                <div className="max-w-6xl mx-auto text-center text-gray-600 dark:text-gray-400">
                  © {new Date().getFullYear()} Jean Paul. All rights reserved.
                </div>
              </footer>

              <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
            </>
          } />

          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
}
