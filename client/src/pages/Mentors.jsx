import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import api from '../utils/api';
import { Search, ChevronLeft, ChevronRight, Star } from 'lucide-react';

const Mentors = () => {
    const [trainers, setTrainers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('newest');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchTrainers = async () => {
        setLoading(true);
        try {
            const { data } = await api.get(`/auth/trainers?search=${search}&sort=${sort}&page=${page}&limit=9`);
            setTrainers(data.trainers);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTrainers();
    }, [page, sort]); // Search triggers on button click or debounce if we wanted

    const handleSearch = (e) => {
        e.preventDefault();
        setPage(1);
        fetchTrainers();
    };

    return (
        <div style={{ padding: '6rem 1rem', maxWidth: '80rem', margin: '0 auto' }}>
            <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem' }}>Find Your Mentor</h1>
                <p style={{ color: '#6b7280', fontSize: '1.125rem' }}>Connect with expert trainers to accelerate your learning.</p>
            </div>

            {/* Search and Sort */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.5rem', width: '100%', maxWidth: '30rem' }}>
                    <Input
                        placeholder="Search by name..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{ margin: 0 }}
                    />
                    <Button type="submit">
                        <Search size={20} />
                    </Button>
                </form>

                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    style={{
                        padding: '0.75rem',
                        borderRadius: '0.5rem',
                        border: '1px solid #d1d5db',
                        backgroundColor: 'white',
                        color: '#374151',
                        cursor: 'pointer'
                    }}
                >
                    <option value="newest">Newest First</option>
                    <option value="rating">Highest Rated</option>
                </select>
            </div>

            {/* Mentors Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                {loading ? (
                    <p style={{ textAlign: 'center', gridColumn: '1 / -1' }}>Loading mentors...</p>
                ) : trainers.length > 0 ? (
                    trainers.map(trainer => (
                        <div key={trainer._id} style={{
                            backgroundColor: 'white',
                            borderRadius: '1rem',
                            padding: '1.5rem',
                            border: '1px solid #e5e7eb',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                            transition: 'transform 0.2s',
                            cursor: 'pointer'
                        }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                <div style={{ width: '3.5rem', height: '3.5rem', borderRadius: '50%', backgroundColor: '#dbeafe', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', fontWeight: 'bold' }}>
                                    {trainer.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#111827' }}>{trainer.name}</h3>
                                    <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>{trainer.email}</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                                <Star size={16} fill="#eab308" color="#eab308" />
                                <span style={{ fontWeight: '500', color: '#374151' }}>{trainer.rating?.toFixed(1) || 'New'}</span>
                                <span style={{ color: '#9ca3af' }}>•</span>
                                <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>Trainer</span>
                            </div>

                            <Button style={{ width: '100%' }} variant="outline">View Profile</Button>
                        </div>
                    ))
                ) : (
                    <p style={{ textAlign: 'center', gridColumn: '1 / -1', color: '#6b7280' }}>No mentors found.</p>
                )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginTop: '3rem' }}>
                    <button
                        onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                        disabled={page === 1}
                        style={{ padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #d1d5db', backgroundColor: 'white', cursor: page === 1 ? 'not-allowed' : 'pointer', opacity: page === 1 ? 0.5 : 1 }}
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <span style={{ fontWeight: '500', color: '#374151' }}>Page {page} of {totalPages}</span>
                    <button
                        onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={page === totalPages}
                        style={{ padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #d1d5db', backgroundColor: 'white', cursor: page === totalPages ? 'not-allowed' : 'pointer', opacity: page === totalPages ? 0.5 : 1 }}
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default Mentors;
