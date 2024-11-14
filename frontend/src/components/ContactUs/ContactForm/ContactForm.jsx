import { useState } from 'react';
import contactFormStyle from './ContactForm.module.scss';

const ContactForm = ({ initialData, onSubmit }) => {

    const defaultMessageData = initialData || {
        name: '',
        email: '',
        phone: '',
        content: '',
        userId: 1
    };

    const [messageData, setMessageData] = useState(defaultMessageData);

    const [messageError, setMessageError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await onSubmit(messageData);
            setMessageData(defaultMessageData);
        } catch (err) {
            const { errors } = err.response.data;
            const error = new Error(errors ? 'Submission Error' : err.response.data);
            error.errors = errors;
            setMessageError(error);
        }
    }

    const changeMessageData = (key, newValue) => {
        setMessageData(data => ({
            ...data,
            [key]: newValue
        }));
    }

    return (
        <>
            <h2 className={contactFormStyle.title}>Our Homestay</h2>
            <h4 className={contactFormStyle.subtitle}>You can contact us to ask questions, answer questions booking</h4>

            <form id='form' onSubmit={handleSubmit}>

                <div className='row'>

                    {/* Nome */}
                    <div className='col-4'>
                        <div className='mb-3'>
                            <input
                                id="name"
                                name="name"
                                type="name"
                                placeholder="Name*"
                                value={messageData.name}
                                onChange={e => changeMessageData('name', e.target.value)}
                                className="form-control"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div className='col-4'>
                        <div className='mb-3'>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Email*"
                                value={messageData.email}
                                onChange={e => changeMessageData('email', e.target.value)}
                                className="form-control"
                            />
                        </div>
                    </div>

                    {/* Telefono */}
                    <div className='col-4'>
                        <div className='mb-3'>
                            <input
                                id="phone"
                                name="phone"
                                type="phone"
                                placeholder="Phone (Add Prefix)"
                                value={messageData.phone}
                                onChange={e => changeMessageData('phone', e.target.value)}
                                className="form-control"
                            />
                        </div>
                    </div>

                    {/* Messaggio */}
                    <div className='col-12'>
                        <div>
                            <textarea
                                id='content'
                                name='content'
                                placeholder='Message*'
                                rows='7'
                                value={messageData.content}
                                onChange={e => changeMessageData('content', e.target.value)}
                                className="form-control"
                            />
                        </div>
                    </div>

                    {messageError !== null && <div className="text-danger">{messageError.message}</div>}
                    {messageError?.errors && messageError.errors.map((err, index) => (
                        <div key={`err${index}`}>{err.msg}</div>
                    ))}

                    <div className="d-flex justify-content-center">
                        <button className={contactFormStyle.btnForm}>Send message</button>
                    </div>
                </div>

            </form>
        </>
    );
};

export default ContactForm;