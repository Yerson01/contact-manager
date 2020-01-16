import React from 'react';

const Alert = ({message, type}) => {
    return (
        <div className={`alert alert-${type} alert-dismissible fade show`}>
            <strong>{message}</strong>
        </div>
    )
}

export default Alert;