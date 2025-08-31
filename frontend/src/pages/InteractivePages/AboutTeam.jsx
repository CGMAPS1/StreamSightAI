import React from 'react';

// LinkedIn Icon Component
const LinkedInIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.769c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.769h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
);

// Email Icon Component
const EmailIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 12.713L.015 3.458A.503.503 0 01.5 3h23a.503.503 0 01.485.458L12 12.713zM24 19.5a.5.5 0 01-.5.5h-23a.5.5 0 01-.5-.5V5.241l11.5 9.033 11.5-9.033V19.5z"/>
    </svg>
);

// GitHub Icon Component
const GitHubIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
);

// Team member data with image placeholders
const teamMembers = [
    {
        id: 1,
        name: "Kunal Verma",
        role: "Lead Developer",
        linkedin: "https://linkedin.com/in/kunalverma",
        email: "kunal@streamsight.ai",
        github: "https://github.com/kunalverma2512",
        image: "https://images.unsplash.com/photo-1570295999919-56ceb5e5c461?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTQwNDV8MHwxfHNlYXJjaHwxNXx8cG9ydHJhaXQlMjBvZiUyMG1hbiUyMHdlYXJpbmclMjBnbGFzc2VzfGVufDB8fHx8MTcwOTk1OTc1Nnww&ixlib=rb-4.0.3&q=80&w=400"
    },
    {
        id: 2,
        name: "Hardik Sirohiya",
        role: "Backend Engineer",
        linkedin: "https://linkedin.com/in/hardiksirohiya",
        email: "hardik@streamsight.ai",
        github: "https://github.com/hardiksirohiya",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTQwNDV8MHwxfHNlYXJjaHwxNHx8cG9ydHJhaXQlMjBvZiUyMG1hbiUyMHdlYXJpbmclMjBnbGFzc2VzfGVufDB8fHx8MTcwOTk1OTc1Nnww&ixlib=rb-4.0.3&q=80&w=400"
    },
    {
        id: 3,
        name: "Laaksh Parikh",
        role: "Frontend Developer",
        linkedin: "https://linkedin.com/in/laakshparikh",
        email: "laaksh@streamsight.ai",
        github: "https://github.com/laakshparikh",
        image: "https://images.unsplash.com/photo-1544723795-3fb6469f5b8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTQwNDV8MHwxfHNlYXJjaHwyMHx8cG9ydHJhaXQlMjBvZiUyMG1hbiUyMHdlYXJpbmclMjBnbGFzc2VzfGVufDB8fHx8MTcwOTk1OTc1Nnww&ixlib=rb-4.0.3&q=80&w=400"
    },
    {
        id: 4,
        name: "Aditya Pratap Singh",
        role: "AI Engineer",
        linkedin: "https://linkedin.com/in/adityapratapsingh",
        email: "aditya@streamsight.ai",
        github: "https://github.com/adityapratapsingh",
        image: "https://images.unsplash.com/photo-1549068106-b024baf5062d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTQwNDV8MHwxfHNlYXJjaHw0fHxwb3J0cmFpdCUyMG9mJTIwbWFuJTIwd2VhcmluZyUyMGdsYXNzZXN8ZW58MHx8fHwxNzA5OTU5NzU2fDA&ixlib=rb-4.0.3&q=80&w=400"
    },
    {
        id: 5,
        name: "Hemant Pathak",
        role: "DevOps Engineer",
        linkedin: "https://linkedin.com/in/hemantpathak",
        email: "hemant@streamsight.ai",
        github: "https://github.com/hemantpathak",
        image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTQwNDV8MHwxfHNlYXJjaHwxOXx8cG9ydHJhaXQlMjBvZiUyMG1hbiUyMHdlYXJpbmclMjBnbGFzc2VzfGVufDB8fHx8MTcwOTk1OTc1Nnww&ixlib=rb-4.0.3&q=80&w=400"
    }
];

// Individual Team Member Card Component
const TeamMemberCard = ({ member }) => (
    <div className="group relative bg-white/60 backdrop-blur-sm rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
        
        {/* Avatar Image */}
        <div className="relative mb-4">
            <img
                src={member.image}
                alt={`${member.name}'s profile`}
                className="w-24 h-24 mx-auto rounded-full object-cover border-4 border-white shadow-md transition-transform duration-300 group-hover:scale-105"
            />
        </div>

        {/* Content */}
        <div className="text-center relative z-10">
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
                {member.name}
            </h3>
            <p className="text-md font-medium text-purple-600 mb-4">
                {member.role}
            </p>

            {/* Social Links */}
            <div className="flex justify-center space-x-3 mt-auto pt-4 border-t border-gray-100">
                <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-400 hover:text-blue-500 transition-colors duration-300 transform hover:scale-110"
                    aria-label={`${member.name}'s LinkedIn`}
                >
                    <LinkedInIcon />
                </a>
                <a
                    href={`mailto:${member.email}`}
                    className="p-2 text-gray-400 hover:text-green-500 transition-colors duration-300 transform hover:scale-110"
                    aria-label={`Email ${member.name}`}
                >
                    <EmailIcon />
                </a>
                {member.github && (
                    <a
                        href={member.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-gray-400 hover:text-gray-800 transition-colors duration-300 transform hover:scale-110"
                        aria-label={`${member.name}'s GitHub`}
                    >
                        <GitHubIcon />
                    </a>
                )}
            </div>
        </div>
    </div>
);

// Main About Team Component
const AboutTeam = () => {
    return (
        <div className="min-h-screen bg-white">
            <div className="relative z-10">
                {/* Header Section */}
                <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
                    <div className="max-w-7xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4">
                            Meet Our {' '}
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
                                Team
                            </span>
                        </h1>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            We're a dedicated group of innovators and engineers, united by a passion for creating impactful solutions.
                        </p>
                    </div>
                </div>

                {/* Team Grid */}
                <div className="py-16 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                            {teamMembers.map((member) => (
                                <TeamMemberCard key={member.id} member={member} />
                            ))}
                            
                            {/* Join Us Card */}
                            <div className="group flex flex-col justify-center items-center text-center bg-gray-50/60 backdrop-blur-sm rounded-3xl p-6 shadow-inner hover:shadow-lg transition-all duration-500 transform hover:-translate-y-2 border-2 border-dashed border-gray-200">
                                <div className="text-center">
                                    <div className="w-20 h-20 mx-auto bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-3xl font-light mb-4 transition-colors group-hover:bg-gray-300">
                                        +
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-700 mb-2">
                                        Join Our Team
                                    </h3>
                                    <p className="text-gray-600 text-sm leading-relaxed mb-6">
                                        We're always looking for talented individuals.
                                    </p>
                                    <a
                                        href="mailto:careers@streamsight.ai"
                                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg transform hover:scale-105"
                                    >
                                        Get In Touch
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutTeam;