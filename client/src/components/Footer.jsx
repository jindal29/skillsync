import React from 'react';
import { Rocket, Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
    const footerStyle = {
        backgroundColor: 'white',
        borderTop: '1px solid #f3f4f6',
        padding: '3rem 0',
    };

    const containerStyle = {
        maxWidth: '80rem',
        margin: '0 auto',
        padding: '0 1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2rem',
    };

    const iconContainerStyle = {
        display: 'flex',
        gap: '1.5rem',
    };

    const iconStyle = {
        color: '#9ca3af', // gray-400
        cursor: 'pointer',
    };

    return (
        <footer style={footerStyle}>
            <div style={containerStyle}>
                <div style={iconContainerStyle}>
                    <a href="#" style={iconStyle}><Github size={24} /></a>
                    <a href="#" style={iconStyle}><Twitter size={24} /></a>
                    <a href="#" style={iconStyle}><Linkedin size={24} /></a>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <Rocket size={24} color="#2563eb" />
                        <span style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#111827' }}>SkillSync</span>
                    </div>
                    <p style={{ color: '#6b7280', fontSize: '1rem' }}>
                        &copy; {new Date().getFullYear()} SkillSync, Inc. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
