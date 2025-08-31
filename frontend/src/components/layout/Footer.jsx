import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// Using the same consistent logo icon from the Navbar
const LogoIcon = () => (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-3">
        <defs>
            <linearGradient id="footerLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#A5B4FC" /> 
                <stop offset="100%" stopColor="#38BDF8" />
            </linearGradient>
        </defs>
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zM8.707 8.707a1 1 0 00-1.414 1.414L10.586 12l-3.293 3.293a1 1 0 101.414 1.414L12 13.414l3.293 3.293a1 1 0 001.414-1.414L13.414 12l3.293-3.293a1 1 0 00-1.414-1.414L12 10.586 8.707 8.707z" fill="url(#footerLogoGradient)"/>
    </svg>
);

// Custom, consistently styled SVG icons for social media links
const SocialIcon = ({ href, children, index }) => (
    <motion.a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-gray-500 hover:text-white transition-colors duration-300 relative"
        initial={{ opacity: 0, scale: 0, rotateY: -90 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        transition={{ 
            duration: 0.6, 
            delay: index * 0.1 + 2,
            ease: "backOut"
        }}
        whileHover={{ 
            scale: 1.2,
            y: -3,
            boxShadow: "0 10px 20px rgba(59, 130, 246, 0.3)",
            transition: { duration: 0.2 }
        }}
        whileTap={{ scale: 0.9 }}
    >
        {/* Glow effect */}
        <motion.div
            className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl opacity-0"
            whileHover={{ opacity: 1, scale: 1.5 }}
            transition={{ duration: 0.3 }}
        />
        <div className="relative z-10">
            {children}
        </div>
    </motion.a>
);

const GithubIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
);

const TwitterIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616v.064c0 2.297 1.634 4.209 3.803 4.649-.6.164-1.242.207-1.884.151.499 1.936 2.168 3.241 4.136 3.279-1.763 1.385-3.983 2.21-6.326 2.21-.411 0-.817-.024-1.216-.07 2.288 1.469 5.015 2.32 7.942 2.32 9.473 0 14.65-7.844 14.65-14.65l-.001-.667c1.001-.72 1.868-1.62 2.56-2.675z"/></svg>
);

const LinkedInIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.769c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.769h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
);

// The main Footer component.
const Footer = () => {
  const footerRef = useRef(null);
  const topSectionRef = useRef(null);
  const linksRef = useRef(null);
  const bottomRef = useRef(null);

  const isFooterInView = useInView(footerRef, { once: true, threshold: 0.1 });
  const isTopInView = useInView(topSectionRef, { once: true, threshold: 0.1 });
  const areLinksInView = useInView(linksRef, { once: true, threshold: 0.1 });
  const isBottomInView = useInView(bottomRef, { once: true, threshold: 0.1 });

  // Floating background elements
  const backgroundElements = Array.from({ length: 20 }, (_, i) => (
    <motion.div
      key={i}
      className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
      initial={{
        x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
        y: Math.random() * 600,
        opacity: 0,
      }}
      animate={{
        x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
        y: Math.random() * 600,
        opacity: [0.1, 0.8, 0.1],
        scale: [0.5, 2, 0.5],
      }}
      transition={{
        duration: Math.random() * 25 + 20,
        repeat: Infinity,
        ease: "easeInOut",
        delay: Math.random() * 10
      }}
    />
  ));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <motion.footer 
      ref={footerRef}
      className="relative bg-gray-900 pt-20 pb-8 px-6 lg:px-10 tracking-wide overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Enhanced animated grid background */}
      <motion.div 
        className="absolute inset-0 -z-10"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
        }}
        transition={{
          duration: 50,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <motion.div 
          className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"
          animate={{
            backgroundPosition: ['0px 0px', '14px 24px', '0px 0px']
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_1000px_at_50%_0px,#1e3a8a44,transparent)]"
          animate={{
            background: [
              "radial-gradient(circle_1000px_at_30%_0px,#1e3a8a44,transparent)",
              "radial-gradient(circle_1000px_at_70%_0px,#1e3a8a44,transparent)",
              "radial-gradient(circle_1000px_at_30%_0px,#1e3a8a44,transparent)"
            ]
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {/* Floating background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {backgroundElements}
      </div>

      {/* Additional glowing orbs */}
      <motion.div
        className="absolute top-20 left-10 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -40, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl"
        animate={{
          x: [0, -80, 0],
          y: [0, 50, 0],
          scale: [1, 0.8, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="max-w-screen-xl mx-auto relative z-10">
        {/* Enhanced top section with tagline and newsletter signup */}
        <motion.div 
          ref={topSectionRef}
          className="flex flex-col lg:flex-row items-center justify-between gap-8 pb-10 border-b border-gray-700/80"
          initial={{ opacity: 0, y: 50 }}
          animate={isTopInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.div 
            className="text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={isTopInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h3 
              className="text-3xl font-bold text-white relative"
              whileHover={{ scale: 1.02 }}
            >
              <motion.span
                className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  backgroundSize: '200% 200%'
                }}
              >
                Stay Ahead of the Curve
              </motion.span>
            </motion.h3>
            <motion.p 
              className="text-gray-400 mt-2"
              initial={{ opacity: 0 }}
              animate={isTopInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Get the latest on visual AI, product updates, and case studies.
            </motion.p>
          </motion.div>

          <motion.form 
            className="w-full max-w-md"
            initial={{ opacity: 0, x: 50 }}
            animate={isTopInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.div 
              className="flex items-center border border-gray-600/80 rounded-full p-1 bg-gray-800/50 backdrop-blur-sm focus-within:border-blue-500 transition-all duration-300 relative overflow-hidden"
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 10px 30px rgba(59, 130, 246, 0.1)" 
              }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 opacity-0"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-transparent p-2 pl-4 text-white placeholder-gray-500 focus:outline-none relative z-10" 
              />
              <motion.button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full px-5 py-2 transition-colors duration-300 relative z-10"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 5px 15px rgba(59, 130, 246, 0.4)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                Subscribe
              </motion.button>
            </motion.div>
          </motion.form>
        </motion.div>

        {/* Enhanced main grid with links */}
        <motion.div 
          ref={linksRef}
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 py-10"
          variants={containerVariants}
          initial="hidden"
          animate={areLinksInView ? "visible" : "hidden"}
        >
          {/* Logo and tagline column */}
          <motion.div 
            className="col-span-2 md:col-span-4 lg:col-span-1"
            variants={itemVariants}
          >
            <motion.a 
              href="/" 
              className="flex items-center mb-4"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <LogoIcon />
              </motion.div>
              <span className="text-2xl font-bold text-white tracking-tighter">StreamSight AI</span>
            </motion.a>
            <motion.p 
              className="text-gray-400 text-sm max-w-xs"
              initial={{ opacity: 0 }}
              animate={areLinksInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              See beyond the pixels. Understand the action.
            </motion.p>
          </motion.div>

          {/* Link columns with staggered animations */}
          {[
            {
              title: "Platform",
              links: [
                { name: "Features", href: "/features" },
                { name: "Live Demo", href: "/demo" },
                { name: "Pricing", href: "/pricing" },
                { name: "System Status", href: "/status" }
              ]
            },
            {
              title: "Resources", 
              links: [
                { name: "Documentation", href: "/docs" },
                { name: "API Reference", href: "/api" },
                { name: "Case Studies", href: "/case-studies" },
                { name: "Blog", href: "/blog" }
              ]
            },
            {
              title: "Developers",
              links: [
                { name: "GitHub", href: "https://github.com/MantraHackathon" },
                { name: "Community Forum", href: "/community" },
                { name: "Hackathon Project", href: "/hackathon" }
              ]
            },
            {
              title: "Company",
              links: [
                { name: "About Us", href: "/about" },
                { name: "Contact", href: "/contact" },
                { name: "Careers", href: "/careers" }
              ]
            }
          ].map((column, columnIndex) => (
            <motion.div 
              key={columnIndex}
              variants={itemVariants}
              custom={columnIndex}
            >
              <motion.h4 
                className="text-base font-semibold mb-4 text-white"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                {column.title}
              </motion.h4>
              <ul className="space-y-3">
                {column.links.map((link, linkIndex) => (
                  <motion.li 
                    key={linkIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={areLinksInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ 
                      duration: 0.5, 
                      delay: columnIndex * 0.1 + linkIndex * 0.05 + 0.8 
                    }}
                  >
                    <motion.a 
                      href={link.href}
                      className="text-slate-400 hover:text-white text-sm transition-colors duration-300 relative"
                      whileHover={{ 
                        x: 8,
                        color: "#ffffff"
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.span
                        className="absolute -left-2 top-1/2 w-1 h-1 bg-blue-400 rounded-full opacity-0"
                        whileHover={{ opacity: 1, x: -2 }}
                        style={{ transform: "translateY(-50%)" }}
                      />
                      {link.name}
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced bottom section with copyright and social links */}
        <motion.div 
          ref={bottomRef}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 mt-8 border-t border-gray-700/80"
          initial={{ opacity: 0, y: 30 }}
          animate={isBottomInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.p 
            className="text-slate-400 text-sm"
            initial={{ opacity: 0, x: -30 }}
            animate={isBottomInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            © {new Date().getFullYear()} StreamSight AI. All rights reserved.
          </motion.p>
          
          <motion.div 
            className="flex space-x-6"
            initial={{ opacity: 0, x: 30 }}
            animate={isBottomInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <SocialIcon href="https://github.com/MantraHackathon" index={0}>
              <GithubIcon />
            </SocialIcon>
            <SocialIcon href="#" index={1}>
              <TwitterIcon />
            </SocialIcon>
            <SocialIcon href="#" index={2}>
              <LinkedInIcon />
            </SocialIcon>
          </motion.div>
        </motion.div>

        {/* Animated wave line at bottom */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            backgroundSize: '200% 200%'
          }}
        />
      </div>
    </motion.footer>
  );
};

export default Footer;
