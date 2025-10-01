import React from "react";
import "./index.css";
import { useTheme } from "../../context/ThemeContext";

export default function DarkModeToggle() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="dark-toggle">
      {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
}
