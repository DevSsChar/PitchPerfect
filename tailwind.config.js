/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        // Light mode colors
        light: {
          background: '#ffffff',
          foreground: '#171717',
          primary: '#3b82f6',  // blue-500
          secondary: '#8b5cf6', // purple-500
          accent: '#f59e0b',    // amber-500
          muted: '#f3f4f6',     // gray-100
          border: '#e5e7eb',    // gray-200
        },
        // Dark mode colors
        dark: {
          background: '#0a0a0a',
          foreground: '#ededed',
          primary: '#60a5fa',   // blue-400
          secondary: '#a78bfa',  // purple-400
          accent: '#fbbf24',     // amber-400
          muted: '#1f2937',      // gray-800
          border: '#374151',     // gray-700
        },
      },
    },
  },
  plugins: [],
};