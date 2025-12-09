import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import Button from '../components/Button';
import Input from '../components/Input';
import { AlertCircle } from 'lucide-react';
import AuthBg from '../assets/auth-bg.png';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { signup, user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await signup(name, email, password, role);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.msg || 'Failed to sign up');
        } finally {
            setLoading(false);
        }
    };

    // ... inside component ...

    const pageContainerStyle = {
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `url(${AuthBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '3rem 1rem',
    };

    const cardStyle = {
        maxWidth: '28rem',
        width: '100%',
        padding: '2.5rem',
        borderRadius: '1.5rem',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    };

    const roleBtnStyle = (selected) => ({
        padding: '0.5rem 1rem',
        fontSize: '0.875rem',
        fontWeight: '500',
        borderRadius: '0.5rem',
        border: selected ? '1px solid #3b82f6' : '1px solid #d1d5db',
        backgroundColor: selected ? '#eff6ff' : 'white',
        color: selected ? '#1d4ed8' : '#374151',
        cursor: 'pointer',
        width: '100%',
        transition: 'all 0.2s',
    });

    return (
        <div style={pageContainerStyle}>
            <div style={cardStyle} className="auth-glass">
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827' }}>Create Account</h2>
                    <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#4b5563' }}>
                        Join SkillSync today
                    </p>
                </div>

                {error && (
                    <div style={{
                        backgroundColor: '#fef2f2',
                        borderLeft: '4px solid #ef4444',
                        padding: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginBottom: '1.5rem'
                    }}>
                        <AlertCircle size={20} color="#ef4444" />
                        <p style={{ fontSize: '0.875rem', color: '#b91c1c' }}>{error}</p>
                    </div>
                )}

                <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} onSubmit={handleSubmit}>
                    <div>
                        <Input
                            label="Full Name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="John Doe"
                            required
                        />
                        <div style={{ marginTop: '1rem' }}>
                            <Input
                                label="Email Address"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                required
                            />
                        </div>
                        <div style={{ marginTop: '1rem' }}>
                            <Input
                                label="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <div style={{ width: '100%', marginTop: '1rem' }}>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>
                                I want to be a
                            </label>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <button
                                    type="button"
                                    onClick={() => setRole('student')}
                                    style={roleBtnStyle(role === 'student')}
                                >
                                    Student
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setRole('trainer')}
                                    style={roleBtnStyle(role === 'trainer')}
                                >
                                    Trainer
                                </button>
                            </div>
                        </div>
                    </div>

                    <Button type="submit" style={{ width: '100%' }} disabled={loading}>
                        {loading ? 'Creating Account...' : 'Sign up'}
                    </Button>

                    <div style={{ textAlign: 'center', fontSize: '0.875rem' }}>
                        <p style={{ color: '#4b5563' }}>
                            Already have an account?{' '}
                            <Link to="/login" style={{ fontWeight: '500', color: '#2563eb' }}>
                                Log in
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
