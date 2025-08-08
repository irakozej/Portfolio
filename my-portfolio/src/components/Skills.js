// src/components/Skills.js
import React from "react";
import { motion } from "framer-motion";

const skills = [
  { name: "JavaScript", level: 90 },
  { name: "React", level: 85 },
  { name: "TailwindCSS", level: 85 },
  { name: "Python", level: 70 },
  { name: "Flutter", level: 65 },
  { name: "Firebase", level: 75 },
];

export default function Skills() {
  return (
    <section id="skills" className="px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <h3 className="text-2xl font-bold mb-6 text-center">Skills</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {skills.map((s) => (
            <div key={s.name} className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">{s.name}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{s.level}%</span>
              </div>
              <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }} animate={{ width: `${s.level}%` }}
                  transition={{ duration: 0.8 }}
                  className="h-3 bg-blue-600 dark:bg-blue-400 rounded-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
