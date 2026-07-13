import { useEffect, useState } from 'react';
import api from '../api';

const LEVEL_LABELS = ['', 'Beginner', 'Intermediate', 'Advanced', 'Expert'];

export default function Skills() {
  const [skills,  setSkills]  = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState('');

  useEffect(() => {
    api.get('/skills')
      .then(res => setSkills(res.data))
      .catch(() => setError('Could not load skills.'))
      .finally(() => setLoading(false));
  }, []);

  // Group by category
  const grouped = skills.reduce((acc, s) => {
    const cat = s.category || 'Other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(s);
    return acc;
  }, {});

  return (
    <main className="page">
      <div className="container">
        <h1 className="section-title">Skills</h1>
        <p className="section-sub">Technologies and tools I work with</p>

        {loading && <p className="loading">Loading skills...</p>}
        {error   && <p className="alert alert-error">{error}</p>}

        {Object.entries(grouped).map(([category, items]) => (
          <div key={category} style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {category}
            </h2>
            <div className="grid-2">
              {items.map(skill => (
                <div key={skill.id} className="card" style={{ padding: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontWeight: 500 }}>{skill.name}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {LEVEL_LABELS[skill.level] || ''}
                    </span>
                  </div>
                  <div style={{ background: 'var(--border)', borderRadius: '4px', height: '5px' }}>
                    <div style={{
                      background: 'var(--primary)',
                      height: '5px',
                      borderRadius: '4px',
                      width: `${(skill.level / 4) * 100}%`,
                      transition: 'width 0.5s ease',
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
