import { Link } from 'react-router-dom'

const autos = [
  { emoji: '🚗', name: 'BMW 1 Serie', trim: '116i Sport Executive', year: '2016', fuel: 'Benzine', km: '98.765 km', trans: 'Handgeschakeld', price: '€ 14.950,–' },
  { emoji: '🚙', name: 'Audi A3 Sportback', trim: '1.4 TFSI CoD Ambition Pro Line', year: '2017', fuel: 'Benzine', km: '123.456 km', trans: 'Handgeschakeld', price: '€ 16.950,–' },
  { emoji: '🚘', name: 'Volkswagen Golf', trim: '1.0 TSI Comfortline', year: '2016', fuel: 'Benzine', km: '110.234 km', trans: 'Handgeschakeld', price: '€ 15.950,–' },
  { emoji: '🚗', name: 'Mercedes-Benz C-Klasse', trim: '180 Business Solution', year: '2018', fuel: 'Benzine', km: '87.320 km', trans: 'Automaat', price: '€ 21.500,–' },
  { emoji: '🚙', name: 'Toyota Yaris', trim: '1.5 Hybrid Active', year: '2019', fuel: 'Hybride', km: '54.100 km', trans: 'Automaat', price: '€ 17.750,–' },
  { emoji: '🚘', name: 'Ford Focus', trim: '1.0 EcoBoost Titanium', year: '2017', fuel: 'Benzine', km: '102.890 km', trans: 'Handgeschakeld', price: '€ 12.950,–' },
]

export default function Aanbod() {
  return (
    <>
      <div className="page-hero">
        <div className="breadcrumb"><Link to="/">Home</Link><span className="sep">/</span><span>Aanbod</span></div>
        <h1>Ons Aanbod</h1>
        <p>Kwaliteitsoccasions met garantie — eerlijk geprijsd en vakkundig gecontroleerd.</p>
      </div>

      <div className="filter-bar">
        <select><option>Alle merken</option><option>BMW</option><option>Audi</option><option>Volkswagen</option><option>Mercedes-Benz</option><option>Toyota</option><option>Ford</option></select>
        <select><option>Alle brandstof</option><option>Benzine</option><option>Diesel</option><option>Hybride</option><option>Elektrisch</option></select>
        <select><option>Alle prijzen</option><option>Tot € 10.000</option><option>€ 10.000 – € 15.000</option><option>€ 15.000 – € 20.000</option><option>€ 20.000+</option></select>
        <select><option>Alle jaren</option><option>2020+</option><option>2018 – 2020</option><option>2015 – 2018</option><option>Voor 2015</option></select>
      </div>

      <section className="section-dark">
        <div className="aanbod-grid">
          {autos.map(c => (
            <div className="car-card" key={c.name + c.trim}>
              <div className="car-img"><div className="car-placeholder">{c.emoji}</div></div>
              <div className="car-body">
                <h3>{c.name}</h3>
                <div className="car-trim">{c.trim}</div>
                <div className="car-specs">
                  <span>{c.year}</span><span>{c.fuel}</span><span>{c.km}</span><span>{c.trans}</span>
                </div>
                <div className="car-price">{c.price}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
