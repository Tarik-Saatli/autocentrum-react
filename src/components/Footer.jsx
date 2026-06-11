import { Link } from 'react-router-dom'
import logo from '/images/logo.png'

const IconPin = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
)
const IconPhone = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.19h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.78a16 16 0 0 0 5.94 5.94l.86-.86a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.01z"/>
  </svg>
)
const IconMail = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
  </svg>
)
const IconClock = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
)

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer>
      <div className="footer-top">
        <div className="f-brand">
          <img src={logo} alt="Autocentrum Den Haag" width="160" height="48" loading="lazy" />
          <p>Uw partner voor onderhoud, reparatie en verkoop van kwaliteitsauto's. Betrouwbaar, eerlijk en altijd gericht op de beste service.</p>
        </div>

        <div>
          <h3 className="f-heading">Contact</h3>
          <div className="f-contact-grid">
            <div className="f-ci"><span className="f-ico"><IconPin /></span><span>Waterpas 92H<br />2495AM Den Haag</span></div>
            <div className="f-ci"><span className="f-ico"><IconMail /></span><a href="mailto:asolmazzz@hotmail.com">asolmazzz@hotmail.com</a></div>
            <div className="f-ci"><span className="f-ico"><IconPhone /></span><a href="tel:0634915487">06 34 91 54 87</a></div>
            <div className="f-ci"><span className="f-ico"><IconClock /></span><span>Ma – Vr: 09:00 – 17:30<br />Za: Gesloten<br />Zo: Gesloten</span></div>
          </div>
        </div>

        <div className="f-newsletter">
          <h3 className="f-heading">Blijf op de hoogte</h3>
          <p>Schrijf u in voor tips, acties en het laatste nieuws.</p>
          <div className="newsletter-form">
            <input type="email" placeholder="E-mailadres" />
            <button type="button">→</button>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {year} Autocentrum Den Haag. Alle rechten voorbehouden.</p>
        <nav className="footer-bottom-nav">
          <Link to="/">Home</Link>
          <Link to="/over-ons">Over Ons</Link>
          <Link to="/diensten">Diensten</Link>
          <Link to="/aanbod">Aanbod</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </div>
    </footer>
  )
}
