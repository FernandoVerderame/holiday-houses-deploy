import axios from "../utils/axiosClient.js";
import FormImage from "../components/Dashboard/FormImage/FormImage.jsx";
import { useNavigate } from "react-router-dom";

const ImagesCreate = () => {

    // Recupero useNavigate da react router dom
    const navigate = useNavigate();

    // Chiamata per la creazione dell'immagine
    const createImage = async formData => {
        const res = await axios.post('/images', formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        if (res.status < 400) {
            // Redirect alla dashboard delle immagini
            navigate(`/dashboard/images`, {
                state: { alert: { type: 'success', message: 'Immagine creata con successo!' } }
            });
        }
    }

    return (
        <>
            <section id="create-image">
                <div className="header-main">
                    <div className="container-fluid">
                        <div className="p-4">
                            <h1 className="m-0 text-white">Crea</h1>
                        </div>
                    </div>
                </div>

                <div className="container-fluid">
                    <div className="card mt-4 p-4">
                        <FormImage
                            onSubmit={createImage}
                        />
                    </div>
                </div>
            </section>
        </>
    );
};

export default ImagesCreate;