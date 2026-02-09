import {useEffect, useState} from 'react';
import { useAuth } from '../store/auth';
import { Link } from 'react-router-dom';
import './Admin-Contacts.css';
import { toast } from 'react-toastify';


const AdminContacts = () => {
    const [contacts, setContacts] = useState([]);

    const {authorizationToken} = useAuth();

    const getAllContactsData = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/admin/contacts", {
                method: "GET",
                headers: {
                    Authorization: authorizationToken, 
                },
            });
            const data = await response.json(); //json to object
            console.log(` contacts: ${data}`);
            setContacts(data);
        } catch (error) {
            console.log(error);
        }
    }

    //Delete the user on clicking delete btn
    let deleteContact = async (id) => {
        const response = await fetch(`http://localhost:3000/api/admin/contacts/delete/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: authorizationToken, 
            },
        });
        if(response.ok){
            getAllContactsData(); //Refresh the contacts list after deletion
            toast.success("contact deleted successfully");
        } else {
            toast.error("Failed to delete contact");
        }
    }


    useEffect(() => {
        getAllContactsData();
    }, []);


    return (
        <div>
            <section className='admin-contacts-section'>
                <div className="container">
                    <h1>Admin Contacts Data</h1>
                </div>
                <div className='container admin-contacts'>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Message</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contacts.map((contact, idx) => {
                                return <tr key={idx}>
                                    <td>{contact.username}</td>
                                    <td>{contact.email}</td>
                                    <td>{contact.message}</td>
                                    <td><button className="delete-btn" onClick={() => {deleteContact(contact._id)}}>Delete</button></td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            </section>
            
        </div>
    );
}

export default AdminContacts;
