import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import AuthContext from '../context/AuthContext';
import Button from '../components/Button';
import { Star, MessageSquare, CheckCircle, ChevronLeft } from 'lucide-react';

const SkillDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [skill, setSkill] = useState(null);
    const [loading, setLoading] = useState(true);
    const [bookingModalOpen, setBookingModalOpen] = useState(false);
    const [bookingDate, setBookingDate] = useState('');
    const [bookingMessage, setBookingMessage] = useState('');
    const [bookingLoading, setBookingLoading] = useState(false);

    useEffect(() => {
        const fetchSkill = async () => {
            try {
                const { data } = await api.get(`/skills/${id}`);
                setSkill(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchSkill();
    }, [id]);

    const handleBooking = async (e) => {
        e.preventDefault();
        setBookingLoading(true);
        try {
            await api.post('/bookings', {
                trainerId: skill.trainer._id,
                skillId: skill._id,
                date: bookingDate,
                message: bookingMessage
            });
            alert('Booking Request Sent!');
            setBookingModalOpen(false);
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
            alert('Failed to book session');
        } finally {
            setBookingLoading(false);
        }
    };

    if (loading) return <div style={{ textAlign: 'center', padding: '5rem 0' }}>Loading...</div>;
    if (!skill) return <div style={{ textAlign: 'center', padding: '5rem 0' }}>Skill not found</div>;

    const containerStyle = {
        maxWidth: '80rem',
        margin: '0 auto',
        padding: '2.5rem 1rem',
    };

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', // responsive
        gap: '2rem',
    };

    const mainContentStyle = {
        gridColumn: 'span 2', // assuming 3 col grid but simplified here
    };

    // Card common style
    const cardStyle = {
        backgroundColor: 'white',
        borderRadius: '1rem',
        padding: '2rem',
        border: '1px solid #f3f4f6',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        marginBottom: '2rem'
    };

    const badgeStyle = {
        padding: '0.25rem 0.75rem',
        backgroundColor: '#eff6ff',
        color: '#1d4ed8',
        fontSize: '0.75rem',
        fontWeight: '600',
        borderRadius: '9999px',
        textTransform: 'uppercase',
    };

    const modalOverlayStyle = {
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(4px)',
    };

    const modalStyle = {
        backgroundColor: 'white',
        borderRadius: '1rem',
        maxWidth: '28rem',
        width: '100%',
        padding: '1.5rem',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    };

    return (
        <div style={containerStyle}>
            <button
                onClick={() => navigate(-1)}
                style={{ display: 'flex', alignItems: 'center', color: '#4b5563', marginBottom: '1.5rem', border: 'none', background: 'none', cursor: 'pointer' }}
            >
                <ChevronLeft size={16} style={{ marginRight: '0.25rem' }} /> Back
            </button>

            <div style={gridStyle}>
                {/* Main Content */}
                <div style={{ minWidth: 0 }}>
                    <div style={cardStyle}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                            <span style={badgeStyle}>
                                {skill.category}
                            </span>
                        </div>
                        <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem' }}>{skill.title}</h1>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', color: '#4b5563', marginBottom: '2rem', paddingBottom: '2rem', borderBottom: '1px solid #f3f4f6' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Star size={20} fill="#facc15" color="#facc15" />
                                <span style={{ fontWeight: '500', color: '#111827' }}>{skill.rating ? skill.rating.toFixed(1) : 'New'}</span>
                                <span>({skill.numReviews} reviews)</span>
                            </div>
                        </div>

                        <div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem' }}>About this skill</h3>
                            <p style={{ whiteSpace: 'pre-wrap', lineHeight: 1.625, color: '#4b5563' }}>{skill.description}</p>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {/* Price Card */}
                    <div style={{ ...cardStyle, position: 'sticky', top: '6rem', marginBottom: 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
                            <div>
                                <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Price per session</p>
                                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
                                    <span style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827' }}>₹{skill.price}</span>
                                </div>
                            </div>
                        </div>

                        {user && user._id !== skill.trainer._id ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                <Button
                                    style={{ width: '100%', padding: '0.75rem', fontSize: '1.125rem' }}
                                    onClick={() => setBookingModalOpen(true)}
                                >
                                    Book Session
                                </Button>
                                <Button
                                    style={{ width: '100%', padding: '0.75rem', fontSize: '1.125rem' }}
                                    variant="secondary"
                                    onClick={() => navigate(`/chat/${skill.trainer._id}`)}
                                >
                                    Message Trainer
                                </Button>
                            </div>
                        ) : user && user._id === skill.trainer._id ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                <Button
                                    style={{ width: '100%', padding: '0.75rem', fontSize: '1.125rem' }}
                                    variant="secondary"
                                    onClick={() => navigate('/dashboard')}
                                >
                                    My Dashboard
                                </Button>
                                <Button
                                    style={{ width: '100%', padding: '0.75rem', fontSize: '1.125rem', backgroundColor: '#ef4444', color: 'white', border: 'none' }}
                                    onClick={async () => {
                                        if (window.confirm('Are you sure you want to delete this skill?')) {
                                            try {
                                                await api.delete(`/skills/${skill._id}`);
                                                navigate('/dashboard');
                                            } catch (err) {
                                                console.error(err);
                                                alert('Failed to delete skill');
                                            }
                                        }
                                    }}
                                >
                                    Delete Skill
                                </Button>
                            </div>
                        ) : (
                            <Button
                                style={{ width: '100%', padding: '0.75rem', fontSize: '1.125rem' }}
                                onClick={() => navigate('/login')}
                            >
                                Login to Book
                            </Button>
                        )}

                        <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid #f3f4f6', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <div style={{ display: 'flex', alignItems: 'start', gap: '0.75rem' }}>
                                <CheckCircle size={20} color="#22c55e" style={{ marginTop: '0.125rem' }} />
                                <p style={{ fontSize: '0.875rem', color: '#4b5563' }}>100% Satisfaction Guarantee</p>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'start', gap: '0.75rem' }}>
                                <MessageSquare size={20} color="#3b82f6" style={{ marginTop: '0.125rem' }} />
                                <p style={{ fontSize: '0.875rem', color: '#4b5563' }}>Direct chat with trainer after booking</p>
                            </div>
                        </div>
                    </div>

                    {/* Trainer Card */}
                    <div style={cardStyle}>
                        <h3 style={{ fontWeight: 'bold', color: '#111827', marginBottom: '1rem' }}>About the Trainer</h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                            <div style={{ width: '3rem', height: '3rem', borderRadius: '50%', backgroundColor: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1d4ed8', fontWeight: 'bold', fontSize: '1.25rem' }}>
                                {skill.trainer.name.charAt(0)}
                            </div>
                            <div>
                                <p style={{ fontWeight: '500', color: '#111827' }}>{skill.trainer.name}</p>
                                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>{skill.trainer.headline || 'SkillSync Trainer'}</p>
                            </div>
                        </div>
                        <p style={{ fontSize: '0.875rem', color: '#4b5563', display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            {skill.trainer.bio || 'No bio available.'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Booking Modal */}
            {bookingModalOpen && (
                <div style={modalOverlayStyle}>
                    <div style={modalStyle}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem' }}>Book a Session</h2>
                        <form onSubmit={handleBooking} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>Select Date</label>
                                <input
                                    type="date"
                                    required
                                    style={{ display: 'block', width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', outline: 'none' }}
                                    value={bookingDate}
                                    onChange={(e) => setBookingDate(e.target.value)}
                                    min={new Date().toISOString().split('T')[0]}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>Message to Trainer</label>
                                <textarea
                                    rows={3}
                                    style={{ display: 'block', width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', outline: 'none' }}
                                    placeholder="Hi, I'm interested in learning..."
                                    value={bookingMessage}
                                    onChange={(e) => setBookingMessage(e.target.value)}
                                />
                            </div>
                            <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '1rem' }}>
                                <Button type="button" variant="secondary" onClick={() => setBookingModalOpen(false)} style={{ flex: 1 }}>
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={bookingLoading} style={{ flex: 1 }}>
                                    {bookingLoading ? 'Confirming...' : 'Confirm Booking'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SkillDetails;
