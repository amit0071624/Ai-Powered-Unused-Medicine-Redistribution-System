import { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import "../styles/DarkModeToggle.css";

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "enabled"
  );

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("darkMode", darkMode ? "enabled" : "disabled");
    document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <button
      className={`theme-toggle ${darkMode ? "dark" : "light"}`}
      onClick={() => setDarkMode(!darkMode)}
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {darkMode ? (
        <FaMoon className="theme-icon moon" />
      ) : (
        <FaSun className="theme-icon sun" />
      )}
      <span className="theme-label">{darkMode ? "Dark" : "Light"}</span>
    </button>
  );
}
