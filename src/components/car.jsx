function Car({ car, onDelete, onEdit }) {
    return (
        <div className="car">
            <div className="car-card-heading">
                <div>
                    <h3>{car.name} {car.model}</h3>
                    {car.trim && <p className="car-trim">{car.trim}</p>}
                </div>
                <p className="car-price">
                    {new Intl.NumberFormat('nl-NL', {
                        style: 'currency',
                        currency: 'EUR',
                        maximumFractionDigits: 0,
                    }).format(car.price)}
                </p>
            </div>
            <dl className="car-specs">
                {car.bodyType && <div><dt>Carrosserie</dt><dd>{car.bodyType}</dd></div>}
                {car.doors && <div><dt>Deuren</dt><dd>{car.doors}</dd></div>}
                {car.fuel && <div><dt>Brandstof</dt><dd>{car.fuel}</dd></div>}
                {car.transmission && <div><dt>Transmissie</dt><dd>{car.transmission}</dd></div>}
                <div>
                    <dt>Kilometerstand</dt>
                    <dd>{car.milage == null ? 'Niet vermeld' : `${Number(car.milage).toLocaleString('nl-NL')} km`}</dd>
                </div>
            </dl>

            {(onEdit || onDelete) && (
                <div className="car-card-actions">
                    {onEdit && <button type="button" onClick={() => onEdit(car)}>Bewerken</button>}
                    {onDelete && (
                        <button type="button" className="car-delete-button" onClick={() => onDelete(car._id)}>
                            Verwijderen
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}

export default Car;
