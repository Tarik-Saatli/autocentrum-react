import { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '/images/logo.png';

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);

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
  ];

  return (
    <>
      <nav className={`site-nav${visible ? '' : ' nav-hidden'}${scrolled ? ' nav-scrolled' : ' nav-top'}`}>
        <div className='nav-inner'>
          <Link to='/' className='nav-logo'>
            <img src={logo} alt='Autocentrum Den Haag' width="160" height="48" />
          </Link>

          <div className='nav-right'>
            <ul className='nav-links'>
              {links.map((l) => (
                <li key={l.to}>
                  <NavLink to={l.to} end={l.to === '/'} className={({ isActive }) => (isActive ? 'active' : '')}>
                    {l.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className='hamburger' onClick={() => setOpen(!open)}>
              <span /><span /><span />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobiel menu */}
      <div className={`mobile-menu${open ? ' open' : ''}`} onClick={() => setOpen(false)}>
        {links.map((l) => (
          <NavLink key={l.to} to={l.to} end={l.to === '/'} className={({ isActive }) => (isActive ? 'active' : '')}>
            {l.label}
          </NavLink>
        ))}
      </div>
    </>
  );
}
