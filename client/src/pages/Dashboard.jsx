import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import api from '../utils/api';
import Button from '../components/Button';
import { Plus, Calendar, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import TaskManager from '../components/TaskManager';
import FocusMode from '../components/FocusMode';
import Notes from '../components/Notes';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const { data } = await api.get(`/bookings?role=${user.role}&pageNumber=${page}`);
                setBookings(data.bookings);
                setPages(data.pages);
                setPage(data.page);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [user, user.role, page]);

    // Inline Styles (keeping consistent with refactor)
    const containerStyle = {
        maxWidth: '80rem',
        margin: '0 auto',
        padding: '2.5rem 1rem',
    };

    const headerStyle = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        gap: '1rem',
    };

    const statsGridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2.5rem',
    };

    const statCardStyle = {
        backgroundColor: 'white',
        padding: '1.5rem',
        borderRadius: '0.75rem',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        border: '1px solid #f3f4f6',
    };

    const tableContainerStyle = {
        backgroundColor: 'white',
        borderRadius: '0.75rem',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        border: '1px solid #f3f4f6',
        overflow: 'hidden',
    };

    const thStyle = {
        padding: '1rem 1.5rem',
        textAlign: 'left',
        fontSize: '0.75rem',
        fontWeight: '600',
        textTransform: 'uppercase',
        color: '#6b7280',
        backgroundColor: '#f9fafb',
    };

    const tdStyle = {
        padding: '1rem 1.5rem',
        borderTop: '1px solid #f3f4f6',
        color: '#4b5563',
    };

    const badgeStyle = (status) => {
        let bg = '#f3f4f6';
        let color = '#1f2937';
        if (status === 'confirmed') { bg = '#dcfce7'; color = '#166534'; }
        if (status === 'pending') { bg = '#fef9c3'; color = '#854d0e'; }
        return {
            padding: '0.125rem 0.625rem',
            borderRadius: '9999px',
            fontSize: '0.75rem',
            fontWeight: '500',
            textTransform: 'capitalize',
            backgroundColor: bg,
            color: color,
        };
    };

    const paginationStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1rem',
        gap: '1rem',
        borderTop: '1px solid #f3f4f6'
    };

    return (
        <div style={containerStyle}>
            <div style={headerStyle}>
                <div>
                    <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827' }}>Dashboard</h1>
                    <p style={{ color: '#4b5563', marginTop: '0.25rem' }}>
                        Welcome back, <span style={{ fontWeight: '600' }}>{user.name}</span>!
                    </p>
                </div>
                {user.role === 'trainer' && (
                    <Link to="/skills/new">
                        <Button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Plus size={16} /> Create New Skill
                        </Button>
                    </Link>
                )}
            </div>

            <div style={statsGridStyle}>
                <div style={statCardStyle}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ padding: '0.75rem', backgroundColor: '#eff6ff', color: '#2563eb', borderRadius: '0.5rem' }}>
                            <Calendar size={24} />
                        </div>
                        <div>
                            <p style={{ fontSize: '0.875rem', color: '#6b7280', fontWeight: '500' }}>My Bookings</p>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>
                                View All
                            </h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Bookings Section */}
            <div style={{ marginBottom: '3rem' }}>
                <div style={tableContainerStyle}>
                    <div style={{ padding: '1.5rem', borderBottom: '1px solid #f3f4f6' }}>
                        <h2 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#111827' }}>Recent Bookings</h2>
                    </div>

                    {loading ? (
                        <div style={{ padding: '1.5rem', textAlign: 'center', color: '#6b7280' }}>Loading...</div>
                    ) : bookings.length > 0 ? (
                        <>
                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                                    <thead>
                                        <tr>
                                            <th style={thStyle}>Skill</th>
                                            <th style={thStyle}>{user.role === 'trainer' ? 'Student' : 'Trainer'}</th>
                                            <th style={thStyle}>Date</th>
                                            <th style={thStyle}>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {bookings.map((booking) => (
                                            <tr key={booking._id} style={{ transition: 'background-color 0.2s' }}>
                                                <td style={{ ...tdStyle, fontWeight: '500', color: '#111827' }}>
                                                    {booking.skill?.title || 'Unknown Skill'}
                                                </td>
                                                <td style={tdStyle}>
                                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                        <span>{user.role === 'trainer' ? booking.student?.name : booking.trainer?.name}</span>
                                                        <Link
                                                            to={`/chat/${user.role === 'trainer' ? booking.student?._id : booking.trainer?._id}`}
                                                            style={{ fontSize: '0.75rem', color: '#2563eb', fontWeight: '500' }}
                                                        >
                                                            Message
                                                        </Link>
                                                    </div>
                                                </td>
                                                <td style={tdStyle}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                        <div style={{ width: '0.5rem', height: '0.5rem', borderRadius: '50%', backgroundColor: '#d1d5db' }}></div>
                                                        {new Date(booking.date).toLocaleDateString()}
                                                    </div>
                                                </td>
                                                <td style={tdStyle}>
                                                    <span style={badgeStyle(booking.status)}>
                                                        {booking.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {/* Pagination Controls */}
                            {pages > 1 && (
                                <div style={paginationStyle}>
                                    <Button
                                        variant="secondary"
                                        onClick={() => setPage(p => Math.max(1, p - 1))}
                                        disabled={page === 1}
                                        style={{ padding: '0.5rem', borderRadius: '50%' }}
                                    >
                                        <ChevronLeft size={20} />
                                    </Button>
                                    <span style={{ fontSize: '0.875rem', color: '#4b5563' }}>
                                        Page {page} of {pages}
                                    </span>
                                    <Button
                                        variant="secondary"
                                        onClick={() => setPage(p => Math.min(pages, p + 1))}
                                        disabled={page === pages}
                                        style={{ padding: '0.5rem', borderRadius: '50%' }}
                                    >
                                        <ChevronRight size={20} />
                                    </Button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div style={{ padding: '3rem', textAlign: 'center' }}>
                            <div style={{ width: '4rem', height: '4rem', backgroundColor: '#f9fafb', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto', color: '#9ca3af' }}>
                                <BookOpen size={32} />
                            </div>
                            <h3 style={{ fontSize: '1.125rem', fontWeight: '500', color: '#111827', marginBottom: '0.25rem' }}>No bookings yet</h3>
                            <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
                                {user.role === 'trainer'
                                    ? 'Create skills to start getting bookings!'
                                    : 'Explore skills and book your first session!'}
                            </p>
                            <Link to={user.role === 'trainer' ? '/skills/new' : '/skills'}>
                                <Button variant="secondary">
                                    {user.role === 'trainer' ? 'Create Skill' : 'Explore Market'}
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            {/* Productivity Section Grid */}
            <div style={{ marginTop: '2.5rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827', marginBottom: '1.5rem' }}>Productivity Zone</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
                    <div style={{ height: '500px' }}>
                        <TaskManager />
                    </div>

                    <div style={{ height: '500px' }}>
                        <Notes />
                    </div>

                    <div style={{ height: '500px' }}>
                        <FocusMode />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
