
import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { sendMessageToGemini } from '../services/geminiService';

const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            role: 'model',
            parts: [{ text: "Hello! I'm Lavine's AI assistant. How can I help you learn about her skills and services today?" }]
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: Message = { role: 'user', parts: [{ text: input }] };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const responseText = await sendMessageToGemini(input);
            const modelMessage: Message = { role: 'model', parts: [{ text: responseText }] };
            setMessages(prev => [...prev, modelMessage]);
        } catch (error) {
            const errorMessage: Message = { role: 'model', parts: [{ text: "I'm sorry, something went wrong. Please try again." }] };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="fixed bottom-6 right-6 z-50">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-transform transform hover:scale-110"
                    aria-label="Open chat"
                >
                    {isOpen ? (
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                    )}
                </button>
            </div>

            <div
                className={`fixed bottom-24 right-6 z-40 w-[90vw] max-w-md h-[70vh] max-h-[600px] bg-white rounded-lg shadow-2xl flex flex-col transition-all duration-300 ease-in-out border border-slate-200 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
                    }`}
            >
                <header className="bg-slate-800 p-4 rounded-t-lg">
                    <h2 className="text-xl font-bold text-white">AI Assistant</h2>
                    <p className="text-sm text-slate-300">Powered by Gemini</p>
                </header>
                <main className="flex-1 p-4 overflow-y-auto bg-slate-50">
                    <div className="space-y-4">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div
                                    className={`max-w-xs md:max-w-sm lg:max-w-md px-4 py-2 rounded-xl shadow-sm ${msg.role === 'user' ? 'bg-indigo-100 text-indigo-900 rounded-br-none' : 'bg-slate-200 text-slate-800 rounded-bl-none'
                                        }`}
                                >
                                    {msg.parts.map((part, i) => <p key={i} className="whitespace-pre-wrap">{part.text}</p>)}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="px-4 py-2 rounded-xl bg-slate-200 rounded-bl-none">
                                    <div className="flex items-center space-x-2">
                                        <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></span>
                                        <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse delay-75"></span>
                                        <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse delay-150"></span>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </main>
                <footer className="p-2 border-t border-slate-200 bg-white rounded-b-lg">
                    <form onSubmit={handleSendMessage} className="flex items-center">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask a question..."
                            className="flex-1 px-4 py-2 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            className="ml-2 p-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 disabled:bg-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            disabled={isLoading}
                            aria-label="Send message"
                        >
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                        </button>
                    </form>
                </footer>
            </div>
        </>
    );
};

export default Chatbot;
