import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

const ContactInfo = ({match: {params}}) => {

    const apiUrl = 'http://localhost:3000/users';
    const [ contact, setContact ] = useState({});
    const [ refresh, setRefresh ] = useState({});

    useEffect(() => {
        const getContact = async () => {
            let curContact = await axios.get(`${apiUrl}/${params.contact}`)
            setContact(curContact.data);
        }
        getContact();
        setRefresh(false);
    }, [refresh]);

    
    return (
        <div className="card">
            <div className="card-body">
                <h3 className="card-title">{contact.name}</h3>
                <p>Phone Number: 
                    <span className="badge badge-pill badge-primary ml-3">{contact.phone}</span>
                </p>
                <p>Email: 
                    <span className="badge badge-pill badge-primary ml-3">{contact.email}</span>
                </p>
            </div>
        </div>
    )
}

export default withRouter(ContactInfo);