import { useEffect, useMemo, useRef, useState } from 'react';

const maxPhotos = 8;
const maxPhotoSize = 5 * 1024 * 1024;
const supportedTypes = ['image/jpeg', 'image/png', 'image/webp'];

export function getCarImageUrl(imagePath) {
    return `http://localhost:4000${imagePath}`;
}

function CarPhotosField({ files, onFilesChange, existingPhotos = [], removedPhotos = [], onRemovedPhotosChange }) {
    const [error, setError] = useState('');
    const inputRef = useRef(null);
    const previews = useMemo(
        () => files.map(file => ({ file, url: URL.createObjectURL(file) })),
        [files]
    );

    useEffect(() => {
        return () => previews.forEach(preview => URL.revokeObjectURL(preview.url));
    }, [previews]);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    }, [files]);

    const handleChange = event => {
        const selectedFiles = Array.from(event.target.files ?? []);
        const availableSlots = maxPhotos - existingPhotos.length + removedPhotos.length - files.length;
        const invalidType = selectedFiles.find(file => !supportedTypes.includes(file.type));
        const oversizedFile = selectedFiles.find(file => file.size > maxPhotoSize);

        if (invalidType) {
            setError('Gebruik alleen JPG-, PNG- of WebP-foto’s.');
        } else if (oversizedFile) {
            setError('Een foto mag maximaal 5 MB groot zijn.');
        } else if (selectedFiles.length > availableSlots) {
            setError(`Je kunt maximaal ${maxPhotos} foto’s per auto toevoegen.`);
        } else {
            setError('');
            onFilesChange([...files, ...selectedFiles]);
        }
    };

    return (
        <div className="car-photo-field">
            <label className="car-form-field">
                <span>Foto’s van de auto (maximaal {maxPhotos}, JPG/PNG/WebP, 5 MB per foto)</span>
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    multiple
                    onChange={handleChange}
                />
            </label>
            {error && <p className="error">{error}</p>}
            {(existingPhotos.length > 0 || previews.length > 0) && (
                <div className="car-photo-previews">
                    {existingPhotos.map(photo => (
                        <div className="car-photo-preview" key={photo}>
                            <img src={getCarImageUrl(photo)} alt="Foto van de auto" />
                            {onRemovedPhotosChange && (
                                <button
                                    type="button"
                                    onClick={() => onRemovedPhotosChange(
                                        removedPhotos.includes(photo)
                                            ? removedPhotos.filter(item => item !== photo)
                                            : [...removedPhotos, photo]
                                    )}
                                >
                                    {removedPhotos.includes(photo) ? 'Behouden' : 'Verwijderen'}
                                </button>
                            )}
                        </div>
                    ))}
                    {previews.map(({ file, url }, index) => (
                        <div className="car-photo-preview" key={`${file.name}-${file.lastModified}-${index}`}>
                            <img src={url} alt={`Nieuwe autofoto ${index + 1}`} />
                            <button
                                type="button"
                                onClick={() => onFilesChange(files.filter((_, fileIndex) => fileIndex !== index))}
                            >
                                Foto weghalen
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CarPhotosField;
