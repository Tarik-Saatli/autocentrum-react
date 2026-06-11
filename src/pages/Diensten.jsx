import { Link } from 'react-router-dom'
import engineImg from '/images/engine.webp'

const IcoReparatie = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
  </svg>
)
const IcoRemmen = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="8"/><line x1="12" y1="16" x2="12" y2="22"/><line x1="2" y1="12" x2="8" y2="12"/><line x1="16" y1="12" x2="22" y2="12"/>
  </svg>
)
const IcoOnderhoud = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
  </svg>
)
const IcoDiagnose = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
  </svg>
)
const IcoInkoop = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
  </svg>
)
const IcoVerkoop = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>
  </svg>
)

const diensten = [
  { ico: <IcoReparatie />, title: 'Algemene Auto Reparaties', desc: 'Wij voeren algemene auto reparaties uit, inclusief motor, transmissie, remmen, ophanging en elektrische systemen.', items: ['Motor reparaties','Transmissie service','Remmen controle en reparatie','Ophanging en stuurinrichting','Elektrische systemen'] },
  { ico: <IcoRemmen />,   title: 'Remvloeistof Vervanging en Inspectie', desc: 'Wij verzorgen de vervanging en inspectie van uw remvloeistof. Een goed werkend remsysteem is essentieel voor uw veiligheid.', items: ['Remvloeistof verversen','Remsysteem inspectie','Remblokken controle','Remschijven beoordeling'] },
  { ico: <IcoOnderhoud />, title: 'Auto Onderhoud', desc: 'Professioneel auto onderhoud met moderne technologie. Wij houden uw auto in topconditie.', items: ['Periodiek onderhoud','Vloeistoffen controleren en verversen','Filters vervangen','Voertuigdiagnose'] },
  { ico: <IcoDiagnose />, title: 'Diagnose', desc: 'Geavanceerde diagnoseapparatuur voor het snel en nauwkeurig vinden van storingen bij alle merken.', items: ['Alle merken & modellen','Motorlampje uitlezen','Elektrische storingen','Uitgebreid diagnoserapport'] },
  { ico: <IcoInkoop />,   title: 'Auto Inkoop', desc: 'Wij kopen alle merken auto\'s in, in elke staat. Eerlijke taxatie en directe afhandeling.', items: ['Alle merken en modellen','Eerlijke taxatie','Snelle afhandeling','Direct contact mogelijk'] },
  { ico: <IcoVerkoop />,  title: 'Auto Verkoop', desc: 'Betrouwbare occasions tegen eerlijke prijzen. Alle auto\'s worden zorgvuldig gecontroleerd voor verkoop.', items: ['Betrouwbare occasions','Zorgvuldig gecontroleerd','Eerlijke prijzen','Persoonlijk advies'] },
]

export default function Diensten() {
  return (
    <>
      <div className="page-hero page-hero--img" style={{ backgroundImage: `url(${engineImg})` }}>
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
