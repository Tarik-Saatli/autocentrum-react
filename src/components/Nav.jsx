import { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import logo from '/images/logo.png';
import { useAuth } from '../context/AuthContext';

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { token, logout } = useAuth();

  const handleLogoClick = () => {
    navigate('/');
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setVisible(currentY < lastY.current || currentY < 10);
      setScrolled(currentY > 40);
      lastY.current = currentY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { to: '/', label: 'Home' },
    { to: '/over-ons', label: 'Over ons' },
    { to: '/diensten', label: 'Onze diensten' },
    { to: '/aanbod', label: 'Te koop' },
    { to: '/contact', label: 'Contact' },
    { to: '/cars', label: 'Carlist' },
    ...(token
      ? [{ action: logout, label: 'Uitloggen' }]
      : [{ to: '/cars', label: 'Inloggen' }]),
  ];

  const renderLink = (link) => (
    <NavLink
      key={link.to || link.label}
      to={link.to || location.pathname}
      end={link.to === '/'}
      className={({ isActive }) => (isActive ? 'active' : '')}
      onClick={link.action}
    >
      {link.label}
    </NavLink>
  );

  return (
    <>
      <nav className={`site-nav${visible ? '' : ' nav-hidden'}${scrolled ? ' nav-scrolled' : ' nav-top'}`}>
        <div className='nav-inner'>
          <div className='nav-logo' onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
            <img src={logo} alt='Autocentrum Den Haag' width="160" height="48" />
          </div>

          <div className='nav-right'>
            <ul className='nav-links'>
              {links.map((l) => (
                <li key={l.to || l.label}>{renderLink(l)}</li>
              ))}
            </ul>
            <button
              type="button"
              className='hamburger'
              aria-label={open ? 'Menu sluiten' : 'Menu openen'}
              aria-expanded={open}
              onClick={() => setOpen(!open)}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobiel menu */}
      <div className={`mobile-menu${open ? ' open' : ''}`} onClick={() => setOpen(false)}>
        {links.map(renderLink)}
      </div>
    </>
  );
}
