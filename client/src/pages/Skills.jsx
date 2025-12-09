import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import Button from '../components/Button';
import { Search, Star } from 'lucide-react';

const Skills = () => {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [keyword, setKeyword] = useState('');
    const [category, setCategory] = useState('');

    const fetchSkills = async () => {
        setLoading(true);
        try {
            const { data } = await api.get(`/skills?pageNumber=${page}&keyword=${keyword}&category=${category}`);
            setSkills(data.skills);
            setPages(data.pages);
            setPage(data.page);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSkills();
    }, [page, category]);

    const handleSearch = (e) => {
        e.preventDefault();
        setPage(1);
        fetchSkills();
    };

    const containerStyle = {
        maxWidth: '80rem',
        margin: '0 auto',
        padding: '2.5rem 1rem', // py-10 px-4
    };

    const headerStyle = {
        display: 'flex',
        flexDirection: 'column', // mobile first? let's stick to flex row for md+ usually, but here simplicity
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        gap: '1rem',
    };

    // simplified media query handling via js is messy, so assuming desktop-ish layout or flex wrap
    const formStyle = {
        display: 'flex',
        width: '100%',
        gap: '0.5rem',
        maxWidth: '40rem', // approximate
    };

    const searchInputContainerStyle = {
        position: 'relative',
        width: '100%',
    };

    const searchIconStyle = {
        position: 'absolute',
        top: '50%',
        left: '0.75rem',
        transform: 'translateY(-50%)',
        color: '#9ca3af',
        pointerEvents: 'none',
    };

    const inputStyle = {
        display: 'block',
        width: '100%',
        padding: '0.5rem 0.75rem 0.5rem 2.5rem',
        border: '1px solid #d1d5db',
        borderRadius: '0.5rem',
        outline: 'none',
        fontSize: '0.875rem',
    };

    const selectStyle = {
        display: 'block',
        width: '10rem',
        padding: '0.5rem 0.75rem',
        border: '1px solid #d1d5db',
        borderRadius: '0.5rem',
        outline: 'none',
        fontSize: '0.875rem',
        backgroundColor: 'white',
    };

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '2rem',
        marginBottom: '2rem',
    };

    const cardStyle = {
        backgroundColor: 'white',
        borderRadius: '0.75rem',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        border: '1px solid #f3f4f6',
        overflow: 'hidden',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'box-shadow 0.2s',
    };

    const cardContentStyle = {
        padding: '1.5rem',
        flex: 1,
    };

    const badgeStyle = {
        padding: '0.25rem 0.75rem',
        backgroundColor: '#eff6ff',
        color: '#1d4ed8',
        fontSize: '0.75rem',
        fontWeight: '600',
        borderRadius: '9999px',
        textTransform: 'uppercase',
        letterSpacing: '0.025em',
    };

    const priceStyle = {
        fontSize: '1.125rem',
        fontWeight: 'bold',
        color: '#111827',
    };

    const cardFooterStyle = {
        padding: '1rem',
        backgroundColor: '#f9fafb',
        borderTop: '1px solid #f3f4f6',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
    };

    const avatarStyle = {
        width: '2rem',
        height: '2rem',
        borderRadius: '50%',
        backgroundColor: '#e5e7eb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '0.75rem',
        fontWeight: 'bold',
        color: '#4b5563',
    };

    return (
        <div style={containerStyle}>
            <div style={headerStyle}>
                <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827' }}>Explore Skills</h1>

                <form onSubmit={handleSearch} style={formStyle}>
                    <div style={searchInputContainerStyle}>
                        <div style={searchIconStyle}>
                            <Search size={20} />
                        </div>
                        <input
                            type="text"
                            style={inputStyle}
                            placeholder="Search skills..."
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                    </div>

                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        style={selectStyle}
                    >
                        <option value="">All Categories</option>
                        <option value="Programming">Programming</option>
                        <option value="Design">Design</option>
                        <option value="Music">Music</option>
                        <option value="Language">Language</option>
                        <option value="Marketing">Marketing</option>
                    </select>

                    <Button type="submit">Search</Button>
                </form>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '5rem 0', color: '#6b7280' }}>Loading...</div>
            ) : (
                <>
                    <div style={gridStyle}>
                        {skills.length > 0 ? (
                            skills.map((skill) => (
                                <Link to={`/skills/${skill._id}`} key={skill._id} style={{ display: 'block', textDecoration: 'none' }}>
                                    <div style={cardStyle}>
                                        <div style={cardContentStyle}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                                <span style={badgeStyle}>
                                                    {skill.category}
                                                </span>
                                                <span style={priceStyle}>₹{skill.price}</span>
                                            </div>
                                            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{skill.title}</h3>
                                            <p style={{ color: '#4b5563', fontSize: '0.875rem', marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{skill.description}</p>
                                        </div>
                                        <div style={cardFooterStyle}>
                                            <div style={avatarStyle}>
                                                {skill.trainer.name ? skill.trainer.name.charAt(0) : 'U'}
                                            </div>
                                            <div>
                                                <p style={{ fontSize: '0.875rem', fontWeight: '500', color: '#111827' }}>{skill.trainer.name || 'Unknown Trainer'}</p>
                                                {skill.trainer.rating > 0 && (
                                                    <div style={{ display: 'flex', alignItems: 'center', color: '#eab308', fontSize: '0.75rem' }}>
                                                        <Star size={12} fill="currentColor" style={{ marginRight: '0.25rem' }} />
                                                        {skill.trainer.rating.toFixed(1)}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '5rem 0', color: '#6b7280' }}>
                                No skills found. Try adjusting your search.
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    {pages > 1 && (
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                            {[...Array(pages).keys()].map((x) => {
                                const isActive = page === x + 1;
                                const btnStyle = {
                                    width: '2.5rem',
                                    height: '2.5rem',
                                    borderRadius: '0.5rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: '500',
                                    cursor: 'pointer',
                                    border: isActive ? 'none' : '1px solid #d1d5db',
                                    backgroundColor: isActive ? '#2563eb' : 'white',
                                    color: isActive ? 'white' : '#374151',
                                };
                                return (
                                    <button
                                        key={x + 1}
                                        onClick={() => setPage(x + 1)}
                                        style={btnStyle}
                                    >
                                        {x + 1}
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Skills;
