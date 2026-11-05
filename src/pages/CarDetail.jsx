import { Link, Navigate, useParams } from 'react-router-dom'
import vehicleListings from '../data/vehicleListings'

const detailSectionTitles = [
  'Algemene gegevens',
  'Techniek en verbruik',
  'Uitrusting',
  'Onderhoud en staat',
]

function getDetailSections(car) {
  const sections = Object.fromEntries(detailSectionTitles.map(title => [title, []]))

  car.groups.forEach(group => {
    let sectionTitle = 'Onderhoud en staat'

    if (group.title.toLowerCase().includes('voertuiggegevens')) {
      sectionTitle = 'Algemene gegevens'
    } else if (
      group.title.toLowerCase().includes('techniek')
      || group.title.toLowerCase().includes('verbruik')
    ) {
      sectionTitle = 'Techniek en verbruik'
    } else if (group.title.toLowerCase().includes('uitrusting')) {
      sectionTitle = 'Uitrusting'
    }

    sections[sectionTitle].push(...group.details)
  })

  return sections
}

function CarDetail() {
  const { id } = useParams()
  const car = vehicleListings.find(listing => listing.id === id)

  if (!car) {
    return <Navigate to="/aanbod" replace />
  }

  const detailSections = getDetailSections(car)

  return (
    <>
      <div className="page-hero">
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span className="sep">/</span>
          <Link to="/aanbod">Te koop</Link>
          <span className="sep">/</span>
          <span>{car.make} {car.model}</span>
        </div>
        <h1>{car.make} {car.model}</h1>
        <p>{car.trim}</p>
      </div>

      <section className="section-dark car-detail-section">
        <div className="car-detail">
          <div className="car-detail-gallery" role="img" aria-label="Ruimte gereserveerd voor autofoto's" />

          <div className="car-detail-heading">
            <div>
              <p className="car-detail-eyebrow">Voertuiggegevens</p>
              <h2>{car.make} {car.model}</h2>
              <p>{car.trim}</p>
            </div>
            <p className="car-detail-price">
              {new Intl.NumberFormat('nl-NL', {
                style: 'currency',
                currency: 'EUR',
                maximumFractionDigits: 0,
              }).format(car.price)}
            </p>
          </div>

          <dl className="car-detail-specs">
            <div><dt>Bouwjaar</dt><dd>{car.year ?? 'Niet vermeld'}</dd></div>
            <div><dt>Kilometerstand</dt><dd>{car.mileage == null ? 'Niet vermeld' : `${car.mileage.toLocaleString('nl-NL')} km`}</dd></div>
            <div><dt>Brandstof</dt><dd>{car.fuel}</dd></div>
            <div><dt>Transmissie</dt><dd>{car.transmission}</dd></div>
          </dl>

          <div className="car-detail-groups">
            {detailSectionTitles.map(title => (
              <section className="car-detail-group" key={title}>
                <h3>{title}</h3>
                {detailSections[title].length > 0 ? (
                  <ul>
                    {detailSections[title].map((detail, index) => <li key={`${title}-${index}`}>{detail}</li>)}
                  </ul>
                ) : (
                  <p className="car-detail-missing">Niet vermeld in de advertentie.</p>
                )}
              </section>
            ))}
          </div>

          <Link className="car-detail-back" to="/aanbod">← Terug naar alle auto's</Link>
        </div>
      </section>
    </>
  )
}

export default CarDetail
