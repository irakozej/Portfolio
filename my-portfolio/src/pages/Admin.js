// src/pages/Admin.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import sampleProjects from "../data/sampleProjects";
import { useNavigate } from "react-router-dom";
import useSWR, { mutate } from "swr";
import { v4 as uuidv4 } from "uuid";

const fetcher = (url) => axios.get(url).then((r) => r.data);

export default function Admin() {
  const navigate = useNavigate();
  const { data } = useSWR("/api/projects", fetcher, { fallbackData: sampleProjects });

  const [list, setList] = useState(data || sampleProjects);
  const [title, setTitle] = useState("");
  const [short, setShort] = useState("");
  const [longDesc, setLongDesc] = useState("");
  const [tech, setTech] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => setList(data || sampleProjects), [data]);

  async function addProject(e) {
    e.preventDefault();
    const newProj = {
      id: uuidv4(),
      title: title || "Untitled",
      short,
      long: longDesc,
      tech: tech ? tech.split(",").map(t => t.trim()) : [],
      image: image || "https://via.placeholder.com/800x450?text=New+Project",
      repo: "#"
    };

    // Try real API
    try {
      await axios.post("/api/projects", newProj);
      // revalidate SWR cache
      mutate("/api/projects");
    } catch (err) {
      // fallback: store in localStorage
      const stored = JSON.parse(localStorage.getItem("localProjects") || "[]");
      stored.unshift(newProj);
      localStorage.setItem("localProjects", JSON.stringify(stored));
      // Force SWR mutate with combined data
      mutate("/api/projects", [newProj, ...(data || sampleProjects)], false);
    }

    setTitle(""); setShort(""); setLongDesc(""); setTech(""); setImage("");
  }

  async function deleteProject(id) {
    try {
      await axios.delete(`/api/projects/${id}`);
      mutate("/api/projects");
    } catch {
      // fallback: remove from localStorage
      const stored = JSON.parse(localStorage.getItem("localProjects") || "[]").filter(p => p.id !== id);
      localStorage.setItem("localProjects", JSON.stringify(stored));
      mutate("/api/projects", (current = sampleProjects) => current.filter(p => p.id !== id), false);
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Admin — Manage Projects</h2>

        <form onSubmit={addProject} className="grid gap-3 mb-6">
          <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" className="p-2 border rounded bg-white dark:bg-gray-800" />
          <input value={short} onChange={e=>setShort(e.target.value)} placeholder="Short description" className="p-2 border rounded bg-white dark:bg-gray-800" />
          <input value={image} onChange={e=>setImage(e.target.value)} placeholder="Image URL" className="p-2 border rounded bg-white dark:bg-gray-800" />
          <input value={tech} onChange={e=>setTech(e.target.value)} placeholder="Tech (comma separated)" className="p-2 border rounded bg-white dark:bg-gray-800" />
          <textarea value={longDesc} onChange={e=>setLongDesc(e.target.value)} placeholder="Long description" className="p-2 border rounded bg-white dark:bg-gray-800" />
          <div className="flex gap-3">
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Add Project</button>
            <button type="button" onClick={()=>navigate("/")} className="px-4 py-2 border rounded">Back to site</button>
          </div>
        </form>

        <h3 className="text-xl font-semibold mb-3">Existing Projects</h3>
        <div className="space-y-3">
          {(list || []).map(p => (
            <div key={p.id} className="p-3 bg-gray-50 dark:bg-gray-800 rounded flex justify-between items-center">
              <div>
                <div className="font-semibold">{p.title}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{p.short}</div>
              </div>
              <div className="flex gap-2">
                <a href={p.repo} target="_blank" rel="noreferrer" className="px-3 py-1 border rounded">Repo</a>
                <button onClick={()=>deleteProject(p.id)} className="px-3 py-1 bg-red-600 text-white rounded">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
