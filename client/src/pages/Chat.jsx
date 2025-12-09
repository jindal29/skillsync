import React, { useState, useEffect, useContext, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import api from '../utils/api';
import { Send, User } from 'lucide-react';

const Chat = () => {
    // Note: In a real app we would get the chat ID or receiver ID from URL
    // For simplicity, let's assume URL is /chat/:userId (receiver's ID)
    const { id: receiverId } = useParams();
    const { user } = useContext(AuthContext);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [receiver, setReceiver] = useState(null);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const { data } = await api.get(`/messages/${receiverId}`);
                setMessages(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchMessages();
        const interval = setInterval(fetchMessages, 3000);

        return () => clearInterval(interval);
    }, [receiverId]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        try {
            const { data } = await api.post(`/messages/${receiverId}`, {
                content: newMessage,
            });
            setMessages([...messages, data]);
            setNewMessage('');
        } catch (error) {
            console.error(error);
        }
    };

    const containerStyle = {
        maxWidth: '56rem', // max-w-4xl
        margin: '0 auto',
        padding: '2.5rem 1rem', // py-10 px-4
        height: 'calc(100vh - 80px)', // h-[calc(100vh-80px)]
    };

    const chatBoxStyle = {
        backgroundColor: 'white',
        borderRadius: '0.75rem',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        border: '1px solid #f3f4f6',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
    };

    const headerStyle = {
        padding: '1rem',
        borderBottom: '1px solid #f3f4f6',
        backgroundColor: '#f9fafb',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
    };

    const avatarStyle = {
        width: '2.5rem',
        height: '2.5rem',
        borderRadius: '50%',
        backgroundColor: '#eff6ff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#1d4ed8', // primary-700
        fontWeight: 'bold',
    };

    const messagesAreaStyle = {
        flex: 1,
        overflowY: 'auto',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        backgroundColor: 'rgba(249, 250, 251, 0.5)', // bg-gray-50/50
    };

    const formStyle = {
        padding: '1rem',
        backgroundColor: 'white',
        borderTop: '1px solid #f3f4f6',
        display: 'flex',
        gap: '0.5rem',
    };

    const inputStyle = {
        flex: 1,
        padding: '0.5rem 1rem',
        border: '1px solid #d1d5db',
        borderRadius: '9999px',
        outline: 'none',
        fontSize: '1rem',
    };

    const sendBtnStyle = {
        padding: '0.5rem',
        backgroundColor: '#2563eb',
        color: 'white',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
        opacity: !newMessage.trim() ? 0.5 : 1,
    };

    return (
        <div style={containerStyle}>
            <div style={chatBoxStyle}>
                {/* Header */}
                <div style={headerStyle}>
                    <div style={avatarStyle}>
                        <User size={20} />
                    </div>
                    <div>
                        <h2 style={{ fontWeight: 'bold', color: '#111827' }}>Chat</h2>
                        <p style={{ fontSize: '0.75rem', color: '#16a34a', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <span style={{ width: '0.5rem', height: '0.5rem', backgroundColor: '#22c55e', borderRadius: '50%' }}></span> Online
                        </p>
                    </div>
                </div>

                {/* Messages */}
                <div style={messagesAreaStyle}>
                    {messages.map((msg) => {
                        const isMe = msg.sender === user._id;
                        const bubbleStyle = {
                            maxWidth: '70%',
                            padding: '0.5rem 1rem',
                            borderRadius: '1rem',
                            fontSize: '0.875rem',
                            backgroundColor: isMe ? '#2563eb' : 'white', // primary-600 : white
                            color: isMe ? 'white' : '#1f2937', // white : gray-800
                            border: isMe ? 'none' : '1px solid #f3f4f6',
                            borderBottomRightRadius: isMe ? 0 : '1rem',
                            borderBottomLeftRadius: isMe ? '1rem' : 0,
                            boxShadow: isMe ? 'none' : '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                        };

                        return (
                            <div
                                key={msg._id}
                                style={{ display: 'flex', justifyContent: isMe ? 'flex-end' : 'flex-start' }}
                            >
                                <div style={bubbleStyle}>
                                    {msg.content}
                                    <div style={{ fontSize: '0.625rem', marginTop: '0.25rem', color: isMe ? '#bfdbfe' : '#9ca3af', textAlign: 'right' }}>
                                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <form onSubmit={handleSend} style={formStyle}>
                    <input
                        type="text"
                        style={inputStyle}
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button
                        type="submit"
                        disabled={!newMessage.trim()}
                        style={sendBtnStyle}
                    >
                        <Send size={20} />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Chat;
