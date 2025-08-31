import React, { useEffect, useRef } from 'react';
import { BotIcon, UserIcon, ErrorIcon } from './Icons';

const MessageTime = ({ timestamp }) => {
  const formatTime = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(date);
  };

  return (
    <span className="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
      {formatTime(timestamp)}
    </span>
  );
};

const ChatHistory = ({ messages, isLoading }) => {
    const chatContainerRef = useRef(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            requestAnimationFrame(() => {
                if (chatContainerRef.current) {
                    chatContainerRef.current.scrollTo({
                        top: chatContainerRef.current.scrollHeight,
                        behavior: 'smooth'
                    });
                }
            });
        }
    }, [messages, isLoading]);

    const copyToClipboard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            console.log('Message copied to clipboard');
        } catch (err) {
            console.error('Failed to copy message:', err);
        }
    };

    return (
        <div 
            ref={chatContainerRef}
            className="flex-1 p-3 sm:p-4 lg:p-6 space-y-3 sm:space-y-4 lg:space-y-6 overflow-y-auto scrollbar-thin"
        >
            {messages.map((msg, index) => (
                <div 
                    key={index} 
                    className={`group flex items-start gap-2 sm:gap-3 lg:gap-3.5 ${msg.isUser ? 'justify-end' : ''}`}
                >
                    {!msg.isUser && (
                        <div className="flex-shrink-0">
                            {msg.isError ? <ErrorIcon /> : <BotIcon />}
                        </div>
                    )}
                    <div className={`max-w-[85%] sm:max-w-[75%] lg:max-w-xl p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-md relative ${
                        msg.isUser 
                            ? 'bg-blue-600 text-white rounded-br-none' 
                            : msg.isError
                                ? 'bg-red-100 text-red-800 border border-red-200 rounded-bl-none'
                                : 'bg-gray-200/60 text-gray-800 rounded-bl-none'
                    }`}>
                        <p className="whitespace-pre-wrap text-xs sm:text-sm leading-relaxed mb-1 sm:mb-2">
                            {msg.text}
                        </p>
                        <div className="flex items-center justify-between">
                            {msg.timestamp && <MessageTime timestamp={msg.timestamp} />}
                            {!msg.isUser && (
                                <button
                                    onClick={() => copyToClipboard(msg.text)}
                                    className="opacity-0 group-hover:opacity-100 transition-opacity text-xs px-2 py-1 rounded hover:bg-gray-300/50"
                                    title="Copy message"
                                >
                                    📋
                                </button>
                            )}
                        </div>
                    </div>
                    {msg.isUser && (
                        <div className="flex-shrink-0">
                            <UserIcon />
                        </div>
                    )}
                </div>
            ))}
            {isLoading && (
                <div className="flex items-start gap-2 sm:gap-3 lg:gap-3.5">
                    <BotIcon />
                    <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gray-200/60 rounded-bl-none">
                        <div className="flex items-center space-x-1.5">
                            <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></span>
                            <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></span>
                            <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatHistory;
