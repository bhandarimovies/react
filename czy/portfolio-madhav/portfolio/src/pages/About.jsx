/**
 * About.jsx — About Me page
 */
import React from 'react'
import { motion } from 'framer-motion'
import {
  BriefcaseIcon,
  CodeIcon,
  CpuIcon,
  GraduationCapIcon,
  MapPinIcon,
  ShieldIcon,
  UserIcon,
} from '../components/Icons.jsx'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
}

const SKILLS = [
  { name: 'HTML & CSS', level: 90, category: 'Frontend' },
  { name: 'JavaScript', level: 80, category: 'Frontend' },
  { name: 'React.js', level: 75, category: 'Frontend' },
  { name: 'Python', level: 70, category: 'Backend' },
  { name: 'Java', level: 65, category: 'Backend' },
  { name: 'C', level: 60, category: 'Systems' },
  { name: 'DBMS / SQL', level: 70, category: 'Database' },
  { name: 'Networking', level: 65, category: 'Infrastructure' },
  { name: 'Web Pen Testing', level: 72, category: 'Security' },
]

const CAT_COLORS = {
  Frontend: 'text-blue-400',
  Backend: 'text-purple-400',
  Systems: 'text-orange-400',
  Database: 'text-yellow-400',
  Infrastructure: 'text-cyan-400',
  Security: 'text-neon',
}

const INFO_CARDS = [
  { label: 'Name', value: 'Madhav Bhandari', icon: UserIcon },
  { label: 'Degree', value: 'Bachelor of Computer Applications (BCA)', icon: GraduationCapIcon },
  { label: 'University', value: 'SRM University, Sikkim', icon: GraduationCapIcon },
  { label: 'Focus', value: 'Full-Stack Dev & Cybersecurity', icon: ShieldIcon },
  { label: 'Status', value: 'Currently Studying (Active)', icon: BriefcaseIcon },
  { label: 'Location', value: 'Sikkim, India', icon: MapPinIcon },
]

const INTERESTS = [
  { label: 'Web Penetration Testing', icon: ShieldIcon },
  { label: 'CTF Challenges', icon: CpuIcon },
  { label: 'Open Source', icon: CodeIcon },
  { label: 'Tech Blogs', icon: UserIcon },
  { label: 'Himalayan Trails', icon: MapPinIcon },
  { label: 'Strategy Games', icon: BriefcaseIcon },
  { label: 'Network Security', icon: ShieldIcon },
  { label: 'AI & ML Basics', icon: CpuIcon },
]

export default function About() {
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
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="text-xs text-gray-600 mb-2 terminal-prompt">cat about.md</p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-100 section-title">
            About Me
          </h1>
          <p className="mt-4 text-gray-500 text-sm max-w-xl">
            A passionate developer and security enthusiast from Sikkim, India.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8">
          <div className="md:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="cyber-card p-6 relative corner-tl corner-br"
            >
              <div className="w-20 h-20 border-2 border-neon/40 flex items-center justify-center mb-4 relative">
                <UserIcon className="h-10 w-10 text-neon/60" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-neon rounded-full animate-pulse" />
              </div>

              <h2 className="text-neon font-bold text-lg tracking-wider mb-1">Madhav Bhandari</h2>
              <p className="text-gray-500 text-xs mb-4">Aspiring Developer & Cybersecurity Enthusiast</p>

              <div className="space-y-2 text-xs text-gray-500">
                <p className="flex items-center gap-2">
                  <BriefcaseIcon className="h-3.5 w-3.5 text-neon/60" />
                  <span>Available for internships</span>
                </p>
                <p className="flex items-center gap-2">
                  <CodeIcon className="h-3.5 w-3.5 text-neon/60" />
                  <span>Open to collaborations</span>
                </p>
                <p className="flex items-center gap-2">
                  <ShieldIcon className="h-3.5 w-3.5 text-neon/60" />
                  <span>Currently learning: OWASP Top 10</span>
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="cyber-card p-5"
            >
              <p className="text-xs text-neon/50 mb-3">// bio.txt</p>
              <p className="text-gray-400 text-sm leading-relaxed">
                I&apos;m a BCA student at SRM University Sikkim with a deep passion for
                both software development and cybersecurity. I enjoy building
                meaningful applications while also probing for security weaknesses
                to make the web safer.
              </p>
              <br />
              <p className="text-gray-500 text-sm leading-relaxed">
                When I&apos;m not coding, I&apos;m exploring CTF challenges, studying
                networking concepts, or working on real-world vulnerability
                assessments. My goal is to bridge the gap between clean code
                and secure systems.
              </p>
            </motion.div>
          </div>

          <div className="md:col-span-3 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="cyber-card p-5"
            >
              <p className="text-xs text-neon/50 mb-4">// info.json</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {INFO_CARDS.map(({ label, value, icon: Icon }) => (
                  <div key={label} className="border border-neon/10 p-3 hover:border-neon/30 transition-colors group">
                    <p className="text-gray-600 text-xs mb-1">{label}</p>
                    <p className="flex items-center gap-2 text-gray-300 text-xs font-medium group-hover:text-neon transition-colors">
                      <Icon className="h-3.5 w-3.5 text-neon/50" />
                      <span>{value}</span>
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="cyber-card p-5"
            >
              <p className="text-xs text-neon/50 mb-4">// skills.map(proficiency)</p>
              <div className="space-y-3">
                {SKILLS.map(({ name, level, category }, i) => (
                  <motion.div
                    key={name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-300 text-xs">{name}</span>
                        <span className={`text-xs ${CAT_COLORS[category] || 'text-gray-600'}`}>
                          [{category}]
                        </span>
                      </div>
                      <span className="text-neon text-xs font-mono">{level}%</span>
                    </div>
                    <div className="skill-bar">
                      <motion.div
                        className="skill-bar-fill"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: i * 0.08, ease: 'easeOut' }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-8 cyber-card p-6"
        >
          <p className="text-xs text-neon/50 mb-4">// interests[]</p>
          <div className="flex flex-wrap gap-3">
            {INTERESTS.map(({ label, icon: Icon }) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 text-sm text-gray-400 border border-neon/10 px-3 py-1.5 hover:border-neon/30 hover:text-neon transition-all cursor-default"
              >
                <Icon className="h-4 w-4 text-neon/60" />
                <span>{label}</span>
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
