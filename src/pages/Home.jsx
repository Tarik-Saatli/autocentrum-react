import { Link } from 'react-router-dom';
import heroImg from '/images/achtergrond.webp';
import garageImg from '/images/garage.webp';

const cars = [
  {
    name: 'BMW 1 Serie',
    trim: '116i Sport Executive',
    year: '2016',
    fuel: 'Benzine',
    km: '98.765 km',
    trans: 'Handgeschakeld',
    price: '€ 14.950,–',
    imagePosition: 'center 62%',
  },
  {
    name: 'Audi A3 Sportback',
    trim: '1.4 TFSI CoD Ambition Pro Line',
    year: '2017',
    fuel: 'Benzine',
    km: '123.456 km',
    trans: 'Handgeschakeld',
    price: '€ 16.950,–',
    imagePosition: 'center 44%',
  },
  {
    name: 'Volkswagen Golf',
    trim: '1.0 TSI Comfortline',
    year: '2016',
    fuel: 'Benzine',
    km: '110.234 km',
    trans: 'Handgeschakeld',
    price: '€ 15.950,–',
    imagePosition: 'center 28%',
  },
];

const IcoOnderhoud = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
  </svg>
)
const IcoReparatie = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
  </svg>
)
const IcoRemmen = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="8"/><line x1="12" y1="16" x2="12" y2="22"/><line x1="2" y1="12" x2="8" y2="12"/><line x1="16" y1="12" x2="22" y2="12"/>
  </svg>
)
const IcoBanden = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="2" x2="12" y2="9"/><line x1="12" y1="15" x2="12" y2="22"/><line x1="2" y1="12" x2="9" y2="12"/><line x1="15" y1="12" x2="22" y2="12"/>
  </svg>
)
const IcoDiagnose = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
  </svg>
)
const IcoUitlaat = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14"/><path d="M5 12a7 7 0 0 0 7 7"/><path d="M5 12a7 7 0 0 1 7-7"/><path d="M19 12c0 3.87-3.13 7-7 7"/><line x1="19" y1="12" x2="23" y2="12"/>
  </svg>
)
const IcoAccu = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/>
  </svg>
)
const IcoAirco = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v20M2 6h20M2 18h20M6 2l6 4 6-4M6 22l6-4 6 4"/>
  </svg>
)

const diensten = [
  { ico: <IcoOnderhoud />, title: 'Onderhoud', desc: 'Periodiek onderhoud volgens fabrieksschema voor een optimale levensduur.' },
  { ico: <IcoReparatie />, title: 'Reparatie', desc: 'Van kleine reparaties tot complexe storingen, wij lossen het vakkundig op.' },
  { ico: <IcoRemmen />, title: 'Remmen', desc: 'Controle, reparatie en vervanging van remmen voor maximale veiligheid.' },
  { ico: <IcoBanden />, title: 'Banden & Velgen', desc: 'Verkoop, montage en balanceren van banden en lichtmetalen velgen.' },
  { ico: <IcoDiagnose />, title: 'Diagnose', desc: 'Geavanceerde diagnoseapparatuur voor het snel vinden van storingen.' },
  { ico: <IcoUitlaat />, title: 'Uitlaatsystemen', desc: 'Reparatie en vervanging van uitlaten voor optimale prestaties en geluid.' },
  { ico: <IcoAccu />, title: 'Accu Service', desc: 'Testen, vervangen en advies voor een betrouwbare start, elke keer.' },
  { ico: <IcoAirco />, title: 'Airco Service', desc: 'Voor een optimaal werkende airconditioning en een fris interieur.' },
];

const stats = [
  { ico: '🏆', num: '15+', label: 'Jaar ervaring' },
  { ico: '😊', num: '2500+', label: 'Tevreden klanten' },
  { ico: '✅', num: '98%', label: 'Klanttevredenheid' },
  { ico: '⭐', num: '4.9/5', label: 'Gemiddelde beoordeling' },
];

export default function Home() {
  return (
    <>
      <section className='hero'>
        <div className='hero-left'>
          <div className='hero-eyebrow'>PERFORMANCE. ZORG. VERTROUWEN.</div>
          <h1>
            Auto's Kopen, Verkopen en Repareren:
            <br />
            Alles Onder Eén Dak<span className='dot'>!</span>
          </h1>
          <p>
            Van regulier onderhoud tot complexe reparaties;
            <br />
            wij brengen uw auto weer in topconditie.
          </p>
          <div className='hero-actions'>
            <Link to='/diensten' className='hero-btn'>
              Ontdek onze diensten →
            </Link>
          </div>
        </div>
        <div className='hero-right'>
          <img
            src={heroImg}
            alt='Autocentrum Den Haag werkplaats'
            width="1200"
            height="800"
            fetchpriority="high"
            decoding="async"
            onError={(e) => (e.target.style.display = 'none')}
          />
        </div>
        <div className='hero-badges'>
          {[
            {
              ico: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                </svg>
              ),
              title: 'Ervaren specialisten',
              sub: 'Vaktechnisch personeel',
            },
            {
              ico: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/>
                </svg>
              ),
              title: 'Moderne apparatuur',
              sub: 'De beste diagnosetools',
            },
            {
              ico: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
                </svg>
              ),
              title: 'Eerlijke prijzen',
              sub: 'Transparant & duidelijk',
            },
            {
              ico: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              ),
              title: 'Tevreden klanten',
              sub: '98% beveelt ons aan',
            },
          ].map((b) => (
            <div className='hero-badge' key={b.title}>
              <div className='b-icon'>{b.ico}</div>
              <div>
                <div className='b-title'>{b.title}</div>
                <div className='b-sub'>{b.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className='diensten-section'>
        <div className='diensten-header'>
          <div className='eyebrow' style={{ color: 'var(--gold)' }}>
            Onze diensten
          </div>
          <h2 className='diensten-title'>
            Alles voor uw auto,
            <br />
            onder één dak.
            <span className='title-bar' />
          </h2>
        </div>
        <div className='diensten-grid-8'>
          {diensten.map((d) => (
            <Link to='/diensten' className='d-card' key={d.title}>
              <div className='d-ico'>{d.ico}</div>
              <div className='d-text'>
                <h3>{d.title}</h3>
                <p>{d.desc}</p>
                <div className='d-arrow'>→</div>
              </div>
            </Link>
          ))}
        </div>
        <div style={{ textAlign: 'center' }}>
          <Link to='/diensten' className='btn-dark-solid'>
            Bekijk alle diensten →
          </Link>
        </div>
      </section>

      <section className='occasions-section'>
        <div className='section-row'>
          <div>
            <div className='eyebrow'>Te koop</div>
            <h2 className='title-white'>
              Kwaliteitsoccasions
              <br />
              met garantie.
            </h2>
          </div>
          <Link to='/aanbod' className='link-gold'>
            Bekijk alle auto's →
          </Link>
        </div>
        <div className='cars-grid'>
          {cars.map((c) => (
            <div className='car-card' key={c.name}>
              <div className='car-img'>
                <img
                  src={heroImg}
                  alt={c.name}
                  style={{ objectPosition: c.imagePosition }}
                />

              </div>
              <div className='car-body'>
                <h3>{c.name}</h3>
                <div className='car-trim'>{c.trim}</div>
                <div className='car-specs'>
                  <span>{c.year}</span>
                  <span>{c.fuel}</span>
                  <span>{c.km}</span>
                  <span>{c.trans}</span>
                </div>
                <div className='car-price'>{c.price}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className='cta-strip'>
        <div className='cta-text'>
          <div className='eyebrow'>Afspraak maken</div>
          <h2>
            Klaar voor
            <br />
            zorgeloos rijden?
          </h2>
          <p>Plan vandaag nog een afspraak en ervaar onze service zelf.</p>
          <Link to='/contact' className='btn-black'>
            Plan direct een afspraak →
          </Link>
        </div>
        <div className='cta-img-box'>
          <img
            src={garageImg}
            alt='Werkplaats impressie Autocentrum Den Haag'
            width="800"
            height="250"
            loading="lazy"
            decoding="async"
            style={{ objectPosition: 'right 50%' }}
          />
        </div>
      </section>

      <div className='stats-why'>
        <div className='stats-col'>
          <div className='eyebrow' style={{ marginBottom: '24px' }}>
            Waarom kiezen voor ons?
          </div>
          {stats.map((s) => (
            <div className='stat-card' key={s.label}>
              <div>
                <div className='stat-num'>{s.num}</div>
                <div className='stat-label'>{s.label}</div>
              </div>
            </div>
          ))}
        </div>
        <div className='why-col'>
          <img
            className='why-image'
            src={heroImg}
            alt='Autocentrum detail'
            style={{ objectPosition: 'center 52%' }}
          />
          <div className='why-bg' />
          <div className='why-content'>
            <div className='eyebrow'>Waarom kiezen voor ons?</div>
            <h2>
              Betrouwbaar.
              <br />
              Vakkundig.
              <br />
              Persoonlijk.
            </h2>
            <p>
              Wij combineren vakmanschap met persoonlijke service. Uw auto is
              bij ons in goede handen.
            </p>
            <Link to='/over-ons' className='btn-gold'>
              Meer over ons →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
