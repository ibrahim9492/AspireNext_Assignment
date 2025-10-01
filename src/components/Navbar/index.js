// src/components/Navbar/index.js
import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ThemeContext } from "../../context/ThemeContext";
import "./index.css";

const Navbar = () => {
  const token = useSelector((s) => s.auth.token);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  return (
    <header className="nav-wrap">
      <div className="nav-inner">
        <div className="logo" onClick={() => navigate("/")}>College Dashboard</div>
        <nav className="nav-links">
          <NavLink to="/" end className={({isActive}) => isActive ? "active" : ""}>Home</NavLink>
          <NavLink to="/colleges" className={({isActive}) => isActive ? "active" : ""}>Colleges</NavLink>
          <NavLink to="/reviews" className={({isActive}) => isActive ? "active" : ""}>Reviews</NavLink>
          <NavLink to="/favorites" className={({isActive}) => isActive ? "active" : ""}>Favorites</NavLink>

          {!token ? (
            <>
              <NavLink to="/register" className={({isActive}) => isActive ? "active" : ""}>Register</NavLink>
              <NavLink to="/login" className={({isActive}) => isActive ? "active" : ""}>Login</NavLink>
            </>
          ) : (
            <NavLink to="/logout" className={({isActive}) => isActive ? "active" : ""}>Logout</NavLink>
          )}

          <button className="theme-btn" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
