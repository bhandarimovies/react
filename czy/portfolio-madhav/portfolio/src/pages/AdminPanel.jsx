import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { motion } from 'framer-motion'
import {
  RiShieldCheckLine,
  RiLogoutBoxRLine,
  RiDeleteBin6Line,
  RiEditLine,
  RiAddLine,
  RiCheckLine,
  RiCloseLine,
  RiAlertLine,
  RiCpuLine,
  RiTerminalBoxLine,
  RiMailLine,
  RiArrowRightSLine,
  RiPulseLine,
  RiMessage3Line,
  RiFolder3Line,
} from '../components/Icons.jsx'

function AdminPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(true)
  const [formLoading, setFormLoading] = useState(false)
  const [error, setError] = useState("")
  const [admin, setAdmin] = useState(null)
  const [projects, setProjects] = useState([])
  const [messages, setMessages] = useState([])
  const [notification, setNotification] = useState(null)
  const [activeTab, setActiveTab] = useState("overview")
  const navigate = useNavigate()

  // Check if token exists on mount
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      verifyToken(token)
    } else {
      setLoading(false)
    }
  }, [])

  const verifyToken = async (token) => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/verify", {
        headers: { Authorization: `Bearer ${token}` },
      })
      setAdmin(res.data.admin)
      setIsLoggedIn(true)
      fetchDashboardData()
    } catch (err) {
      console.warn("Token verification failed:", err)
      localStorage.removeItem("token")
      setLoading(false)
    }
  }

  const fetchDashboardData = async () => {
    try {
      const [projectsRes, contactRes] = await Promise.all([
        axios.get("http://localhost:5000/api/projects"),
        axios.get("http://localhost:5000/api/contact"),
      ])
      setProjects(projectsRes.data || [])
      setMessages(contactRes.data || [])
      setLoading(false)
    } catch (err) {
      console.error("Error fetching data:", err)
      showNotification("error", "❌ Error fetching dashboard data")
      setLoading(false)
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setFormLoading(true)
    setError("")

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      })

      if (res.data.success) {
        localStorage.setItem("token", res.data.token)
        setAdmin(res.data.admin)
        setIsLoggedIn(true)
        setEmail("")
        setPassword("")
        showNotification("success", "✅ Login successful!")
        await fetchDashboardData()
      }
    } catch (err) {
      const message = err.response?.data?.message || "Login failed. Please try again."
      setError(message)
      showNotification("error", message)
    } finally {
      setFormLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    setIsLoggedIn(false)
    setAdmin(null)
    setEmail("")
    setPassword("")
    setError("")
    setProjects([])
    setMessages([])
    showNotification("success", "✅ Logged out successfully!")
  }

  const handleDeleteProject = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return

    try {
      await axios.delete(`http://localhost:5000/api/projects/${id}`)
      showNotification("success", "✅ Project deleted successfully!")
      fetchDashboardData()
    } catch (err) {
      console.error("Error deleting project:", err)
      showNotification("error", "❌ Error deleting project")
    }
  }

  const showNotification = (type, message) => {
    setNotification({ type, message })
    setTimeout(() => setNotification(null), 3000)
  }

  const getNotificationIcon = (type) => {
    switch (type) {
      case "success": return <RiCheckLine className="w-5 h-5 text-neon" />
      case "error": return <RiCloseLine className="w-5 h-5 text-red-400" />
      case "warning": return <RiAlertLine className="w-5 h-5 text-yellow-400" />
      default: return <RiTerminalBoxLine className="w-5 h-5 text-neon" />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-cyber flex items-center justify-center pt-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <RiCpuLine className="w-12 h-12 text-neon animate-pulse" />
          <div className="text-neon font-mono text-lg animate-pulse">
            INITIALIZING_SYSTEM...
          </div>
          <div className="w-48 h-1 bg-cyber-border rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-neon to-neon-dim animate-pulse"></div>
          </div>
        </motion.div>
      </div>
    )
  }

  // LOGIN FORM
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-cyber flex items-center justify-center pt-20 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-neon/20 to-neon-dim/20 rounded-2xl blur-2xl"></div>

            {/* Form Container */}
            <div className="relative bg-cyber-card border border-cyber-border rounded-2xl p-8 backdrop-blur-sm">
              {/* Icon Header */}
              <div className="flex flex-col items-center gap-4 mb-8">
                <div className="p-4 bg-neon/10 border border-neon/30 rounded-xl">
                  <RiShieldCheckLine className="w-8 h-8 text-neon" />
                </div>
                <div className="text-center">
                  <h1 className="text-3xl font-bold text-white tracking-wider">
                    ADMIN_ACCESS
                  </h1>
                  <p className="text-neon/60 text-sm mt-2 font-mono">
                    Enter credentials to continue
                  </p>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-500/10 border border-red-500/30 text-red-300 p-4 rounded-lg mb-6 text-sm font-mono flex items-start gap-3"
                >
                  <RiAlertLine className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </motion.div>
              )}

              {/* Form */}
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-neon/60 text-xs font-mono mb-2 tracking-wide">
                    EMAIL_ADDRESS
                  </label>
                  <input
                    type="email"
                    placeholder="admin@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-cyber-dark border border-cyber-border text-white px-4 py-3 rounded-lg focus:border-neon focus:outline-none transition-all duration-300 font-mono text-sm placeholder:text-gray-600 hover:border-neon/30"
                  />
                </div>

                <div>
                  <label className="block text-neon/60 text-xs font-mono mb-2 tracking-wide">
                    PASSWORD
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-cyber-dark border border-cyber-border text-white px-4 py-3 rounded-lg focus:border-neon focus:outline-none transition-all duration-300 font-mono text-sm placeholder:text-gray-600 hover:border-neon/30"
                  />
                </div>

                <button
                  type="submit"
                  disabled={formLoading}
                  className="w-full bg-gradient-to-r from-neon to-neon-dim text-cyber-dark font-bold py-3 rounded-lg hover:shadow-neon transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-mono text-sm tracking-wider mt-6 group hover:scale-105 transform"
                >
                  {formLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <RiCpuLine className="w-4 h-4 animate-spin" />
                      AUTHENTICATING...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <span>GAIN_ACCESS</span>
                      <RiArrowRightSLine className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  )}
                </button>
              </form>

              {/* Demo Credentials */}
              <div className="mt-8 pt-6 border-t border-cyber-border">
                <p className="text-gray-500 text-xs text-center font-mono">
                  Demo Credentials:
                </p>
                <p className="text-neon/60 text-xs text-center font-mono mt-2">
                  admin@gmail.com / admin123
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  // DASHBOARD
  return (
    <div className="min-h-screen bg-cyber text-white font-mono relative overflow-hidden pt-20">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0, 255, 153, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 153, 0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        ></div>
      </div>

      {/* Notification */}
      {notification && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`fixed top-24 right-6 p-4 rounded-lg border z-50 flex items-center gap-3 shadow-neon backdrop-blur-sm
            ${
              notification.type === "success"
                ? "bg-cyber-card/90 border-neon/50"
                : notification.type === "error"
                ? "bg-red-950/90 border-red-500/50"
                : "bg-yellow-950/90 border-yellow-500/50"
            }`}
        >
          {getNotificationIcon(notification.type)}
          <span
            className={`text-sm ${
              notification.type === "success"
                ? "text-neon"
                : notification.type === "error"
                ? "text-red-300"
                : "text-yellow-300"
            }`}
          >
            {notification.message}
          </span>
        </motion.div>
      )}

      {/* Header */}
      <header className="fixed top-16 left-0 right-0 z-40 bg-cyber-card/80 backdrop-blur-md border-b border-cyber-border">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-neon/10 border border-neon/30 rounded-lg">
                <RiShieldCheckLine className="w-6 h-6 text-neon" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white tracking-wider flex items-center gap-2">
                  ADMIN_DASHBOARD
                  <span className="text-xs bg-neon/20 text-neon px-2 py-0.5 rounded border border-neon/30 animate-pulse">
                    LIVE
                  </span>
                </h1>
                <p className="text-neon/60 text-xs flex items-center gap-1 mt-1">
                  <RiTerminalBoxLine className="w-3 h-3" />
                  <span>SESSION: {admin?.email || "UNKNOWN"}</span>
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/20 hover:border-red-500/50 transition-all duration-300 group"
            >
              <RiLogoutBoxRLine className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              <span className="text-sm">LOGOUT</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Projects Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group bg-cyber-card border border-cyber-border rounded-xl p-6 hover:border-neon/30 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neon/60 text-xs font-mono tracking-wider mb-2">
                  TOTAL_PROJECTS
                </p>
                <h3 className="text-4xl font-bold text-neon">{projects.length}</h3>
              </div>
              <RiFolder3Line className="w-8 h-8 text-neon/40 group-hover:text-neon transition-colors" />
            </div>
          </motion.div>

          {/* Messages Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="group bg-cyber-card border border-cyber-border rounded-xl p-6 hover:border-neon/30 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neon/60 text-xs font-mono tracking-wider mb-2">
                  TOTAL_MESSAGES
                </p>
                <h3 className="text-4xl font-bold text-neon">{messages.length}</h3>
              </div>
              <RiMessage3Line className="w-8 h-8 text-neon/40 group-hover:text-neon transition-colors" />
            </div>
          </motion.div>

          {/* Status Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="group bg-cyber-card border border-cyber-border rounded-xl p-6 hover:border-neon/30 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neon/60 text-xs font-mono tracking-wider mb-2">
                  SYSTEM_STATUS
                </p>
                <h3 className="text-2xl font-bold text-neon flex items-center gap-2">
                  <span className="w-2 h-2 bg-neon rounded-full animate-pulse"></span>
                  OPERATIONAL
                </h3>
              </div>
              <RiPulseLine className="w-8 h-8 text-neon/40 group-hover:text-neon transition-colors animate-pulse" />
            </div>
          </motion.div>
        </div>

        {/* Content Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-cyber-card border border-cyber-border rounded-xl p-8 overflow-hidden"
        >
          <h2 className="text-xl font-bold text-white tracking-wider mb-6 flex items-center gap-2">
            <span className="w-1 h-6 bg-neon"></span>
            RECENT_ACTIVITY
          </h2>

          {messages.length > 0 ? (
            <div className="space-y-4">
              {messages.slice(0, 5).map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-cyber-dark border border-cyber-border rounded-lg p-4 hover:border-neon/30 transition-all duration-300"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-mono text-neon">{msg.email}</p>
                      <p className="text-sm text-gray-400 mt-1">{msg.message}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-neon/60 font-mono text-sm">No recent messages...</p>
          )}
        </motion.div>
      </main>
    </div>
  )
}

export default AdminPanel
