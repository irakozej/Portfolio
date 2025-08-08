// src/components/ProjectCard.js
import React from "react";
import { motion } from "framer-motion";

export default function ProjectCard({ project, onOpen }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden cursor-pointer"
      onClick={() => onOpen(project)}
    >
      <img src={project.image} alt={project.title} className="w-full h-44 object-cover" />
      <div className="p-4">
        <h4 className="text-lg font-semibold">{project.title}</h4>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{project.short}</p>
        <div className="mt-4 text-blue-600 dark:text-blue-400 font-medium">Learn more →</div>
      </div>
    </motion.div>
  );
}
