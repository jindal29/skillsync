import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import Button from '../components/Button';
import Input from '../components/Input';
import { AlertCircle } from 'lucide-react';
import AuthBg from '../assets/auth-bg.png';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login, user } = useContext(AuthContext);
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
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.msg || err.message || 'Failed to login');
        } finally {
            setLoading(false);
        }
    };

    // ... in Login component ...

    const pageContainerStyle = {
        minHeight: 'calc(100vh - 64px)', // full height minus nav
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
        // background handled by class
    };

    const headerStyle = {
        textAlign: 'center',
        marginBottom: '2rem',
    };

    const errorBoxStyle = {
        backgroundColor: '#fef2f2',
        borderLeft: '4px solid #ef4444',
        padding: '1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        marginBottom: '1.5rem',
    };

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
    };

    return (
        <div style={pageContainerStyle}>
            <div style={cardStyle} className="auth-glass">
                <div style={headerStyle}>
                    <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827' }}>Welcome Back</h2>
                    <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#4b5563' }}>
                        Sign in to your account
                    </p>
                </div>

                {error && (
                    <div style={errorBoxStyle}>
                        <AlertCircle size={20} color="#ef4444" />
                        <p style={{ fontSize: '0.875rem', color: '#b91c1c' }}>{error}</p>
                    </div>
                )}

                <form style={formStyle} onSubmit={handleSubmit}>
                    <div>
                        <Input
                            label="Email Address"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            required
                        />
                        <Input
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            style={{ marginTop: '1rem' }}
                            required
                        />
                    </div>

                    <Button type="submit" style={{ width: '100%' }} disabled={loading}>
                        {loading ? 'Signing in...' : 'Sign in'}
                    </Button>

                    <div style={{ textAlign: 'center', fontSize: '0.875rem' }}>
                        <p style={{ color: '#4b5563' }}>
                            Don't have an account?{' '}
                            <Link to="/signup" style={{ fontWeight: '500', color: '#2563eb' }}>
                                Sign up
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
