import { Link, Navigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import vehicleListings from '../data/vehicleListings'
import { getCarImageUrl } from '../components/CarPhotosField'

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
  const legacyCar = vehicleListings.find(listing => listing.id === id)
  const [apiCar, setApiCar] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    if (vehicleListings.some(listing => listing.id === id)) {
      setApiCar(null)
      setError('')
      setIsLoading(false)
      return () => {
        cancelled = true
      }
    }

    const fetchCar = async () => {
      setIsLoading(true)
      setError('')
      setApiCar(null)

      try {
        const response = await fetch(`http://localhost:4000/api/cars/${id}`)
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Auto ophalen is mislukt.')
        }

        if (!cancelled) {
          setApiCar(data)
        }
      } catch (fetchError) {
        if (!cancelled) {
          setError(fetchError.message)
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    fetchCar()

    return () => {
      cancelled = true
    }
  }, [id])

  const car = legacyCar || (apiCar && {
    ...apiCar,
    make: apiCar.name,
    mileage: apiCar.milage,
    groups: apiCar.groups?.length ? apiCar.groups : [{
      title: 'Voertuiggegevens',
      details: [
        ...(apiCar.year == null ? [] : [`Bouwjaar: ${apiCar.year}`]),
        ...(apiCar.bodyType ? [`Carrosserie: ${apiCar.bodyType}`] : []),
        ...(apiCar.doors ? [`${apiCar.doors} deuren`] : []),
        ...(apiCar.milage == null ? [] : [`Kilometerstand: ${Number(apiCar.milage).toLocaleString('nl-NL')} km`]),
        `Brandstof: ${apiCar.fuel}`,
        `Transmissie: ${apiCar.transmission}`,
      ],
    }],
  })

  if (isLoading) {
    return <p className="error">Auto laden...</p>
  }

  if (error) {
    return (
      <div className="page-hero">
        <h1>Auto niet beschikbaar</h1>
        <p>{error}</p>
        <Link to="/aanbod">Terug naar alle auto's</Link>
      </div>
    )
  }

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
          <div className="car-detail-gallery">
            {car.images?.length > 0
              ? car.images.map((image, index) => (
                <img key={image} src={getCarImageUrl(image)} alt={`${car.make} ${car.model} foto ${index + 1}`} />
              ))
              : <p>Er zijn nog geen foto’s beschikbaar.</p>}
          </div>

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
