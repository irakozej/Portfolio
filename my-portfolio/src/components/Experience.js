// src/components/Experience.js
import React from "react";

const timeline = [
  { period: "2024", title: "Public Relations Intern - RAB", desc: "Stakeholder engagement, media relations, digital communication." },
  { period: "2024", title: "Final Year Project - UR", desc: "Capstone project in Computer & Software Engineering." },
  { period: "2025", title: "Studying at African Leadership University", desc: "Machine Learning specialization." },
];

export default function Experience() {
  return (
    <section id="experience" className="px-4 py-12 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-5xl mx-auto">
        <h3 className="text-2xl font-bold mb-6 text-center">Experience</h3>
        <div className="space-y-6">
          {timeline.map((t) => (
            <div key={t.title} className="p-4 bg-white dark:bg-gray-900 rounded-lg shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-semibold">{t.title}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{t.desc}</p>
                </div>
                <div className="text-sm text-gray-400">{t.period}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
