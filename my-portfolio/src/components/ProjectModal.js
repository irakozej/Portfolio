// ProjectModal.js
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/50"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* modal */}
        <motion.div
          className="relative bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-3xl w-full mx-4 overflow-auto"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 30, opacity: 0 }}
        >
          <img src={project.image} alt={project.title} className="w-full h-56 object-cover rounded-t-lg" />
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold">{project.title}</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">{project.long}</p>
              </div>
              <button onClick={onClose} className="ml-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                Close
              </button>
            </div>

            <div className="mt-6">
              <h4 className="font-semibold">Tech stack</h4>
              <div className="mt-2 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm">{t}</span>
                ))}
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <a
                href={project.repo || "#"}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                View Repo
              </a>

              {/* Admin note: link to admin dashboard to edit project */}
              <a
                href="/admin"
                className="px-4 py-2 border rounded hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                Admin Dashboard
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
