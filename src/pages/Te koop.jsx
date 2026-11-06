import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'


const merkModellen = {
  'Alfa Romeo': ['147','156','159','Giulia','Giulietta','Mito','Stelvio','Tonale'],
  'Audi': ['A1','A2','A3','A4','A5','A6','A7','A8','Q2','Q3','Q5','Q7','Q8','RS3','RS4','RS5','RS6','S3','S4','S5','TT'],
  'BMW': ['1 Serie','2 Serie','3 Serie','4 Serie','5 Serie','6 Serie','7 Serie','8 Serie','M2','M3','M4','M5','X1','X2','X3','X4','X5','X6','X7','Z4'],
  'Chevrolet': ['Aveo','Captiva','Cruze','Spark','Trax'],
  'Chrysler': ['300C','Grand Voyager','Pacifica','PT Cruiser','Voyager'],
  'Citroën': ['Berlingo','C1','C2','C3','C3 Aircross','C3 Picasso','C4','C4 Cactus','C4 Picasso','C5','C5 Aircross','DS3','DS4','DS5','Xsara Picasso'],
  'Dacia': ['Duster','Jogger','Logan','Sandero','Spring'],
  'Fiat': ['124 Spider','500','500L','500X','Bravo','Doblo','Grande Punto','Panda','Punto','Stilo','Tipo'],
  'Ford': ['B-Max','C-Max','EcoSport','Edge','Explorer','Fiesta','Focus','Fusion','Galaxy','Ka','Kuga','Mondeo','Mustang','Puma','Ranger','S-Max','Transit'],
  'Honda': ['Accord','Civic','CR-V','HR-V','Jazz','Legend','NSX','Pilot','Ridgeline'],
  'Hyundai': ['i10','i20','i30','i40','IONIQ','ix20','ix35','Kona','Santa Fe','Sonata','Tucson'],
  'Jaguar': ['E-Pace','F-Pace','F-Type','I-Pace','S-Type','X-Type','XE','XF','XJ'],
  'Jeep': ['Cherokee','Compass','Grand Cherokee','Renegade','Wrangler'],
  'Kia': ['Ceed','EV6','Niro','Picanto','ProCeed','Rio','Sorento','Soul','Sportage','Stinger','Stonic','Xceed'],
  'Land Rover': ['Defender','Discovery','Discovery Sport','Freelander','Range Rover','Range Rover Evoque','Range Rover Sport','Range Rover Velar'],
  'Lexus': ['CT','ES','GS','IS','LC','LS','NX','RX','UX'],
  'Mazda': ['2','3','5','6','CX-3','CX-30','CX-5','CX-60','MX-5'],
  'Mercedes-Benz': ['A-Klasse','AMG GT','B-Klasse','C-Klasse','CLA','CLS','E-Klasse','G-Klasse','GLA','GLB','GLC','GLE','GLS','S-Klasse','SL','SLK','Sprinter','V-Klasse'],
  'Mini': ['Cabrio','Clubman','Countryman','Coupe','One','Paceman'],
  'Mitsubishi': ['ASX','Eclipse Cross','Outlander','Pajero','Space Star'],
  'Nissan': ['370Z','Almera','GT-R','Juke','Leaf','Micra','Murano','Navara','Note','Pathfinder','Patrol','Pulsar','Qashqai','Townstar','X-Trail'],
  'Opel': ['Adam','Agila','Antara','Astra','Cascada','Corsa','Crossland','Grandland','Insignia','Meriva','Mokka','Vectra','Vivaro','Zafira'],
  'Peugeot': ['107','108','2008','207','208','3008','301','307','308','4007','4008','5008','508','Expert','Partner','RCZ'],
  'Porsche': ['718','911','Cayenne','Macan','Panamera','Taycan'],
  'Renault': ['Arkana','Austral','Captur','Clio','Espace','Kadjar','Kangoo','Koleos','Laguna','Megane','Scenic','Symbol','Twingo','Zoe'],
  'SEAT': ['Arona','Ateca','Cordoba','Exeo','Ibiza','Leon','Tarraco'],
  'Skoda': ['Fabia','Kamiq','Karoq','Kodiaq','Octavia','Rapid','Scala','Superb','Yeti'],
  'Subaru': ['BRZ','Forester','Impreza','Legacy','Outback','XV'],
  'Suzuki': ['Alto','Baleno','Celerio','Grand Vitara','Ignis','Jimny','Splash','Swift','SX4','Vitara'],
  'Tesla': ['Model 3','Model S','Model X','Model Y'],
  'Toyota': ['Auris','Avensis','Aygo','C-HR','Camry','Corolla','GR86','GT86','Hilux','Land Cruiser','Prius','ProAce','RAV4','Supra','Yaris','Yaris Cross'],
  'Volkswagen': ['Arteon','Caddy','Golf','ID.3','ID.4','ID.5','Lupo','Passat','Polo','Scirocco','Sharan','T-Cross','T-Roc','Tiguan','Touareg','Touran','Up'],
  'Volvo': ['C30','C40','S40','S60','S80','S90','V40','V60','V70','V90','XC40','XC60','XC70','XC90'],
}

const merken = Object.keys(merkModellen).sort()

const suggesties = merken.flatMap(m =>
  [m, ...merkModellen[m].map(model => `${m} ${model}`)]
).sort((a, b) => a.localeCompare(b, 'nl'))

export default function Aanbod() {
  const [cars, setCars] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [zoekterm, setZoekterm] = useState('')
  const [brandstof, setBrandstof] = useState('')
  const [prijs, setPrijs] = useState('')
  const [jaar, setJaar] = useState('')
  const [actief, setActief] = useState({ zoekterm: '', brandstof: '', prijs: '', jaar: '' })

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/cars')
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || "Auto's ophalen is mislukt.")
        }

        setCars(data)
      } catch (fetchError) {
        setError(fetchError.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCars()
  }, [])

  const zoek = () => setActief({ zoekterm, brandstof, prijs, jaar })

  const reset = () => {
    setZoekterm(''); setBrandstof(''); setPrijs(''); setJaar('')
    setActief({ zoekterm: '', brandstof: '', prijs: '', jaar: '' })
  }

  const handleKey = e => { if (e.key === 'Enter') zoek() }

  const gefilterd = cars.filter(c => {
    if (actief.zoekterm) {
      const q = actief.zoekterm.toLowerCase()
      if (!`${c.name} ${c.model} ${c.trim}`.toLowerCase().includes(q)) return false
    }
    if (actief.brandstof && c.fuel !== actief.brandstof) return false
    if (actief.jaar) {
      if (c.year == null) return false
      const y = c.year
      if (actief.jaar === '2020+' && y < 2020) return false
      if (actief.jaar === '2018 – 2020' && (y < 2018 || y > 2020)) return false
      if (actief.jaar === '2015 – 2018' && (y < 2015 || y > 2018)) return false
      if (actief.jaar === 'Voor 2015' && y >= 2015) return false
    }
    if (actief.prijs) {
      const p = c.price
      if (actief.prijs === 'Tot € 10.000' && p >= 10000) return false
      if (actief.prijs === '€ 10.000 – € 15.000' && (p < 10000 || p > 15000)) return false
      if (actief.prijs === '€ 15.000 – € 20.000' && (p < 15000 || p > 20000)) return false
      if (actief.prijs === '€ 20.000+' && p < 20000) return false
    }
    return true
  })

  return (
    <>
      <div className="page-hero">
        <div className="breadcrumb"><Link to="/">Home</Link><span className="sep">/</span><span>Te koop</span></div>
        <h1>Te koop</h1>
        <p>{cars.length} auto's in het actuele aanbod.</p>
      </div>

      <div className="filter-bar">
        <div className="filter-search-wrap">
          <input
            className="filter-search-input"
            list="merk-model-lijst"
            value={zoekterm}
            onChange={e => setZoekterm(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Zoek merk of model..."
          />
          <datalist id="merk-model-lijst">
            {suggesties.map(s => <option key={s} value={s} />)}
          </datalist>
        </div>
        <select value={brandstof} onChange={e => setBrandstof(e.target.value)}>
          <option value="">Alle brandstof</option>
          <option>Benzine</option><option>Diesel</option><option>Hybride</option><option>Elektrisch</option>
        </select>
        <select value={prijs} onChange={e => setPrijs(e.target.value)}>
          <option value="">Alle prijzen</option>
          <option>Tot € 10.000</option><option>€ 10.000 – € 15.000</option><option>€ 15.000 – € 20.000</option><option>€ 20.000+</option>
        </select>
        <select value={jaar} onChange={e => setJaar(e.target.value)}>
          <option value="">Alle jaren</option>
          <option>2020+</option><option>2018 – 2020</option><option>2015 – 2018</option><option>Voor 2015</option>
        </select>
        <button className="filter-zoek-btn" onClick={zoek}>Zoeken</button>
        <button className="filter-reset-btn" onClick={reset}>Reset</button>
      </div>

      <section className="section-dark">
        {isLoading ? (
          <p className="aanbod-notice">Auto's laden...</p>
        ) : error ? (
          <p className="error">Er ging iets mis: {error}</p>
        ) : gefilterd.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.68)', padding: '40px 0' }}>
            Geen auto's gevonden met deze filters.
          </p>
        ) : (
          <div className="aanbod-grid">
            {gefilterd.map(c => (
              <Link className="car-card car-card-link" key={c._id} to={`/aanbod/${c._id}`}>
                <div className="car-img car-placeholder" aria-hidden="true">
                  <span>{c.name}</span>
                  <strong>{c.model}</strong>
                </div>
                <div className="car-body">
                  <h3>{c.name} {c.model}</h3>
                  <div className="car-trim">{c.trim}</div>
                  <div className="car-specs">
                    <span>{c.year ?? 'Bouwjaar niet vermeld'}</span>
                    <span>{c.fuel}</span>
                    <span>{c.milage == null ? 'Kilometerstand niet vermeld' : `${Number(c.milage).toLocaleString('nl-NL')} km`}</span>
                    <span>{c.transmission}</span>
                  </div>
                  <div className="car-price">{new Intl.NumberFormat('nl-NL', {
                    style: 'currency',
                    currency: 'EUR',
                    maximumFractionDigits: 0,
                  }).format(c.price)}</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  )
}
