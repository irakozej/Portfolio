import React from "react";
import Navbar from "../components/Navbar";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white">
      <Navbar />
      <main className="p-8">
        <h2 className="text-3xl font-semibold">Welcome to my portfolio</h2>
        <p className="mt-4">This site supports dark mode!</p>
      </main>
    </div>
  );
}
