import React from "react";
import { useTheme } from "../../context/ThemeContext";
import "./Header.css";

interface HeaderProps {
  onToggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleTheme }) => {
  const { darkMode } = useTheme();

  return (
    <header className={`header ${darkMode ? "dark-mode" : ""}`}>
      <div className="header-container">
        <div className="header-content">
          <h1 className="main-title">Todo Form </h1>

          <button
            onClick={onToggleTheme}
            className="theme-toggle-btn"
            aria-label="Toggle theme"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>

        <p className="subtitle">
          Organize your tasks with categories, due dates, and powerful search.
          Built with React, TypeScript, and beautiful animations.
        </p>
      </div>
    </header>
  );
};

export default Header;
