import React, { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import Button from '../components/Button';
import Input from '../components/Input';
import { User, Mail } from 'lucide-react';

const Profile = () => {
    const { user } = useContext(AuthContext);

    // In a real app we'd have an update profile endpoint
    // For this MVP, we will just display user info and maybe mock the edit
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(user.name);
    const [bio, setBio] = useState(user.bio || '');
    const { updateUser } = useContext(AuthContext);

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const { data } = await api.put('/auth/profile', { name, bio });
            updateUser(data);
            setIsEditing(false);
            alert('Profile updated successfully!');
        } catch (error) {
            console.error(error);
            alert('Failed to update profile');
        }
    };

    const containerStyle = {
        maxWidth: '48rem', // max-w-3xl
        margin: '0 auto',
        padding: '2.5rem 1rem',
    };

    const cardStyle = {
        backgroundColor: 'white',
        borderRadius: '0.75rem',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        border: '1px solid #f3f4f6',
        overflow: 'hidden',
    };

    const cardContentStyle = {
        padding: '2rem',
    };

    const headerStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem',
        marginBottom: '2rem',
    };

    const avatarStyle = {
        width: '6rem',
        height: '6rem',
        borderRadius: '50%',
        backgroundColor: '#eff6ff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#2563eb',
        fontWeight: 'bold',
        fontSize: '2.25rem',
    };

    const formGridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        marginBottom: '1.5rem',
    };

    const textareaStyle = {
        display: 'block',
        width: '100%',
        padding: '0.5rem 0.75rem',
        border: isEditing ? '1px solid #d1d5db' : '1px solid #e5e7eb',
        backgroundColor: isEditing ? 'white' : '#f9fafb',
        color: isEditing ? '#111827' : '#6b7280',
        borderRadius: '0.375rem',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        fontSize: '0.875rem',
        outline: 'none',
        resize: 'vertical',
        minHeight: '8rem',
        transition: 'all 0.2s',
    };

    const emailInputContainerStyle = {
        position: 'relative',
    };

    const emailInputStyle = {
        display: 'block',
        width: '100%',
        padding: '0.5rem 0.75rem',
        border: '1px solid #e5e7eb',
        backgroundColor: '#f9fafb',
        color: '#6b7280',
        borderRadius: '0.375rem',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        fontSize: '0.875rem',
    };

    const mailIconStyle = {
        position: 'absolute',
        right: '0.75rem',
        top: '0.625rem',
        height: '1rem',
        width: '1rem',
        color: '#9ca3af',
    };

    return (
        <div style={containerStyle}>
            <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827', marginBottom: '2rem' }}>My Profile</h1>

            <div style={cardStyle}>
                <div style={cardContentStyle}>
                    <div style={headerStyle}>
                        <div style={avatarStyle}>
                            {user.name.charAt(0)}
                        </div>
                        <div>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>{user.name}</h2>
                            <p style={{ color: '#6b7280', textTransform: 'capitalize' }}>{user.role}</p>
                        </div>
                    </div>

                    <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={formGridStyle}>
                            <Input
                                label="Full Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                disabled={!isEditing}
                                style={!isEditing ? { backgroundColor: '#f9fafb', color: '#6b7280', borderColor: '#e5e7eb' } : {}}
                            />
                            <div style={{ width: '100%' }}>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>
                                    Email Address
                                </label>
                                <div style={emailInputContainerStyle}>
                                    <input
                                        type="email"
                                        disabled
                                        value={user.email}
                                        style={emailInputStyle}
                                    />
                                    <Mail style={mailIconStyle} />
                                </div>
                            </div>
                        </div>

                        <div style={{ width: '100%' }}>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>
                                Bio
                            </label>
                            <textarea
                                rows={4}
                                style={textareaStyle}
                                placeholder="Tell us about yourself..."
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                disabled={!isEditing}
                            />
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '1rem' }}>
                            {isEditing ? (
                                <div style={{ display: 'flex', gap: '0.75rem' }}>
                                    <Button type="button" variant="secondary" onClick={() => setIsEditing(false)}>
                                        Cancel
                                    </Button>
                                    <Button type="submit">
                                        Save Changes
                                    </Button>
                                </div>
                            ) : (
                                <Button type="button" onClick={() => setIsEditing(true)}>
                                    Edit Profile
                                </Button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
