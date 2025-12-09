import React from 'react';

const Button = ({ children, variant = 'primary', style = {}, ...props }) => {
    const baseStyles = {
        padding: '10px 16px',
        borderRadius: '8px',
        fontWeight: '500',
        transition: 'all 0.2s ease',
        outline: 'none',
        cursor: 'pointer',
        border: 'none',
        fontSize: '1rem',
    };

    const variants = {
        primary: {
            background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)', // Pink-500 to Purple-500
            color: 'white',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2)',
            border: 'none',
        },
        secondary: {
            backgroundColor: 'white',
            color: '#374151', // gray-700
            border: '1px solid #d1d5db', // gray-300
        },
        danger: {
            backgroundColor: '#dc2626', // red-600
            color: 'white',
        },
        ghost: {
            backgroundColor: 'transparent',
            color: '#4b5563', // gray-600
        },
        outline: {
            backgroundColor: 'transparent',
            border: '1px solid #d1d5db',
            color: '#374151',
        }
    };

    // Merge base styles with variant styles
    const combinedStyles = {
        ...baseStyles,
        ...(variants[variant] || variants.primary),
        ...style, // Allow overriding via style prop
        ...(props.disabled ? { opacity: 0.5, cursor: 'not-allowed' } : {}),
    };

    return (
        <button style={combinedStyles} {...props}>
            {children}
        </button>
    );
};

export default Button;
