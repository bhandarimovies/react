/**
 * ProjectCard.jsx — Reusable card component for a single project
 */
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRightIcon, ArrowUpRightIcon } from './Icons.jsx'

export default function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false)
  const { title, description, tags, type, link, highlights, icon: Icon } = project

  const typeBadge = {
    'Web Dev': 'border-blue-500/40 text-blue-400',
    Security: 'border-red-500/40 text-red-400',
    Game: 'border-purple-500/40 text-purple-400',
    'Social Good': 'border-yellow-500/40 text-yellow-400',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="cyber-card rounded-sm relative corner-tl corner-br p-6 group cursor-default"
    >
      <span className="absolute top-4 right-4 text-4xl font-bold text-neon/5 select-none">
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neon/10 text-neon/70">
            <Icon className="h-5 w-5" />
          </span>
          <div>
            <h3 className="text-neon text-sm font-semibold tracking-wider uppercase group-hover:neon-text-dim transition-all">
              {title}
            </h3>
            {type && (
              <span className={`text-xs border px-2 py-0.5 mt-1 inline-block ${typeBadge[type] || 'border-neon/30 text-neon/60'}`}>
                {type}
              </span>
            )}
          </div>
        </div>

        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-gray-600 hover:text-neon text-xs border border-gray-700 hover:border-neon/50 px-2 py-1 transition-all"
            onClick={e => e.stopPropagation()}
          >
            <ArrowUpRightIcon className="h-3.5 w-3.5" />
            <span>view</span>
          </a>
        )}
      </div>

      <p className="text-gray-400 text-sm leading-relaxed mb-4">{description}</p>

      {highlights && highlights.length > 0 && (
        <motion.ul
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: hovered ? 1 : 0, height: hovered ? 'auto' : 0 }}
          transition={{ duration: 0.2 }}
          className="mb-4 space-y-1 overflow-hidden"
        >
          {highlights.map((item, i) => (
            <li key={i} className="text-xs text-gray-500 flex items-start gap-2">
              <ArrowRightIcon className="h-3.5 w-3.5 text-neon mt-0.5 flex-shrink-0" />
              {item}
            </li>
          ))}
        </motion.ul>
      )}

      <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-neon/10">
        {tags.map(tag => (
          <span
            key={tag}
            className="text-xs text-gray-500 bg-neon/5 border border-neon/10 px-2 py-0.5 hover:text-neon hover:border-neon/30 transition-colors"
          >
            {tag}
          </span>
        ))}
      </div>

      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon/50 to-transparent"
      />
    </motion.div>
  )
}
