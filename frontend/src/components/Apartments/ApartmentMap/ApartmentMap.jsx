import React, { useRef, useEffect } from "react";
import { useLoadScript } from "@react-google-maps/api";

// Stili e opzioni della mappa
const mapContainerStyle = {
    width: "100%",
    height: "400px",
};

const options = {
    disableDefaultUI: true,
    zoomControl: true,
    maxZoom: 17, // Imposta il livello massimo di zoom (puoi modificarlo come preferisci)
};

const ApartmentMap = ({ lat, lng }) => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    });

    const mapRef = useRef(null); // Riferimento per la mappa
    const overlayRef = useRef(null); // Riferimento per l'overlay

    useEffect(() => {
        if (isLoaded) {
            // Inizializza la mappa
            const map = new window.google.maps.Map(mapRef.current, {
                center: { lat, lng },
                zoom: 15,
                ...options,
            });

            // Crea un div per l'area rossa semi-trasparente
            overlayRef.current = document.createElement("div");
            overlayRef.current.className = "red-overlay"; // Classe per l'overlay

            // Aggiungi l'overlay alla mappa
            const overlay = new window.google.maps.OverlayView();
            overlay.onAdd = function () {
                const panes = this.getPanes();
                panes.overlayMouseTarget.appendChild(overlayRef.current);
            };

            overlay.draw = function () {
                const projection = this.getProjection();
                const position = projection.fromLatLngToDivPixel(new window.google.maps.LatLng(lat, lng));
                overlayRef.current.style.left = position.x + "px"; // Posizione orizzontale
                overlayRef.current.style.top = position.y + "px"; // Posizione verticale

                // Dimensioni dell'overlay in base al livello di zoom
                const zoom = map.getZoom();
                const size = zoom * 5; // Modifica il fattore di scala se necessario
                overlayRef.current.style.width = `${size}px`; // Larghezza in base allo zoom
                overlayRef.current.style.height = `${size}px`; // Altezza in base allo zoom
                overlayRef.current.style.transform = "translate(-50%, -50%)"; // Centra l'area
            };

            overlay.setMap(map);
        }
    }, [isLoaded, lat, lng]);

    if (loadError) return <div>Error loading maps</div>;
    if (!isLoaded) return <div>Loading...</div>;

    return <div ref={mapRef} style={mapContainerStyle} />; // Mantieni il contenitore della mappa
};

export default ApartmentMap;
