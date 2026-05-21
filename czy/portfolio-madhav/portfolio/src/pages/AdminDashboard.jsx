// src/pages/AdminDashboard.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  RiDashboardLine,
  RiFolder3Line,
  RiMessage3Line,
  RiPulseLine,
  RiLogoutBoxRLine,
  RiDeleteBin6Line,
  RiEditLine,
  RiAddLine,
  RiShieldCheckLine,
  RiMailLine,
  RiUserLine,
  RiAlertLine,
  RiCheckLine,
  RiCloseLine,
  RiTerminalBoxLine,
  RiCpuLine,
  RiFlashlightLine,
  RiEyeLine,
  RiTimeLine,
  RiArrowRightSLine
} from '../components/Icons.jsx';

function AdminDashboard() {
  const [admin, setAdmin] = useState(null);
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  const navigate = useNavigate();

  const fetchDashboardData = async () => {
    try {
      const [projectsRes, contactRes] = await Promise.all([
        axios.get("http://localhost:5000/api/projects"),
        axios.get("http://localhost:5000/api/contact"),
      ]);

      setProjects(projectsRes.data || []);
      setMessages(contactRes.data || []);
    } catch (err) {
      console.error("Error fetching data:", err);
      showNotification("error", "❌ Error fetching dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/admin/login");
      return;
    }

    axios
      .get("http://localhost:5000/api/auth/verify", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setAdmin(res.data.admin);
        fetchDashboardData();
      })
      .catch((err) => {
        console.warn("Token verify failed:", err);
        showNotification(
          "warning",
          err?.response?.data?.message || "⚠️ Session verification failed"
        );
        fetchDashboardData();
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/projects/${id}`);
      showNotification("success", "✅ Project deleted successfully!");
      fetchDashboardData();
    } catch (err) {
      console.error("Error deleting project:", err);
      showNotification("error", "❌ Error deleting project");
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "success": return <RiCheckLine className="w-5 h-5 text-neon" />;
      case "error": return <RiCloseLine className="w-5 h-5 text-red-400" />;
      case "warning": return <RiAlertLine className="w-5 h-5 text-yellow-400" />;
      default: return <RiTerminalBoxLine className="w-5 h-5 text-neon" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cyber flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <RiCpuLine className="w-12 h-12 text-neon animate-pulse" />
          <div className="text-neon font-mono text-lg animate-pulse">
            INITIALIZING_SYSTEM...
          </div>
          <div className="w-48 h-1 bg-cyber-border rounded-full overflow-hidden">
            <div className="h-full bg-neon animate-[loading_1s_ease-in-out_infinite]" style={{ width: '60%' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cyber text-white font-mono relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" 
             style={{
               backgroundImage: 'linear-gradient(rgba(0, 255, 153, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 153, 0.1) 1px, transparent 1px)',
               backgroundSize: '50px 50px'
             }}>
        </div>
      </div>

      {/* Scan line */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-full h-px bg-neon/20 animate-scan shadow-neon"></div>
      </div>

      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 p-4 rounded-lg border z-50 flex items-center gap-3 shadow-neon animate-flicker backdrop-blur-sm
          ${notification.type === "success" ? "bg-cyber-card/90 border-neon/50" : 
            notification.type === "error" ? "bg-red-950/90 border-red-500/50" : 
            "bg-yellow-950/90 border-yellow-500/50"}`}>
          {getNotificationIcon(notification.type)}
          <span className={`text-sm ${notification.type === "success" ? "text-neon" : notification.type === "error" ? "text-red-300" : "text-yellow-300"}`}>
            {notification.message}
          </span>
        </div>
      )}

      {/* Header */}
      <header className="relative z-10 bg-cyber-card/80 backdrop-blur-md border-b border-cyber-border">
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
              <span className="text-sm">TERMINATE</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Projects Card */}
          <div className="group bg-cyber-card border border-cyber-border rounded-xl p-6 hover:border-neon/30 transition-all duration-300 hover:shadow-neon-border relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
              <RiFolder3Line className="w-24 h-24 text-neon" />
            </div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-neon/10 rounded-lg border border-neon/20">
                <RiFolder3Line className="w-5 h-5 text-neon" />
              </div>
              <span className="text-neon/70 text-xs uppercase tracking-widest">Total Projects</span>
            </div>
            <p className="text-4xl font-bold text-white mb-2">{projects.length}</p>
            <div className="flex items-center gap-1 text-xs text-neon/50">
              <RiFlashlightLine className="w-3 h-3" />
              <span>Active in system</span>
            </div>
          </div>

          {/* Messages Card */}
          <div className="group bg-cyber-card border border-cyber-border rounded-xl p-6 hover:border-neon/30 transition-all duration-300 hover:shadow-neon-border relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
              <RiMessage3Line className="w-24 h-24 text-neon" />
            </div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-neon/10 rounded-lg border border-neon/20">
                <RiMessage3Line className="w-5 h-5 text-neon" />
              </div>
              <span className="text-neon/70 text-xs uppercase tracking-widest">Messages</span>
            </div>
            <p className="text-4xl font-bold text-white mb-2">{messages.length}</p>
            <div className="flex items-center gap-1 text-xs text-neon/50">
              <RiMailLine className="w-3 h-3" />
              <span>Unread pending</span>
            </div>
          </div>

          {/* Status Card */}
          <div className="group bg-cyber-card border border-cyber-border rounded-xl p-6 hover:border-neon/30 transition-all duration-300 hover:shadow-neon-border relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
              <RiPulseLine className="w-24 h-24 text-neon" />
            </div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-neon/10 rounded-lg border border-neon/20">
                <RiPulseLine className="w-5 h-5 text-neon" />
              </div>
              <span className="text-neon/70 text-xs uppercase tracking-widest">System Status</span>
            </div>
            <p className="text-4xl font-bold text-neon mb-2 animate-pulse-neon">ONLINE</p>
            <div className="flex items-center gap-1 text-xs text-neon/50">
              <RiCpuLine className="w-3 h-3" />
              <span>All systems operational</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-1 mb-6 bg-cyber-dark rounded-lg p-1 border border-cyber-border w-fit">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm transition-all duration-300 ${
              activeTab === "overview" 
                ? "bg-neon/10 text-neon border border-neon/30" 
                : "text-gray-400 hover:text-white"
            }`}
          >
            <RiDashboardLine className="w-4 h-4" />
            Overview
          </button>
          <button
            onClick={() => setActiveTab("projects")}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm transition-all duration-300 ${
              activeTab === "projects" 
                ? "bg-neon/10 text-neon border border-neon/30" 
                : "text-gray-400 hover:text-white"
            }`}
          >
            <RiFolder3Line className="w-4 h-4" />
            Projects
          </button>
          <button
            onClick={() => setActiveTab("messages")}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm transition-all duration-300 ${
              activeTab === "messages" 
                ? "bg-neon/10 text-neon border border-neon/30" 
                : "text-gray-400 hover:text-white"
            }`}
          >
            <RiMessage3Line className="w-4 h-4" />
            Messages
          </button>
        </div>

        {/* Projects Section */}
        {(activeTab === "overview" || activeTab === "projects") && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <RiFolder3Line className="w-6 h-6 text-neon" />
                <h2 className="text-xl font-bold text-white tracking-wider">PROJECT_DATABASE</h2>
              </div>
              <button 
                className="flex items-center gap-2 px-4 py-2 bg-neon/10 border border-neon/30 text-neon rounded-lg hover:bg-neon hover:text-cyber-dark transition-all duration-300 text-sm group"
                disabled
              >
                <RiAddLine className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                Add Project
              </button>
            </div>

            <div className="bg-cyber-card border border-cyber-border rounded-xl overflow-hidden">
              {projects.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-cyber-dark border-b border-cyber-border">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-neon/70 uppercase tracking-wider">
                          <span className="flex items-center gap-2">
                            <RiFolder3Line className="w-3 h-3" /> Name
                          </span>
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-neon/70 uppercase tracking-wider">
                          <span className="flex items-center gap-2">
                            <RiTerminalBoxLine className="w-3 h-3" /> Description
                          </span>
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-neon/70 uppercase tracking-wider">
                          <span className="flex items-center gap-2">
                            <RiFlashlightLine className="w-3 h-3" /> Actions
                          </span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-cyber-border">
                      {projects.map((project, index) => (
                        <tr
                          key={project._id}
                          className="hover:bg-neon/5 transition-colors duration-200 group"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <span className="text-neon/30 text-xs font-mono">[{String(index + 1).padStart(3, '0')}]</span>
                              <span className="text-white font-medium">{project.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-400 text-sm max-w-md truncate">
                            {project.description || "No description available"}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <button className="flex items-center gap-1 px-3 py-1.5 text-xs bg-neon/10 border border-neon/20 text-neon rounded hover:bg-neon/20 transition-colors">
                                <RiEditLine className="w-3 h-3" />
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteProject(project._id)}
                                className="flex items-center gap-1 px-3 py-1.5 text-xs bg-red-500/10 border border-red-500/20 text-red-400 rounded hover:bg-red-500/20 transition-colors"
                              >
                                <RiDeleteBin6Line className="w-3 h-3" />
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-12 text-center">
                  <RiFolder3Line className="w-12 h-12 text-neon/20 mx-auto mb-4" />
                  <p className="text-gray-500 text-sm">No projects in database</p>
                  <p className="text-neon/30 text-xs mt-1">Initialize new project to begin</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Messages Section */}
        {(activeTab === "overview" || activeTab === "messages") && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <RiMessage3Line className="w-6 h-6 text-neon" />
                <h2 className="text-xl font-bold text-white tracking-wider">MESSAGE_LOG</h2>
              </div>
              <div className="flex items-center gap-2 text-xs text-neon/50 bg-cyber-dark px-3 py-1.5 rounded-lg border border-cyber-border">
                <RiTimeLine className="w-3 h-3" />
                <span>Last updated: {new Date().toLocaleTimeString()}</span>
              </div>
            </div>

            <div className="bg-cyber-card border border-cyber-border rounded-xl overflow-hidden">
              {messages.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-cyber-dark border-b border-cyber-border">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-neon/70 uppercase tracking-wider">
                          <span className="flex items-center gap-2">
                            <RiUserLine className="w-3 h-3" /> Sender
                          </span>
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-neon/70 uppercase tracking-wider">
                          <span className="flex items-center gap-2">
                            <RiMailLine className="w-3 h-3" /> Email
                          </span>
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-neon/70 uppercase tracking-wider">
                          <span className="flex items-center gap-2">
                            <RiMessage3Line className="w-3 h-3" /> Content
                          </span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-cyber-border">
                      {messages.map((msg, index) => (
                        <tr
                          key={msg._id}
                          className="hover:bg-neon/5 transition-colors duration-200"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-neon/10 border border-neon/20 rounded-full flex items-center justify-center">
                                <RiUserLine className="w-4 h-4 text-neon" />
                              </div>
                              <div>
                                <span className="text-white text-sm block">{msg.name}</span>
                                <span className="text-neon/30 text-xs">ID: {String(index + 1).padStart(3, '0')}</span>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-neon/60 text-sm flex items-center gap-1">
                              <RiMailLine className="w-3 h-3" />
                              {msg.email}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-start gap-2">
                              <RiMessage3Line className="w-4 h-4 text-neon/40 mt-0.5 shrink-0" />
                              <p className="text-gray-400 text-sm line-clamp-2">{msg.message}</p>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-12 text-center">
                  <RiMessage3Line className="w-12 h-12 text-neon/20 mx-auto mb-4" />
                  <p className="text-gray-500 text-sm">No messages in queue</p>
                  <p className="text-neon/30 text-xs mt-1">Inbox empty</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-cyber-border mt-12 py-6">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 text-xs text-neon/30">
            <RiTerminalBoxLine className="w-3 h-3" />
            <span>SYSTEM_STATUS: OPERATIONAL</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-neon/30">
            <RiShieldCheckLine className="w-3 h-3" />
            <span>SECURE_CONNECTION // ENCRYPTED</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default AdminDashboard;