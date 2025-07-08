"use client";

import Link from 'next/link';
import { useEffect } from 'react';

export default function NotFound() {
  useEffect(() => {
    // Add any analytics or logging here
    console.log("404 page visited");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] bg-white dark:bg-gray-900 px-4">
      <div className="text-center max-w-3xl mx-auto">
        {/* Gradient blob effect */}
        <div className="relative w-40 h-40 mx-auto mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-20 blur-2xl"></div>
          <div className="absolute inset-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-30 blur-xl"></div>
          <div className="relative flex items-center justify-center w-full h-full">
            <h1 className="text-7xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              404
            </h1>
          </div>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
          Page Not Found
        </h2>
        
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          The page you are looking for might have been removed, had its name changed,
          or is temporarily unavailable.
        </p>
        
        <div className="space-y-4">
          <Link 
            href="/"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-700 transition duration-300 transform hover:scale-105"
          >
            Return Home
          </Link>
          
          <div className="pt-4">
            <Link 
              href="/record"
              className="text-blue-600 dark:text-blue-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium underline underline-offset-2"
            >
              Go to Recording Page
            </Link>
          </div>
        </div>
        
        {/* Sound wave animation */}
        <div className="flex justify-center items-center space-x-1 mt-16">
          {[...Array(12)].map((_, i) => (
            <div 
              key={i}
              className="w-1 bg-gradient-to-t from-blue-500 to-purple-600"
              style={{
                height: `${Math.sin(i / 2) * 20 + 30}px`,
                animation: `soundWave 1s ease-in-out infinite ${i * 0.1}s`
              }}
            ></div>
          ))}
        </div>
      </div>
      
      {/* CSS for animation */}
      <style jsx>{`
        @keyframes soundWave {
          0%, 100% {
            transform: scaleY(1);
          }
          50% {
            transform: scaleY(0.5);
          }
        }
      `}</style>
    </div>
  );
}