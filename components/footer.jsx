"use client";
import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[var(--background)] border-t border-[var(--border)] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-2">
            <h3 className="text-lg font-bold text-[var(--primary)] mb-4">
              PitchPerfect
            </h3>
            <p className="text-[var(--foreground)] opacity-80 mb-4">
              AI-powered presentation coaching to help you speak with confidence and clarity.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <Link 
                href="#" 
                className="text-[var(--foreground)] opacity-60 hover:opacity-100 hover:text-[var(--primary)] transition-colors"
                aria-label="Twitter"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
                </svg>
              </Link>
              <Link 
                href="#" 
                className="text-[var(--foreground)] opacity-60 hover:opacity-100 hover:text-[var(--primary)] transition-colors"
                aria-label="LinkedIn"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect width="4" height="12" x="2" y="9"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </Link>
              <Link 
                href="#" 
                className="text-[var(--foreground)] opacity-60 hover:opacity-100 hover:text-[var(--primary)] transition-colors"
                aria-label="GitHub"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                  <path d="M9 18c-4.51 2-5-2-7-2"/>
                </svg>
              </Link>
            </div>
          </div>

          {/* Navigation Section */}
          <div>
            <h4 className="font-semibold text-[var(--foreground)] mb-3">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/record" 
                  className="text-[var(--foreground)] opacity-80 hover:opacity-100 hover:text-[var(--primary)] transition-colors"
                >
                  Record/Upload
                </Link>
              </li>
              <li>
                <Link 
                  href="/dashboard" 
                  className="text-[var(--foreground)] opacity-80 hover:opacity-100 hover:text-[var(--primary)] transition-colors"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link 
                  href="/how-it-works" 
                  className="text-[var(--foreground)] opacity-80 hover:opacity-100 hover:text-[var(--primary)] transition-colors"
                >
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div>
            <h4 className="font-semibold text-[var(--foreground)] mb-3">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/privacy-policy" 
                  className="text-[var(--foreground)] opacity-80 hover:opacity-100 hover:text-[var(--primary)] transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  href="/terms-of-service" 
                  className="text-[var(--foreground)] opacity-80 hover:opacity-100 hover:text-[var(--primary)] transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-[var(--border)] mt-8 pt-6 text-center">
          <p className="text-[var(--foreground)] opacity-60 text-sm">
            © 2024 PitchPerfect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}