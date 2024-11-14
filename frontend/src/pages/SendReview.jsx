import Navbar from "../components/Navbar/Navbar.jsx";
import { useState } from "react";
import axios from "../utils/axiosClient.js";
import Alert from "../components/Alert/Alert.jsx";
import Reviews from "../components/Reviews/Reviews.jsx";
import ReviewForm from "../components/SendReview/ReviewForm/ReviewForm.jsx";
import { FaQuoteLeft as QuoteLeft } from "react-icons/fa6";
import { FaQuoteRight as QuoteRight } from "react-icons/fa6";

const ContactUs = () => {

    // useState Alert
    const [alert, setAlert] = useState(null);

    // Chiamata per la creazione del messaggio
    const createReview = async formData => {
        const res = await axios.post('/reviews', formData);

        if (res.status < 400) {
            setAlert({ type: 'success', message: `Review sent successfully!` });
        }
    }

    return (
        <>
            <section id="send-review-jumbo">
                <div className="container-home">
                    <Navbar />

                    <h1>Send Review</h1>
                    <p><QuoteLeft className="quote" /> Tell us how was your journey <QuoteRight className="quote" /></p>
                </div>
            </section>

            <section id="reviews-carousel">
                <Reviews />
            </section>

            <section id="review-form">
                <div className="container">
                    {/* Mostra l'alert se esiste */}
                    {alert && (
                        <Alert
                            type={alert.type}
                            message={alert.message}
                            onClose={() => setAlert(null)}
                        />
                    )}

                    <ReviewForm
                        onSubmit={createReview}
                    />
                </div>
            </section>
        </>
    );
};

export default ContactUs;