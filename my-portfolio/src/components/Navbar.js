// src/components/Navbar.js
import React, { useState } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar({ darkMode, setDarkMode }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur bg-white/70 dark:bg-gray-900/70 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-lg font-bold">Jean Paul</Link>
          <div className="hidden md:flex gap-4">
            <a href="#about" className="hover:text-blue-500">About</a>
            <a href="#projects" className="hover:text-blue-500">Projects</a>
            <a href="#skills" className="hover:text-blue-500">Skills</a>
            <a href="#experience" className="hover:text-blue-500">Experience</a>
            <a href="#contact" className="hover:text-blue-500">Contact</a>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/admin" className="hidden md:inline text-sm px-3 py-1 border rounded">Admin</Link>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800 transition"
            aria-label="Toggle theme"
            title="Toggle theme"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <div className="md:hidden">
            <button onClick={() => setOpen(!open)} aria-label="Menu" className="p-2">
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* mobile menu */}
      <div className={`md:hidden ${open ? "block" : "hidden"} px-4 pb-4`}>
        <a href="#about" onClick={() => setOpen(false)} className="block py-2">About</a>
        <a href="#projects" onClick={() => setOpen(false)} className="block py-2">Projects</a>
        <a href="#skills" onClick={() => setOpen(false)} className="block py-2">Skills</a>
        <a href="#experience" onClick={() => setOpen(false)} className="block py-2">Experience</a>
        <a href="#contact" onClick={() => setOpen(false)} className="block py-2">Contact</a>
        <Link to="/admin" onClick={() => setOpen(false)} className="block py-2">Admin</Link>
      </div>
    </nav>
  );
}
