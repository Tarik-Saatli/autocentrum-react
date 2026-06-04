import { Link } from 'react-router-dom'
import logo from '/images/logo.png'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer>
      <div className="footer-top">
        <div className="f-brand">
          <img src={logo} alt="Autocentrum Den Haag" />
          <p>Uw partner voor onderhoud, reparatie en verkoop van kwaliteitsauto's. Betrouwbaar, eerlijk en altijd gericht op de beste service.</p>
          <div className="f-socials">
            <div className="f-social">📷</div>
            <div className="f-social">f</div>
            <div className="f-social">g</div>
          </div>
        </div>

        <div>
          <h5>Diensten</h5>
          <ul>
            {['Onderhoud','Reparatie','Remmen','Banden & Velgen','Diagnose','Uitlaatsystemen','Accu Service'].map(d => (
              <li key={d}><Link to="/diensten">{d}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h5>Auto's</h5>
          <ul>
            {['Occasions','Inkoop','Verkoop','Garantie','Financiering'].map(d => (
              <li key={d}><Link to="/aanbod">{d}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h5>Contact</h5>
          <div className="f-ci"><span className="f-ico">📍</span><span>Waterpas 92H<br />2495AM Den Haag</span></div>
          <div className="f-ci"><span className="f-ico">📞</span><a href="tel:0634915487">06 34 91 54 87</a></div>
          <div className="f-ci"><span className="f-ico">✉️</span><a href="mailto:asolmazzz@hotmail.com">asolmazzz@hotmail.com</a></div>
          <div className="f-ci"><span className="f-ico">🕐</span><span>Ma – Vr: 09:00 – 17:30<br />Za: 09:00 – 13:00</span></div>
        </div>

        <div className="f-newsletter">
          <h5>Blijf op de hoogte</h5>
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
