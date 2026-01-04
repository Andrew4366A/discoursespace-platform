import { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    if (isAdminLogin) {
      // Admin credentials check (in production, this should be API call)
      if (email === "admin@discoursespace.com" && password === "admin123") {
        login(email, password, true); // true for admin
        navigate("/admin");
      } else {
        alert("Invalid admin credentials");
      }
    } else {
      // Regular user login
      login(email, password, false);
      navigate("/home");
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    // Register logic here
    navigate("/login");
  };

  return (
    <div className="auth-page">
      {/* Top Logo + Title */}
      <div className="auth-header">
        <div className="auth-logo">
          <span>💬</span>
        </div>
        <h1 className="gradient-text">DiscourseSpace</h1>
        <p>A hybrid community forum & blogging platform</p>
      </div>

      {/* Card */}
      <div className="auth-card">
        {/* Tabs */}
        <div className="auth-tabs">
          <button
            className={isLogin ? "active" : ""}
            onClick={() => {
              setIsLogin(true);
              setIsAdminLogin(false);
            }}
          >
            Login
          </button>

          <button
            className={!isLogin ? "active" : ""}
            onClick={() => {
              setIsLogin(false);
              setIsAdminLogin(false);
            }}
          >
            Register
          </button>
        </div>

        {/* Login Form */}
        {isLogin ? (
          <form className="auth-form" onSubmit={handleLogin}>
            <div className="admin-toggle">
              <label className="admin-checkbox">
                <input
                  type="checkbox"
                  checked={isAdminLogin}
                  onChange={(e) => setIsAdminLogin(e.target.checked)}
                />
                <span>Admin Login</span>
              </label>
            </div>

            <label>Email</label>
            <input
              type="email"
              placeholder={isAdminLogin ? "Admin email" : "Enter your email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {isAdminLogin && (
              <p className="admin-hint">
                Demo: admin@discoursespace.com / admin123
              </p>
            )}

            <button type="submit" className="submit-btn">
              {isAdminLogin ? "Admin Login" : "Login"}
            </button>
          </form>
        ) : (
          /* Register Form */
          <form className="auth-form" onSubmit={handleRegister}>
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Username</label>
            <input
              type="text"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <label>Password</label>
            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit" className="submit-btn">
              Register
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
