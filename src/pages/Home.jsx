import { Link } from 'react-router-dom';
import heroImg from '/images/hero.png';

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

const diensten = [
  {
    ico: '🔧',
    title: 'Onderhoud',
    desc: 'Periodiek onderhoud volgens fabrieksschema voor een optimale levensduur.',
  },
  {
    ico: '🔩',
    title: 'Reparatie',
    desc: 'Van kleine reparaties tot complexe storingen, wij lossen het vakkundig op.',
  },
  {
    ico: '🛑',
    title: 'Remmen',
    desc: 'Controle, reparatie en vervanging van remmen voor maximale veiligheid.',
  },
  {
    ico: '🛞',
    title: 'Banden & Velgen',
    desc: 'Verkoop, montage en balanceren van banden en lichtmetalen velgen.',
  },
  {
    ico: '🏎️',
    title: 'Diagnose',
    desc: 'Geavanceerde diagnoseapparatuur voor het snel vinden van storingen.',
  },
  {
    ico: '⚙️',
    title: 'Uitlaatsystemen',
    desc: 'Reparatie en vervanging van uitlaten voor optimale prestaties en geluid.',
  },
  {
    ico: '🔋',
    title: 'Accu Service',
    desc: 'Testen, vervangen en advies voor een betrouwbare start, elke keer.',
  },
  {
    ico: '❄️',
    title: 'Airco Service',
    desc: 'Voor een optimaal werkende airconditioning en een fris interieur.',
  },
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
            Meer dan
            <br />
            onderhoud.
            <br />
            Pure prestaties<span className='dot'>.</span>
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
            <Link to='/contact' className='hero-btn hero-btn-ghost'>
              Bekijk onze werkplaats
            </Link>
          </div>
        </div>
        <div className='hero-right'>
          <img
            src={heroImg}
            alt='Autocentrum Den Haag'
            onError={(e) => (e.target.style.display = 'none')}
          />
        </div>
        <div className='hero-badges'>
          {[
            {
              ico: '🛡️',
              title: 'Ervaren specialisten',
              sub: 'Vaktechnisch personeel',
            },
            {
              ico: '🔬',
              title: 'Moderne apparatuur',
              sub: 'De beste diagnosetools',
            },
            {
              ico: '💰',
              title: 'Eerlijke prijzen',
              sub: 'Transparant & duidelijk',
            },
            {
              ico: '😊',
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

      <section className='occasions-section'>
        <div className='section-row'>
          <div>
            <div className='eyebrow'>Auto's te koop</div>
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
                <button className='car-fav'>♡</button>
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
            src={heroImg}
            alt='Werkplaats impressie'
            style={{ objectPosition: 'center 75%' }}
          />
        </div>
      </section>

      <section className='diensten-section'>
        <div className='diensten-header'>
          <div className='eyebrow' style={{ color: 'var(--gold)' }}>
            Diensten
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
              <h3>{d.title}</h3>
              <p>{d.desc}</p>
              <div className='d-arrow'>→</div>
            </Link>
          ))}
        </div>
        <div style={{ textAlign: 'center' }}>
          <Link to='/diensten' className='btn-dark-solid'>
            Bekijk alle diensten →
          </Link>
        </div>
      </section>

      <div className='stats-why'>
        <div className='stats-col'>
          <div className='eyebrow' style={{ marginBottom: '24px' }}>
            Waarom kiezen voor ons?
          </div>
          {stats.map((s) => (
            <div className='stat-card' key={s.label}>
              <span className='stat-ico'>{s.ico}</span>
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
