import React from 'react';
import PropTypes from 'prop-types';

const Alert = ({ type, message, onClose }) => {
    const alertStyles = {
        padding: '1em',
        margin: '1em 0',
        borderRadius: '5px',
        color: '#fff',
        backgroundColor: type === 'success' ? 'green' : type === 'error' ? 'red' : 'blue',
        position: 'relative'
    };

    return (
        <div style={alertStyles}>
            {message}
            <button
                onClick={onClose}
                style={{
                    position: 'absolute',
                    top: '5px',
                    right: '10px',
                    background: 'transparent',
                    border: 'none',
                    color: '#fff',
                    fontSize: '1em',
                    cursor: 'pointer'
                }}
            >
                &times;
            </button>
        </div>
    );
};

Alert.propTypes = {
    type: PropTypes.oneOf(['success', 'error', 'info']).isRequired,
    message: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired
};

export default Alert;
