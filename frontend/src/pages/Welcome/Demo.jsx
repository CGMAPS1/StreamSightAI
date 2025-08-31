import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Enhanced Icon for the feature list items
const FeatureCheckIcon = ({ index }) => (
    <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ 
            delay: index * 0.2 + 0.8,
            type: "spring",
            stiffness: 200,
            damping: 15
        }}
        whileHover={{ 
            scale: 1.2,
            rotate: 360,
            transition: { duration: 0.3 }
        }}
        className="relative"
    >
        <motion.div
            className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-md opacity-0"
            whileHover={{ opacity: 0.6, scale: 1.5 }}
            transition={{ duration: 0.3 }}
        />
        <svg 
            className="w-6 h-6 text-cyan-400 relative z-10" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <motion.path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: index * 0.2 + 1, duration: 0.8 }}
            />
        </svg>
    </motion.div>
);

// Enhanced Play Button Component
const PlayButton = () => (
    <motion.div
        className="relative cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
    >
        <motion.div
            className="absolute inset-0 bg-white/20 rounded-full"
            animate={{
                scale: [1, 1.4, 1],
                opacity: [0.3, 0, 0.3]
            }}
            transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
            }}
        />
        <motion.div
            className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20"
            whileHover={{ 
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                borderColor: "rgba(255, 255, 255, 0.4)"
            }}
        >
            <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
            </svg>
        </motion.div>
    </motion.div>
);

// Floating Particles Component
const FloatingParticles = () => {
    const particles = Array.from({ length: 25 }, (_, i) => i);
    
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((particle) => (
                <motion.div
                    key={particle}
                    className="absolute w-1 h-1 bg-gradient-to-r from-cyan-400/30 to-blue-400/30 rounded-full"
                    initial={{
                        x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
                        y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                        scale: Math.random() * 0.5 + 0.5,
                    }}
                    animate={{
                        x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
                        y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                        scale: [0.5, 2, 0.5],
                        opacity: [0.2, 0.8, 0.2],
                    }}
                    transition={{
                        duration: Math.random() * 25 + 20,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
};

// Enhanced Feature Item Component
const FeatureItem = ({ icon, title, description, index }) => {
    const itemRef = useRef(null);
    const isInView = useInView(itemRef, { once: true, threshold: 0.1 });

    return (
        <motion.div 
            ref={itemRef}
            className="flex items-start space-x-4 group"
            initial={{ opacity: 0, y: 50, x: -30 }}
            animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
            transition={{ 
                delay: index * 0.2,
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94]
            }}
            whileHover={{ 
                y: -5,
                transition: { duration: 0.2 }
            }}
        >
            <FeatureCheckIcon index={index} />
            <div className="flex-1">
                <motion.h3 
                    className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-300 transition-colors duration-300"
                    whileHover={{ x: 5 }}
                >
                    {title}
                </motion.h3>
                <motion.p 
                    className="text-gray-400 leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: index * 0.2 + 0.3, duration: 0.6 }}
                >
                    {description}
                </motion.p>
            </div>
        </motion.div>
    );
};

// The enhanced main Demo page component
const Demo = () => {
    const navigate = useNavigate();
    const handleStart = () => {
        navigate("/chat")
    }

    const [isVideoHovered, setIsVideoHovered] = useState(false);
    const headerRef = useRef(null);
    const videoRef = useRef(null);
    const featuresRef = useRef(null);

    const isHeaderInView = useInView(headerRef, { once: true, threshold: 0.1 });
    const isVideoInView = useInView(videoRef, { once: true, threshold: 0.1 });
    const areFeaturesInView = useInView(featuresRef, { once: true, threshold: 0.1 });

    const features = [
        {
            title: "Real-Time Event Recognition",
            description: "Watch as the AI identifies traffic violations and pedestrian movements instantly."
        },
        {
            title: "Dynamic Summarization", 
            description: "See how hours of footage are condensed into a clear, actionable summary."
        },
        {
            title: "Conversational Interaction",
            description: "Observe how users can ask follow-up questions to get deeper insights."
        }
    ];

    return (
        <motion.main 
            className="relative w-full min-h-screen bg-gray-900 py-28 px-4 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            {/* Enhanced animated background */}
            <motion.div 
                className="absolute inset-0 -z-10"
                animate={{
                    backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
                }}
                transition={{
                    duration: 40,
                    repeat: Infinity,
                    ease: "linear"
                }}
            >
                <motion.div 
                    className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:24px_38px]"
                    animate={{
                        backgroundPosition: ['0px 0px', '24px 38px', '0px 0px']
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
                <motion.div 
                    className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_1200px_at_50%_0px,#1e3a8a55,transparent)]"
                    animate={{
                        background: [
                            "radial-gradient(circle_1200px_at_30%_0px,#1e3a8a55,transparent)",
                            "radial-gradient(circle_1200px_at_70%_0px,#1e3a8a55,transparent)",
                            "radial-gradient(circle_1200px_at_30%_0px,#1e3a8a55,transparent)"
                        ]
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div 
                    className="absolute bottom-0 right-0 h-full w-full bg-[radial-gradient(circle_1000px_at_80%_100%,#0c4a6e55,transparent)]"
                    animate={{
                        background: [
                            "radial-gradient(circle_1000px_at_80%_100%,#0c4a6e55,transparent)",
                            "radial-gradient(circle_1000px_at_20%_100%,#0c4a6e55,transparent)",
                            "radial-gradient(circle_1000px_at_80%_100%,#0c4a6e55,transparent)"
                        ]
                    }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </motion.div>

            {/* Floating Particles */}
            <FloatingParticles />

            {/* Additional Glowing Orbs */}
            <motion.div
                className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
                animate={{
                    x: [0, 100, 0],
                    y: [0, -50, 0],
                    scale: [1, 1.3, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.div
                className="absolute bottom-20 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"
                animate={{
                    x: [0, -80, 0],
                    y: [0, 30, 0],
                    scale: [1, 0.8, 1],
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            <div className="container mx-auto max-w-5xl text-center relative z-10">
                {/* Enhanced Header Section */}
                <motion.div
                    ref={headerRef}
                    initial={{ opacity: 0, y: -50 }}
                    animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                    <motion.h1 
                        className="text-4xl lg:text-6xl font-extrabold text-white mb-4 tracking-tighter relative"
                        whileHover={{ scale: 1.02 }}
                    >
                        <motion.span
                            className="bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent"
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
                            Interactive Demo
                        </motion.span>
                        
                        {/* Animated underline */}
                        <motion.div
                            className="absolute -bottom-2 left-1/2 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full"
                            initial={{ width: 0, x: "-50%" }}
                            animate={isHeaderInView ? { width: "60%", x: "-50%" } : {}}
                            transition={{ delay: 0.8, duration: 1 }}
                        />
                    </motion.h1>
                    
                    <motion.p 
                        className="text-lg text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed"
                        initial={{ opacity: 0, y: 30 }}
                        animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.4, duration: 0.8 }}
                    >
                        Witness the power of{' '}
                        <motion.span
                            className="text-cyan-300 font-semibold"
                            animate={{ opacity: [1, 0.7, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            StreamSight AI
                        </motion.span>{' '}
                        in action. This video demonstrates how our platform processes, recognizes, and summarizes complex visual data in real-time.
                    </motion.p>
                </motion.div>

                {/* Enhanced Video Player Section */}
                <motion.div 
                    ref={videoRef}
                    className="relative bg-black/50 backdrop-blur-xl p-4 sm:p-6 rounded-2xl shadow-2xl border border-gray-700/80 group mb-16"
                    initial={{ opacity: 0, y: 100, scale: 0.9 }}
                    animate={isVideoInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    whileHover={{ 
                        scale: 1.02,
                        y: -10,
                        transition: { duration: 0.3 }
                    }}
                    onHoverStart={() => setIsVideoHovered(true)}
                    onHoverEnd={() => setIsVideoHovered(false)}
                >
                    {/* Enhanced glowing effect */}
                    <motion.div 
                        className="absolute -inset-px bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 rounded-2xl blur-lg opacity-0 group-hover:opacity-70"
                        animate={{
                            opacity: isVideoHovered ? 0.7 : 0,
                            scale: isVideoHovered ? 1.02 : 1,
                        }}
                        transition={{ duration: 0.5 }}
                    />
                    
                    {/* Animated border glow */}
                    <motion.div
                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
                        animate={{
                            background: [
                                "linear-gradient(0deg, rgba(34, 211, 238, 0.2), transparent, rgba(34, 211, 238, 0.2))",
                                "linear-gradient(90deg, rgba(59, 130, 246, 0.2), transparent, rgba(79, 70, 229, 0.2))",
                                "linear-gradient(180deg, rgba(79, 70, 229, 0.2), transparent, rgba(59, 130, 246, 0.2))",
                                "linear-gradient(270deg, rgba(34, 211, 238, 0.2), transparent, rgba(34, 211, 238, 0.2))",
                            ]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                    
                    <div className="relative aspect-w-16 aspect-h-9 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg overflow-hidden">
                        {/* Enhanced video placeholder */}
                        <motion.div 
                            className="flex items-center justify-center h-full relative"
                            whileHover={{ scale: 1.01 }}
                        >
                            <div className="text-center">
                                <motion.div
                                    animate={{
                                        scale: [1, 1.1, 1],
                                        opacity: [0.7, 1, 0.7]
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                >
                                    <PlayButton />
                                </motion.div>
                                
                                <motion.p 
                                    className="text-white font-semibold mt-4 text-xl"
                                    animate={{ opacity: [0.8, 1, 0.8] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    Demo Video Coming Soon
                                </motion.p>
                                <motion.p 
                                    className="text-gray-400 text-sm mt-2"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1 }}
                                >
                                    Experience the future of video analysis
                                </motion.p>
                            </div>

                            {/* Animated corner elements */}
                            <motion.div
                                className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-cyan-400/50"
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                            <motion.div
                                className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-cyan-400/50"
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                            />
                            <motion.div
                                className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-cyan-400/50"
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                            />
                            <motion.div
                                className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-cyan-400/50"
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                            />
                        </motion.div>
                    </div>
                </motion.div>

                {/* Enhanced Key Features Section */}
                <motion.div 
                    ref={featuresRef}
                    className="text-left"
                    initial={{ opacity: 0, y: 50 }}
                    animate={areFeaturesInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.8 }}
                >
                    <motion.h2 
                        className="text-3xl lg:text-4xl font-bold text-white mb-8 text-center"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={areFeaturesInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 1, duration: 0.6 }}
                    >
                        <motion.span
                            className="bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent"
                            animate={{
                                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                            }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            style={{
                                backgroundSize: '200% 200%'
                            }}
                        >
                            What You'll See
                        </motion.span>
                    </motion.h2>
                    
                    <motion.div 
                        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
                        initial={{ opacity: 0 }}
                        animate={areFeaturesInView ? { opacity: 1 } : {}}
                        transition={{ delay: 1.2, duration: 0.6 }}
                    >
                        {features.map((feature, index) => (
                            <FeatureItem
                                key={index}
                                icon={<FeatureCheckIcon index={index} />}
                                title={feature.title}
                                description={feature.description}
                                index={index}
                            />
                        ))}
                    </motion.div>
                </motion.div>

                {/* Call to Action */}
                <motion.div
                    className="mt-16 text-center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={areFeaturesInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 2, duration: 0.8 }}
                >
                    <motion.p 
                        className="text-gray-400 mb-6"
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 3, repeat: Infinity }}
                    >
                        Ready to experience the power of AI-driven video analysis?
                    </motion.p>
                    <motion.button
                        onClick={handleStart}
                        className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-full shadow-lg relative overflow-hidden"
                        whileHover={{ 
                            scale: 1.05,
                            boxShadow: "0 20px 40px rgba(34, 211, 238, 0.3)"
                        }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600"
                            initial={{ x: "-100%" }}
                            whileHover={{ x: "0%" }}
                            transition={{ duration: 0.3 }}
                        />
                        <span className="relative z-10">Try StreamSight AI Now</span>
                    </motion.button>
                </motion.div>
            </div>
        </motion.main>
    );
};

export default Demo;
