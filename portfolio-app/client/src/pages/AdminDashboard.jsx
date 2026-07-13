import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api';

const TABS = ['Projects', 'Skills', 'Messages'];

export default function AdminDashboard() {
  const { admin, logout } = useAuth();
  const [tab, setTab]   = useState('Projects');

  return (
    <main className="page">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 700 }}>Dashboard</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Welcome, {admin?.username}</p>
          </div>
          <button className="btn btn-outline" onClick={logout}>Logout</button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '0' }}>
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '0.6rem 1rem', fontWeight: 500,
                color: tab === t ? 'var(--primary)' : 'var(--text-muted)',
                borderBottom: tab === t ? '2px solid var(--primary)' : '2px solid transparent',
                marginBottom: '-1px', fontSize: '0.95rem',
              }}>
              {t}
            </button>
          ))}
        </div>

        {tab === 'Projects' && <ProjectsAdmin />}
        {tab === 'Skills'   && <SkillsAdmin />}
        {tab === 'Messages' && <MessagesAdmin />}
      </div>
    </main>
  );
}

// ── Projects management ──────────────────────────────────────────
function ProjectsAdmin() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', tech_stack: '', github_url: '', live_url: '', featured: false });
  const [editing, setEditing] = useState(null);
  const [msg, setMsg] = useState('');

  const load = () => api.get('/projects').then(r => setProjects(r.data)).catch(console.error);
  useEffect(() => { load(); }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    const data = new FormData(e.target);
    try {
      if (editing) {
        await api.put(`/projects/${editing}`, data);
        setMsg('Project updated.');
      } else {
        await api.post('/projects', data);
        setMsg('Project added.');
      }
      setForm({ title: '', description: '', tech_stack: '', github_url: '', live_url: '', featured: false });
      setEditing(null);
      e.target.reset();
      load();
    } catch (err) {
      setMsg(err.response?.data?.error || 'Error saving project.');
    }
  };

  const handleEdit = p => {
    setEditing(p.id);
    setForm(p);
  };

  const handleDelete = async id => {
    if (!confirm('Delete this project?')) return;
    await api.delete(`/projects/${id}`);
    load();
  };

  return (
    <div>
      {msg && <div className="alert alert-success" style={{ marginBottom: '1rem' }}>{msg}</div>}

      <form onSubmit={handleSubmit} className="card" style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem', fontWeight: 600 }}>{editing ? 'Edit project' : 'Add project'}</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group"><label>Title *</label>
            <input name="title" defaultValue={form.title} required /></div>
          <div className="form-group"><label>Tech stack</label>
            <input name="tech_stack" defaultValue={form.tech_stack} placeholder="React, Node.js, MySQL" /></div>
          <div className="form-group"><label>GitHub URL</label>
            <input name="github_url" defaultValue={form.github_url} type="url" /></div>
          <div className="form-group"><label>Live URL</label>
            <input name="live_url" defaultValue={form.live_url} type="url" /></div>
        </div>
        <div className="form-group"><label>Description</label>
          <textarea name="description" defaultValue={form.description} /></div>
        <div className="form-group"><label>Project image</label>
          <input name="image" type="file" accept="image/*" style={{ padding: '0.4rem 0', border: 'none', background: 'none', color: 'var(--text-muted)' }} /></div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button type="submit" className="btn btn-primary">{editing ? 'Update' : 'Add project'}</button>
          {editing && <button type="button" className="btn btn-outline" onClick={() => { setEditing(null); setForm({}); }}>Cancel</button>}
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', marginBottom: 0 }}>
            <input name="featured" type="checkbox" defaultChecked={form.featured} style={{ width: 'auto' }} />
            <span style={{ fontSize: '0.9rem' }}>Featured</span>
          </label>
        </div>
      </form>

      <div className="grid-3">
        {projects.map(p => (
          <div key={p.id} className="card">
            <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{p.title}</p>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>{p.tech_stack}</p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button className="btn btn-outline" style={{ fontSize: '0.8rem', padding: '0.3rem 0.75rem' }} onClick={() => handleEdit(p)}>Edit</button>
              <button className="btn btn-danger"  style={{ fontSize: '0.8rem', padding: '0.3rem 0.75rem' }} onClick={() => handleDelete(p.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Skills management ────────────────────────────────────────────
function SkillsAdmin() {
  const [skills, setSkills] = useState([]);
  const [form, setForm]     = useState({ name: '', category: '', level: 3 });

  const load = () => api.get('/skills').then(r => setSkills(r.data)).catch(console.error);
  useEffect(() => { load(); }, []);

  const handleAdd = async e => {
    e.preventDefault();
    await api.post('/skills', form);
    setForm({ name: '', category: '', level: 3 });
    load();
  };

  const handleDelete = async id => {
    await api.delete(`/skills/${id}`);
    load();
  };

  return (
    <div>
      <form onSubmit={handleAdd} className="card" style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
        <div className="form-group" style={{ marginBottom: 0, flex: '1 1 150px' }}>
          <label>Skill name *</label>
          <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
        </div>
        <div className="form-group" style={{ marginBottom: 0, flex: '1 1 150px' }}>
          <label>Category</label>
          <input value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} placeholder="Frontend, Backend..." />
        </div>
        <div className="form-group" style={{ marginBottom: 0, flex: '1 1 100px' }}>
          <label>Level (1–4)</label>
          <select value={form.level} onChange={e => setForm({ ...form, level: +e.target.value })}>
            <option value={1}>1 — Beginner</option>
            <option value={2}>2 — Intermediate</option>
            <option value={3}>3 — Advanced</option>
            <option value={4}>4 — Expert</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Add skill</button>
      </form>

      <div className="grid-2">
        {skills.map(s => (
          <div key={s.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.85rem 1rem' }}>
            <div>
              <span style={{ fontWeight: 500 }}>{s.name}</span>
              <span className="badge" style={{ marginLeft: '0.5rem' }}>{s.category}</span>
            </div>
            <button className="btn btn-danger" style={{ fontSize: '0.8rem', padding: '0.25rem 0.65rem' }} onClick={() => handleDelete(s.id)}>✕</button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Messages management ──────────────────────────────────────────
function MessagesAdmin() {
  const [messages, setMessages] = useState([]);
  const load = () => api.get('/contact').then(r => setMessages(r.data)).catch(console.error);
  useEffect(() => { load(); }, []);

  const handleDelete = async id => {
    await api.delete(`/contact/${id}`);
    load();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {messages.length === 0 && <p style={{ color: 'var(--text-muted)' }}>No messages yet.</p>}
      {messages.map(m => (
        <div key={m.id} className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <div>
              <strong>{m.name}</strong>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginLeft: '0.5rem' }}>{m.email}</span>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {new Date(m.sent_at).toLocaleDateString()}
              </span>
              <button className="btn btn-danger" style={{ fontSize: '0.8rem', padding: '0.25rem 0.65rem' }} onClick={() => handleDelete(m.id)}>Delete</button>
            </div>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{m.message}</p>
        </div>
      ))}
    </div>
  );
}
