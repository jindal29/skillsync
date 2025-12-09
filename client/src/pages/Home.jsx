import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Star, ArrowRight, CheckCircle2 } from 'lucide-react';
import Button from '../components/Button';
import api from '../utils/api';
import HeroImage from '../assets/hero-new.jpg';
import CategoryCoding from '../assets/category-coding.png';
import CategoryDesign from '../assets/category-design.png';
import CategoryBusiness from '../assets/category-business.png';

const Home = () => {
    const [skills, setSkills] = useState([]);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const { data } = await api.get('/skills?pageNumber=1');
                setSkills(data.skills.slice(0, 3));
            } catch (error) {
                console.error(error);
            }
        };
        fetchSkills();
    }, []);

    // Inline Styles
    const containerStyle = {
        maxWidth: '80rem',
        margin: '0 auto',
        padding: '0 1rem',
    };

    const heroSectionStyle = {
        position: 'relative',
        backgroundColor: 'white',
        overflow: 'hidden',
        paddingTop: '4rem',
        paddingBottom: '4rem',
    };

    const heroGridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '4rem',
        alignItems: 'center',
        ...containerStyle,
    };

    const heroTitleStyle = {
        fontSize: '3.5rem', // Larger, modern
        fontWeight: '800',
        color: '#111827',
        letterSpacing: '-0.03em',
        marginBottom: '1.5rem',
        lineHeight: 1.1,
    };

    const gradientTextStyle = {
        background: 'linear-gradient(135deg, #ec4899 0%, #a855f7 100%)', // Pink to Purple
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    };

    const heroTextStyle = {
        fontSize: '1.25rem',
        color: '#4b5563',
        marginBottom: '2.5rem',
        lineHeight: 1.6,
        maxWidth: '35rem',
    };

    const imageContainerStyle = {
        position: 'relative',
        borderRadius: '2rem',
        overflow: 'hidden',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', // Deep shadow
        transform: 'rotate(-2deg)', // Stylish tilt
        border: '4px solid white',
    };

    const imgStyle = {
        width: '100%',
        height: 'auto',
        display: 'block',
    };

    const sectionStyle = {
        padding: '6rem 1rem',
        backgroundColor: '#f8fafc', // Slate-50
    };

    const gridContainerStyle = {
        ...containerStyle,
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2.5rem',
    };

    const featureCardStyle = {
        padding: '2rem',
        borderRadius: '1.5rem',
        backgroundColor: 'white',
        textAlign: 'left', // Align left for cleaner look
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        border: '1px solid #e2e8f0',
        transition: 'transform 0.2s ease',
    };

    const iconBoxStyle = (colorBg, colorText) => ({
        width: '3.5rem',
        height: '3.5rem',
        borderRadius: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '1.5rem',
        backgroundColor: colorBg,
        color: colorText,
    });

    const cardTitleStyle = {
        fontSize: '1.5rem',
        fontWeight: '700',
        marginBottom: '0.75rem',
        color: '#1e293b',
    };

    const skillCardStyle = {
        backgroundColor: 'white',
        borderRadius: '1rem',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)',
        border: '1px solid #f1f5f9',
        overflow: 'hidden',
        transition: 'transform 0.2s, box-shadow 0.2s',
        display: 'block',
        height: '100%',
    };

    return (
        <div style={{ backgroundColor: 'white' }}>
            {/* Hero Section */}
            <section style={heroSectionStyle}>
                <div style={heroGridStyle}>
                    <div style={{ zIndex: 10 }}>
                        <div style={{ display: 'inline-block', padding: '0.5rem 1rem', backgroundColor: 'rgba(236, 72, 153, 0.1)', color: '#ec4899', borderRadius: 'full', fontSize: '0.875rem', fontWeight: '600', marginBottom: '1.5rem', borderRadius: '9999px', border: '1px solid rgba(236, 72, 153, 0.2)' }}>
                            ✨ New way to learn
                        </div>
                        <h1 style={heroTitleStyle}>
                            Unlock your potential with <br />
                            <span style={gradientTextStyle}>
                                Expert Mentors
                            </span>
                        </h1>
                        <p style={heroTextStyle}>
                            Connect directly with top-rated professionals for 1-on-1 sessions.
                            Master new skills faster with personalized guidance.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                            <Link to="/skills">
                                <Button style={{ padding: '1rem 2.5rem', fontSize: '1.125rem', borderRadius: '9999px' }}>
                                    Find a Mentor
                                </Button>
                            </Link>
                            <Link to="/signup">
                                <Button variant="outline" style={{ padding: '1rem 2.5rem', fontSize: '1.125rem', borderRadius: '9999px' }}>
                                    Become a Trainer
                                </Button>
                            </Link>
                        </div>

                        <div style={{ marginTop: '2.5rem', display: 'flex', alignItems: 'center', gap: '1rem', color: '#64748b' }}>
                            <div style={{ display: 'flex' }}>
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', backgroundColor: '#cbd5e1', border: '2px solid white', marginLeft: i > 1 ? '-0.75rem' : 0 }}></div>
                                ))}
                            </div>
                            <p style={{ fontSize: '0.875rem' }}>Trusted by 10,000+ students</p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <div style={imageContainerStyle}>
                            <img src={HeroImage} alt="Students learning" style={imgStyle} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section style={sectionStyle}>
                <div style={{ ...containerStyle, textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.25rem', fontWeight: '800', color: '#0f172a', marginBottom: '1rem' }}>Why Choose SkillSync?</h2>
                    <p style={{ color: '#64748b', fontSize: '1.125rem' }}>Everything you need to accelerate your learning journey</p>
                </div>

                <div style={gridContainerStyle}>
                    <div style={featureCardStyle}>
                        <div style={iconBoxStyle('#eff6ff', '#3b82f6')}>
                            <Search size={28} />
                        </div>
                        <h3 style={cardTitleStyle}>Find Perfect Matches</h3>
                        <p style={{ color: '#64748b', lineHeight: 1.6 }}>Advanced search helps you connect with mentors who match your specific learning needs and budget.</p>
                    </div>
                    <div style={featureCardStyle}>
                        <div style={iconBoxStyle('#fdf4ff', '#d946ef')}>
                            <CheckCircle2 size={28} />
                        </div>
                        <h3 style={cardTitleStyle}>Easy Scheduling</h3>
                        <p style={{ color: '#64748b', lineHeight: 1.6 }}>Book sessions seamlessly with our integrated calendar system. No back-and-forth emails needed.</p>
                    </div>
                    <div style={featureCardStyle}>
                        <div style={iconBoxStyle('#f0fdf4', '#22c55e')}>
                            <Star size={28} />
                        </div>
                        <h3 style={cardTitleStyle}>Verified Quality</h3>
                        <p style={{ color: '#64748b', lineHeight: 1.6 }}>Learn from vetted experts with community ratings and reviews ensuring high-quality instruction.</p>
                    </div>
                </div>
            </section>

            {/* Browse Categories Section */}
            <section style={sectionStyle}>
                <div style={{ ...containerStyle, textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.25rem', fontWeight: '800', color: '#0f172a', marginBottom: '1rem' }}>Browse Categories</h2>
                    <p style={{ color: '#64748b', fontSize: '1.125rem' }}>Explore popular learning paths</p>
                </div>

                <div style={gridContainerStyle}>
                    <div style={{ ...featureCardStyle, padding: 0, overflow: 'hidden', border: 'none', boxShadow: 'none', backgroundColor: 'transparent' }}>
                        <div style={{ position: 'relative', borderRadius: '1.5rem', overflow: 'hidden', aspectRatio: '4/3', marginBottom: '1rem' }}>
                            <img src={CategoryCoding} alt="Coding" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)', display: 'flex', alignItems: 'flex-end', padding: '1.5rem' }}>
                                <h3 style={{ color: 'white', fontSize: '1.5rem', fontWeight: '700' }}>Technology</h3>
                            </div>
                        </div>
                    </div>
                    <div style={{ ...featureCardStyle, padding: 0, overflow: 'hidden', border: 'none', boxShadow: 'none', backgroundColor: 'transparent' }}>
                        <div style={{ position: 'relative', borderRadius: '1.5rem', overflow: 'hidden', aspectRatio: '4/3', marginBottom: '1rem' }}>
                            <img src={CategoryDesign} alt="Design" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)', display: 'flex', alignItems: 'flex-end', padding: '1.5rem' }}>
                                <h3 style={{ color: 'white', fontSize: '1.5rem', fontWeight: '700' }}>Design</h3>
                            </div>
                        </div>
                    </div>
                    <div style={{ ...featureCardStyle, padding: 0, overflow: 'hidden', border: 'none', boxShadow: 'none', backgroundColor: 'transparent' }}>
                        <div style={{ position: 'relative', borderRadius: '1.5rem', overflow: 'hidden', aspectRatio: '4/3', marginBottom: '1rem' }}>
                            <img src={CategoryBusiness} alt="Business" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)', display: 'flex', alignItems: 'flex-end', padding: '1.5rem' }}>
                                <h3 style={{ color: 'white', fontSize: '1.5rem', fontWeight: '700' }}>Business</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section >

            {/* Featured Skills Preview */}
            <section style={{ padding: '6rem 1rem', backgroundColor: 'white' }}>
                <div style={{ ...containerStyle }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
                        <div>
                            <h2 style={{ fontSize: '2.25rem', fontWeight: '800', color: '#0f172a' }}>Trending Skills</h2>
                            <p style={{ color: '#64748b', marginTop: '0.5rem', fontSize: '1.125rem' }}>Top rated skills by our community</p>
                        </div>
                        <Link to="/skills" style={{ color: '#2563eb', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.25rem', padding: '0.5rem 1rem', borderRadius: '0.5rem', backgroundColor: '#eff6ff' }}>
                            View all skills <ArrowRight size={18} />
                        </Link>
                    </div>

                    <div style={gridContainerStyle}>
                        {skills.length > 0 ? (
                            skills.map(skill => (
                                <Link key={skill._id} to={`/skills/${skill._id}`} style={{ textDecoration: 'none' }}>
                                    <div style={skillCardStyle}
                                        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                                        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                    >
                                        <div style={{ padding: '1.5rem' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                                <span style={{ padding: '0.25rem 0.75rem', backgroundColor: '#f1f5f9', color: '#475569', fontSize: '0.75rem', fontWeight: '700', borderRadius: '9999px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                                    {skill.category}
                                                </span>
                                                <span style={{ fontSize: '1.25rem', fontWeight: '700', color: '#2563eb' }}>₹{skill.price}</span>
                                            </div>
                                            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.5rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{skill.title}</h3>
                                            <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '1.5rem', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{skill.description}</p>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingTop: '1rem', borderTop: '1px solid #f1f5f9' }}>
                                                <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '9999px', backgroundColor: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.875rem', fontWeight: '700', color: '#64748b' }}>
                                                    {skill.trainer.name.charAt(0)}
                                                </div>
                                                <div style={{ flex: 1 }}>
                                                    <p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#0f172a' }}>{skill.trainer.name}</p>
                                                    <div style={{ display: 'flex', alignItems: 'center', color: '#eab308', fontSize: '0.75rem', marginTop: '0.125rem' }}>
                                                        <Star size={12} fill="currentColor" />
                                                        <span style={{ color: '#64748b', marginLeft: '0.25rem', fontWeight: '500' }}>
                                                            {skill.trainer.rating ? skill.trainer.rating.toFixed(1) : 'New'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem 0', color: '#64748b', backgroundColor: '#f8fafc', borderRadius: '1rem', border: '1px dashed #cbd5e1' }}>
                                <p style={{ fontSize: '1.125rem', fontWeight: '500' }}>No skills currently available.</p>
                                <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>Be the first to share your knowledge!</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
