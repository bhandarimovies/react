/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        neon: '#00ff99',
        'neon-dim': '#00cc77',
        cyber: '#0a0a0a',
        'cyber-dark': '#050505',
        'cyber-card': '#0d1117',
        'cyber-border': '#1a2a1a',
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', 'Consolas', 'monospace'],
      },
      animation: {
        'pulse-neon': 'pulseNeon 2s infinite',
        'scan': 'scan 3s linear infinite',
        'flicker': 'flicker 4s infinite',
        'glitch': 'glitch 3s infinite',
        'type': 'typing 3s steps(30, end)',
        'blink': 'blink 1s step-end infinite',
        'float': 'float 6s ease-in-out infinite',
        'matrix': 'matrix 20s linear infinite',
      },
      keyframes: {
        pulseNeon: {
          '0%, 100%': { textShadow: '0 0 5px #00ff99, 0 0 20px #00ff99, 0 0 40px #00ff99' },
          '50%': { textShadow: '0 0 2px #00ff99, 0 0 8px #00ff99, 0 0 15px #00ff99' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '92%': { opacity: '1' },
          '93%': { opacity: '0.8' },
          '94%': { opacity: '1' },
          '96%': { opacity: '0.9' },
          '97%': { opacity: '1' },
        },
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      boxShadow: {
        'neon': '0 0 5px #00ff99, 0 0 20px #00ff9940',
        'neon-lg': '0 0 10px #00ff99, 0 0 40px #00ff9960, 0 0 80px #00ff9920',
        'neon-border': 'inset 0 0 10px #00ff9910, 0 0 10px #00ff9920',
      },
    },
  },
  plugins: [],
}
