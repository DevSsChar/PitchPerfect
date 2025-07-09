"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { data: session, status } = useSession();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const handleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };
    const closeDropdown = () => {
        setIsDropdownOpen(false);
    };
    // Close dropdown on outside click
    React.useEffect(() => {
        if (!isDropdownOpen) return;
        function handleClick(e) {
            if (!e.target.closest('.dropdown-parent')) setIsDropdownOpen(false);
        }
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [isDropdownOpen]);

    return (
        <nav className="bg-[var(--background)] shadow-lg sticky top-0 z-50 font-inter border-b border-[var(--border)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                        <div className="w-8 h-8 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] rounded-lg flex items-center justify-center">
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
                        <span className="text-2xl font-bold text-[var(--foreground)] font-inter">
                            PitchPerfect
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/record" className="text-[var(--foreground)] opacity-80 hover:opacity-100 hover:text-[var(--primary)] transition-colors font-medium font-inter">Record/Upload</Link>
                        <Link href="/dashboard" className="text-[var(--foreground)] opacity-80 hover:opacity-100 hover:text-[var(--primary)] transition-colors font-medium font-inter">Dashboard</Link>
                        {status === 'authenticated' && (
                            <Link href="/history" className="text-[var(--foreground)] opacity-80 hover:opacity-100 hover:text-[var(--primary)] transition-colors font-medium font-inter">History</Link>
                        )}
                        <Link href="/how-it-works" className="text-[var(--foreground)] opacity-80 hover:opacity-100 hover:text-[var(--primary)] transition-colors font-medium font-inter">How It Works</Link>
                        {/* Show Features link for unauthenticated users */}
                        {status !== 'authenticated' && (
                            <Link href="/features" className="text-[var(--foreground)] opacity-80 hover:opacity-100 hover:text-[var(--primary)] transition-colors font-medium font-inter">Features</Link>
                        )}
                        {/* Auth logic */}
                        {status === 'authenticated' ? (
                            <div className="relative dropdown-parent">
                                <button className="flex items-center space-x-2 focus:outline-none" onClick={handleDropdown}>
                                    <img src={session.user?.image} alt="Profile" className="w-8 h-8 rounded-full border-2 border-[var(--border)]" />
                                    <span className="font-medium text-[var(--foreground)]">{session.user?.name}</span>
                                    <svg className="w-4 h-4 ml-1 text-[var(--foreground)] opacity-70" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                                </button>
                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-[var(--background)] border border-[var(--border)] rounded-md shadow-lg z-50 cursor-pointer">
                                        <Link href="/dashboard" className="block px-4 py-2 text-[var(--foreground)] hover:bg-[var(--muted)]" onClick={closeDropdown}>Dashboard</Link>
                                        <Link href="/history" className="block px-4 py-2 text-[var(--foreground)] hover:bg-[var(--muted)]" onClick={closeDropdown}>History</Link>
                                        <button onClick={() => { signOut({ callbackUrl: '/' }); closeDropdown(); }} className="w-full text-left px-4 py-2 text-red-500 hover:bg-[var(--muted)]">Sign Out</button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link href={"/login"}>
                                <button className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white px-6 py-2 rounded-md font-medium hover:opacity-90 transition-all duration-300 transform hover:scale-105 font-inter cursor-pointer">
                                    Try It Now
                                </button>
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-[var(--foreground)] hover:text-[var(--primary)]"
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
                    <div className="md:hidden py-4 border-t border-[var(--border)]">
                        <div className="flex flex-col space-y-4">
                            <Link href="/record" className="text-[var(--foreground)] opacity-80 hover:opacity-100 hover:text-[var(--primary)] transition-colors font-medium py-2 font-inter" onClick={() => setIsMenuOpen(false)}>Record/Upload</Link>
                            <Link href="/dashboard" className="text-[var(--foreground)] opacity-80 hover:opacity-100 hover:text-[var(--primary)] transition-colors font-medium py-2 font-inter" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
                            {status === 'authenticated' && (
                                <Link href="/history" className="text-[var(--foreground)] opacity-80 hover:opacity-100 hover:text-[var(--primary)] transition-colors font-medium py-2 font-inter" onClick={() => setIsMenuOpen(false)}>History</Link>
                            )}
                            <Link href="/how-it-works" className="text-[var(--foreground)] opacity-80 hover:opacity-100 hover:text-[var(--primary)] transition-colors font-medium py-2 font-inter" onClick={() => setIsMenuOpen(false)}>How It Works</Link>
                            {/* Show Features link for unauthenticated users */}
                            {status !== 'authenticated' && (
                                <Link href="/features" className="text-[var(--foreground)] opacity-80 hover:opacity-100 hover:text-[var(--primary)] transition-colors font-medium py-2 font-inter" onClick={() => setIsMenuOpen(false)}>Features</Link>
                            )}
                            {/* Auth logic for mobile */}
                            {status === 'authenticated' ? (
                                <div className="relative dropdown-parent">
                                    <button className="flex items-center space-x-2 focus:outline-none w-full justify-between px-2 py-2 border border-[var(--border)] rounded-md bg-[var(--muted)]" onClick={handleDropdown}>
                                        <span className="flex items-center">
                                            <img src={session.user?.image} alt="Profile" className="w-7 h-7 rounded-full border-2 border-[var(--border)] mr-2" />
                                            <span className="font-medium text-[var(--foreground)]">{session.user?.name}</span>
                                        </span>
                                        <svg className="w-4 h-4 text-[var(--foreground)] opacity-70" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                                    </button>
                                    {isDropdownOpen && (
                                        <div className="absolute left-0 right-0 mt-2 w-full bg-[var(--background)] border border-[var(--border)] rounded-md shadow-lg z-50 cursor-pointer">
                                            <Link href="/dashboard" className="block px-4 py-2 text-[var(--foreground)] hover:bg-[var(--muted)]" onClick={() => { closeDropdown(); setIsMenuOpen(false); }}>Dashboard</Link>
                                            <Link href="/history" className="block px-4 py-2 text-[var(--foreground)] hover:bg-[var(--muted)]" onClick={() => { closeDropdown(); setIsMenuOpen(false); }}>History</Link>
                                            <button onClick={() => { signOut({ callbackUrl: '/'}); closeDropdown(); setIsMenuOpen(false); }} className="w-full text-left px-4 py-2 text-red-500 hover:bg-[var(--muted)]">Sign Out</button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Link href={"/login"}>
                                    <button className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white px-6 py-2 rounded-md font-medium hover:opacity-90 transition-all duration-300 transform hover:scale-105 font-inter cursor-pointer w-full">Try It Now</button>
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}