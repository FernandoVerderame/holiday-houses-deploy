import axios from "../utils/axiosClient.js";
import { useEffect, useRef, useState } from "react";
import DeleteModal from "../components/Modal/Modal.jsx";
import Alert from "../components/Alert/Alert.jsx";
import { NavLink, useNavigate } from "react-router-dom";
import { MdDelete as Delete } from "react-icons/md";
import { FaPlusSquare as AddImage } from "react-icons/fa";

const ImagesIndex = () => {
    const navigate = useNavigate();

    // useState Alert
    const [alert, setAlert] = useState(null);

    // useState delle immagini
    const [images, setImages] = useState([]);

    // Fetch delle immagini
    const fetchImages = async () => {
        const res = await axios.get('/images');
        const newImages = res.data;
        setImages(newImages);
    };

    useEffect(() => {
        fetchImages();
    }, []);

    // Raggruppare le immagini per appartamento
    const groupedImagesByApartment = images?.reduce((acc, image) => {
        const apartmentTitle = image.apartment?.title || "Appartamento non specificato";
        if (!acc[apartmentTitle]) {
            acc[apartmentTitle] = [];
        }
        acc[apartmentTitle].push(image);
        return acc;
    }, {});

    // useState eliminazione dell'immagine
    const [imageToDelete, setImageToDelete] = useState(null);

    // Chiamata per l'eliminazione dell'immagine
    const deleteImage = async () => {
        if (imageToDelete) {
            await axios.delete(`/images/${imageToDelete.id}`);
            fetchImages();
            setImageToDelete(null);
            setDeleteMode(false);
            navigate('/dashboard/images');
            setAlert({ type: 'error', message: `Immagine con id:"${imageToDelete.id}" eliminato con successo!` });
        }
    };

    // Modale
    const [deleteMode, setDeleteMode] = useState(false);
    const dialogRef = useRef();

    useEffect(() => {
        if (deleteMode) {
            dialogRef.current.showModal();
        } else {
            dialogRef.current.close();
        }
    }, [deleteMode]);

    return (
        <>
            <section id="dashboard-gallery">
                <div className="container-fluid">
                    <div className="d-flex justify-content-between align-items-center p-4">
                        <h1 className="m-0 text-white">Galleria</h1>

                        {/* Aggiungi immagine */}
                        <NavLink className="btn btn-primary border" to={'/dashboard/images/create'}>
                            <AddImage className="me-2" />
                            Immagine
                        </NavLink>
                    </div>

                    {/* Modale eliminazione */}
                    <DeleteModal
                        dialogRef={dialogRef}
                        title={`Immagine con id: "${imageToDelete?.id}"`}
                        setDeleteMode={setDeleteMode}
                        deleteBtn={deleteImage}
                    />

                    {/* Mostra le immagini raggruppate per appartamento */}
                    <div className="row">
                        {images.length === 0 ? (
                            <div className="col-12 bg-gray">
                                {/* Nel caso non ci siano appartamenti */}
                                <p className="text-center h3 mt-4">Non ci sono immagini!</p>
                            </div>
                        ) : (
                            <div className="col-12">
                                {/* Mostra l'alert se esiste */}
                                {alert && (
                                    <Alert
                                        type={alert.type}
                                        message={alert.message}
                                        onClose={() => setAlert(null)}
                                    />
                                )}
                            </div>
                        )}

                        {groupedImagesByApartment && Object.keys(groupedImagesByApartment).map(apartmentTitle => (
                            <div className="col-12 bg-gray pt-4" key={apartmentTitle}>
                                <h2 className="mb-3">{apartmentTitle}</h2>
                                <div className="row">
                                    {groupedImagesByApartment[apartmentTitle].map(({ id, url }) => (
                                        <div className="col-md-3 col-lg-2" key={id}>
                                            <div className="card mb-5">
                                                <img
                                                    src={url ? `http://${url}` : "https://placehold.co/600x400"}
                                                    alt={id}
                                                    className="img-gallery"
                                                />
                                                <button
                                                    className="btn delete-btn"
                                                    onClick={() => {
                                                        setImageToDelete({ id });
                                                        setDeleteMode(true);
                                                    }}
                                                >
                                                    <Delete className="icon-btn" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default ImagesIndex;