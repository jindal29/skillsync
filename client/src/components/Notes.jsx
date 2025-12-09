import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { Plus, X, StickyNote } from 'lucide-react';

const Notes = () => {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('');

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            const { data } = await api.get('/notes');
            setNotes(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddNote = async () => {
        if (!newNote.trim()) return;
        try {
            const { data } = await api.post('/notes', { content: newNote });
            setNotes([data, ...notes]);
            setNewNote('');
        } catch (error) {
            console.error(error);
        }
    };

    const deleteNote = async (id) => {
        try {
            await api.delete(`/notes/${id}`);
            setNotes(notes.filter(n => n._id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    const containerStyle = {
        backgroundColor: 'white',
        borderRadius: '0.75rem',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        border: '1px solid #f3f4f6',
        padding: '1.5rem',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    };

    const Colors = ['#fef3c7', '#dcfce7', '#dbeafe', '#fae8ff', '#ffe4e6'];

    return (
        <div style={containerStyle}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                Quick Notes
                <StickyNote size={18} color="#f59e0b" />
            </h3>

            <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
                <textarea
                    placeholder="Type a new note..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleAddNote();
                        }
                    }}
                    style={{
                        width: '100%',
                        padding: '0.75rem',
                        paddingRight: '2.5rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '0.5rem',
                        fontSize: '0.875rem',
                        backgroundColor: '#f9fafb',
                        resize: 'none',
                        minHeight: '5rem'
                    }}
                />
                <button
                    onClick={handleAddNote}
                    style={{
                        position: 'absolute',
                        bottom: '0.75rem',
                        right: '0.75rem',
                        padding: '0.25rem',
                        backgroundColor: '#2563eb',
                        color: 'white',
                        borderRadius: '0.25rem',
                        cursor: 'pointer'
                    }}
                >
                    <Plus size={16} />
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '1rem', overflowY: 'auto', flex: 1, maxHeight: '300px' }}>
                {notes.map((note, index) => (
                    <div key={note._id} style={{
                        padding: '1rem',
                        borderRadius: '0.5rem',
                        backgroundColor: Colors[index % Colors.length],
                        position: 'relative',
                        boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)',
                        fontSize: '0.875rem',
                        lineHeight: 1.5,
                        color: '#374151'
                    }}>
                        {note.content}
                        <button
                            onClick={() => deleteNote(note._id)}
                            style={{
                                position: 'absolute',
                                top: '0.5rem',
                                right: '0.5rem',
                                color: '#6b7280',
                                opacity: 0.6,
                                cursor: 'pointer'
                            }}
                        >
                            <X size={14} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Notes;
