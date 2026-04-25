import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import logo from '../logo.jpeg'
import {
  FileTextIcon,
  FolderIcon,
  HomeIcon,
  MailIcon,
  UserIcon,
} from './Icons.jsx'

const NAV_LINKS = [
  { path: '/', label: 'home', icon: HomeIcon },
  { path: '/about', label: 'about', icon: UserIcon },
  { path: '/resume', label: 'resume', icon: FileTextIcon },
  { path: '/projects', label: 'projects', icon: FolderIcon },
  { path: '/contact', label: 'contact', icon: MailIcon },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-cyber-dark/95 backdrop-blur-sm border-b border-neon/20 shadow-neon'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <NavLink to="/" className="group flex items-center gap-2">
            <div className="h-8 w-8 flex-shrink-0 overflow-hidden rounded-full bg-black p-1 ring-2 ring-neon/40 transition-all group-hover:ring-neon">
              <img
                src={logo}
                alt="Madhav Bhandari logo"
                className="h-full w-full object-contain"
              />
            </div>
            <span className="hidden sm:block text-sm text-gray-500">
              <span className="text-neon/60">./</span>madhav-བན་དྲ་རི།
            </span>
          </NavLink>

          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ path, label, icon: Icon }) => (
              <NavLink
                key={path}
                to={path}
                end={path === '/'}
                className={({ isActive }) =>
                  `group relative px-4 py-2 text-xs uppercase tracking-widest transition-all duration-200 ${
                    isActive
                      ? 'text-neon neon-text-dim'
                      : 'text-gray-500 hover:text-neon'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute inset-0 border border-neon/30 bg-neon/5"
                        style={{ borderRadius: '2px' }}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      <Icon className="h-3.5 w-3.5 text-neon/60" />
                      <span>{label}</span>
                    </span>
                  </>
                )}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setMenuOpen(prev => !prev)}
              className="group flex flex-col gap-1.5 p-2 md:hidden"
              aria-label="Toggle menu"
            >
              <span
                className={`block h-px w-5 bg-neon transition-all duration-300 ${
                  menuOpen ? 'translate-y-2 rotate-45' : ''
                }`}
              />
              <span
                className={`block h-px w-5 bg-neon transition-all duration-300 ${
                  menuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block h-px w-5 bg-neon transition-all duration-300 ${
                  menuOpen ? '-translate-y-2 -rotate-45' : ''
                }`}
              />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden border-t border-neon/20 bg-cyber-dark/98 md:hidden"
            >
              <div className="space-y-1 py-3">
                {NAV_LINKS.map(({ path, label, icon: Icon }) => (
                  <NavLink
                    key={path}
                    to={path}
                    end={path === '/'}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 text-sm tracking-wider transition-colors ${
                        isActive
                          ? 'border-l-2 border-neon bg-neon/5 text-neon'
                          : 'text-gray-500 hover:bg-neon/5 hover:text-neon'
                      }`
                    }
                  >
                    <Icon className="h-4 w-4 text-neon/60" />
                    <span className="text-xs uppercase tracking-widest">{label}</span>
                  </NavLink>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-neon/30 to-transparent" />
    </nav>
  )
}