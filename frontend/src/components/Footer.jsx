import { profile } from '../profileData';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__inner">
        <p>© {new Date().getFullYear()} {profile.name} — built with React, Node.js &amp; MySQL.</p>
        <ul className="footer__links">
          <li>
            <a href={profile.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </li>
          <li>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </li>
          <li>
            <a href={`mailto:${profile.email}`}>Email</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
