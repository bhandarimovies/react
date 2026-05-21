import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, requiredRole = "user" }) {
  // Check for token - supports both admin and user tokens
  const adminToken = localStorage.getItem("token");
  const userToken = localStorage.getItem("userToken");
  const token = adminToken || userToken;

  if (!token) {
    // Redirect to appropriate login page based on role
    const redirectPath = requiredRole === "admin" ? "/admin/login" : "/auth";
    return <Navigate to={redirectPath} />;
  }

  return children;
}

export default ProtectedRoute;
