import { Link } from 'react-router-dom'

const stats = [
  { ico: '🏆', num: '15+', label: 'Jaar ervaring', sub: 'In de autobranche' },
  { ico: '😊', num: '2500+', label: 'Tevreden klanten', sub: 'Terugkerende klanten' },
  { ico: '✅', num: '98%', label: 'Klanttevredenheid', sub: 'Beveelt ons aan' },
  { ico: '⭐', num: '4.9/5', label: 'Gemiddelde beoordeling', sub: 'Op basis van reviews' },
]

export default function OverOns() {
  return (
    <>
      <div className="page-hero">
        <div className="breadcrumb"><Link to="/">Home</Link><span className="sep">/</span><span>Over Ons</span></div>
        <h1>Over ons</h1>
        <p>Bij Autocentrum Den Haag begrijpen we hoe belangrijk uw voertuig voor u is.</p>
      </div>

      <section className="section-dark">
        <div className="over-grid">
          <div className="over-img-box">
            <iframe
              title="Locatie Autocentrum Den Haag"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1226.15!2d4.33079!3d52.04771!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c5b5f7b7b7b7b7%3A0x0!2sWaterpas+92H%2C+2495+AM+Den+Haag!5e0!3m2!1snl!2snl!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0, display: 'block' }}
              allowFullScreen=""
              loading="eager"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="over-text">
            <div className="eyebrow">Wie zijn wij</div>
            <h2>Uw betrouwbare partner in Den Haag</h2>
            <p>Bij Autocentrum Den Haag begrijpen we hoe belangrijk uw voertuig voor u is. Ons ervaren team van monteurs combineert vakmanschap met moderne technologie om uw auto in topconditie te houden.</p>
            <p>Bij Autocentrum Den Haag staat klanttevredenheid voorop. Wij bieden transparante prijzen, snelle service en persoonlijke aandacht — met veiligheid en comfort als onze hoogste prioriteit.</p>
            <div className="values-list">
              {['Vakmanschap','Moderne technologie','Transparante prijzen','Snelle service','Persoonlijke aandacht','Veiligheid voorop'].map(v => (
                <div className="v-item" key={v}>{v}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="stats-why">
        <div className="stats-col">
          <div className="eyebrow">Onze cijfers</div>
          {stats.map(s => (
            <div className="stat-card" key={s.label}>
              <div>
                <div className="stat-num">{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="why-col">
          <div className="why-bg" />
          <div className="why-content">
            <div className="eyebrow">Onze missie</div>
            <h2>Betrouwbaar.<br />Vakkundig.<br />Persoonlijk.</h2>
            <p>Wij combineren vakmanschap met persoonlijke service. Uw auto is bij ons in goede handen — altijd eerlijk en transparant.</p>
            <Link to="/contact" className="btn-gold">Neem contact op →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
