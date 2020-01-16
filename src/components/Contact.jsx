import React from 'react';

const Contact = ({data: {id, name, email, phone}, removeContact}) => {
    return (
        <tr>
            <td>{name}</td>
            <td>{email}</td>
            <td>{phone}</td>
            <td className="row">
                <div className="col-6">
                    <a href=""
                        onClick={e => removeContact(e, id)}
                    >
                        <i class="fa fa-trash-o h5" aria-hidden="true"></i>
                    </a>
                </div>
                
                <div className="col-6">
                    <a href={`/contacts/${id}/edit`}>
                        <i class="fa fa-pencil-square-o h5" aria-hidden="true"></i>
                    </a>
                </div>
                
            </td>
        </tr>
    )
}


export default Contact;