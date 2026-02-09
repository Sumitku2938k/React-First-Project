import React, { useEffect, useState } from 'react';
import { useAuth } from '../store/auth';
import { useParams, useNavigate } from 'react-router-dom';

const AdminUpdate = () => {
    const [user, setUser] = useState({
        username: "",
        email: "",
        phone: "",
    })
    const [success, setSuccess] = useState("");

    const params = useParams();
    const navigate = useNavigate();
    const {authorizationToken, API} = useAuth();

    const handleInput = (e) => {
        const { name, value } = e.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    }

    //Get single user data by id to prefill the form for update
    const singleUserData = async () => {
        try {
            const response = await fetch(`${API}/api/admin/users/${params.id}`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken, 
                },
            });
            const data = await response.json(); //json to object
            console.log(`single user data: ${data}`);
            setUser(data);
        } catch (error) {
            console.log(error);
        }
    }

    //To update the user data on form submit dynamically using the id from params and user data from state
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${API}/api/admin/users/update/${params.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authorizationToken, 
                },
                body: JSON.stringify(user),
            });
            if(response.ok){
                console.log("User updated successfully");
                setSuccess('Updated successfully!');
                setTimeout(() => {
                    setSuccess('');
                    navigate("/admin/users");
                }, 2000);
            } else {
                console.error("Failed to update user");
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        console.log("params.id:", params.id);
        singleUserData();
    }, []);

    return (
        <div className="contact-page">

            {/* Main Contact Section */}
            <div className="contact-container">
                <div className="contact-grid">
                    {/* Right Side - Contact Form */}
                    <div className="contact-form-section">
                        <div className="form-card">
                            <div className="form-header">
                                <h2 style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Update User Data</h2>
                            </div>
                            {success && <div className="success">{success}</div>}

                            <form className="contact-form" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="username">Full Name</label>
                                    <div className="input-wrapper">
                                        <svg className="input-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                            <circle cx="12" cy="7" r="4"></circle>
                                        </svg>
                                        <input type="text" name="username" id="username" autoComplete="off" value={user.username} onChange={handleInput} placeholder="Enter your full name" required />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Email Address</label>
                                    <div className="input-wrapper">
                                        <svg className="input-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                            <polyline points="22,6 12,13 2,6"></polyline>
                                        </svg>
                                        <input type="email" name="email" id="email" autoComplete="off" value={user.email} onChange={handleInput} placeholder="Enter your email" required />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="phone">Phone Number</label>
                                    <div className="input-wrapper">
                                        <svg className="input-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                            <polyline points="22,6 12,13 2,6"></polyline>
                                        </svg>
                                        <input type="tel" name="phone" id="phone" autoComplete="off" value={user.phone} onChange={handleInput} placeholder="Enter your phone number" required />
                                    </div>
                                </div>

                                <button type="submit" className="btn-submit">
                                    <span>Update</span>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminUpdate;
