import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const { admin, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const links = [
    { to: '/',         label: 'Home'     },
    { to: '/projects', label: 'Projects' },
    { to: '/skills',   label: 'Skills'   },
    { to: '/contact',  label: 'Contact'  },
  ];

  return (
    <nav className="navbar">
      <div className="container nav-inner">
        <Link to="/" className="nav-logo">{'<YourName />'}</Link>

        <button className="nav-toggle" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? '✕' : '☰'}
        </button>

        <ul className={`nav-links ${open ? 'open' : ''}`}>
          {links.map(l => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) => isActive ? 'active' : ''}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </NavLink>
            </li>
          ))}
          {admin && (
            <>
              <li><NavLink to="/admin" onClick={() => setOpen(false)}>Dashboard</NavLink></li>
              <li><button className="btn btn-outline btn-sm" onClick={logout}>Logout</button></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
