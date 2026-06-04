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
        <h1>Over Ons</h1>
        <p>Bij Autocentrum Den Haag begrijpen we hoe belangrijk uw voertuig voor u is.</p>
      </div>

      <section className="section-dark">
        <div className="over-grid">
          <div className="over-img-box">🏭</div>
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
            <div className="stat-item" key={s.label}>
              <div className="s-ico">{s.ico}</div>
              <div className="s-num">{s.num}</div>
              <div><div className="s-label">{s.label}</div><div className="s-sub">{s.sub}</div></div>
            </div>
          ))}
        </div>
        <div className="why-col">
          <div className="why-placeholder">🔧</div>
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
