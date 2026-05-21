# Using authService in Other Components

This guide shows how to use the `authService.js` helper in your React components.

## 📁 File Location
`src/utils/authService.js`

---

## 🔧 Basic Usage Examples

### Example 1: Check if User is Logged In

```jsx
// In any React component
import authService from "../utils/authService";

function Dashboard() {
  if (!authService.isLoggedIn()) {
    return <div>Please login first</div>;
  }

  const user = authService.getCurrentUser();
  return <div>Welcome, {user.name}!</div>;
}
```

---

### Example 2: Use in useEffect Hook

```jsx
import { useEffect, useState } from "react";
import authService from "../utils/authService";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    if (authService.isLoggedIn()) {
      const currentUser = authService.getCurrentUser();
      setUser(currentUser);
    }
    setLoading(false);
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Not logged in</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
    </div>
  );
}

export default Profile;
```

---

### Example 3: Make Authenticated API Calls

```jsx
import authService from "../utils/authService";

async function fetchUserProjects() {
  try {
    const response = await fetch("http://localhost:5000/api/projects", {
      headers: {
        ...authService.getAuthHeader(),
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch projects:", error);
  }
}
```

---

### Example 4: Verify Token Validity

```jsx
import { useEffect, useState } from "react";
import authService from "../utils/authService";

function ProtectedPage() {
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const result = await authService.verifyToken();
      setIsValid(result.valid);
    };

    checkToken();
  }, []);

  if (!isValid) {
    return <div>Session expired. Please login again.</div>;
  }

  return <div>Protected content here</div>;
}

export default ProtectedPage;
```

---

### Example 5: Handle Logout in Navigation

```jsx
import authService from "../utils/authService";

function Navbar() {
  const handleLogout = () => {
    authService.logout();
    // Redirect to login
    window.location.href = "/auth";
  };

  const isLoggedIn = authService.isLoggedIn();

  return (
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/projects">Projects</a></li>
        {isLoggedIn && (
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
```

---

### Example 6: Create Custom Hook

```jsx
// src/hooks/useAuth.js
import { useEffect, useState } from "react";
import authService from "../utils/authService";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      if (authService.isLoggedIn()) {
        setUser(authService.getCurrentUser());
        setIsLoggedIn(true);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  return { user, isLoggedIn, loading };
}

// Usage in component:
// const { user, isLoggedIn } = useAuth();
```

---

### Example 7: Protected Route Component

```jsx
// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import authService from "../utils/authService";

export function ProtectedRoute({ children, requiredRole = "user" }) {
  if (!authService.isLoggedIn()) {
    return <Navigate to="/auth" />;
  }

  return children;
}
```

**Usage in App.jsx:**
```jsx
import { ProtectedRoute } from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
```

---

### Example 8: Display User in Header

```jsx
import authService from "../utils/authService";

function Header() {
  const user = authService.getCurrentUser();
  const isLoggedIn = authService.isLoggedIn();

  return (
    <header>
      <div className="logo">MyApp</div>
      <div className="user-section">
        {isLoggedIn ? (
          <div className="user-info">
            <span>👤 {user?.name}</span>
            <button onClick={() => authService.logout()}>
              Logout
            </button>
          </div>
        ) : (
          <a href="/auth">Login</a>
        )}
      </div>
    </header>
  );
}

export default Header;
```

---

### Example 9: Form with Token in Headers

```jsx
import { useState } from "react";
import authService from "../utils/authService";

function ContactForm() {
  const [formData, setFormData] = useState({ title: "", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...authService.getAuthHeader(),
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        alert("Message sent!");
        setFormData({ title: "", message: "" });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      />
      <textarea
        placeholder="Message"
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
      />
      <button type="submit">Send</button>
    </form>
  );
}

export default ContactForm;
```

---

### Example 10: Global Auth Context (Advanced)

```jsx
// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import authService from "../utils/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (authService.isLoggedIn()) {
      setUser(authService.getCurrentUser());
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}

// Usage:
// Wrap App with: <AuthProvider><App /></AuthProvider>
// Access in components: const { user, isLoggedIn } = useAuthContext();
```

---

## 📚 authService API Reference

```javascript
// Get current logged-in user
const user = authService.getCurrentUser();
// Returns: { id, name, email } or null

// Get JWT token
const token = authService.getToken();
// Returns: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." or null

// Check if logged in
const isLoggedIn = authService.isLoggedIn();
// Returns: true or false

// Register new user
const result = await authService.register(name, email, password);
// Returns: { success: bool, message: string }

// Login user
const result = await authService.login(email, password);
// Returns: { success: bool, token?: string, user?: object, message: string }

// Logout user
authService.logout();
// Clears localStorage

// Verify token with backend
const result = await authService.verifyToken();
// Returns: { valid: bool, admin?: object }

// Get auth headers for API calls
const headers = authService.getAuthHeader();
// Returns: { Authorization: "Bearer <token>" } or {}
```

---

## 🔑 Common Patterns

### Pattern 1: Redirect After Login
```jsx
const handleLogin = async (email, password) => {
  const result = await authService.login(email, password);
  if (result.success) {
    window.location.href = "/dashboard"; // Redirect
  }
};
```

### Pattern 2: Check Auth on Route
```jsx
function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    authService.verifyToken().then(() => setIsReady(true));
  }, []);

  if (!isReady) return <Loading />;

  return <Routes>{/* ... */}</Routes>;
}
```

### Pattern 3: Refresh on Component Mount
```jsx
useEffect(() => {
  const user = authService.getCurrentUser();
  if (user) {
    setUser(user); // Always fresh from localStorage
  }
}, []);
```

---

## 💾 Best Practices

✅ Always check `authService.isLoggedIn()` before protected actions
✅ Use `getAuthHeader()` for all API calls requiring authentication
✅ Call `verifyToken()` on app load to validate session
✅ Handle logout properly to clear all auth state
✅ Store token in localStorage for persistence
✅ Don't expose sensitive data in frontend code

❌ Don't hardcode API URLs (use environment variables)
❌ Don't store password in localStorage
❌ Don't skip token verification checks
❌ Don't make unencrypted API calls
❌ Don't log tokens to console in production

---

**Last Updated:** January 2025
**Version:** 1.0.0
