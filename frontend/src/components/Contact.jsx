import { useState } from 'react';
import { profile } from '../profileData';
import { sendMessage } from '../api';

const initialForm = { name: '', email: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError('Please fill in every field before sending.');
      return;
    }

    setSending(true);
    try {
      await sendMessage(form);
      setSent(true);
      setForm(initialForm);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="section section--ink" id="contact">
      <div className="wrap">
        <div className="section__header">
          <span className="section__index">FIG. 05</span>
          <h2>Contact</h2>
          <span className="rule" aria-hidden="true" />
        </div>

        <div className="contact">
          <div className="contact__intro">
            <p>
              Have a project in mind, or just want to say hello? Send a message and
              I'll get back to you — it's stored straight into the database behind
              this site.
            </p>
            <div className="contact__detail">
              <span className="mono-label">Email</span>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </div>
            <div className="contact__detail">
              <span className="mono-label">GitHub</span>
              <a href={profile.github} target="_blank" rel="noreferrer">
                {profile.github.replace('https://', '')}
              </a>
            </div>
          </div>

          <form className="form" onSubmit={handleSubmit}>
            <div className="form__row">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Jane Doe"
                autoComplete="name"
              />
            </div>

            <div className="form__row">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="jane@example.com"
                autoComplete="email"
              />
            </div>

            <div className="form__row">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="What would you like to build?"
              />
            </div>

            {error && <p className="form__error">{error}</p>}

            <button className="btn btn--primary" type="submit" disabled={sending}>
              {sending ? 'Sending…' : 'Send message →'}
            </button>

            {sent && (
              <p className="form__success">
                Message received — thanks for reaching out, I'll reply soon.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
