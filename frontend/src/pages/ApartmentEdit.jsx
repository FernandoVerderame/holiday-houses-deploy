import axios from "../utils/axiosClient.js";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import FormApartment from "../components/Dashboard/FormApartment/FormApartment";

const ApartmentEdit = () => {

    // Recupero lo slug dai parametri
    const { slug } = useParams();

    // Recupero useNavigate da react router dom
    const navigate = useNavigate();

    // useState della singola foto da editare
    const [dataToEdit, setDataToEdit] = useState(null);

    // Fecth dei dati della singola foto
    const fetchDataToEdit = async () => {
        const url = `/apartments/${slug}`;
        const { data: a } = await axios.get(url);
        setDataToEdit({
            title: a.title,
            description: a.description,
            cover: a.cover,
            rooms: a.rooms,
            beds: a.beds,
            bathrooms: a.bathrooms,
            sqm: a.sqm,
            guests: a.guests,
            address: a.address,
            services: a.services.map(s => s.id),
            visible: a.visible
        });
    }

    useEffect(() => {
        fetchDataToEdit();
        return () => {
            setDataToEdit(null);
        }
    }, [slug]);

    // Funzione per l'update della foto
    const updateApartment = async formData => {
        const res = await axios.put(`/apartments/${slug}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        if (res.status < 400) {
            // Redirect alla foto appena modificata con messaggio di successo come stato
            navigate(`/dashboard/apartments`, {
                state: { alert: { type: 'success', message: 'Appartamento modificato con successo!' } }
            });
        }
    }

    return (
        <>
            <section id="edit-apartment">
                <div className="header-main">
                    <div className="container-fluid">
                        <div className="p-4">
                            <h1 className="m-0 text-white">Edita</h1>
                        </div>
                    </div>
                </div>

                <div className="container-fluid">
                    <div className="card mt-4 p-4">
                        <FormApartment
                            initialData={dataToEdit}
                            onSubmit={updateApartment}
                        />
                    </div>
                </div>
            </section>
        </>
    );
};

export default ApartmentEdit;