"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-white shadow-lg sticky top-0 z-50 font-inter">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="w-5 h-5 text-white"
                            >
                                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                                <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                                <line x1="12" x2="12" y1="19" y2="22"></line>
                            </svg>
                        </div>
                        <span className="text-2xl font-bold text-gray-800 font-inter">
                            PitchPerfect
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link
                            href="/record"
                            className="text-gray-600 hover:text-blue-600 transition-colors font-medium font-inter"
                        >
                            Record/Upload
                        </Link>
                        <Link
                            href="/dashboard"
                            className="text-gray-600 hover:text-blue-600 transition-colors font-medium font-inter"
                        >
                            Demo
                        </Link>
                        <Link
                            href="/how-it-works"
                            className="text-gray-600 hover:text-blue-600 transition-colors font-medium font-inter"
                        >
                            How It Works
                        </Link>
                        <Link
                            href="/features"
                            className="text-gray-600 hover:text-blue-600 transition-colors font-medium font-inter"
                        >
                            Features
                        </Link>
                        <Link href={"/login"}>
                            <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-md font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 font-inter cursor-pointer">
                                Try It Now
                            </button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-gray-600 hover:text-blue-600"
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-6 h-6"
                        >
                            <line x1="4" x2="20" y1="12" y2="12"></line>
                            <line x1="4" x2="20" y1="6" y2="6"></line>
                            <line x1="4" x2="20" y1="18" y2="18"></line>
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t border-gray-200">
                        <div className="flex flex-col space-y-4">
                            <Link
                                href="/record"
                                className="text-gray-600 hover:text-blue-600 transition-colors font-medium py-2 font-inter"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Record/Upload
                            </Link>
                            <Link
                                href="/dashboard"
                                className="text-gray-600 hover:text-blue-600 transition-colors font-medium py-2 font-inter"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Dashboard
                            </Link>
                            <Link
                                href="/how-it-works"
                                className="text-gray-600 hover:text-blue-600 transition-colors font-medium py-2 font-inter"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                How It Works
                            </Link>
                            <Link
                                href="/features"
                                className="text-gray-600 hover:text-blue-600 transition-colors font-medium font-inter"
                            >
                                Features
                            </Link>
                            <Link href={"/login"}>
                                <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-md font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 font-inter">
                                    Try It Now
                                </button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}