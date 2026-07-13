import { useState } from 'react';
import api from '../api';

export default function Contact() {
  const [form, setForm]       = useState({ name: '', email: '', message: '' });
  const [status, setStatus]   = useState({ type: '', msg: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', msg: '' });
    try {
      const res = await api.post('/contact', form);
      setStatus({ type: 'success', msg: res.data.message });
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus({ type: 'error', msg: err.response?.data?.error || 'Something went wrong.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page">
      <div className="container" style={{ maxWidth: '600px' }}>
        <h1 className="section-title">Get in touch</h1>
        <p className="section-sub">
          Have a project in mind or just want to say hello? I'd love to hear from you.
        </p>

        {status.msg && (
          <div className={`alert alert-${status.type}`}>{status.msg}</div>
        )}

        <form onSubmit={handleSubmit} className="card">
          <div className="form-group">
            <label htmlFor="name">Your name</label>
            <input id="name" name="name" type="text" placeholder="Jane Smith"
              value={form.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input id="email" name="email" type="email" placeholder="jane@example.com"
              value={form.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" placeholder="Tell me about your project..."
              value={form.message} onChange={handleChange} required />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%' }}>
            {loading ? 'Sending...' : 'Send message'}
          </button>
        </form>

        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <a href="mailto:you@example.com" className="btn btn-outline">Email directly</a>
          <a href="https://linkedin.com/in/yourname" target="_blank" rel="noreferrer" className="btn btn-outline">LinkedIn</a>
          <a href="https://github.com/yourname" target="_blank" rel="noreferrer" className="btn btn-outline">GitHub</a>
        </div>
      </div>
    </main>
  );
}
