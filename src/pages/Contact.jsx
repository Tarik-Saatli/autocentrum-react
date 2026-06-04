import { useState } from 'react'
import { Link } from 'react-router-dom'

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
      <div className="page-hero">
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
              { ico: '📍', lbl: 'Adres', val: 'Waterpas 92H, 2495AM Den Haag' },
              { ico: '📞', lbl: 'Telefoon', val: <a href="tel:0634915487">06 34 91 54 87</a> },
              { ico: '💬', lbl: 'WhatsApp', val: <a href="https://wa.me/31634915487">+31 6 34 91 54 87</a> },
              { ico: '✉️', lbl: 'E-mail', val: <a href="mailto:asolmazzz@hotmail.com">asolmazzz@hotmail.com</a> },
            ].map(c => (
              <div className="c-item" key={c.lbl}>
                <div className="c-ico-box">{c.ico}</div>
                <div><div className="c-lbl">{c.lbl}</div><div className="c-val">{c.val}</div></div>
              </div>
            ))}
            <div className="hours-table">
              <h4>Openingstijden</h4>
              {[
                ['Maandag – Vrijdag', '09:00 – 18:00'],
                ['Zaterdag', 'Gesloten'],
                ['Zondag', 'Gesloten'],
              ].map(([day, time]) => (
                <div className="h-row" key={day}>
                  <span className="day">{day}</span>
                  <span className="time">{time}</span>
                </div>
              ))}
            </div>
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
