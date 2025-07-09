"use client";
import { useTheme } from "./ThemeContext";

export default function ThemeToggle() {
  const { dark, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      style={{
        position: "fixed",
        top: 16,
        right: 16,
        zIndex: 1000,
        padding: "10px 16px",
        borderRadius: "8px",
        border: `1px solid var(--border)`,
        background: `var(--background)`,
        color: `var(--foreground)`,
        cursor: "pointer",
        boxShadow: dark ? "0 2px 8px rgba(0,0,0,0.15)" : "0 2px 8px rgba(0,0,0,0.08)",
        transition: "all 0.3s ease",
      }}
      aria-label="Toggle dark mode"
    >
      {dark ? "🌙" : "☀️"}
    </button>
  );
}
