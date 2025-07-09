"use client";

import { useTheme } from "@/components/ThemeContext";

export default function DarkModeTestPage() {
  const { dark, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-[var(--foreground)]">Dark Mode Test Page</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="p-6 rounded-lg border border-[var(--border)] bg-[var(--background)] shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-[var(--foreground)]">Current Theme</h2>
            <p className="text-[var(--foreground)] opacity-80 mb-4">
              The current theme is: <span className="font-bold">{dark ? "Dark" : "Light"}</span>
            </p>
            <button
              onClick={toggleTheme}
              className="px-4 py-2 bg-[var(--primary)] text-white rounded-md hover:opacity-90 transition-opacity"
            >
              Toggle Theme
            </button>
          </div>

          <div className="p-6 rounded-lg border border-[var(--border)] bg-[var(--muted)] shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-[var(--foreground)]">Color Samples</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full bg-[var(--primary)]"></div>
                <span className="text-[var(--foreground)]">Primary</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full bg-[var(--secondary)]"></div>
                <span className="text-[var(--foreground)]">Secondary</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full bg-[var(--accent)]"></div>
                <span className="text-[var(--foreground)]">Accent</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full bg-[var(--background)] border border-[var(--border)]"></div>
                <span className="text-[var(--foreground)]">Background</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full bg-[var(--foreground)]"></div>
                <span className="text-[var(--foreground)]">Foreground</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-6 rounded-lg border border-[var(--border)] bg-[var(--background)]">
            <h2 className="text-2xl font-semibold mb-4 text-[var(--foreground)]">Typography</h2>
            <h3 className="text-xl font-semibold mb-2 text-[var(--foreground)]">Heading Example</h3>
            <p className="text-[var(--foreground)] opacity-80 mb-4">
              This is a paragraph with normal text. The dark mode implementation ensures proper contrast and readability in both light and dark themes.
            </p>
            <p className="text-[var(--foreground)] opacity-60 text-sm">
              This is smaller text with reduced opacity, often used for captions or secondary information.
            </p>
          </div>

          <div className="p-6 rounded-lg border border-[var(--border)] bg-[var(--background)]">
            <h2 className="text-2xl font-semibold mb-4 text-[var(--foreground)]">UI Elements</h2>
            <div className="flex flex-wrap gap-4">
              <button className="px-4 py-2 bg-[var(--primary)] text-white rounded-md hover:opacity-90 transition-opacity">
                Primary Button
              </button>
              <button className="px-4 py-2 bg-[var(--secondary)] text-white rounded-md hover:opacity-90 transition-opacity">
                Secondary Button
              </button>
              <button className="px-4 py-2 bg-[var(--accent)] text-white rounded-md hover:opacity-90 transition-opacity">
                Accent Button
              </button>
              <button className="px-4 py-2 border border-[var(--border)] text-[var(--foreground)] rounded-md hover:bg-[var(--muted)] transition-colors">
                Outline Button
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}