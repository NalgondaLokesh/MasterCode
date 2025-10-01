import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../../styles/components/Navbar.css";

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span>💻 MasterCode</span>
        </Link>

        <div className="nav-links">
          <Link
            to="/"
            className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
          >
            Home
          </Link>

          {isAuthenticated && (
            <Link
              to="/create"
              className={`nav-link ${location.pathname === "/create" ? "active" : ""}`}
            >
              Create Snippet
            </Link>
          )}
        </div>

        <div className="nav-auth">
          {isAuthenticated ? (
            <>
              <span className="user-welcome">👤 Welcome, {user.username}</span>
              <Link to="/profile" className="nav-link">
                Profile
              </Link>
              <button onClick={handleLogout} className="logout-btn">
                🚪 Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="auth-btn login-btn">
                🔑 Login
              </Link>
              <Link to="/register" className="auth-btn register-btn">
                📝 Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

