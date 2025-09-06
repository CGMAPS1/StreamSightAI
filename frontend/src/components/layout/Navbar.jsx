import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';

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
    const navRef = useRef(null);
    const isNavInView = useInView(navRef, { threshold: 0.1 });

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

    // Navigation items with icons and animations
    const navItems = [
        { name: 'Features', href: '/features', icon: '🚀' },
        { name: 'Demo', href: '/demo', icon: '🎬' },
        { name: 'Source Code', href: 'https://github.com/kunalverma2512/StreamSightAI', icon: '💻', external: true },
        // { name: 'Team', href: '/about-team', icon: '👥', external: true }
    ];

    const containerVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.4 }
        }
    };

    return (
        // Header styling changes based on scroll position for a modern effect.
        <motion.header 
            ref={navRef}
            className={`fixed top-0 left-0 w-full py-2 sm:py-3 lg:py-4 px-3 sm:px-6 lg:px-10 flex items-center z-50 transition-all duration-300 ${
                isScrolled 
                    ? 'bg-white/95 backdrop-blur-lg shadow-md border-b border-gray-200/80' 
                    : 'bg-transparent'
            }`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Animated gradient line at top */}
            <motion.div
                className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-indigo-500 to-transparent"
                animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    opacity: isScrolled ? [0.5, 1, 0.5] : 0
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                style={{
                    backgroundSize: '200% 200%'
                }}
            />

            <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
                
                {/* Enhanced Logo and Website Name */}
                <motion.a 
                    href="/" 
                    className="flex items-center group flex-shrink-0"
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <motion.div
                        animate={{ 
                            rotate: [0, 360],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    >
                        <LogoIcon />
                    </motion.div>
                    <motion.span 
                        className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 tracking-tighter"
                        animate={{
                            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <span className="hidden sm:inline">StreamSight AI</span>
                        <span className="sm:hidden">StreamSight</span>
                    </motion.span>
                </motion.a>

                {/* Enhanced Desktop Navigation Links */}
                <motion.nav 
                    className="hidden lg:flex items-center space-x-1"
                    variants={containerVariants}
                >
                    {navItems.map((item, index) => (
                        <motion.a 
                            key={index}
                            href={item.href}
                            {...(item.external && { target: "_blank", rel: "noopener noreferrer" })}
                            className="px-4 py-2 text-gray-600 hover:text-blue-600 font-medium text-sm xl:text-base transition-colors duration-300 relative group rounded-lg hover:bg-blue-50"
                            variants={itemVariants}
                            whileHover={{ 
                                y: -2,
                                transition: { duration: 0.2 }
                            }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {item.name}
                            <motion.span 
                                className="absolute bottom-1 left-4 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-8"
                                whileHover={{ 
                                    width: 32,
                                    boxShadow: "0 0 10px rgba(59, 130, 246, 0.5)"
                                }}
                            />
                            
                            {/* Floating icon on hover */}
                            <motion.span
                                className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-lg opacity-0 group-hover:opacity-100 pointer-events-none"
                                animate={{ y: [0, -5, 0] }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                {item.icon}
                            </motion.span>
                        </motion.a>
                    ))}
                </motion.nav>

                {/* Enhanced Right side buttons */}
                <motion.div 
                    className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4"
                    variants={itemVariants}
                >
                    {/* Enhanced main call-to-action button */}
                    <motion.button 
                        onClick={handleStart} 
                        className="group flex items-center justify-center px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 text-sm sm:text-base font-bold text-white bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 whitespace-nowrap relative overflow-hidden"
                        whileHover={{ 
                            scale: 1.05,
                            boxShadow: "0 10px 30px rgba(99, 102, 241, 0.4)",
                            y: -3
                        }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        {/* Animated background */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600"
                            initial={{ x: "-100%" }}
                            whileHover={{ x: "0%" }}
                            transition={{ duration: 0.3 }}
                        />
                        
                        {/* Ripple effect */}
                        <motion.div
                            className="absolute inset-0 bg-white/20 rounded-full"
                            initial={{ scale: 0, opacity: 0 }}
                            whileTap={{ scale: 2, opacity: [0, 0.3, 0] }}
                            transition={{ duration: 0.4 }}
                        />

                        <span className="relative z-10 flex items-center">
                            <StartIcon />
                            <span className="hidden sm:inline">Start Analysis</span>
                            <span className="sm:hidden">Start</span>
                        </span>
                    </motion.button>

                    {/* Enhanced Hamburger menu button */}
                    <motion.button 
                        onClick={() => setIsMenuOpen(true)} 
                        className="lg:hidden menu-toggle p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 relative"
                        aria-label="Open menu"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, rotate: -90 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <motion.svg 
                            className="w-6 h-6" 
                            fill="#333" 
                            viewBox="0 0 20 20" 
                            xmlns="http://www.w3.org/2000/svg"
                            whileHover={{ rotate: 180 }}
                            transition={{ duration: 0.3 }}
                        >
                            <path 
                                fillRule="evenodd" 
                                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" 
                                clipRule="evenodd"
                            />
                        </motion.svg>

                        {/* Notification dot */}
                        <motion.div
                            className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full"
                            animate={{
                                scale: [1, 1.3, 1],
                                opacity: [0.7, 1, 0.7]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    </motion.button>
                </motion.div>
            </div>

            {/* Enhanced Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div 
                        className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => setIsMenuOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Enhanced Mobile Navigation Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div 
                        className="mobile-menu lg:hidden fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl z-50 overflow-hidden"
                        initial={{ x: "100%", opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: "100%", opacity: 0 }}
                        transition={{ 
                            type: "spring", 
                            stiffness: 300, 
                            damping: 30 
                        }}
                    >
                        {/* Animated background pattern */}
                        <motion.div
                            className="absolute inset-0 opacity-5"
                            animate={{
                                backgroundPosition: ['0% 0%', '100% 100%']
                            }}
                            transition={{
                                duration: 20,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                            style={{
                                backgroundImage: `radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.3) 0%, transparent 50%), 
                                                radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)`,
                                backgroundSize: '400% 400%'
                            }}
                        />

                        {/* Enhanced mobile menu header */}
                        <motion.div 
                            className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 relative z-10"
                            initial={{ y: -50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                        >
                            <div className="flex items-center">
                                <motion.div
                                    animate={{ rotate: [0, 360] }}
                                    transition={{
                                        duration: 15,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                >
                                    <LogoIcon />
                                </motion.div>
                                <span className="text-lg font-bold text-gray-900 tracking-tighter">StreamSight AI</span>
                            </div>
                            <motion.button 
                                onClick={() => setIsMenuOpen(false)} 
                                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                                aria-label="Close menu"
                                whileHover={{ 
                                    scale: 1.1, 
                                    rotate: 90,
                                    backgroundColor: "#fee2e2"
                                }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </motion.button>
                        </motion.div>

                        {/* Enhanced mobile navigation links */}
                        <motion.nav 
                            className="px-4 sm:px-6 py-6 relative z-10"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <ul className="space-y-1">
                                {navItems.map((item, index) => (
                                    <motion.li
                                        key={index}
                                        initial={{ x: 100, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ 
                                            delay: 0.1 * index + 0.3,
                                            type: "spring",
                                            stiffness: 200
                                        }}
                                    >
                                        <motion.a 
                                            href={item.href}
                                            {...(item.external && { target: "_blank", rel: "noopener noreferrer" })}
                                            className="flex items-center w-full px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium text-base rounded-lg transition-all duration-200 relative overflow-hidden"
                                            onClick={() => setIsMenuOpen(false)}
                                            whileHover={{ 
                                                x: 10,
                                                backgroundColor: "#eff6ff"
                                            }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            {/* Animated background */}
                                            <motion.div
                                                className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5"
                                                initial={{ x: "-100%" }}
                                                whileHover={{ x: "0%" }}
                                                transition={{ duration: 0.3 }}
                                            />

                                            <motion.span 
                                                className="mr-3 relative z-10"
                                                animate={{ 
                                                    rotate: [0, 10, -10, 0],
                                                    scale: [1, 1.2, 1]
                                                }}
                                                transition={{
                                                    duration: 2,
                                                    delay: index * 0.2,
                                                    repeat: Infinity,
                                                    ease: "easeInOut"
                                                }}
                                            >
                                                {item.icon}
                                            </motion.span>
                                            <span className="relative z-10">{item.name}</span>
                                            {item.external && (
                                                <motion.svg 
                                                    className="w-4 h-4 ml-auto relative z-10" 
                                                    fill="none" 
                                                    stroke="currentColor" 
                                                    viewBox="0 0 24 24"
                                                    whileHover={{ 
                                                        scale: 1.2,
                                                        rotate: 45 
                                                    }}
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                </motion.svg>
                                            )}
                                        </motion.a>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.nav>

                        {/* Enhanced mobile menu footer */}
                        <motion.div 
                            className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 border-t border-gray-200 bg-gray-50/80 backdrop-blur-sm relative z-10"
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            <motion.button 
                                onClick={() => {
                                    handleStart();
                                    setIsMenuOpen(false);
                                }}
                                className="w-full flex items-center justify-center px-6 py-3 text-base font-bold text-white bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                                whileHover={{ 
                                    scale: 1.02,
                                    boxShadow: "0 15px 35px rgba(99, 102, 241, 0.4)"
                                }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {/* Animated background */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600"
                                    initial={{ x: "-100%" }}
                                    whileHover={{ x: "0%" }}
                                    transition={{ duration: 0.3 }}
                                />

                                {/* Pulse effect */}
                                <motion.div
                                    className="absolute inset-0 bg-white/10 rounded-full"
                                    animate={{
                                        scale: [1, 1.1, 1],
                                        opacity: [0.5, 0.8, 0.5]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                />

                                <span className="relative z-10 flex items-center">
                                    <StartIcon />
                                    Start Analysis
                                </span>
                            </motion.button>
                        </motion.div>

                        {/* Floating particles in mobile menu */}
                        <div className="absolute inset-0 pointer-events-none">
                            {Array.from({ length: 10 }, (_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
                                    animate={{
                                        x: [
                                            Math.random() * 400,
                                            Math.random() * 400,
                                            Math.random() * 400
                                        ],
                                        y: [
                                            Math.random() * 800,
                                            Math.random() * 800,
                                            Math.random() * 800
                                        ],
                                        opacity: [0.2, 0.8, 0.2],
                                        scale: [0.5, 1.5, 0.5]
                                    }}
                                    transition={{
                                        duration: 8 + Math.random() * 4,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: i * 0.3
                                    }}
                                />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}

export default Navbar;
