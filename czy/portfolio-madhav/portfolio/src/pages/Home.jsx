/**
 * Home.jsx — Landing / Hero page
 */
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import background from '../background.jpeg'
import {
  ArrowRightIcon,
  CodeIcon,
  CpuIcon,
  DownloadIcon,
  FolderIcon,
  MailIcon,
  ShieldIcon,
  TerminalIcon,
} from '../components/Icons.jsx'

const TYPING_LINES = [
  "Hi, I'm Madhav Bhandari",
  'Aspiring Developer',
  'Cybersecurity Enthusiast',
  'BCA Student @ SRM University Sikkim',
]

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.6 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
}

const STATS = [
  { label: 'Projects Built', value: '04', icon: FolderIcon },
  { label: 'Skills Mastered', value: '09', icon: CodeIcon },
  { label: 'Security Reports', value: '02', icon: ShieldIcon },
  { label: 'Currently Learning', value: '∞', icon: CpuIcon },
]

const SKILLS = [
  { name: 'React.js', color: '#61dafb' },
  { name: 'JavaScript', color: '#f7df1e' },
  { name: 'Python', color: '#3776ab' },
  { name: 'Java', color: '#ed8b00' },
  { name: 'C', color: '#a8b9cc' },
  { name: 'HTML & CSS', color: '#e34f26' },
  { name: 'Cybersecurity', color: '#00ff99' },
  { name: 'Networking', color: '#ff6b6b' },
  { name: 'DBMS', color: '#336791' },
]

export default function Home() {
  const [lineIndex, setLineIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [displayText, setDisplayText] = useState('')

  useEffect(() => {
    const currentLine = TYPING_LINES[lineIndex]
    let timeout

    if (!isDeleting) {
      if (charIndex < currentLine.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentLine.slice(0, charIndex + 1))
          setCharIndex(prev => prev + 1)
        }, 80)
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2000)
      }
    } else if (charIndex > 0) {
      timeout = setTimeout(() => {
        setDisplayText(currentLine.slice(0, charIndex - 1))
        setCharIndex(prev => prev - 1)
      }, 40)
    } else {
      setIsDeleting(false)
      setLineIndex(prev => (prev + 1) % TYPING_LINES.length)
    }

    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, lineIndex])

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="page-wrapper"
    >
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full border border-neon/5 pointer-events-none" />
        <div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full border border-neon/5 pointer-events-none"
          style={{ transform: 'translate(-50%, -50%)' }}
        />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full border border-neon/5 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-3xl mb-8"
        >
          <div className="flex items-center gap-2 px-4 py-2 bg-cyber-card border border-neon/20 border-b-0">
            <div className="w-3 h-3 rounded-full bg-red-500/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-neon/60" />
            <span className="ml-2 text-xs text-gray-600">bash - madhav@portfolio ~</span>
          </div>

          <div
            className="border border-neon/20 p-6 md:p-8"
            style={{
              backgroundImage: `linear-gradient(rgba(5, 5, 5, 0.82), rgba(5, 5, 5, 0.82)), url(${background})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xs text-gray-600 mb-6 space-y-1"
            >
              <p><span className="text-neon/40">[boot]</span> Initializing portfolio.exe...</p>
              <p><span className="text-neon/40">[info]</span> Loading developer profile...</p>
              <p><span className="text-green-500/60">[ok]</span> All systems operational.</p>
            </motion.div>

            <div className="flex items-start gap-2 mb-2">
              <span className="text-neon text-sm mt-0.5">$</span>
              <div>
                <p className="text-xs text-gray-600 mb-1">whoami</p>
              </div>
            </div>

            <div className="min-h-[3rem] mb-6">
              <h1 className="text-2xl md:text-4xl font-bold text-neon tracking-tight">
                {displayText}
                <span className="inline-block w-0.5 h-8 bg-neon ml-1 animate-blink align-middle" />
              </h1>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-gray-400 text-sm md:text-base leading-relaxed max-w-xl mb-6"
            >
              <span className="text-neon/60">// </span>
              BCA student at SRM University Sikkim, passionate about building
              secure applications and exploring the depths of cybersecurity.
              Currently hunting for vulnerabilities and writing clean code.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/projects" className="btn-neon inline-flex items-center gap-2">
                <FolderIcon className="h-4 w-4" />
                <span>view projects</span>
              </Link>
              <Link
                to="/contact"
                className="btn-neon inline-flex items-center gap-2"
                style={{ borderColor: '#ffffff20', color: '#aaa' }}
              >
                <MailIcon className="h-4 w-4 text-neon" />
                <span>contact me</span>
              </Link>
              <a
                href="/resume.pdf"
                download
                className="btn-neon inline-flex items-center gap-2"
                style={{ borderColor: '#00ff9940', color: '#00ff9980' }}
              >
                <DownloadIcon className="h-4 w-4" />
                <span>download cv</span>
              </a>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="w-full max-w-3xl grid grid-cols-2 md:grid-cols-4 gap-3"
        >
          {STATS.map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="cyber-card p-4 text-center group hover:border-neon/40 transition-all"
            >
              <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-full border border-neon/10 text-neon/50 group-hover:text-neon transition-colors">
                <Icon className="h-4 w-4" />
              </div>
              <div className="text-neon text-2xl font-bold">{value}</div>
              <div className="text-gray-600 text-xs mt-1">{label}</div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-gray-700 text-xs tracking-widest">SCROLL</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="flex flex-col items-center gap-1 text-neon/60"
          >
            <ArrowRightIcon className="h-4 w-4 rotate-90" />
            <div className="w-px h-6 bg-gradient-to-b from-neon/50 to-transparent" />
          </motion.div>
        </motion.div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs text-gray-600 mb-2 terminal-prompt">cat skills.txt</p>
            <h2 className="text-xl font-bold text-gray-300 mb-8 section-title">
              Core Competencies
            </h2>
          </motion.div>

          <div className="flex flex-wrap gap-3">
            {SKILLS.map((skill, i) => (
              <motion.span
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 text-xs border border-neon/15 text-gray-400 hover:text-neon hover:border-neon/40 transition-all cursor-default"
              >
                <TerminalIcon className="h-3.5 w-3.5" style={{ color: skill.color }} />
                <span>{skill.name}</span>
              </motion.span>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  )
}
