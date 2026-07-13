export default function ProjectCard({ project }) {
  const { title, description, tech_stack, github_url, live_url, image_url, featured } = project;

  const techs = tech_stack ? tech_stack.split(',').map(t => t.trim()) : [];

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {image_url && (
        <img
          src={image_url}
          alt={title}
          style={{ borderRadius: 'var(--radius)', height: '180px', objectFit: 'cover', width: '100%' }}
        />
      )}
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>{title}</h3>
          {featured === 1 && (
            <span className="badge" style={{ background: 'rgba(37,99,235,0.2)', color: 'var(--primary)' }}>
              Featured
            </span>
          )}
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>
          {description}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1rem' }}>
          {techs.map(t => <span key={t} className="badge">{t}</span>)}
        </div>
      </div>
      <div style={{ display: 'flex', gap: '0.75rem' }}>
        {github_url && (
          <a href={github_url} target="_blank" rel="noreferrer" className="btn btn-outline" style={{ fontSize: '0.85rem' }}>
            GitHub
          </a>
        )}
        {live_url && (
          <a href={live_url} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ fontSize: '0.85rem' }}>
            Live Demo
          </a>
        )}
      </div>
    </div>
  );
}
