import { Link } from 'react-router-dom'

const diensten = [
  { ico: '🔧', title: 'Algemene Auto Reparaties', desc: 'Wij voeren algemene auto reparaties uit, inclusief motor, transmissie, remmen, ophanging en elektrische systemen.', items: ['Motor reparaties','Transmissie service','Remmen controle en reparatie','Ophanging en stuurinrichting','Elektrische systemen'] },
  { ico: '🛑', title: 'Remvloeistof Vervanging en Inspectie', desc: 'Wij verzorgen de vervanging en inspectie van uw remvloeistof. Een goed werkend remsysteem is essentieel voor uw veiligheid.', items: ['Remvloeistof verversen','Remsysteem inspectie','Remblokken controle','Remschijven beoordeling'] },
  { ico: '🔍', title: 'Auto Onderhoud', desc: 'Professioneel auto onderhoud met moderne technologie. Wij houden uw auto in topconditie.', items: ['Periodiek onderhoud','Vloeistoffen controleren en verversen','Filters vervangen','Voertuigdiagnose'] },
  { ico: '🏎️', title: 'Diagnose', desc: 'Geavanceerde diagnoseapparatuur voor het snel en nauwkeurig vinden van storingen bij alle merken.', items: ['Alle merken & modellen','Motorlampje uitlezen','Elektrische storingen','Uitgebreid diagnoserapport'] },
  { ico: '🚘', title: 'Auto Inkoop', desc: 'Wij kopen alle merken auto\'s in, in elke staat. Eerlijke taxatie en directe afhandeling.', items: ['Alle merken en modellen','Eerlijke taxatie','Snelle afhandeling','Direct contact mogelijk'] },
  { ico: '🏷️', title: 'Auto Verkoop', desc: 'Betrouwbare occasions tegen eerlijke prijzen. Alle auto\'s worden zorgvuldig gecontroleerd voor verkoop.', items: ['Betrouwbare occasions','Zorgvuldig gecontroleerd','Eerlijke prijzen','Persoonlijk advies'] },
]

export default function Diensten() {
  return (
    <>
      <div className="page-hero">
        <div className="breadcrumb"><Link to="/">Home</Link><span className="sep">/</span><span>Onze Diensten</span></div>
        <h1>Onze Diensten</h1>
        <p>Auto onderhoud en reparatie — professioneel, betrouwbaar en tegen eerlijke prijzen.</p>
      </div>
      <section className="section-dark">
        <div className="diensten-page-grid">
          {diensten.map(d => (
            <div className="dp-card" key={d.title}>
              <div className="dp-ico">{d.ico}</div>
              <h3>{d.title}</h3>
              <p>{d.desc}</p>
              <ul>{d.items.map(i => <li key={i}>{i}</li>)}</ul>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
