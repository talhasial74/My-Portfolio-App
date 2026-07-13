import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import ProjectCard from '../components/ProjectCard';

export default function Home() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    api.get('/projects/featured')
      .then(res => setFeatured(res.data))
      .catch(console.error);
  }, []);

  return (
    <main>
      {/* Hero */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '5rem 1.5rem 3rem',
        background: 'radial-gradient(ellipse at 60% 40%, rgba(37,99,235,0.08) 0%, transparent 70%)',
      }}>
        <div className="container">
          <p style={{ color: 'var(--primary)', fontWeight: 500, marginBottom: '0.75rem' }}>
            Hi, my name is
          </p>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '0.75rem' }}>
            Your Name
          </h1>
          <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Full-Stack Developer
          </h2>
          <p style={{ maxWidth: '540px', color: 'var(--text-muted)', fontSize: '1.05rem', marginBottom: '2rem', lineHeight: 1.8 }}>
            I build fast, accessible, and beautiful web applications using React, Node.js, and MySQL.
            Open to full-time roles and freelance projects.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/projects" className="btn btn-primary">View my work</Link>
            <Link to="/contact"  className="btn btn-outline">Get in touch</Link>
          </div>
        </div>
      </section>

      {/* Featured projects */}
      {featured.length > 0 && (
        <section className="container" style={{ paddingBottom: '4rem' }}>
          <h2 className="section-title">Featured projects</h2>
          <p className="section-sub">A selection of things I've built</p>
          <div className="grid-3">
            {featured.map(p => <ProjectCard key={p.id} project={p} />)}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link to="/projects" className="btn btn-outline">See all projects →</Link>
          </div>
        </section>
      )}
    </main>
  );
}
