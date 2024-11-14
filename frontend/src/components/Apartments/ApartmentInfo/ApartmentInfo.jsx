import apartmentInfoStyle from './ApartmentInfo.module.scss';
import { TbAirConditioning as AirConditioning } from "react-icons/tb";
import {
    FaWifi as WiFi,
    FaSquareParking as Parking
} from "react-icons/fa6";
import { MdOutlinePets as Pets } from "react-icons/md";
import { BiSolidWasher as Washer } from "react-icons/bi";
import { useState, useEffect } from 'react';
import ApartmentAdditionalInfo from './ApartmentAdditionalInfo';
import { NavLink } from 'react-router-dom';
import axios from "../../../utils/axiosClient.js";

// Mappo tra le stringhe del database e i componenti delle icone
const iconMap = {
    WiFi: WiFi,
    Parking: Parking,
    AirConditioning: AirConditioning,
    Pets: Pets,
    Washer: Washer
};

const ApartmentInfo = ({ title, description, rooms, beds, bathrooms, sqm, guests, services, apartmentId }) => {

    // Stato locale per tenere traccia della sezione attiva
    const [activeSection, setActiveSection] = useState('description');

    const [reviews, setReviews] = useState([]);
    const [reviewCount, setReviewCount] = useState(0);

    // Fetch delle recensioni
    const fetchReviews = async () => {
        try {
            const res = await axios.get(`/reviews?apartmentId=${apartmentId}`);
            const newReviews = res.data.data;
            const reviewCount = res.data.reviewCount;
            setReviews(newReviews);
            setReviewCount(reviewCount);
        } catch (error) {
            console.error("Errore nel recupero delle recensioni:", error);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, [apartmentId]);

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span key={i} className={i <= rating ? apartmentInfoStyle.filledStar : apartmentInfoStyle.emptyStar}>
                    &#9733; {/* Stella piena */}
                </span>
            );
        }
        return <div className={apartmentInfoStyle.stars}>{stars}</div>;
    };

    return (
        <>
            {/* Nav menù info */}
            <ul className={apartmentInfoStyle.navInfo}>
                <li
                    className={activeSection === 'description' ? apartmentInfoStyle.active : ''}
                    onClick={() => setActiveSection('description')}
                    role='button'
                >
                    Description
                </li>
                <li
                    className={activeSection === 'additional' ? apartmentInfoStyle.active : ''}
                    onClick={() => setActiveSection('additional')}
                    role='button'
                >
                    Additional
                </li>
                <li
                    className={activeSection === 'reviews' ? apartmentInfoStyle.active : ''}
                    onClick={() => setActiveSection('reviews')}
                    role='button'
                >
                    Reviews {reviewCount ? `(${reviewCount})` : '(0)'}
                </li>
            </ul>

            {/* Info */}
            <div className='row g-5'>
                <div className='col-md-12 col-lg-9'>
                    {activeSection === 'description' && (
                        <div className={apartmentInfoStyle.description}>
                            {description ? description : 'No description available.'}

                            {/* Servizi */}
                            {services?.length > 0 ? (
                                <div>
                                    <h4 className={apartmentInfoStyle.services}>Services</h4>
                                    <ul>
                                        {services.map((service, i) => {
                                            // Ottiengo l'icona dal mapping delle icone
                                            const IconComponent = iconMap[service.icon];
                                            return (
                                                <li key={`service-${i}`} className="d-flex align-items-center mb-2 fw-semibold text-black">
                                                    {/* Renderizza l'icona dinamicamente se esiste */}
                                                    {IconComponent && <IconComponent className="me-3 fs-4 my-1" />}
                                                    {service.label}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            ) : (
                                // Nel caso non ci fossero servizi
                                <p className='mt-4'>No services</p>
                            )}
                        </div>
                    )}

                    {activeSection === 'additional' && (
                        <div className={apartmentInfoStyle.additional}>
                            <ApartmentAdditionalInfo />
                        </div>
                    )}

                    {activeSection === 'reviews' && (
                        <div className={apartmentInfoStyle.reviews}>
                            <div className='review'>
                                {reviews?.length === 0 ? (
                                    <div className="col-12">
                                        <p>No reviews yet.</p>
                                    </div>
                                ) : (
                                    reviews?.map(({ id, name, country, description, rating, visible }) => (
                                        visible === true &&
                                        <div key={id} className={`card border-0 ${apartmentInfoStyle.cardReview}`}>
                                            <div className="d-flex align-items-center gap-3 mb-2">
                                                <h3 className={`fw-semibold ${apartmentInfoStyle.title}`}>{name} - {country}</h3>
                                                {renderStars(rating)}
                                            </div>
                                            <p className={apartmentInfoStyle.description}>{description}</p>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}
                </div>
                <div className='col-lg-3'>
                    <div className={apartmentInfoStyle.cardInfo}>
                        <h3>{title}</h3>

                        <div className='d-flex justify-content-center'>
                            <NavLink className={`button ${apartmentInfoStyle.btnCard}`} to={'/contact-us'}>Contact Us</NavLink>
                        </div>

                        <ul className='flex-lg-column justify-content-md-center mx-auto'>
                            <li><span>Guests:</span>{guests}</li>
                            <li><span>Rooms:</span>{rooms}</li>
                            <li><span>Beds:</span>{beds}</li>
                            <li><span>Bathrooms:</span>{bathrooms}</li>
                            <li><span>Sqm:</span>{sqm}m<sup>2</sup></li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ApartmentInfo;