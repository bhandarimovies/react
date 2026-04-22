/**
 * Resume.jsx — Resume / CV page
 */
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRightIcon,
  BriefcaseIcon,
  CodeIcon,
  DownloadIcon,
  FileTextIcon,
  GraduationCapIcon,
  ShieldIcon,
} from '../components/Icons.jsx'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
}

const EDUCATION = [
  {
    degree: 'Bachelor of Computer Applications (BCA)',
    institution: 'SRM University, Sikkim',
    year: '2023 - 2026 (Pursuing)',
    details: 'Focus on software development, networking, database management, and cybersecurity. Active member of the coding club.',
    gpa: 'In Progress',
  },
  {
    degree: 'Higher Secondary (12th Grade)',
    institution: 'Local Higher Secondary School, Sikkim',
    year: '2021 - 2023',
    details: 'Science stream with Computer Science. Developed first programming projects.',
    gpa: 'Completed',
  },
]

const SKILLS_GROUPED = [
  {
    category: 'Frontend Development',
    icon: CodeIcon,
    skills: ['React.js', 'HTML5', 'CSS3', 'JavaScript (ES6+)', 'Responsive Design', 'Tailwind CSS'],
  },
  {
    category: 'Backend & Languages',
    icon: FileTextIcon,
    skills: ['Python', 'Java', 'C (Basics)', 'Node.js (Basics)', 'SQL', 'REST APIs'],
  },
  {
    category: 'Cybersecurity',
    icon: ShieldIcon,
    skills: ['Web Penetration Testing', 'OWASP Top 10', 'Burp Suite', 'MFA Analysis', 'Vulnerability Assessment', 'OSINT'],
  },
  {
    category: 'Tools & Infrastructure',
    icon: BriefcaseIcon,
    skills: ['Git & GitHub', 'Linux / Kali Linux', 'Networking (TCP/IP)', 'Wireshark', 'DBMS / MySQL', 'VS Code'],
  },
]

const EXPERIENCE = [
  {
    role: 'Freelance Web Developer',
    org: "Women's NGO - Sikkim",
    period: '2024',
    type: 'Volunteer',
    points: [
      "Designed and developed a full informational website for a local women's NGO",
      'Implemented responsive layouts to ensure mobile accessibility',
      "Delivered pro-bono work to support the organization's digital presence",
    ],
  },
  {
    role: 'Security Researcher (Academic)',
    org: 'Self-Directed Research',
    period: '2024',
    type: 'Academic',
    points: [
      'Conducted a formal Web Application Vulnerability Assessment on a test environment',
      'Identified XSS, CSRF, and SQL injection vectors',
      'Documented findings in a professional security report format',
      'Performed MFA Bypass Analysis on common multi-factor authentication mechanisms',
    ],
  },
]

const CERTS = [
  { name: 'Cybersecurity Fundamentals', issuer: 'Cisco NetAcad', year: '2024', status: 'Completed' },
  { name: 'Python for Beginners', issuer: 'Coursera', year: '2023', status: 'Completed' },
  { name: 'Web Development Bootcamp', issuer: 'Udemy', year: '2023', status: 'Completed' },
  { name: 'CEH (Ethical Hacking)', issuer: 'EC-Council', year: '2025', status: 'In Progress' },
]

const TABS = [
  { id: 'education', label: 'Education', icon: GraduationCapIcon },
  { id: 'skills', label: 'Skills', icon: CodeIcon },
  { id: 'experience', label: 'Experience', icon: BriefcaseIcon },
  { id: 'certifications', label: 'Certs', icon: ShieldIcon },
]

export default function Resume() {
  const [activeTab, setActiveTab] = useState('education')

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
          className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4"
        >
          <div>
            <p className="text-xs text-gray-600 mb-2 terminal-prompt">cat resume.pdf</p>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-100 section-title">
              Resume
            </h1>
          </div>
          <a
            href="/resume.pdf"
            download
            className="btn-neon inline-flex items-center gap-2 text-xs self-start sm:self-auto"
          >
            <DownloadIcon className="h-4 w-4" />
            <span>download pdf</span>
          </a>
        </motion.div>

        <div className="flex border-b border-neon/20 mb-8 overflow-x-auto">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`relative inline-flex items-center gap-2 px-5 py-3 text-xs tracking-widest uppercase whitespace-nowrap transition-all ${
                activeTab === id
                  ? 'text-neon border-b-2 border-neon bg-neon/5'
                  : 'text-gray-600 hover:text-gray-300'
              }`}
            >
              <Icon className="h-3.5 w-3.5 text-neon/50" />
              <span>{label}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'education' && (
            <motion.div
              key="education"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {EDUCATION.map((edu, i) => (
                <motion.div
                  key={edu.degree}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="cyber-card p-6 relative corner-tl corner-br"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
                    <div className="flex items-start gap-3">
                      <GraduationCapIcon className="h-5 w-5 text-neon/60 mt-0.5" />
                      <div>
                        <h3 className="text-neon text-sm font-semibold">{edu.degree}</h3>
                        <p className="text-gray-400 text-xs mt-1">{edu.institution}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs border border-neon/30 text-neon/60 px-2 py-1 whitespace-nowrap">
                        {edu.year}
                      </span>
                      <p className="text-gray-600 text-xs mt-1">{edu.gpa}</p>
                    </div>
                  </div>
                  <p className="text-gray-500 text-xs leading-relaxed">{edu.details}</p>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === 'skills' && (
            <motion.div
              key="skills"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.3 }}
              className="grid sm:grid-cols-2 gap-4"
            >
              {SKILLS_GROUPED.map((group, i) => {
                const Icon = group.icon

                return (
                <motion.div
                  key={group.category}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="cyber-card p-5"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Icon className="h-4 w-4 text-neon" />
                    <h3 className="text-gray-300 text-xs font-semibold tracking-wider uppercase">
                      {group.category}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map(skill => (
                      <span
                        key={skill}
                        className="text-xs text-gray-400 bg-neon/5 border border-neon/10 px-2 py-1 hover:text-neon hover:border-neon/30 transition-colors cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
                )
              })}
            </motion.div>
          )}

          {activeTab === 'experience' && (
            <motion.div
              key="experience"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {EXPERIENCE.map((exp, i) => (
                <motion.div
                  key={exp.role}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="cyber-card p-6 relative corner-tl corner-br"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-4">
                    <div className="flex items-start gap-3">
                      <BriefcaseIcon className="h-5 w-5 text-neon/60 mt-0.5" />
                      <div>
                        <h3 className="text-neon text-sm font-semibold">{exp.role}</h3>
                        <p className="text-gray-400 text-xs mt-1">{exp.org}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 items-center">
                      <span className="text-xs border border-neon/20 text-gray-600 px-2 py-1">{exp.period}</span>
                      <span className="text-xs border border-yellow-500/30 text-yellow-500/60 px-2 py-1">{exp.type}</span>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {exp.points.map((point, j) => (
                      <li key={j} className="text-gray-500 text-xs flex items-start gap-2 leading-relaxed">
                        <ArrowRightIcon className="h-3.5 w-3.5 text-neon mt-0.5 flex-shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === 'certifications' && (
            <motion.div
              key="certifications"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.3 }}
              className="grid sm:grid-cols-2 gap-4"
            >
              {CERTS.map((cert, i) => (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="cyber-card p-5 group"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-gray-300 text-xs font-medium group-hover:text-neon transition-colors">
                      {cert.name}
                    </h3>
                    <span className={`text-xs px-2 py-0.5 border ${
                      cert.status === 'Completed'
                        ? 'border-neon/30 text-neon/60'
                        : 'border-yellow-500/30 text-yellow-500/60'
                    }`}>
                      {cert.status}
                    </span>
                  </div>
                  <p className="text-gray-600 text-xs">{cert.issuer}</p>
                  <p className="text-gray-700 text-xs mt-1">{cert.year}</p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
