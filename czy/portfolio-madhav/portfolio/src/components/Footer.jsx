/**
 * Footer.jsx — Site footer
 * No props or complex state — purely presentational
 */
import React from 'react'
import logo from '../logo.jpeg'
import {
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  TerminalIcon,
} from './Icons.jsx'

const SOCIAL_LINKS = [
  { label: 'GitHub', href: 'https://github.com/bhandarimovies', icon: GithubIcon },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/madhav-bhandari-521186294', icon: LinkedinIcon },
  { label: 'Instagram', href: 'https://www.instagram.com/madhav_bhandari_999/?hl=en', icon: InstagramIcon },
  { label: 'Facebook', href: 'https://www.facebook.com/madhav.bhandari.123276', icon: FacebookIcon },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-neon/10 bg-cyber-dark">
      <div className="h-px bg-gradient-to-r from-transparent via-neon/20 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 flex-shrink-0 overflow-hidden rounded-full bg-black p-1 ring-2 ring-neon/40 transition-all">
              <img
                src={logo}
                alt="Madhav Bhandari logo"
                className="h-full w-full object-contain"
              />
            </div>
            <span className="hidden sm:block text-sm text-gray-500">
              <span className="text-neon/60">./</span>madhav-bhandari
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-600">
            <span className="inline-flex h-4 w-4 items-center justify-center text-neon/70">
              <TerminalIcon className="h-3.5 w-3.5" />
            </span>
            <span className="terminal-prompt">system online all processes nominal</span>
          </div>

          <div className="flex items-center gap-2">
            {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                title={label}
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-sm border border-neon/20 text-gray-500 transition-all duration-200 hover:border-neon/50 hover:text-neon hover:shadow-neon"
              >
                <Icon className="h-4 w-4 fill-current" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-neon/5 text-center text-xs text-gray-700">
          <span className="text-neon/30">Copyright</span> {year} <span className="text-gray-600">Madhav Bhandari</span>
          <span className="text-gray-700 mx-2">|</span>
          <span className="text-gray-700">Built with React + Vite</span>
          <span className="text-gray-700 mx-2">|</span>
          <span className="text-neon/40">// stay curious. stay secure.</span>
        </div>
      </div>
    </footer>
  )
}
