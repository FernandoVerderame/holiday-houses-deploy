import axios from "../utils/axiosClient.js";
import { useEffect, useRef, useState } from "react";
import DeleteModal from "../components/Modal/Modal.jsx";
import Alert from "../components/Alert/Alert.jsx";
import { format } from 'date-fns';
import { it } from 'date-fns/locale';
import { MdDelete as Delete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const MessagesIndex = () => {

    const navigate = useNavigate();

    // useState Alert
    const [alert, setAlert] = useState(null);

    // useState dei messaggi
    const [messages, setMessages] = useState([]);

    // Fetch dei messaggi
    const fetchMessages = async () => {
        const res = await axios.get('/messages');
        const newMessages = res.data.data;
        setMessages(newMessages);
    }

    useEffect(() => {
        fetchMessages();
    }, []);

    // useState eliminazione del messaggio
    const [messageToDelete, setMessageToDelete] = useState(null);

    // Chiamata per l'eliminazione del messaggio
    const deleteMessage = async () => {
        if (messageToDelete) {
            await axios.delete(`/messages/${messageToDelete.id}`);
            fetchMessages();
            setMessageToDelete(null);
            setDeleteMode(false);
            navigate('/dashboard/messages');
            setAlert({ type: 'error', message: `Messaggio di "${messageToDelete.name}" eliminato con successo!` });
        }
    }

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

    const formatDate = (dateString) => {
        if (!dateString) return "Data non disponibile";  // Controlla se la data è null o indefinita
        const date = new Date(dateString);
        if (isNaN(date)) return "Data non valida";  // Controlla se la data è invalida
        return format(date, 'dd/MM/yy HH:mm', { locale: it });
    };

    return (
        <section id="dashboard-messages">
            <div className="container-fluid">
                <div className="p-4">
                    <h1 className="m-0 text-white">Messaggi</h1>
                </div>

                {/* Modale eliminazione */}
                <DeleteModal
                    dialogRef={dialogRef}
                    title={`Messaggio di: "${messageToDelete?.name}" del ${formatDate(messageToDelete?.createdAt)}`}
                    setDeleteMode={setDeleteMode}
                    deleteBtn={deleteMessage}
                />

                <div className="row">
                    {messages.length === 0 ? (
                        <div className="col-12 bg-gray">

                            {/* Nel caso non ci siano messaggi */}
                            <p className="text-center h3 mt-4">Non ci sono messaggi!</p>

                        </div>
                    ) : (
                        <div className="col-12 bg-gray">
                            <div className="container-fluid">
                                <div className="mt-4 p-2">

                                    {/* Mostra l'alert se esiste */}
                                    {alert && (
                                        <Alert
                                            type={alert.type}
                                            message={alert.message}
                                            onClose={() => setAlert(null)}
                                        />
                                    )}

                                    <table className="table table-white table-hover shadow-lg shadow-border">
                                        {/* Tabella messaggi */}
                                        <thead className="table-light">
                                            <tr>
                                                <th scope="col">Nome</th>
                                                <th scope="col">Email</th>
                                                <th scope="col" className="d-none d-lg-table-cell">Telefono</th>
                                                <th scope="col">Contenuto</th>
                                                <th scope="col" className="d-none d-lg-table-cell">Data</th>
                                                <th scope="col"></th>
                                            </tr>
                                        </thead>

                                        <tbody className="table-group-divider">
                                            {messages.map(({ id, name, email, phone, content, createdAt }) => (
                                                <tr key={id}>
                                                    <td>{name}</td>

                                                    <td>{email}</td>

                                                    <td className="d-none d-lg-table-cell">{phone}</td>

                                                    <td>{content}</td>

                                                    <td className="d-none d-lg-table-cell">{formatDate(createdAt)}</td>

                                                    <td className="text-end">
                                                        <button
                                                            className="btn btn-danger"
                                                            onClick={() => {
                                                                setMessageToDelete({ id, name, createdAt });
                                                                setDeleteMode(true);
                                                            }}
                                                        >
                                                            <Delete />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section >
    );
}

export default MessagesIndex;