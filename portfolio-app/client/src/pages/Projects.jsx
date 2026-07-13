import { useEffect, useState } from 'react';
import api from '../api';
import ProjectCard from '../components/ProjectCard';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [search,   setSearch]   = useState('');
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState('');

  useEffect(() => {
    api.get('/projects')
      .then(res => setProjects(res.data))
      .catch(() => setError('Could not load projects.'))
      .finally(() => setLoading(false));
  }, []);

  const filtered = projects.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    (p.tech_stack || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="page">
      <div className="container">
        <h1 className="section-title">Projects</h1>
        <p className="section-sub">Things I've designed, built, and shipped</p>

        <input
          type="text"
          placeholder="Search by name or tech stack..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ maxWidth: '400px', marginBottom: '2rem' }}
        />

        {loading && <p className="loading">Loading projects...</p>}
        {error   && <p className="alert alert-error">{error}</p>}

        {!loading && !error && filtered.length === 0 && (
          <p style={{ color: 'var(--text-muted)' }}>No projects match your search.</p>
        )}

        <div className="grid-3">
          {filtered.map(p => <ProjectCard key={p.id} project={p} />)}
        </div>
      </div>
    </main>
  );
}
