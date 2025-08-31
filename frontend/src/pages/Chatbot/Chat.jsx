import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import AnimatedBackground from '../../components/Chatbot/AnimatedBackground';
import InputPanel from '../../components/Chatbot/InputPanel';
import ChatPanel from '../../components/Chatbot/ChatPanel';
import { sendMessage, checkServerHealth, validateVideoFile } from '../../utils/api';

// Helper to generate unique session IDs
const generateSessionId = () => {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Enhanced Floating Elements Component
const FloatingElements = () => {
    const elements = Array.from({ length: 15 }, (_, i) => i);
    
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {elements.map((element) => (
                <motion.div
                    key={element}
                    className="absolute w-2 h-2 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-full"
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
                        duration: Math.random() * 20 + 15,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
};

// Enhanced Status Indicator Component
const StatusIndicator = ({ isOnline, label, glowColor = "green" }) => (
    <motion.div 
        className="flex items-center gap-2"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
    >
        <motion.div 
            className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'} relative`}
            animate={{
                scale: [1, 1.2, 1],
                boxShadow: isOnline 
                    ? ["0 0 5px rgba(34, 197, 94, 0.5)", "0 0 15px rgba(34, 197, 94, 0.8)", "0 0 5px rgba(34, 197, 94, 0.5)"]
                    : ["0 0 5px rgba(239, 68, 68, 0.5)", "0 0 15px rgba(239, 68, 68, 0.8)", "0 0 5px rgba(239, 68, 68, 0.5)"]
            }}
            transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
            }}
        />
        <motion.span 
            className="text-xs sm:text-sm text-gray-600"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity }}
        >
            {label}
        </motion.span>
    </motion.div>
);

// Enhanced Session ID Display
const SessionDisplay = ({ sessionId }) => (
    <motion.span 
        className="text-xs text-gray-400 font-mono"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        whileHover={{ 
            scale: 1.05,
            color: "#6366f1"
        }}
    >
        Session: {sessionId.slice(-8)}
    </motion.span>
);

// Enhanced Action Button Component
const ActionButton = ({ onClick, children, variant = "primary", className = "", disabled = false, ...props }) => {
    const variants = {
        primary: "bg-blue-100 text-blue-700 hover:bg-blue-200",
        secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200",
        export: "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
    };

    return (
        <motion.button
            onClick={onClick}
            disabled={disabled}
            className={`
                px-2 sm:px-3 py-1 text-xs rounded-full transition-all duration-300 relative overflow-hidden
                ${variants[variant]} ${className}
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
            whileHover={!disabled ? { 
                scale: 1.05,
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
            } : {}}
            whileTap={!disabled ? { scale: 0.98 } : {}}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            {...props}
        >
            {/* Ripple effect */}
            <motion.div
                className="absolute inset-0 bg-white/20 rounded-full"
                initial={{ scale: 0, opacity: 0 }}
                whileTap={{ scale: 2, opacity: [0, 0.3, 0] }}
                transition={{ duration: 0.4 }}
            />
            <span className="relative z-10">{children}</span>
        </motion.button>
    );
};

const Chat = () => {
    const [isVideoUploaded, setIsVideoUploaded] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [analysisResults, setAnalysisResults] = useState(null);
    const [messages, setMessages] = useState([
        { 
            text: "Welcome! Please upload a video to begin the analysis.", 
            isUser: false, 
            timestamp: new Date() 
        },
    ]);
    const [isBotLoading, setIsBotLoading] = useState(false);
    const [isServerOnline, setIsServerOnline] = useState(true);
    const [currentFile, setCurrentFile] = useState(null);
    
    // Use useRef to maintain session ID consistency
    const sessionIdRef = useRef(generateSessionId());
    const chatRef = useRef(null);
    const statusRef = useRef(null);
    const mainContentRef = useRef(null);

    const isChatInView = useInView(chatRef, { once: true, threshold: 0.1 });
    const isStatusInView = useInView(statusRef, { once: true, threshold: 0.1 });
    const isMainContentInView = useInView(mainContentRef, { once: true, threshold: 0.1 });
    
    // Get current session ID
    const getSessionId = () => sessionIdRef.current;

    // Check server health on component mount
    useEffect(() => {
        const checkHealth = async () => {
            const isOnline = await checkServerHealth();
            setIsServerOnline(isOnline);
            if (!isOnline) {
                setMessages(prev => [...prev, {
                    text: "⚠️ Warning: Cannot connect to server. Please check if the backend is running.",
                    isUser: false,
                    timestamp: new Date(),
                    isError: true
                }]);
            }
        };
        checkHealth();
    }, []);

    // Handle video + prompt upload
    const handleVideoUpload = async ({ file, prompt }) => {
        // Validate file first
        const validation = validateVideoFile(file);
        if (!validation.isValid) {
            setMessages(prev => [...prev, {
                text: `❌ File validation failed: ${validation.error}`,
                isUser: false,
                timestamp: new Date(),
                isError: true
            }]);
            return;
        }

        setIsProcessing(true);
        setCurrentFile(file);
        
        // Add user message to chat
        const userMessage = prompt || "Analyze this video";
        setMessages(prev => [...prev, { 
            text: userMessage, 
            isUser: true, 
            timestamp: new Date() 
        }]);

        try {
            console.log('🎬 Uploading video with session:', getSessionId());
            const result = await sendMessage(userMessage, file, getSessionId());
            
            console.log('✅ Video analysis result:', result);
            
            setAnalysisResults(result.response);
            setIsVideoUploaded(true);

            // Add bot response to chat
            setMessages(prev => [
                ...prev,
                { 
                    text: result.response, 
                    isUser: false, 
                    timestamp: new Date() 
                }
            ]);
        } catch (error) {
            console.error('❌ Video upload error:', error);
            setMessages(prev => [
                ...prev, 
                { 
                    text: `❌ Upload failed: ${error.message}`, 
                    isUser: false, 
                    timestamp: new Date(),
                    isError: true 
                }
            ]);
        } finally {
            setIsProcessing(false);
        }
    };

    // Handle text chat
    const handleSendMessage = async (messageText) => {
        if (!messageText.trim()) return;

        // Add user message immediately
        setMessages(prev => [...prev, { 
            text: messageText, 
            isUser: true, 
            timestamp: new Date() 
        }]);
        setIsBotLoading(true);

        try {
            console.log('💬 Sending follow-up with session:', getSessionId());
            const result = await sendMessage(messageText, null, getSessionId());
            
            console.log('✅ Follow-up result:', result);
            
            // Add bot response
            setMessages(prev => [
                ...prev, 
                { 
                    text: result.response, 
                    isUser: false, 
                    timestamp: new Date() 
                }
            ]);
        } catch (error) {
            console.error('❌ Follow-up error:', error);
            setMessages(prev => [
                ...prev, 
                { 
                    text: `❌ Message failed: ${error.message}`, 
                    isUser: false, 
                    timestamp: new Date(),
                    isError: true 
                }
            ]);
        } finally {
            setIsBotLoading(false);
        }
    };

    // Reset session when component mounts or resets
    const resetSession = () => {
        sessionIdRef.current = generateSessionId();
        setIsVideoUploaded(false);
        setAnalysisResults(null);
        setCurrentFile(null);
        setMessages([
            { 
                text: "Welcome! Please upload a video to begin the analysis.", 
                isUser: false, 
                timestamp: new Date() 
            }
        ]);
        console.log('🔄 New session created:', sessionIdRef.current);
    };

    // Export chat history
    const exportChatHistory = () => {
        const chatData = {
            sessionId: getSessionId(),
            timestamp: new Date().toISOString(),
            messages: messages.map(msg => ({
                text: msg.text,
                isUser: msg.isUser,
                timestamp: msg.timestamp.toISOString()
            })),
            videoFile: currentFile ? {
                name: currentFile.name,
                size: currentFile.size,
                type: currentFile.type
            } : null
        };

        const blob = new Blob([JSON.stringify(chatData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `chat-history-${getSessionId()}.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

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
        hidden: { opacity: 0, y: 20 },
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
        <motion.main 
            ref={chatRef}
            className="chat-container relative w-full min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-indigo-100 overflow-hidden font-sans"
            variants={containerVariants}
            initial="hidden"
            animate={isChatInView ? "visible" : "hidden"}
        >
            <AnimatedBackground />
            
            {/* Enhanced Floating Elements */}
            <FloatingElements />

            {/* Additional Ambient Elements */}
            <motion.div
                className="absolute top-20 left-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"
                animate={{
                    x: [0, 100, 0],
                    y: [0, -50, 0],
                    scale: [1, 1.3, 1],
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.div
                className="absolute bottom-20 right-10 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl"
                animate={{
                    x: [0, -80, 0],
                    y: [0, 30, 0],
                    scale: [1, 0.8, 1],
                }}
                transition={{
                    duration: 22,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            <motion.div 
                className="relative w-full h-screen flex flex-col"
                variants={itemVariants}
            >
                {/* Enhanced Status Bar */}
                <motion.div 
                    ref={statusRef}
                    className="flex-shrink-0 px-3 sm:px-4 lg:px-6 py-3 sm:py-4 relative z-10"
                    initial={{ opacity: 0, y: -30 }}
                    animate={isStatusInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <motion.div 
                        className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 bg-white/70 backdrop-blur-xl rounded-2xl p-4 shadow-lg border border-white/20"
                        whileHover={{ 
                            scale: 1.01,
                            boxShadow: "0 8px 32px rgba(0,0,0,0.1)"
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex items-center gap-2 flex-wrap">
                            <StatusIndicator 
                                isOnline={isServerOnline}
                                label={isServerOnline ? 'Server Online' : 'Server Offline'}
                            />
                            <motion.div
                                className="w-px h-4 bg-gray-300"
                                initial={{ scaleY: 0 }}
                                animate={{ scaleY: 1 }}
                                transition={{ delay: 0.5 }}
                            />
                            <SessionDisplay sessionId={getSessionId()} />
                        </div>
                        
                        <motion.div 
                            className="flex gap-2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <AnimatePresence>
                                {messages.length > 1 && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8, x: 20 }}
                                        animate={{ opacity: 1, scale: 1, x: 0 }}
                                        exit={{ opacity: 0, scale: 0.8, x: 20 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <ActionButton
                                            onClick={exportChatHistory}
                                            variant="export"
                                            whileHover={{ 
                                                scale: 1.05,
                                                boxShadow: "0 4px 15px rgba(16, 185, 129, 0.3)"
                                            }}
                                        >
                                            📤 Export
                                        </ActionButton>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            
                            <ActionButton
                                onClick={resetSession}
                                variant="secondary"
                                whileHover={{ 
                                    scale: 1.05,
                                    boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
                                }}
                            >
                                🔄 New Session
                            </ActionButton>
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* Enhanced Main Content */}
                <motion.div 
                    ref={mainContentRef}
                    className="flex-1 px-3 sm:px-4 lg:px-6 pb-3 sm:pb-4 lg:pb-6 min-h-0 relative z-10"
                    initial={{ opacity: 0, y: 50 }}
                    animate={isMainContentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <motion.div 
                        className="flex flex-col lg:grid lg:grid-cols-12 gap-3 sm:gap-4 lg:gap-6 h-full"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {/* Enhanced Input Panel */}
                        <motion.div 
                            className="lg:col-span-5 h-full min-h-0 order-2 lg:order-1"
                            variants={itemVariants}
                            whileHover={{ scale: 1.01 }}
                            transition={{ duration: 0.3 }}
                        >
                            <motion.div
                                className="h-full bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 overflow-hidden"
                                animate={{
                                    boxShadow: [
                                        "0 8px 32px rgba(0,0,0,0.1)",
                                        "0 12px 40px rgba(59, 130, 246, 0.15)",
                                        "0 8px 32px rgba(0,0,0,0.1)"
                                    ]
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                <InputPanel
                                    onVideoUpload={handleVideoUpload}
                                    isProcessing={isProcessing}
                                    analysisResults={analysisResults}
                                    onReset={resetSession}
                                    currentFile={currentFile}
                                />
                            </motion.div>
                        </motion.div>

                        {/* Enhanced Chat Panel */}
                        <motion.div 
                            className="lg:col-span-7 h-full min-h-0 order-1 lg:order-2"
                            variants={itemVariants}
                            whileHover={{ scale: 1.01 }}
                            transition={{ duration: 0.3 }}
                        >
                            <motion.div
                                className="h-full bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 overflow-hidden"
                                animate={{
                                    boxShadow: [
                                        "0 8px 32px rgba(0,0,0,0.1)",
                                        "0 12px 40px rgba(79, 70, 229, 0.15)",
                                        "0 8px 32px rgba(0,0,0,0.1)"
                                    ]
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: 2
                                }}
                            >
                                <ChatPanel
                                    isVideoUploaded={isVideoUploaded}
                                    messages={messages}
                                    isBotLoading={isBotLoading}
                                    onSendMessage={handleSendMessage}
                                    sessionId={getSessionId()}
                                    isServerOnline={isServerOnline}
                                />
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Processing Overlay */}
            <AnimatePresence>
                {isProcessing && (
                    <motion.div
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-white/90 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/20 text-center"
                            initial={{ scale: 0.8, y: 50 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.8, y: 50 }}
                        >
                            <motion.div
                                className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
                                animate={{ rotate: 360 }}
                                transition={{
                                    duration: 1,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                            />
                            <motion.p
                                className="text-gray-700 font-medium"
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                Processing your video...
                            </motion.p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Bottom gradient fade */}
            <motion.div
                className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-100/50 to-transparent pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
            />
        </motion.main>
    );
};

export default Chat;
