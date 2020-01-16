import React, { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import ContactDetails from './components/ContactDetails';

import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom';
import axios from 'axios';
import './App.css'

function App ({history}) {

    const [ contacts, setContacts ] = useState([]);
    const [ contact, setContact ] = useState({});

    const apiUrl = 'http://localhost:3000/users';

    useEffect(() => {
        const fetchData = async () => {
            let data = await axios.get(apiUrl);
            setContacts(data.data)
        }
        fetchData();

        if (Object.keys(contact).length) {
            addContact();
            setContact({});
        }
        
    }, [contact])

    const addContact = async () => {
        let contc = await axios.post(apiUrl, contact, {
            headers: {
                'Content-Type': 'application/json' 
            }
        });

    }

    const removeContact = async (e, id) => {
        e.preventDefault();
        await axios.delete(`${apiUrl}/${id}`);
        let newContacts = contacts.filter(c => c.id != id);
        setContacts(newContacts);
    }
    

    const bringData = (data) => {
        setContact(data);
    }
    
    return (
        <React.Fragment>
            <Router>
                <Navbar/>
                <Switch>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-10 col-md-12 col-lg-10 my-1">
                                <Route exact path={"/contacts/:contact"}>
                                    <ContactDetails/>
                                </Route>
                            </div>
                            <Route exact path={["/contacts", "/contacts/:contact/edit"]}>
                                <div className="col-10 col-md-12 col-lg-10 my-5">
                                    <ContactForm 
                                        bringData = {bringData}
                                    />
                                </div>
                                <div className="col-12 my-4">
                                    <ContactList 
                                        contacts={contacts}
                                        removeContact={removeContact}
                                    />
                                </div>
                            </Route>
                        </div>
                    </div>
                </Switch>
            </Router>
            
        </React.Fragment>
    )
}

export default App;