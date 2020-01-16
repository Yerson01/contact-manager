import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import Alert from './layout/Alert';
// helpers
import { isEmpty } from '../helpers';


function ContactForm({bringData, match: { params }, history}) {

    const apiUrl = 'http://localhost:3000/users';
    const [ name, setName ] = useState('');
    const [email, setEmail] = useState('');
    const [ phone, setPhone ] = useState('');
    const [ error, setError ] = useState(false);
    const [ isContact, setisContact ] = useState(false);
    const [ refresh, setRefresh ] = useState(false);
    

    useEffect(() => {
        const fetchContact = async () => {
            let contactToEdit = await axios.get(`${apiUrl}/${params.contact}`);
            setName(contactToEdit.data.name);
            setEmail(contactToEdit.data.email);
            setPhone(contactToEdit.data.phone);
            setisContact(true);
        }
        fetchContact();
        setRefresh(false);
    }, [refresh])

    
    const handleSubmit = (e) => {
        e.preventDefault();
    
        if (isEmpty(name) || isEmpty(email) || isEmpty(phone)) {
            setError(true);
        } else {
            let newContact = {
                name: name.trim(),
                email: email.trim(),
                phone: phone.trim()
            }
            if (isContact) {
                updateContact(newContact)
                    .then(res => history.push(`/contacts/${res.data.id}`));
            } else {
                // create new contact
                bringData(newContact);
            }
            reset();
        }
    }

    const reset = () => {
        setName('');
        setEmail('');
        setPhone('');
        setError(false);
        setisContact(false)
    }

    const updateContact = async (data) => {
        return await axios.put(`${apiUrl}/${params.contact}`, data);
    }
   
    return (
        <div className="card card-body">
            <h2 className="card-title font-weight-lighter h4 mb-4">Add a new contact</h2>
            <form action="" 
                onSubmit={handleSubmit}
            >
                <div className="row justify-content-center">
                    <div className="col-md-4 form-group">
                        <label htmlFor="name">Name:</label>
                        <input 
                            type="text" 
                            className="form-control"
                            name="name"
                            id="name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>

                    <div className="col-md-4 form-group">
                        <label htmlFor="email">Email:</label>
                        <input 
                            type="email" 
                            className="form-control"
                            name="email"
                            id="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    
                    <div className="col-md-4 form-group">
                        <label htmlFor="phone">Phone Number:</label>
                        <input 
                            type="text" 
                            className="form-control"
                            name="phone"
                            id="phone"
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                        />
                    </div>

                    <div className="col-12">
                        { (error ? <Alert message="All fields are required!" type="danger"/> : null) }
                    </div>
                    
                    <div className="col col-md-4 col-lg-3 ml-auto mt-4">
                        <input 
                            type="submit" 
                            className="btn btn-outline-primary btn-block"
                            value={(isContact) ? 'Edit' : 'Add'}
                        />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default withRouter(ContactForm);