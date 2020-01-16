import React from 'react';
import Contact from './Contact';
// helpers
import { compareCallback } from '../helpers';

function ContactList({contacts, removeContact}) {  

    contacts.sort(compareCallback)

    return (
        <div className="table-responsive-sm">
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone Number</th>
                    <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Object.keys(contacts).map(key => (
                            <Contact 
                                key={contacts[key].id}
                                data={contacts[key]}
                                removeContact={removeContact}
                            />
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ContactList;
