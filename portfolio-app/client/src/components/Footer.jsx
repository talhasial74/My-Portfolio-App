export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: '2rem 1.5rem',
      textAlign: 'center',
      color: 'var(--text-muted)',
      fontSize: '0.875rem',
    }}>
      <p>Built with React, Node.js & MySQL &mdash; {new Date().getFullYear()}</p>
      <p style={{ marginTop: '0.4rem' }}>
        <a href="https://github.com/yourname" target="_blank" rel="noreferrer">GitHub</a>
        {' · '}
        <a href="https://linkedin.com/in/yourname" target="_blank" rel="noreferrer">LinkedIn</a>
      </p>
    </footer>
  );
}
