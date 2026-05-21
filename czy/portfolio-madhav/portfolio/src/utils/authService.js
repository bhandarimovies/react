// authService.js - Helper functions for authentication
// Place this in: src/utils/authService.js

const API_BASE_URL = "http://localhost:5000";

export const authService = {
  // User Registration
  register: async (name, email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      return await response.json();
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  // User Login
  login: async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/user-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (data.success && data.token) {
        // Store in localStorage
        localStorage.setItem("userToken", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      return data;
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("user");
  },

  // Get current user
  getCurrentUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  // Get token
  getToken: () => {
    return localStorage.getItem("userToken");
  },

  // Check if logged in
  isLoggedIn: () => {
    return !!localStorage.getItem("userToken");
  },

  // Verify token with backend
  verifyToken: async () => {
    try {
      const token = localStorage.getItem("userToken");
      if (!token) return { valid: false };

      const response = await fetch(`${API_BASE_URL}/api/auth/verify`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return await response.json();
    } catch (error) {
      return { valid: false };
    }
  },

  // Get authorization header for API calls
  getAuthHeader: () => {
    const token = localStorage.getItem("userToken");
    return token ? { Authorization: `Bearer ${token}` } : {};
  },
};

export default authService;
