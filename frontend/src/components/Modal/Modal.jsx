import { AiOutlineClose as CloseIcon } from "react-icons/ai";

const DeleteModal = ({ dialogRef, setDeleteMode, deleteBtn, title }) => {
    return (
        <dialog ref={dialogRef} className="rounded border border-danger">
            <div className="d-flex justify-content-between align-items-center">
                <h3>Sei sicuro?</h3>
                <CloseIcon onClick={() => setDeleteMode(false)} role='button' />
            </div>
            <p>Se procedi, eliminerai definitivamente: {title}.</p>
            <button
                onClick={deleteBtn}
                className="btn btn-danger btn-sm"
            >
                Elimina
            </button>
        </dialog>
    );
}

export default DeleteModal;