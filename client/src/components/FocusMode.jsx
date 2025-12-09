import React, { useState, useEffect } from 'react';
import Button from './Button';
import { Play, Pause, RotateCcw, Coffee, Zap } from 'lucide-react';

const FocusMode = () => {
    const WORK_TIME = 25 * 60;
    const BREAK_TIME = 5 * 60;

    const [timeLeft, setTimeLeft] = useState(WORK_TIME);
    const [isActive, setIsActive] = useState(false);
    const [mode, setMode] = useState('work'); // 'work' or 'break'

    useEffect(() => {
        let interval = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((timeLeft) => timeLeft - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            // Timer finished
            setIsActive(false);
            const audio = new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg');
            audio.play().catch(e => console.log('Audio play failed', e)); // Simple beep if allowed

            // Switch modes automatically or wait for user? Let's wait for user to start next phase
            if (mode === 'work') {
                setMode('break');
                setTimeLeft(BREAK_TIME);
            } else {
                setMode('work');
                setTimeLeft(WORK_TIME);
            }
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft, mode]);

    const toggleTimer = () => setIsActive(!isActive);

    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(mode === 'work' ? WORK_TIME : BREAK_TIME);
    };

    const switchMode = (newMode) => {
        setMode(newMode);
        setIsActive(false);
        setTimeLeft(newMode === 'work' ? WORK_TIME : BREAK_TIME);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const containerStyle = {
        backgroundColor: 'white',
        borderRadius: '0.75rem',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        border: '1px solid #f3f4f6',
        padding: '1.5rem',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    };

    const timerStyle = {
        fontSize: '4rem',
        fontWeight: '700',
        fontVariantNumeric: 'tabular-nums',
        color: mode === 'work' ? '#2563eb' : '#059669',
        margin: '1rem 0',
    };

    return (
        <div style={containerStyle}>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', backgroundColor: '#f3f4f6', padding: '0.25rem', borderRadius: '0.5rem' }}>
                <button
                    onClick={() => switchMode('work')}
                    style={{
                        padding: '0.5rem 1rem',
                        borderRadius: '0.375rem',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        backgroundColor: mode === 'work' ? 'white' : 'transparent',
                        color: mode === 'work' ? '#2563eb' : '#6b7280',
                        boxShadow: mode === 'work' ? '0 1px 2px 0 rgba(0,0,0,0.05)' : 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        cursor: 'pointer'
                    }}
                >
                    <Zap size={16} /> Focus
                </button>
                <button
                    onClick={() => switchMode('break')}
                    style={{
                        padding: '0.5rem 1rem',
                        borderRadius: '0.375rem',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        backgroundColor: mode === 'break' ? 'white' : 'transparent',
                        color: mode === 'break' ? '#059669' : '#6b7280',
                        boxShadow: mode === 'break' ? '0 1px 2px 0 rgba(0,0,0,0.05)' : 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        cursor: 'pointer'
                    }}
                >
                    <Coffee size={16} /> Break
                </button>
            </div>

            <div style={timerStyle}>
                {formatTime(timeLeft)}
            </div>

            <p style={{ color: '#6b7280', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
                {mode === 'work' ? 'Stay focused on your task' : 'Take a short break to recharge'}
            </p>

            <div style={{ display: 'flex', gap: '1rem' }}>
                <Button
                    onClick={toggleTimer}
                    style={{
                        width: '3.5rem',
                        height: '3.5rem',
                        borderRadius: '50%',
                        padding: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.25rem'
                    }}
                >
                    {isActive ? <Pause fill="currentColor" /> : <Play fill="currentColor" style={{ marginLeft: '4px' }} />}
                </Button>

                <Button
                    variant="secondary"
                    onClick={resetTimer}
                    style={{
                        width: '3.5rem',
                        height: '3.5rem',
                        borderRadius: '50%',
                        padding: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#6b7280'
                    }}
                >
                    <RotateCcw size={20} />
                </Button>
            </div>
        </div>
    );
};

export default FocusMode;
