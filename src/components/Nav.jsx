import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '/images/logo.png';

export default function Nav() {
  const [open, setOpen] = useState(false);

  const links = [
    { to: '/', label: 'Home' },
    { to: '/over-ons', label: 'Over Ons' },
    { to: '/diensten', label: 'Onze Diensten' },
    { to: '/aanbod', label: 'Aanbod' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <nav className='site-nav'>
        <div className='nav-inner'>
          <Link to='/' className='nav-logo'>
            <img src={logo} alt='Autocentrum Den Haag' />
          </Link>

          <div className='nav-right'>
            <div className='hamburger' onClick={() => setOpen(!open)}>
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobiel menu */}
      <div
        className={`mobile-menu${open ? ' open' : ''}`}
        onClick={() => setOpen(false)}
      >
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.to === '/'}
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            {l.label}
          </NavLink>
        ))}
      </div>
    </>
  );
}
