/**
 * Projects.jsx — Projects showcase page
 */
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import ProjectCard from '../components/ProjectCard.jsx'
import {
  ArrowUpRightIcon,
  CodeIcon,
  FolderIcon,
  GithubIcon,
  ShieldIcon,
  UserIcon,
} from '../components/Icons.jsx'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
}

const PROJECTS = [
  {
    id: 1,
    title: 'Tic Tac Toe Game',
    description:
      'A fully functional browser-based Tic Tac Toe game with two-player mode, win detection, and score tracking. Built with vanilla JavaScript and DOM manipulation.',
    tags: ['JavaScript', 'HTML5', 'CSS3', 'DOM API'],
    type: 'Game',
    icon: CodeIcon,
    link: null,
    highlights: [
      'Two-player local multiplayer support',
      'Real-time win/draw detection algorithm',
      'Animated game board with smooth transitions',
      'Score tracking across multiple rounds',
    ],
    category: 'Web Dev',
  },
  {
    id: 2,
    title: "Women's NGO Website",
    description:
      "A complete informational website built for a local women's NGO in Sikkim. Includes organization overview, event listings, donation info, and contact form.",
    tags: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
    type: 'Social Good',
    icon: UserIcon,
    link: null,
    highlights: [
      'Fully responsive for mobile and desktop',
      'Accessibility-first design approach',
      'Custom CSS animations and hover effects',
      'Pro-bono project for community impact',
    ],
    category: 'Web Dev',
  },
  {
    id: 3,
    title: 'Web App Vulnerability Assessment',
    description:
      'A structured security audit of a web application to identify and document vulnerabilities including XSS, CSRF, SQL Injection, and broken authentication.',
    tags: ['Burp Suite', 'OWASP', 'Kali Linux', 'Security Testing'],
    type: 'Security',
    icon: ShieldIcon,
    link: null,
    highlights: [
      'Identified 8+ critical and medium vulnerabilities',
      'Documented attack vectors with CVSS scoring',
      'Followed OWASP Testing Guide methodology',
      'Produced professional pentest report with remediation steps',
    ],
    category: 'Security',
  },
  {
    id: 4,
    title: 'MFA Bypass Analysis',
    description:
      'Academic research into multi-factor authentication bypass techniques including OTP interception, SIM swapping, and TOTP token manipulation in test environments.',
    tags: ['Security Research', 'MFA', 'TOTP', 'Authentication'],
    type: 'Security',
    icon: ShieldIcon,
    link: null,
    highlights: [
      'Analyzed 5+ common MFA bypass techniques',
      'Tested in isolated, authorized lab environment',
      'Proposed hardened MFA implementation guidelines',
      'Cited NIST SP 800-63B standards in findings',
    ],
    category: 'Security',
  },
]

const CATEGORIES = ['All', 'Web Dev', 'Security']

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const filteredProjects = filter === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === filter)

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="page-wrapper"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <p className="text-xs text-gray-600 mb-2 terminal-prompt">ls ./projects/</p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-100 section-title">
            Projects
          </h1>
          <p className="mt-4 text-gray-500 text-sm">
            <span className="text-neon/60">{filteredProjects.length}</span>
            <span className="text-gray-700"> / {PROJECTS.length}</span>
            <span className="text-gray-600"> projects loaded</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`inline-flex items-center gap-2 px-4 py-1.5 text-xs tracking-widest uppercase transition-all border ${
                filter === cat
                  ? 'border-neon text-neon bg-neon/10 shadow-neon'
                  : 'border-neon/20 text-gray-500 hover:border-neon/40 hover:text-gray-300'
              }`}
            >
              <FolderIcon className="h-3.5 w-3.5" />
              <span>{cat}</span>
            </button>
          ))}
        </motion.div>

        <motion.div layout className="grid sm:grid-cols-2 gap-4">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </motion.div>

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 text-gray-600"
          >
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full border border-neon/10 text-neon/50">
              <FolderIcon className="h-5 w-5" />
            </div>
            <p className="text-sm">No projects found in this category.</p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 cyber-card p-6 text-center"
        >
          <p className="text-neon/50 text-xs mb-2">// more.coming.soon</p>
          <h3 className="text-gray-300 font-medium mb-2">More projects in the pipeline</h3>
          <p className="text-gray-600 text-sm">
            Currently working on a full-stack security dashboard and a CTF writeup blog.
          </p>
          <a
            href="https://github.com/bhandarimovies"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-neon mt-4 inline-flex items-center gap-2 text-xs"
          >
            <GithubIcon className="h-4 w-4 fill-current" />
            <span>view github</span>
            <ArrowUpRightIcon className="h-3.5 w-3.5" />
          </a>
        </motion.div>
      </div>
    </motion.div>
  )
}
