import { useEffect, useState } from 'react';
import { FaRegSave as Save } from "react-icons/fa";
import axios from "../../../utils/axiosClient.js";

const placeholder = 'https://marcolanci.it/boolean/assets/placeholder.png';

const FormImage = ({ initialData, onSubmit }) => {

    // Immagine di default
    const defaultImageData = initialData || {
        url: '',
        apartmentId: ''
    }

    // useState della singola nuovo Immagine
    const [imageData, setImageData] = useState(defaultImageData);
    const [imagePreview, setImagePreview] = useState(placeholder); // Preview dell'immagine
    const [selectedFile, setSelectedFile] = useState(null); // File selezionato
    const [apartments, setApartments] = useState([]); // Lista degli appartamenti

    // Fetch degli appartamenti
    const fecthApartments = async () => {
        const res = await axios.get(`/apartments`);
        const newApartments = res.data.data;
        setApartments(newApartments);
    };

    // Effett per aggiornare i dati iniziali
    useEffect(() => {
        if (initialData && initialData.url) {
            setImageData(initialData);
            setImagePreview(initialData.url); // Mostra l'immagine iniziale come preview
        }

        fecthApartments();
    }, [initialData]);

    // Gestione del cambio file immagine
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file); // Salva il file selezionato
            const blobUrl = URL.createObjectURL(file); // Crea un URL temporaneo per il blob
            setImagePreview(blobUrl); // Aggiorna la preview dell'immagine
            handleField('url', file); // Memorizza il file nel form state
        }
    };

    // Campo degli appartamenti
    const handleField = (name, value) => {

        setImageData(curr => ({
            ...curr,
            [name]: value
        }));
    }

    // Submit del Form
    const handleSubmit = async (e) => {
        e.preventDefault();
        onSubmit(imageData);
    }

    // Pulizia del blob URL quando l'utente lascia la pagina o l'immagine cambia
    useEffect(() => {
        return () => {
            if (imagePreview && imagePreview !== placeholder) {
                URL.revokeObjectURL(imagePreview); // Rimuovi il blob URL quando l'immagine cambia o si lascia la pagina
            }
        };
    }, [imagePreview]);

    return (
        <>
            <form id="form-create" onSubmit={handleSubmit}>
                <div className='row'>

                    {/* Url Immagine */}
                    <div className='col-md-6'>
                        <div className="mb-5">
                            <label htmlFor="url" className="form-label h5">Url</label>
                            <input
                                type="file"
                                id="url"
                                name="url"
                                onChange={handleImageChange}
                                className="form-control"
                            />
                        </div>

                        <div className="mb-5">
                            <label htmlFor="apartmentId" className="form-label h5">Seleziona Appartamento</label>
                            <select
                                id="apartmentId"
                                name="apartmentId"
                                className="form-select"
                                value={imageData.apartmentId}
                                onChange={(e) => handleField('apartmentId', e.target.value)}
                            >
                                <option value="">Seleziona un appartamento</option>
                                {apartments.map(apartment => (
                                    <option key={apartment.id} value={apartment.id}>
                                        {apartment.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Preview Immagine */}
                    <div className='col-md-6'>
                        <div className='mb-5'>
                            <label className="form-label h5">Preview</label>
                            <img
                                src={imagePreview} // Visualizza la preview
                                alt="Preview immagine selezionata"
                                className="img-fluid"
                                id="preview"
                                style={{ width: '100%', height: '400px', objectFit: 'contain' }}
                            />
                        </div>
                    </div>

                    <div className="d-flex justify-content-end">
                        <button className="btn btn-success"><Save className='me-2' />Salva</button>
                    </div>

                </div>
            </form>
        </>
    );
};

export default FormImage;