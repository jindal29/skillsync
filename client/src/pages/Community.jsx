import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import api from '../utils/api';
import { MessageSquare, Heart, Share2 } from 'lucide-react';

const Community = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newPostTitle, setNewPostTitle] = useState('');
    const [newPostContent, setNewPostContent] = useState('');
    const [page, setPage] = useState(1);

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const { data } = await api.get(`/posts?page=${page}`);
            setPosts(data.posts);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, [page]);

    const handleCreatePost = async (e) => {
        e.preventDefault();
        try {
            await api.post('/posts', { title: newPostTitle, content: newPostContent });
            setNewPostTitle('');
            setNewPostContent('');
            fetchPosts(); // Refresh list
        } catch (error) {
            console.error(error);
        }
    };

    const handleLike = async (id) => {
        try {
            await api.put(`/posts/${id}/like`);
            fetchPosts(); // Refresh to see like count update (could be optimized)
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div style={{ padding: '4rem 1rem', maxWidth: '60rem', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem' }}>Community Forum</h1>
                <p style={{ color: '#6b7280', fontSize: '1.125rem' }}>Discuss, share, and grow with fellow learners and mentors.</p>
            </div>

            {/* Create Post Section */}
            <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '1rem', border: '1px solid #e5e7eb', marginBottom: '3rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#111827' }}>Start a Discussion</h3>
                <form onSubmit={handleCreatePost} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <Input
                        placeholder="Discussion Title"
                        value={newPostTitle}
                        onChange={(e) => setNewPostTitle(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="What's on your mind?"
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value)}
                        required
                        style={{
                            padding: '0.75rem',
                            borderRadius: '0.5rem',
                            border: '1px solid #d1d5db',
                            minHeight: '100px',
                            fontFamily: 'inherit',
                            resize: 'vertical'
                        }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button type="submit">Post Discussion</Button>
                    </div>
                </form>
            </div>

            {/* Posts List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {loading && posts.length === 0 ? (
                    <p style={{ textAlign: 'center' }}>Loading discussions...</p>
                ) : posts.length > 0 ? (
                    posts.map(post => (
                        <div key={post._id} style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '1rem', border: '1px solid #e5e7eb' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                                <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', backgroundColor: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.875rem', fontWeight: 'bold' }}>
                                    {post.author.name.charAt(0)}
                                </div>
                                <span style={{ fontWeight: '600', color: '#374151' }}>{post.author.name}</span>
                                <span style={{ color: '#9ca3af', fontSize: '0.875rem' }}>• {new Date(post.createdAt).toLocaleDateString()}</span>
                            </div>

                            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem' }}>{post.title}</h3>
                            <p style={{ color: '#4b5563', lineHeight: 1.6, marginBottom: '1.5rem' }}>{post.content}</p>

                            <div style={{ display: 'flex', gap: '1.5rem', borderTop: '1px solid #f3f4f6', paddingTop: '1rem' }}>
                                <button onClick={() => handleLike(post._id)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6b7280', fontSize: '0.875rem', cursor: 'pointer', background: 'none', border: 'none' }}>
                                    <Heart size={18} /> {post.likes.length} Likes
                                </button>
                                <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6b7280', fontSize: '0.875rem', cursor: 'pointer', background: 'none', border: 'none' }}>
                                    <MessageSquare size={18} /> Comment
                                </button>
                                <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6b7280', fontSize: '0.875rem', cursor: 'pointer', background: 'none', border: 'none', marginLeft: 'auto' }}>
                                    <Share2 size={18} /> Share
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p style={{ textAlign: 'center', color: '#6b7280' }}>No discussions yet. Be the first to post!</p>
                )}
            </div>
        </div>
    );
};

export default Community;
