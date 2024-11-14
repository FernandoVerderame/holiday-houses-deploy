import React, { useEffect, useState } from 'react';
import Loader from '../Loader/Loader.jsx'; // Assicurati di importare il componente Loader
import { useLocation } from 'react-router-dom'; // Importa useLocation

const ScrollToTopWithLoader = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const location = useLocation(); // Ottieni la posizione attuale

    useEffect(() => {
        // Nascondi lo scroll
        document.body.style.overflow = 'hidden';

        // Aggiungi un ritardo di 2 secondi prima di nascondere il loader
        const timeout = setTimeout(() => {
            setLoading(false); // Nascondi il loader dopo 2 secondi
            document.body.style.overflow = ''; // Ripristina l'overflow dopo il caricamento
        }, 1000); // Ritardo di 2000 millisecondi (2 secondi)

        // Scroll in cima alla pagina
        window.scrollTo({ top: 0, behavior: "smooth" });

        // Resetta lo stato di caricamento quando la posizione cambia
        setLoading(true);

        // Pulisci il timeout quando il componente viene smontato o la posizione cambia
        return () => {
            clearTimeout(timeout);
            document.body.style.overflow = ''; // Assicurati di ripristinare l'overflow
        };
    }, [location]); // Effettua il re-render solo quando la posizione cambia

    return (
        <>
            {loading && <Loader />} {/* Mostra il loader mentre è in caricamento */}
            <div style={{ display: loading ? 'none' : 'block' }}>
                {children} {/* Mostra i contenuti solo dopo il caricamento */}
            </div>
        </>
    );
};

export default ScrollToTopWithLoader;