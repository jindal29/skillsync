import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import api from '../utils/api';
import { Calendar, MapPin, Video, Users } from 'lucide-react';

const Events = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true);
            try {
                const { data } = await api.get('/events');
                setEvents(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    return (
        <div style={{ padding: '6rem 1rem', maxWidth: '80rem', margin: '0 auto' }}>
            <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem' }}>Upcoming Events</h1>
                <p style={{ color: '#6b7280', fontSize: '1.125rem' }}>Workshops, webinars, and meetups happening soon.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
                {loading ? (
                    <p style={{ textAlign: 'center', gridColumn: '1 / -1' }}>Loading events...</p>
                ) : events.length > 0 ? (
                    events.map(event => (
                        <div key={event._id} style={{ backgroundColor: 'white', borderRadius: '1rem', overflow: 'hidden', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
                            <div style={{ backgroundColor: '#eff6ff', padding: '1.5rem', borderBottom: '1px solid #e5e7eb' }}>
                                <span style={{ display: 'inline-block', padding: '0.25rem 0.75rem', backgroundColor: 'white', color: '#2563eb', fontSize: '0.75rem', fontWeight: 'bold', borderRadius: '1rem', marginBottom: '0.75rem' }}>
                                    {event.type}
                                </span>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827' }}>{event.title}</h3>
                            </div>

                            <div style={{ padding: '1.5rem' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#4b5563' }}>
                                        <Calendar size={18} />
                                        <span>{new Date(event.date).toLocaleDateString()} at {new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#4b5563' }}>
                                        {event.type === 'Webinar' ? <Video size={18} /> : <MapPin size={18} />}
                                        <span>{event.link ? 'Online Event' : 'TBD'}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#4b5563' }}>
                                        <Users size={18} />
                                        <span>b/w {event.organizer.name}</span>
                                    </div>
                                </div>

                                <p style={{ color: '#6b7280', lineHeight: 1.5, marginBottom: '2rem' }}>{event.description}</p>

                                <Button style={{ width: '100%' }}>Register Now</Button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p style={{ textAlign: 'center', gridColumn: '1 / -1', color: '#6b7280' }}>No upcoming events.</p>
                )}
            </div>
        </div>
    );
};

export default Events;
