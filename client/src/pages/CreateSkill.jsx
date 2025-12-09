import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import Button from '../components/Button';
import Input from '../components/Input';
import { ChevronLeft } from 'lucide-react';

const CreateSkill = () => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Programming');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await api.post('/skills', {
                title,
                category,
                description,
                price: Number(price),
            });
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.msg || 'Failed to create skill');
        } finally {
            setLoading(false);
        }
    };

    const containerStyle = {
        maxWidth: '48rem', // max-w-3xl
        margin: '0 auto',
        padding: '2.5rem 1rem',
    };

    const backButtonStyle = {
        display: 'flex',
        alignItems: 'center',
        color: '#4b5563',
        marginBottom: '1.5rem',
        cursor: 'pointer',
        fontSize: '1rem',
        background: 'none',
        border: 'none',
    };

    const cardStyle = {
        backgroundColor: 'white',
        borderRadius: '0.75rem',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        border: '1px solid #f3f4f6',
        overflow: 'hidden',
    };

    const headerStyle = {
        padding: '2rem',
        borderBottom: '1px solid #f3f4f6',
        backgroundColor: '#f9fafb',
    };

    const bodyStyle = {
        padding: '2rem',
    };

    const selectStyle = {
        display: 'block',
        width: '100%',
        padding: '0.5rem 0.75rem',
        border: '1px solid #d1d5db',
        borderRadius: '0.375rem', // sm
        outline: 'none',
        fontSize: '0.875rem',
    };

    const textareaStyle = {
        display: 'block',
        width: '100%',
        padding: '0.5rem 0.75rem',
        border: '1px solid #d1d5db',
        borderRadius: '0.375rem',
        outline: 'none',
        fontSize: '0.875rem',
        resize: 'vertical',
        minHeight: '8rem',
    };

    return (
        <div style={containerStyle}>
            <button
                onClick={() => navigate(-1)}
                style={backButtonStyle}
            >
                <ChevronLeft size={16} style={{ marginRight: '0.25rem' }} /> Back
            </button>

            <div style={cardStyle}>
                <div style={headerStyle}>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>Share Your Skill</h1>
                    <p style={{ color: '#4b5563', marginTop: '0.25rem' }}>Create a new listing to start teaching</p>
                </div>

                <div style={bodyStyle}>
                    {error && (
                        <div style={{ marginBottom: '1.5rem', backgroundColor: '#fef2f2', color: '#b91c1c', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #fecaca', fontSize: '0.875rem' }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <Input
                            label="Skill Title"
                            placeholder="e.g. Master ReactJS in 30 Days"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />

                        <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>Category</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                style={selectStyle}
                            >
                                <option value="Programming">Programming</option>
                                <option value="Design">Design</option>
                                <option value="Music">Music</option>
                                <option value="Language">Language</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Business">Business</option>
                                <option value="Lifestyle">Lifestyle</option>
                            </select>
                        </div>

                        <div style={{ width: '100%' }}>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>
                                Description
                            </label>
                            <textarea
                                style={textareaStyle}
                                placeholder="Describe what students will learn..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>

                        <Input
                            label="Price (₹ per session)"
                            type="number"
                            placeholder="500"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />

                        <div style={{ paddingTop: '1rem' }}>
                            <Button type="submit" disabled={loading} style={{ width: '100%' }}>
                                {loading ? 'Creating...' : 'Create Skill'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateSkill;
