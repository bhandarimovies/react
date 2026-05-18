/**
 * ProjectCard.jsx — Reusable card component for a single project
 */
import React, { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRightIcon, ArrowUpRightIcon } from './Icons.jsx'
import { io } from 'socket.io-client'

export default function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false)
  const { title, description, tags, type, link, highlights, icon: Icon } = project

  const projectId = project._id || project.id
  const [likesCount, setLikesCount] = useState(project.likesCount || 0)
  const [dislikesCount, setDislikesCount] = useState(project.dislikesCount || 0)

  const clientId = useMemo(() => {
    try {
      const v = localStorage.getItem('clientId')
      if (v) return v
      const next = `${Date.now()}-${Math.random().toString(16).slice(2)}`
      localStorage.setItem('clientId', next)
      return next
    } catch {
      return `anon-${Date.now()}`
    }
  }, [])

  useEffect(() => {
    if (!projectId) return

    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'
    const socket = io(baseUrl, {
      transports: ['websocket'],
    })

    socket.emit('joinProjectRoom', { projectId })

    socket.on('projectVoted', (payload) => {
      if (String(payload.projectId) !== String(projectId)) return
      setLikesCount(payload.likesCount ?? 0)
      setDislikesCount(payload.dislikesCount ?? 0)
    })

    return () => {
      socket.disconnect()
    }
  }, [projectId])


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

      <div className="flex items-start justify-between mt-auto pt-4 border-t border-neon/10">
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <span
              key={tag}
              className="text-xs text-gray-500 bg-neon/5 border border-neon/10 px-2 py-0.5 hover:text-neon hover:border-neon/30 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3 z-20">
          <button
            type="button"
            className="inline-flex items-center gap-2 text-xs text-gray-400 border border-neon/20 hover:border-neon/50 hover:text-neon bg-black/20 px-3 py-1.5 rounded-sm transition-all"
            style={{ userSelect: 'none' }}
            onClick={async (e) => {
              e.preventDefault()
              e.stopPropagation()
              if (!projectId) return

              // optimistic
              setLikesCount(v => {
                if (v === undefined) return 1
                return v + 1
              })

              const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'
              try {
                await fetch(`${baseUrl}/api/projects/${projectId}/vote`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'x-client-id': clientId,
                  },
                  body: JSON.stringify({ value: 'like' }),
                })
              } catch {
                // If API fails, server socket event won't come; UI may be corrected by refresh.
              }
            }}
            aria-label="Like"
          >
            <span className="text-sm leading-none">Like</span>
            <span className="font-mono">{likesCount}</span>
          </button>

          <button
            type="button"
            className="inline-flex items-center gap-2 text-xs text-gray-400 border border-neon/20 hover:border-neon/50 hover:text-neon bg-black/20 px-3 py-1.5 rounded-sm transition-all"
            style={{ userSelect: 'none' }}
            onClick={async (e) => {
              e.preventDefault()
              e.stopPropagation()
              if (!projectId) return

              setDislikesCount(v => {
                if (v === undefined) return 1
                return v + 1
              })

              const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'
              try {
                await fetch(`${baseUrl}/api/projects/${projectId}/vote`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'x-client-id': clientId,
                  },
                  body: JSON.stringify({ value: 'dislike' }),
                })
              } catch {
                // ignore
              }
            }}
            aria-label="Dislike"
          >
            <span className="text-sm leading-none">Dislike</span>
            <span className="font-mono">{dislikesCount}</span>
          </button>
        </div>
      </div>

      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon/50 to-transparent"
      />
    </motion.div>
  )
}
