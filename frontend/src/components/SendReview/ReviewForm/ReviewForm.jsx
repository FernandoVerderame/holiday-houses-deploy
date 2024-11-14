import axios from "../../../utils/axiosClient.js";
import { useEffect, useState } from 'react';
import reviewFormStyle from './ReviewForm.module.scss';

const ContactForm = ({ initialData, onSubmit }) => {

    const defaultReviewData = initialData || {
        name: '',
        country: '',
        title: '',
        description: '',
        rating: 1,
        apartmentId: '',
        visible: false,
        userId: 1
    };

    const [reviewData, setReviewData] = useState(defaultReviewData);

    const [reviewError, setReviewError] = useState(null);

    // useState degli appartamenti
    const [apartments, setApartments] = useState([]);

    // Fetch degli appartamenti
    const fecthApartments = async () => {
        const res = await axios.get(`/apartments`);
        const newApartments = res.data.data;
        setApartments(newApartments);
    };

    // useEffect degli appartamenti
    useEffect(() => {
        fecthApartments();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await onSubmit(reviewData);
            setReviewData(defaultReviewData);
        } catch (err) {
            const { errors } = err.response.data;
            const error = new Error(errors ? 'Submission Error' : err.response.data);
            error.errors = errors;
            setReviewError(error);
        }
    }

    // Campo degli appartamenti
    const handleField = (name, value) => {

        setReviewData(curr => ({
            ...curr,
            [name]: value
        }));
    }

    // Funzione per il rating con le stelline
    const handleRatingChange = (newRating) => {
        handleField('rating', newRating);
    };

    return (
        <>
            <h2 className={reviewFormStyle.title}>Our Homestay</h2>
            <h4 className={reviewFormStyle.subtitle}>You can send us your review here</h4>

            <form id='form' onSubmit={handleSubmit}>

                <div className='row'>

                    {/* Nome */}
                    <div className='col-6'>
                        <div className='mb-3'>
                            <input
                                id="name"
                                name="name"
                                type="name"
                                placeholder="Name*"
                                value={reviewData.name}
                                onChange={e => handleField('name', e.target.value)}
                                className="form-control"
                            />
                        </div>
                    </div>

                    {/* Paese */}
                    <div className='col-6'>
                        <div className='mb-3'>
                            <input
                                id="country"
                                name="country"
                                type="country"
                                placeholder="Country*"
                                value={reviewData.country}
                                onChange={e => handleField('country', e.target.value)}
                                className="form-control"
                            />
                        </div>
                    </div>

                    {/* Titolo */}
                    <div className='col-12'>
                        <div className='mb-3'>
                            <input
                                id="title"
                                name="title"
                                type="title"
                                placeholder="Ex: Beautiful stay here in Holiday Houses*"
                                value={reviewData.title}
                                onChange={e => handleField('title', e.target.value)}
                                className="form-control"
                            />
                        </div>
                    </div>

                    {/* Descrizione */}
                    <div className='col-12'>
                        <div className="mb-3">
                            <textarea
                                id='description'
                                name='description'
                                placeholder='Message*'
                                rows='7'
                                value={reviewData.description}
                                onChange={e => handleField('description', e.target.value)}
                                className="form-control"
                            />
                        </div>
                    </div>

                    {/* Seleziona Appartamento */}
                    <div className='col-6'>
                        <div>
                            <select
                                id="apartmentId"
                                name="apartmentId"
                                value={reviewData.apartmentId}
                                onChange={(e) => handleField('apartmentId', e.target.value)}
                                className="form-select"
                            >
                                <option value="">Select an apartment</option>
                                {apartments.map(apartment => (
                                    <option key={apartment.id} value={apartment.id}>
                                        {apartment.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Rating con Stelline */}
                    <div className='col-6'>
                        <div>
                            <div className={`star-rating ${reviewFormStyle.stars}`}>
                                {[1, 2, 3, 4, 5].map(star => (
                                    <span
                                        key={star}
                                        onClick={() => handleRatingChange(star)}
                                        style={{
                                            color: reviewData.rating >= star ? '#c6a47e' : '#ccc',
                                        }}
                                    >
                                        &#9733;
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {reviewError !== null && <div className="text-danger">{reviewError.message}</div>}
                    {reviewError?.errors && reviewError.errors.map((err, index) => (
                        <div key={`err${index}`}>{err.msg}</div>
                    ))}

                    <div className="d-flex justify-content-center">
                        <button className={reviewFormStyle.btnForm}>Send review</button>
                    </div>

                </div>

            </form>
        </>
    );
};

export default ContactForm;