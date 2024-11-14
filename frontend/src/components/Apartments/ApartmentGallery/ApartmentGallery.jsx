import { useEffect, useState } from 'react';
import apartmentGalleryStyle from './ApartmentGallery.module.scss';

const ApartmentGallery = ({ filteredImages }) => {
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        // Inizializza Swiper
        const swiper = new Swiper('.swiper', {
            spaceBetween: 15,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                1200: {
                    slidesPerView: 3
                },
                768: {
                    slidesPerView: 2
                },
                576: {
                    slidesPerView: 1
                }
            },
        });

        return () => {
            swiper.destroy();
        };
    }, []);

    // Funzione per chiudere la modal
    const closeModal = () => {
        setSelectedImage(null);
    };

    return (
        <>
            {filteredImages?.length === 0 ? (
                <div className="col-12">
                    <p className="text-center h3">Gallery images not found!</p>
                </div>
            ) : (
                <div className={`${apartmentGalleryStyle.gallery} swiper`}>
                    <div className="swiper-wrapper">
                        {filteredImages?.map(({ id, url }) => (
                            <div
                                key={id}
                                className="swiper-slide"
                                onClick={() => setSelectedImage(url)} // Imposta l'immagine selezionata al click
                            >
                                <div className={apartmentGalleryStyle.thumb}>
                                    <img
                                        src={url ? `http://${url}` : "https://placehold.co/600x400"}
                                        alt={`Image-${id}`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={`swiper-button-next ${apartmentGalleryStyle.next}`}></div>
                    <div className={`swiper-button-prev ${apartmentGalleryStyle.prev}`}></div>
                    <div className={`swiper-pagination ${apartmentGalleryStyle.pagination}`}></div>
                </div>
            )}

            {/* Modal per l'immagine ingrandita */}
            {selectedImage && (
                <div className={apartmentGalleryStyle.modalOverlay} onClick={closeModal}>
                    <div className={apartmentGalleryStyle.modalContent}>
                        <img src={`http://${selectedImage}`} alt="Selected" />
                        <button className={apartmentGalleryStyle.closeButton} onClick={closeModal}>
                            &times;
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ApartmentGallery;
