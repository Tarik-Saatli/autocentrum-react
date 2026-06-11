import { useState } from 'react'
import { Link } from 'react-router-dom'

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
const IconMsg = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
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

export default function Contact() {
  const [form, setForm] = useState({ naam: '', telefoon: '', email: '', onderwerp: 'Auto Reparatie', bericht: '' })
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.naam || !form.email || !form.bericht) {
      setError('Vul alle verplichte velden in.')
      return
    }
    setError('')
    setSuccess(true)
  }

  return (
    <>
      <div className="page-hero contact-hero">
        <div className="breadcrumb"><Link to="/">Home</Link><span className="sep">/</span><span>Contact</span></div>
        <h1>Contact</h1>
        <p>Neem gerust contact met ons op. Wij reageren altijd dezelfde dag nog.</p>
      </div>

      <section className="section-dark">
        <div className="contact-layout">
          <div className="contact-info">
            <h2>Wij staan voor u klaar</h2>
            <p>Bel ons, stuur een WhatsApp of vul het formulier in.</p>
            {[
              { ico: <IconPin />, lbl: 'Adres', val: 'Waterpas 92H, 2495AM Den Haag' },
              { ico: <IconPhone />, lbl: 'Telefoon', val: <a href="tel:0634915487">06 34 91 54 87</a> },
              { ico: <IconMail />, lbl: 'E-mail', val: <a href="mailto:asolmazzz@hotmail.com">asolmazzz@hotmail.com</a> },
              { ico: <IconClock />, lbl: 'Openingstijden', val: <span>Ma – Vr: 09:00 – 17:30<br />Za: Gesloten<br />Zo: Gesloten</span> },
            ].map(c => (
              <div className="c-item" key={c.lbl}>
                <div className="c-ico-box">{c.ico}</div>
                <div><div className="c-lbl">{c.lbl}</div><div className="c-val">{c.val}</div></div>
              </div>
            ))}
          </div>

          <div className="contact-form">
            <h3>Stuur ons een bericht</h3>
            {success && <div className="alert-success">✅ Bedankt! Wij nemen zo snel mogelijk contact met u op.</div>}
            {error && <div className="alert-error">⚠️ {error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="f-row">
                <div className="f-group">
                  <label>Naam *</label>
                  <input type="text" placeholder="Uw naam" value={form.naam} onChange={e => setForm({...form, naam: e.target.value})} required />
                </div>
                <div className="f-group">
                  <label>Telefoon</label>
                  <input type="tel" placeholder="06 00 00 00 00" value={form.telefoon} onChange={e => setForm({...form, telefoon: e.target.value})} />
                </div>
              </div>
              <div className="f-group">
                <label>E-mail *</label>
                <input type="email" placeholder="uw@email.nl" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
              </div>
              <div className="f-group">
                <label>Onderwerp</label>
                <select value={form.onderwerp} onChange={e => setForm({...form, onderwerp: e.target.value})}>
                  <option>Auto Reparatie</option>
                  <option>Auto Inkoop</option>
                  <option>Auto Verkoop</option>
                  <option>Onderhoud</option>
                  <option>Anders</option>
                </select>
              </div>
              <div className="f-group">
                <label>Bericht *</label>
                <textarea placeholder="Hoe kunnen wij u helpen?" value={form.bericht} onChange={e => setForm({...form, bericht: e.target.value})} required />
              </div>
              <button type="submit" className="btn-gold" style={{width:'100%', justifyContent:'center', padding:'15px', fontSize:'15px'}}>
                Verstuur Bericht →
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
