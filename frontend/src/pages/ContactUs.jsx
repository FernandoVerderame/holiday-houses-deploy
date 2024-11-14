import ContactForm from "../components/ContactUs/ContactForm/ContactForm.jsx";
import ContactUsInfo from "../components/ContactUs/ContactUsInfo.jsx";
import Navbar from "../components/Navbar/Navbar.jsx";
import { useState } from "react";
import axios from "../utils/axiosClient.js";
import Alert from "../components/Alert/Alert.jsx";
import { FaQuoteLeft as QuoteLeft } from "react-icons/fa6";
import { FaQuoteRight as QuoteRight } from "react-icons/fa6";

const ContactUs = () => {

    // useState Alert
    const [alert, setAlert] = useState(null);

    // Chiamata per la creazione del messaggio
    const createMessage = async formData => {
        const res = await axios.post('/messages', formData);

        if (res.status < 400) {
            setAlert({ type: 'success', message: `Message sent successfully!` });
        }
    }

    return (
        <>
            <section id="contact-us-jumbo">
                <div className="container-home">
                    <Navbar />

                    <h1>Contact Us</h1>
                    <p><QuoteLeft className="quote" /> Contact us whenever you need <QuoteRight className="quote" /></p>
                </div>
            </section>

            <section id="contact-us-info">
                <div className="container">
                    <ContactUsInfo />
                </div>
            </section>

            <section id="contact-form">
                <div className="container">
                    {/* Mostra l'alert se esiste */}
                    {alert && (
                        <Alert
                            type={alert.type}
                            message={alert.message}
                            onClose={() => setAlert(null)}
                        />
                    )}

                    <ContactForm
                        onSubmit={createMessage}
                    />
                </div>
            </section>
        </>
    );
};

export default ContactUs;