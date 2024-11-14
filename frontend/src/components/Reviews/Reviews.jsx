import axios from "../../utils/axiosClient.js";
import { useEffect, useState, useRef } from "react";
import reviewsStyle from './Reviews.module.scss';
import { FaQuoteLeft as QuoteLeft } from "react-icons/fa6";
import { FaQuoteRight as QuoteRight } from "react-icons/fa6";

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const swiperRef = useRef(null); // Crea un riferimento per Swiper

    // Fetch delle recensioni
    const fetchReviews = async () => {
        try {
            const res = await axios.get(`/reviews`);
            const newReviews = res.data.data;
            setReviews(newReviews);
        } catch (error) {
            console.error("Errore nel recupero delle recensioni:", error);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    // Filtra le recensioni visibili
    const visibleReviews = reviews.filter(review => review.visible === true);

    useEffect(() => {
        if (swiperRef.current) {
            const swiper = new Swiper(swiperRef.current, {
                slidesPerView: 1,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
            });

            return () => {
                swiper.destroy();
            };
        }
    }, [reviews]);

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span key={i} className={i <= rating ? reviewsStyle.filledStar : reviewsStyle.emptyStar}>
                    &#9733; {/* Stella piena */}
                </span>
            );
        }
        return <div className={reviewsStyle.stars}>{stars}</div>;
    };

    return (
        <>
            {visibleReviews.length > 0 && (
                <section id="reviews">
                    <div className="container">
                        <h2>Testimonials</h2>
                        <h4>What our happy customers said about us</h4>

                        <div className="row">
                            <div className="col-12">
                                <div className={`${reviewsStyle.cardReview} swiper`} ref={swiperRef}>
                                    <div className="swiper-wrapper">
                                        {visibleReviews?.map(({ id, name, country, title, description, rating }) => (
                                            <div key={id} className="swiper-slide">
                                                <div className="d-flex justify-content-center align-items-center gap-4">
                                                    <h3 className={reviewsStyle.title}>{title}</h3>
                                                    {renderStars(rating)}
                                                </div>
                                                <p className={reviewsStyle.description}><QuoteLeft className="quote" /> {description} <QuoteRight className="quote" /></p>
                                                <div className={reviewsStyle.author}>{name}</div>
                                                <div className={reviewsStyle.country}>{country}</div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className={`swiper-button-next ${reviewsStyle.next}`}></div>
                                    <div className={`swiper-button-prev ${reviewsStyle.prev}`}></div>
                                    <div className={`swiper-pagination ${reviewsStyle.pagination}`}></div>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>
            )}
        </>
    );
};

export default Reviews;