import { useEffect, useState } from 'react';
import { useGlobal } from '../../../contexts/GlobalContext.jsx';
import { FaRegSave as Save } from "react-icons/fa";

const FormApartment = ({ initialData, onSubmit }) => {

    const { services } = useGlobal();

    // Appartamento di default
    const defaultApartmentData = initialData || {
        title: '',
        description: '',
        cover: '',
        rooms: 1,
        beds: 1,
        bathrooms: 1,
        sqm: 1,
        guests: 1,
        address: '',
        services: [],
        visible: false
    }

    // useState del singolo nuovo Appartamento
    const [apartmentData, setApartmentData] = useState(defaultApartmentData);

    const [apartmentError, setApartmentError] = useState(null);

    useEffect(() => {
        if (initialData) {
            setApartmentData(initialData);
        }
    }, [initialData]);

    // Campo dei servizi
    const handleField = (name, value) => {

        setApartmentData(curr => ({
            ...curr,
            [name]: value
        }));
    }

    // Submit del Form
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await onSubmit(apartmentData);
        } catch (err) {
            const { errors } = err.response.data;
            const error = new Error(errors ? 'Submission Error' : err.response.data);
            error.errors = errors;
            setApartmentError(error);
        }
    }

    // Update dell'appartamento
    const changeApartmentData = (key, newValue) => {
        setApartmentData(data => ({ ...data, [key]: newValue }));
    }

    return (
        <>
            <form id="form-create" onSubmit={handleSubmit}>
                <div className='row'>

                    {/* Nome */}
                    <div className='col-lg-6'>
                        <div className='mb-5'>
                            <label htmlFor="title" className="form-label h5">Nome</label>
                            <input
                                id="title"
                                name="title"
                                type="text"
                                placeholder="Es. Guest House"
                                value={apartmentData.title}
                                onChange={e => changeApartmentData('title', e.target.value)}
                                className="form-control"
                            />
                        </div>
                    </div>

                    {/* Indirizzo */}
                    <div className='col-lg-6'>
                        <div className='mb-5'>
                            <label htmlFor="address" className="form-label h5">Indirizzo</label>
                            <input
                                id="address"
                                name="address"
                                type="text"
                                value={apartmentData.address}
                                onChange={e => changeApartmentData('address', e.target.value)}
                                className="form-control"
                            />
                        </div>
                    </div>

                    {/* Descrizione */}
                    <div className='col-lg-6'>
                        <div className='mb-5'>
                            <label htmlFor="description" className="form-label h5">Descrizione</label>
                            <textarea
                                id="description"
                                name="description"
                                rows='7'
                                placeholder="Es. Appartamento con due camere, vista mare..."
                                value={apartmentData.description}
                                onChange={e => changeApartmentData('description', e.target.value)}
                                className="form-control"
                            />
                        </div>
                    </div>

                    {/* Servizi */}
                    <div className='col-lg-6'>
                        <div className='mb-5'>
                            <h5>Servizi</h5>
                            <ul className='d-flex gap-4'>
                                {services.map(({ id, label }, i) => (
                                    <li key={`service-${i}`}>
                                        <input
                                            type="checkbox"
                                            checked={apartmentData.services.includes(id)}
                                            onChange={() => {
                                                const curr = apartmentData.services;
                                                const newServices = curr.includes(id) ?
                                                    curr.filter(el => el !== id) :
                                                    [...curr, id];
                                                handleField('services', newServices);
                                            }}
                                            className='form-check-input me-2'
                                        />
                                        <label>{label}</label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Stanze */}
                    <div className='col-sm-4 col-lg-2'>
                        <div className='mb-5'>
                            <label htmlFor="rooms" className="form-label h5">Stanze</label>
                            <input
                                id="rooms"
                                name="rooms"
                                type="number"
                                value={apartmentData.rooms}
                                onChange={e => changeApartmentData('rooms', e.target.value)}
                                className="form-control"
                                min="1"
                                placeholder="1"
                            />
                        </div>
                    </div>

                    {/* Letti */}
                    <div className='col-sm-4 col-lg-2'>
                        <div className='mb-5'>
                            <label htmlFor="beds" className="form-label h5">Letti</label>
                            <input
                                id="beds"
                                name="beds"
                                type="number"
                                value={apartmentData.beds}
                                onChange={e => changeApartmentData('beds', e.target.value)}
                                className="form-control"
                                min="1"
                                placeholder="1"
                            />
                        </div>
                    </div>

                    {/* Bagni */}
                    <div className='col-sm-4 col-lg-2'>
                        <div className='mb-5'>
                            <label htmlFor="bathrooms" className="form-label h5">Bagni</label>
                            <input
                                id="bathrooms"
                                name="bathrooms"
                                type="number"
                                value={apartmentData.bathrooms}
                                onChange={e => changeApartmentData('bathrooms', e.target.value)}
                                className="form-control"
                                min="1"
                                placeholder="1"
                            />
                        </div>
                    </div>

                    {/* SQM */}
                    <div className='col-sm-4 col-lg-2'>
                        <div className='mb-5'>
                            <label htmlFor="sqm" className="form-label h5">SQM</label>
                            <input
                                id="sqm"
                                name="sqm"
                                type="number"
                                value={apartmentData.sqm}
                                onChange={e => changeApartmentData('sqm', e.target.value)}
                                className="form-control"
                                min="1"
                                placeholder="SQM"
                            />
                        </div>
                    </div>

                    {/* Ospiti */}
                    <div className='col-sm-4 col-lg-2'>
                        <div className='mb-5'>
                            <label htmlFor="guests" className="form-label h5">Ospiti</label>
                            <input
                                id="guests"
                                name="guests"
                                type="number"
                                value={apartmentData.guests}
                                onChange={e => changeApartmentData('guests', e.target.value)}
                                className="form-control"
                                min="1"
                                placeholder="1"
                            />
                        </div>
                    </div>

                    {/* Cover */}
                    <div className='col-12'>
                        <div className="mb-5">
                            <label htmlFor="cover" className="form-label h5">Cover</label>
                            <input
                                type="file"
                                id="cover"
                                name="cover"
                                onChange={(e) => handleField('cover', e.target.files[0])}
                                className="form-control"
                            />
                        </div>
                    </div>

                    {/* Pubblicato */}
                    <div className='col-12'>
                        <div className='mb-5'>
                            <label htmlFor="visible" className="form-check-label">Pubblicato</label>
                            <input
                                id='visible'
                                name='visible'
                                type='checkbox'
                                checked={apartmentData['visible']}
                                onChange={e => handleField('visible', e.target.checked)}
                                className="form-check-input ms-2"
                            />
                        </div>
                    </div>

                    {apartmentError !== null && <div className="text-danger">{apartmentError.message}</div>}
                    {apartmentError?.errors && apartmentError.errors.map((err, index) => (
                        <div key={`err${index}`} className="text-danger">{err.msg}</div>
                    ))}

                    <div className="d-flex justify-content-end">
                        <button className="btn btn-success"><Save className='me-2' />Salva</button>
                    </div>
                </div>
            </form>
        </>
    );
};

export default FormApartment;