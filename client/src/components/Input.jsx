import React from 'react';

const Input = ({ label, type = 'text', style = {}, error, ...props }) => {
    const containerStyle = {
        width: '100%',
        marginBottom: '1rem',
    };

    const labelStyle = {
        display: 'block',
        fontSize: '0.875rem',
        fontWeight: '500',
        color: '#374151', // gray-700
        marginBottom: '0.25rem',
    };

    const inputStyle = {
        display: 'block',
        width: '100%',
        padding: '0.5rem 0.75rem',
        fontSize: '0.875rem',
        lineHeight: '1.25rem',
        borderRadius: '0.375rem',
        border: error ? '1px solid #ef4444' : '1px solid #d1d5db', // red-500 or gray-300
        outline: 'none',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        transition: 'border-color 0.2s',
    };

    const errorStyle = {
        marginTop: '0.25rem',
        fontSize: '0.875rem',
        color: '#dc2626', // red-600
    };

    return (
        <div style={containerStyle}>
            {label && <label style={labelStyle}>{label}</label>}
            <input
                type={type}
                style={{ ...inputStyle, ...style }}
                {...props}
            />
            {error && <p style={errorStyle}>{error}</p>}
        </div>
    );
};

export default Input;
