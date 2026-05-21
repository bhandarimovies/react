import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        navigate("/admin/dashboard");
      }
    } catch (err) {
      const message =
        err.response?.data?.message || "Login failed. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="relative w-80">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-xl opacity-30"></div>

        {/* Form */}
        <form
          onSubmit={handleLogin}
          className="relative bg-zinc-900 p-8 rounded-2xl border border-purple-500/30"
        >
          <h1 className="text-white text-3xl font-bold mb-2 text-center">
            Admin
          </h1>
          <p className="text-gray-400 text-center mb-8 text-sm">
            Enter credentials to continue
          </p>

          {error && (
            <div className="bg-red-900/30 border border-red-500/50 text-red-300 p-3 rounded mb-6 text-sm">
              {error}
            </div>
          )}

          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-zinc-800 text-white p-3 rounded-lg border border-zinc-700 focus:border-purple-500 focus:outline-none transition"
            />
          </div>

          <div className="mb-6">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-zinc-800 text-white p-3 rounded-lg border border-zinc-700 focus:border-purple-500 focus:outline-none transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
