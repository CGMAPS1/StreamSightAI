import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// Custom SVG Icons for each feature card. They are designed to be sleek and modern.
const EventRecognitionIcon = () => (
    <svg className="w-12 h-12 mb-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01"></path>
    </svg>
);

const SummarizationIcon = () => (
    <svg className="w-12 h-12 mb-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
    </svg>
);

const ConversationalAiIcon = () => (
    <svg className="w-12 h-12 mb-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
    </svg>
);

// A reusable card component for displaying features.
const FeatureCard = ({ icon, title, children, index }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, threshold: 0.1 });

  return (
    <motion.div 
      ref={cardRef}
      className="group relative bg-gray-800/50 backdrop-blur-md p-8 rounded-2xl border border-gray-700/80 overflow-hidden transition-all duration-300 hover:border-cyan-400/50 hover:shadow-2xl hover:shadow-cyan-500/10 hover:-translate-y-2"
      initial={{ opacity: 0, y: 80, scale: 0.9 }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0, 
        scale: 1 
      } : {}}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.2,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{ 
        scale: 1.03,
        y: -8,
        boxShadow: "0 25px 50px -12px rgba(34, 211, 238, 0.25)",
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Enhanced glowing effect */}
      <motion.div 
        className="absolute top-0 right-0 h-32 w-32 bg-cyan-500/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0, 0.3, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          transform: "translate(50%, -50%)"
        }}
      />
      
      {/* Animated border glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
        animate={{
          background: [
            "linear-gradient(0deg, rgba(34, 211, 238, 0.1), transparent, rgba(34, 211, 238, 0.1))",
            "linear-gradient(90deg, rgba(34, 211, 238, 0.1), transparent, rgba(34, 211, 238, 0.1))",
            "linear-gradient(180deg, rgba(34, 211, 238, 0.1), transparent, rgba(34, 211, 238, 0.1))",
            "linear-gradient(270deg, rgba(34, 211, 238, 0.1), transparent, rgba(34, 211, 238, 0.1))",
            "linear-gradient(360deg, rgba(34, 211, 238, 0.1), transparent, rgba(34, 211, 238, 0.1))"
          ]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Icon with enhanced animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5, rotateY: -90 }}
        animate={isInView ? { 
          opacity: 1, 
          scale: 1, 
          rotateY: 0 
        } : {}}
        transition={{ 
          duration: 0.6, 
          delay: index * 0.2 + 0.3,
          ease: "backOut"
        }}
        whileHover={{ 
          scale: 1.1, 
          rotateY: 15,
          transition: { duration: 0.2 }
        }}
      >
        {icon}
      </motion.div>

      <motion.h3 
        className="text-xl font-bold text-white mb-3"
        initial={{ opacity: 0, x: -30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ 
          duration: 0.6, 
          delay: index * 0.2 + 0.5 
        }}
      >
        {title}
      </motion.h3>

      <motion.p 
        className="text-gray-400 leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ 
          duration: 0.6, 
          delay: index * 0.2 + 0.7 
        }}
      >
        {children}
      </motion.p>

      {/* Floating particles inside card */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        {Array.from({ length: 5 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/40 rounded-full"
            animate={{
              x: [
                Math.random() * 300,
                Math.random() * 300,
                Math.random() * 300
              ],
              y: [
                Math.random() * 200,
                Math.random() * 200,
                Math.random() * 200
              ],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.5, 1.5, 0.5]
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

// The main "Why StreamSight AI" component.
const WhyStreamSightAI = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const isSectionInView = useInView(sectionRef, { once: true, threshold: 0.1 });
  const isHeaderInView = useInView(headerRef, { once: true, threshold: 0.1 });

  // Floating background elements
  const backgroundElements = Array.from({ length: 12 }, (_, i) => (
    <motion.div
      key={i}
      className="absolute w-2 h-2 bg-cyan-400/10 rounded-full"
      initial={{
        x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
        y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
      }}
      animate={{
        x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
        y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
        scale: [0.5, 2, 0.5],
        opacity: [0.1, 0.6, 0.1],
      }}
      transition={{
        duration: Math.random() * 20 + 15,
        repeat: Infinity,
        ease: "easeInOut",
        delay: Math.random() * 5
      }}
    />
  ));

  return (
    <motion.section 
      ref={sectionRef}
      className="relative w-full bg-gray-900 py-20 lg:py-28 px-4 overflow-hidden"
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
          duration: 40,
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
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_800px_at_50%_200px,#1e3a8a33,transparent)]"
          animate={{
            background: [
              "radial-gradient(circle_800px_at_30%_200px,#1e3a8a33,transparent)",
              "radial-gradient(circle_800px_at_70%_200px,#1e3a8a33,transparent)",
              "radial-gradient(circle_800px_at_30%_200px,#1e3a8a33,transparent)"
            ]
          }}
          transition={{
            duration: 25,
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
        className="absolute top-40 left-20 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"
        animate={{
          x: [0, 150, 0],
          y: [0, -80, 0],
          scale: [1, 1.4, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-40 right-20 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"
        animate={{
          x: [0, -100, 0],
          y: [0, 60, 0],
          scale: [1, 0.7, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="container mx-auto max-w-6xl text-center relative z-10">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: -50 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.h2 
            className="text-4xl lg:text-5xl font-extrabold text-white mb-4 tracking-tighter relative"
            whileHover={{ scale: 1.02 }}
          >
            <motion.span
              className="bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent"
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
              The Future of Visual Understanding
            </motion.span>
            
            {/* Animated underline */}
            <motion.div
              className="absolute -bottom-2 left-1/2 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full"
              initial={{ width: 0, x: "-50%" }}
              animate={isHeaderInView ? { width: "60%", x: "-50%" } : {}}
              transition={{ delay: 0.8, duration: 1 }}
            />
          </motion.h2>

          <motion.p 
            className="text-lg text-gray-400 max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Static video players show you what happened. StreamSight AI tells you what it means. We go beyond playback to deliver a truly intelligent, interactive, and insightful visual analysis experience.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={isSectionInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <FeatureCard
            icon={<EventRecognitionIcon />}
            title="Automated Event Recognition"
            index={0}
          >
            Our AI meticulously scans every frame to identify and flag critical events automatically. From traffic violations to specific human actions, never miss a key moment again.
          </FeatureCard>
          <FeatureCard
            icon={<SummarizationIcon />}
            title="Intelligent Summarization"
            index={1}
          >
            Distill hours of footage into concise, readable summaries. StreamSight AI highlights the most important events, providing you with a clear overview in seconds.
          </FeatureCard>
          <FeatureCard
            icon={<ConversationalAiIcon />}
            title="Multi-Turn Conversations"
            index={2}
          >
            Engage with your video data. Ask follow-up questions, request details about specific events, and get coherent, context-aware answers from our agentic chat assistant.
          </FeatureCard>
        </motion.div>

        {/* Floating stats or indicators */}
        <motion.div
          className="mt-20 flex justify-center space-x-12"
          initial={{ opacity: 0, y: 50 }}
          animate={isSectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          {[
            { stat: "99.7%", label: "Detection Accuracy" },
            { stat: "<2s", label: "Processing Time" },
            { stat: "24/7", label: "AI Availability" }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="text-center opacity-60"
              animate={{ 
                y: [0, -8, 0],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{
                duration: 4,
                delay: index * 0.8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <motion.div 
                className="text-2xl font-bold text-cyan-400 mb-1"
                animate={{
                  textShadow: [
                    "0 0 5px rgba(34, 211, 238, 0.5)",
                    "0 0 15px rgba(34, 211, 238, 0.8)",
                    "0 0 5px rgba(34, 211, 238, 0.5)"
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {item.stat}
              </motion.div>
              <div className="text-sm text-gray-500">{item.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade effect */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-900 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      />
    </motion.section>
  );
};

export default WhyStreamSightAI;
