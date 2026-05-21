import React, { useState } from "react";

export default function AuthPage() {
  const [formType, setFormType] = useState("login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [token, setToken] = useState(localStorage.getItem("userToken") || null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const endpoint =
        formType === "login" ? "/api/auth/user-login" : "/api/auth/register";

      const res = await fetch(`http://localhost:5000${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(data.message);

        if (formType === "login") {
          // Store token and user info
          localStorage.setItem("userToken", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          setToken(data.token);
          setUser(data.user);

          // Clear form
          setFormData({ name: "", email: "", password: "" });
        } else {
          // Registration successful, switch to login
          setSuccess("Registration successful! Please log in.");
          setTimeout(() => {
            setFormType("login");
            setFormData({ name: "", email: "", password: "" });
          }, 2000);
        }
      } else {
        setError(data.message || "An error occurred");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong! Make sure backend is running on port 5000");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    setFormData({ name: "", email: "", password: "" });
  };

  const accessDashboard = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/verify", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (data.valid) {
        setSuccess(`Welcome to your dashboard, ${data.admin.email}!`);
      } else {
        setError("Token expired or invalid");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to access dashboard");
    }
  };

  if (token && user) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h2>Welcome, {user.name}! 👋</h2>
          <div style={styles.userInfo}>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Token:</strong> {token.substring(0, 20)}...
            </p>
          </div>

          <div style={styles.dashboard}>
            <h3>Dashboard Access</h3>
            <button onClick={accessDashboard} style={styles.dashboardBtn}>
              Verify Token & Access Dashboard
            </button>
          </div>

          {success && <p style={styles.success}>{success}</p>}
          {error && <p style={styles.error}>{error}</p>}

          <button onClick={handleLogout} style={styles.logoutBtn}>
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>{formType === "login" ? "Login" : "Register"}</h2>

        <form onSubmit={handleSubmit}>
          {formType === "register" && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              style={styles.input}
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={styles.input}
          />

          {error && <p style={styles.error}>{error}</p>}
          {success && <p style={styles.success}>{success}</p>}

          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              opacity: loading ? 0.6 : 1,
            }}
          >
            {loading
              ? "Processing..."
              : formType === "login"
                ? "Login"
                : "Register"}
          </button>
        </form>

        <p style={styles.toggleText}>
          {formType === "login" ? "Don't have an account?" : "Already registered?"}
          <button
            onClick={() => {
              setFormType(formType === "login" ? "register" : "login");
              setError("");
              setSuccess("");
              setFormData({ name: "", email: "", password: "" });
            }}
            style={styles.toggleButton}
          >
            {formType === "login" ? "Register here" : "Login here"}
          </button>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "20px",
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  },
  card: {
    background: "white",
    borderRadius: "12px",
    padding: "40px",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
    maxWidth: "450px",
    width: "100%",
  },
  input: {
    width: "100%",
    padding: "12px 16px",
    marginBottom: "16px",
    border: "2px solid #e0e0e0",
    borderRadius: "8px",
    fontSize: "14px",
    boxSizing: "border-box",
    transition: "border-color 0.3s",
    outline: "none",
  },
  button: {
    width: "100%",
    padding: "12px",
    marginTop: "8px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
  toggleText: {
    textAlign: "center",
    marginTop: "20px",
    fontSize: "14px",
    color: "#666",
  },
  toggleButton: {
    background: "none",
    border: "none",
    color: "#667eea",
    cursor: "pointer",
    fontWeight: "600",
    marginLeft: "5px",
    textDecoration: "underline",
  },
  error: {
    color: "#d32f2f",
    fontSize: "14px",
    marginBottom: "12px",
    padding: "10px",
    backgroundColor: "#ffebee",
    borderRadius: "6px",
    textAlign: "center",
  },
  success: {
    color: "#388e3c",
    fontSize: "14px",
    marginBottom: "12px",
    padding: "10px",
    backgroundColor: "#e8f5e9",
    borderRadius: "6px",
    textAlign: "center",
  },
  userInfo: {
    background: "#f5f5f5",
    padding: "16px",
    borderRadius: "8px",
    marginBottom: "20px",
    fontSize: "14px",
  },
  dashboard: {
    marginTop: "24px",
    paddingTop: "24px",
    borderTop: "2px solid #e0e0e0",
  },
  dashboardBtn: {
    width: "100%",
    padding: "12px",
    marginTop: "12px",
    background: "#388e3c",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
  },
  logoutBtn: {
    width: "100%",
    padding: "12px",
    marginTop: "16px",
    background: "#d32f2f",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
  },
};
