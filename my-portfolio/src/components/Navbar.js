// Navbar.js
import React, { useState } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";

export default function Navbar({ darkMode, setDarkMode }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur bg-white/70 dark:bg-gray-900/70 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="#home" className="font-bold text-xl">Jean Paul</a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center space-x-6">
          <a href="#about" className="hover:text-blue-500">About</a>
          <a href="#projects" className="hover:text-blue-500">Projects</a>
          <a href="#contact" className="hover:text-blue-500">Contact</a>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800 transition"
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={() => setOpen(!open)} aria-label="Menu" className="p-2">
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${open ? "block" : "hidden"} px-4 pb-4`}>
        <a href="#about" onClick={() => setOpen(false)} className="block py-2">About</a>
        <a href="#projects" onClick={() => setOpen(false)} className="block py-2">Projects</a>
        <a href="#contact" onClick={() => setOpen(false)} className="block py-2">Contact</a>
        <button
          onClick={() => { setDarkMode(!darkMode); setOpen(false); }}
          className="mt-2 inline-flex items-center px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </nav>
  );
}
