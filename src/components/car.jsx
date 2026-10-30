function Car({ car, onDelete, onEdit }) {
    return (
        <div className="car">
            <h3>{car.name}</h3>
            <p>prijs: {car.price}</p>
            <p>milage: {car.milage}</p>

            {onEdit && <button onClick={() => onEdit(car)}>Bewerken</button>}
            {onDelete && (
                <button onClick={() => onDelete(car._id)}>
                    Verwijderen
                </button>
            )}
        </div>
    );
}

export default Car;
