import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// The "next-level" SVG icon for the logo.
const LogoIcon = () => (
    <svg 
        width="32" 
        height="32" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className="mr-2 sm:mr-3 transform group-hover:rotate-12 transition-transform duration-500 ease-in-out flex-shrink-0"
    >
        <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6366F1" /> 
                <stop offset="100%" stopColor="#38BDF8" />
            </linearGradient>
        </defs>
        <path 
            fillRule="evenodd" 
            clipRule="evenodd" 
            d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zM8.707 8.707a1 1 0 00-1.414 1.414L10.586 12l-3.293 3.293a1 1 0 101.414 1.414L12 13.414l3.293 3.293a1 1 0 001.414-1.414L13.414 12l3.293-3.293a1 1 0 00-1.414-1.414L12 10.586 8.707 8.707z" 
            fill="url(#logoGradient)"
        />
    </svg>
);

// An icon for the CTA button.
const StartIcon = () => (
    <svg 
        className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 transition-transform duration-300 group-hover:translate-x-1 flex-shrink-0" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
    >
        <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M9.75 17.25l4.5-4.5-4.5-4.5m6 9l4.5-4.5-4.5-4.5"
        />
    </svg>
);

// This is the main Navbar component, combining the best of both versions.
const Navbar = () => {
    const navigate = useNavigate();

    const handleStart = () => {
        navigate("/chat");
    }

    // Using the reliable useState hook to control the menu.
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    // State to track scroll position for dynamic header styling.
    const [isScrolled, setIsScrolled] = useState(false);

    // This effect adds a listener to track scroll position.
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isMenuOpen && !event.target.closest('.mobile-menu') && !event.target.closest('.menu-toggle')) {
                setIsMenuOpen(false);
            }
        };

        if (isMenuOpen) {
            document.addEventListener('click', handleClickOutside);
            document.body.style.overflow = 'hidden'; // Prevent scroll when menu is open
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen]);

    return (
        // Header styling changes based on scroll position for a modern effect.
        <header className={`fixed top-0 left-0 w-full py-2 sm:py-3 lg:py-4 px-3 sm:px-6 lg:px-10 flex items-center z-50 transition-all duration-300 ${
            isScrolled 
                ? 'bg-white/95 backdrop-blur-lg shadow-md border-b border-gray-200/80' 
                : 'bg-transparent'
        }`}>
            <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
                
                {/* Logo and Website Name */}
                <a href="/" className="flex items-center group flex-shrink-0">
                    <LogoIcon />
                    <span className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 tracking-tighter">
                        <span className="hidden sm:inline">StreamSight AI</span>
                        <span className="sm:hidden">StreamSight</span>
                    </span>
                </a>

                {/* Desktop Navigation Links - Hidden on mobile */}
                <nav className="hidden lg:flex items-center space-x-1">
                    <a 
                        href='/features' 
                        className="px-4 py-2 text-gray-600 hover:text-blue-600 font-medium text-sm xl:text-base transition-colors duration-300 relative group rounded-lg hover:bg-blue-50"
                    >
                        Features
                        <span className="absolute bottom-1 left-4 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-8"></span>
                    </a>
                    <a 
                        href='/demo' 
                        className="px-4 py-2 text-gray-600 hover:text-blue-600 font-medium text-sm xl:text-base transition-colors duration-300 relative group rounded-lg hover:bg-blue-50"
                    >
                        Demo
                        <span className="absolute bottom-1 left-4 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-8"></span>
                    </a>
                    <a 
                        href='https://github.com/kunalverma2512/StreamSightAI' 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="px-4 py-2 text-gray-600 hover:text-blue-600 font-medium text-sm xl:text-base transition-colors duration-300 relative group rounded-lg hover:bg-blue-50"
                    >
                        Source Code
                        <span className="absolute bottom-1 left-4 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-8"></span>
                    </a>
                </nav>

                {/* Right side buttons */}
                <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
                    {/* The main call-to-action button */}
                    <button 
                        onClick={handleStart} 
                        className="group flex items-center justify-center px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 text-sm sm:text-base font-bold text-white bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 whitespace-nowrap"
                    >
                        <StartIcon />
                        <span className="hidden sm:inline">Start Analysis</span>
                        <span className="sm:hidden">Start</span>
                    </button>

                    {/* Hamburger icon to open the menu on mobile */}
                    <button 
                        onClick={() => setIsMenuOpen(true)} 
                        className="lg:hidden menu-toggle p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                        aria-label="Open menu"
                    >
                        <svg className="w-6 h-6" fill="#333" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path 
                                fillRule="evenodd" 
                                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" 
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" />
            )}

            {/* Mobile Navigation Menu */}
            <div 
                className={`mobile-menu lg:hidden fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
                    isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                {/* Mobile menu header */}
                <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
                    <div className="flex items-center">
                        <LogoIcon />
                        <span className="text-lg font-bold text-gray-900 tracking-tighter">StreamSight AI</span>
                    </div>
                    <button 
                        onClick={() => setIsMenuOpen(false)} 
                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                        aria-label="Close menu"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Mobile navigation links */}
                <nav className="px-4 sm:px-6 py-6">
                    <ul className="space-y-1">
                        <li>
                            <a 
                                href='/features' 
                                className="flex items-center w-full px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium text-base rounded-lg transition-all duration-200"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <span className="mr-3">🚀</span>
                                Features
                            </a>
                        </li>
                        <li>
                            <a 
                                href='/demo' 
                                className="flex items-center w-full px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium text-base rounded-lg transition-all duration-200"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <span className="mr-3">🎬</span>
                                Demo
                            </a>
                        </li>
                        <li>
                            <a 
                                href='https://github.com/kunalverma2512/StreamSightAI' 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="flex items-center w-full px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium text-base rounded-lg transition-all duration-200"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <span className="mr-3">💻</span>
                                Source Code
                                <svg className="w-4 h-4 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </a>
                        </li>
                    </ul>
                </nav>

                {/* Mobile menu footer with additional CTA */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 border-t border-gray-200 bg-gray-50">
                    <button 
                        onClick={() => {
                            handleStart();
                            setIsMenuOpen(false);
                        }}
                        className="w-full flex items-center justify-center px-6 py-3 text-base font-bold text-white bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                    >
                        <StartIcon />
                        Start Analysis
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Navbar;
