/**
 * App.jsx — Root component
 *
 * STATE: darkMode (bool) — toggled by Navbar, propagated via prop
 * ROUTING: React Router v6 with <Routes> and <Route>
 * LAYOUT: Navbar (top) + page content + Footer (bottom)
 */
import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Resume from './pages/Resume.jsx'
import Projects from './pages/Projects.jsx'
import Contact from './pages/Contact.jsx'

// Inner component so we can use useLocation inside Router
function AnimatedRoutes({ darkMode, toggleDark }) {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Each Route renders a page component */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  // STATE: darkMode controls the hacker theme toggle
  const [darkMode, setDarkMode] = useState(true)

  const toggleDark = () => {
    setDarkMode(prev => !prev)
    // Apply/remove "dark" class on <html> for Tailwind dark mode
    document.documentElement.classList.toggle('dark')
  }

  return (
    // Apply dark class based on state
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-cyber-dark text-gray-300 font-mono scanlines cyber-grid">
        <Router>
          {/* Navbar receives darkMode state and toggle function as props */}
          <Navbar darkMode={darkMode} toggleDark={toggleDark} />

          {/* Main content area */}
          <main>
            <AnimatedRoutes darkMode={darkMode} toggleDark={toggleDark} />
          </main>

          <Footer />
        </Router>
      </div>
    </div>
  )
}
