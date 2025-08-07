import React from "react";

export default function HomePage() {
  return (
    <div className="font-sans text-gray-800">
      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 text-white flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Hi, I'm Jean Paul</h1>
          <p className="text-lg md:text-2xl mb-6">
            Software Engineer & Machine Learning Enthusiast
          </p>
          <a
            href="#projects"
            className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-full hover:bg-gray-200 transition"
          >
            View My Work
          </a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">About Me</h2>
          <p className="text-lg leading-relaxed">
            I'm a passionate developer who builds smart applications using
            modern technologies like React, Firebase, Python, and Machine
            Learning. I love solving real-world problems and learning new
            things every day.
          </p>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Projects</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Project Card 1 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-2">Book Sales Prediction</h3>
              <p className="text-sm mb-4">
                A machine learning app built with Flutter and Firebase that predicts book sales trends.
              </p>
              <a
                href="#"
                className="text-blue-600 hover:underline"
              >
                View Project →
              </a>
            </div>

            {/* Project Card 2 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-2">TutorConnect</h3>
              <p className="text-sm mb-4">
                A full-featured tutor-student booking platform with rating, scheduling, and admin dashboard.
              </p>
              <a
                href="#"
                className="text-blue-600 hover:underline"
              >
                View Project →
              </a>
            </div>

            {/* Project Card 3 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-2">MNIST Digit Classifier</h3>
              <p className="text-sm mb-4">
                Deployed on Render, this web app uses TensorFlow to classify handwritten digits.
              </p>
              <a
                href="#"
                className="text-blue-600 hover:underline"
              >
                View Project →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
          <p className="mb-6">
            Interested in working together or just want to say hi? Reach out!
          </p>
          <a
            href="mailto:your.email@example.com"
            className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-blue-700 transition"
          >
            Contact Me
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 text-center">
        <p>© {new Date().getFullYear()} Jean Paul. All rights reserved.</p>
      </footer>
    </div>
  );
}
