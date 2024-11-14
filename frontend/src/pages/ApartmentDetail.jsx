import axios from "../utils/axiosClient.js";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ApartmentInfo from "../components/Apartments/ApartmentInfo/ApartmentInfo.jsx";
import ApartmentJumbo from "../components/Apartments/ApartmentJumbo/ApartmentJumbo.jsx";
import ApartmentList from "../components/Apartments/ApartmentList/ApartmentList.jsx";
import ApartmentGallery from "../components/Apartments/ApartmentGallery/ApartmentGallery.jsx";
import Loader from "../components/Loader/Loader.jsx";
import ApartmentMap from "../components/Apartments/ApartmentMap/ApartmentMap.jsx";

const ApartmentDetail = () => {
    const { slug } = useParams();
    const [apartment, setApartment] = useState(null);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch della singola foto
    const fetchApartment = async () => {
        try {
            const res = await axios.get(`/apartments/${slug}`);
            const newApartment = res.data;
            setApartment(newApartment);
        } catch (error) {
            console.error("Errore nel recupero dell'appartamento:", error);
        }
    };

    // Fetch della galleria foto
    const fetchImages = async () => {
        try {
            const res = await axios.get(`/images`);
            const newImages = res.data;
            setImages(newImages);
        } catch (error) {
            console.error("Errore nel recupero della galleria:", error);
        }
    };

    // Funzione per verificare il caricamento
    const checkLoading = () => {
        if (apartment && images.length >= 0) {
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        fetchApartment();
        fetchImages();
        window.scrollTo(0, 0);
    }, [slug]);

    useEffect(() => {
        checkLoading();
    }, [apartment, images]); // Controlla il caricamento ogni volta che apartment o images cambiano

    if (loading) {
        return <Loader />;
    }

    // Filtro delle immagini in base all'apartmentId
    const filteredImages = images.filter(
        (image) => image.apartmentId === apartment?.id
    );

    // Assicurati che latitude e longitude siano numeri
    const lat = parseFloat(apartment.latitude);
    const lng = parseFloat(apartment.longitude);

    if (isNaN(lat) || isNaN(lng)) {
        return <div>Coordinate non valide</div>; // Mostra un messaggio se le coordinate non sono valide
    }

    return (
        <>
            <ApartmentJumbo title={apartment?.title} cover={apartment?.cover} />

            {/* Galleria immagini*/}
            <section id="apartment-gallery">
                <ApartmentGallery filteredImages={filteredImages} />
            </section>

            {/* Info appartamento */}
            <section id="apartment-info">
                <div className="container">
                    <ApartmentInfo
                        title={apartment?.title}
                        description={apartment?.description}
                        rooms={apartment?.rooms}
                        beds={apartment?.beds}
                        bathrooms={apartment?.bathrooms}
                        sqm={apartment?.sqm}
                        guests={apartment?.guests}
                        services={apartment?.services}
                        apartmentId={apartment?.id}
                    />
                </div>
            </section>

            <section id="apartment-map">
                <div className="container">
                    {apartment?.latitude && apartment?.longitude ? (
                        <div className="map">
                            <ApartmentMap
                                lat={lat}
                                lng={lng}
                            />
                        </div>
                    ) : (
                        <div>Coordinates not available</div>
                    )}
                </div>
            </section>

            {/* Sezione appartamenti */}
            <ApartmentList />
        </>
    );
};

export default ApartmentDetail;
