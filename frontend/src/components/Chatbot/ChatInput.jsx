import React, { useState } from 'react';
import { SendIcon } from './Icons';

// Component for the user's chat input.
const ChatInput = ({ onSend, isLoading }) => {
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (input.trim() && !isLoading) {
            onSend(input);
            setInput('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="p-3 sm:p-4 border-t border-gray-200/80">
            <div className="relative">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask a follow-up question..."
                    className="w-full bg-gray-100/80 text-gray-800 placeholder-gray-500 rounded-full py-2.5 sm:py-3 lg:py-3.5 pl-4 sm:pl-5 lg:pl-6 pr-12 sm:pr-14 lg:pr-16 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-sm sm:text-base"
                    disabled={isLoading}
                />
                <button 
                    onClick={handleSend} 
                    disabled={isLoading || !input.trim()} 
                    className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-full p-2 sm:p-2.5 lg:p-3 transition-all duration-300 transform hover:scale-110 disabled:hover:scale-100"
                >
                    <SendIcon />
                </button>
            </div>
        </div>
    );
};

export default ChatInput;
