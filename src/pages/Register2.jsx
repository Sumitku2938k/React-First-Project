import { useState } from 'react'
import './Register.css'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';

export default function Register() {
    const [user, setUser] = useState({
        username: "",
        email: "",
        phone: "",
        password: "",
    });
    const [success, setSuccess] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const Navigate = useNavigate();
    const {storeTokenInLS} = useAuth();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!/\S+@\S+\.\S+/.test(user.email)) {
            alert('Please enter a valid email address');
            return;
        }
        console.log("User registered:", user);

        //Handling the form submission
        try {
            const response = await fetch('http://localhost:3000/api/auth/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });    
            console.log("response data : ", response);

            if(response.ok){
                const res_data = await response.json();
                console.log("Response from Server : ", res_data);
                storeTokenInLS(res_data.token); //store the token in localhost 
                setSuccess('Registration successful!');
                setUser({ username: "", email: "", phone: "", password: "" });
                setTimeout(() => setSuccess(''), 3000);
                setTimeout(() => Navigate("/login"), 5000);
            } else {
                console.log("error inside response ", "error");
            }
        } catch (error) {
            console.log("Registration Error: ",error)
        }
        
    }

    return (
        <section className="section-registration">
            <div className="container grid grid-two-cols">
                <div className="registration-image">
                    <img src="/images/register.png" alt="registration" />
                </div>

                <div className="registration-form">
                    <div className="registration-card">
                        <h1 className="main-heading">Create an account</h1>
                        <p className="sub-heading">Join us — it's quick and easy.</p>
                        {success && <div className="success">{success}</div>}

                        <form onSubmit={handleSubmit} className="form">
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input 
                                    type="text" 
                                    id="username" 
                                    name="username" 
                                    required 
                                    placeholder="Enter username" 
                                    autoComplete="off" 
                                    value={user.username} 
                                    onChange={handleInputChange} 
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    name="email" 
                                    required 
                                    placeholder="Enter your email" 
                                    autoComplete="off" 
                                    value={user.email} 
                                    onChange={handleInputChange} 
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone">Phone</label>
                                <input 
                                    type="tel" 
                                    id="phone" 
                                    name="phone" 
                                    required 
                                    placeholder="Phone number" 
                                    autoComplete="off" 
                                    value={user.phone} 
                                    onChange={handleInputChange} 
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <div className="password-wrapper">
                                    <input 
                                        type={showPassword ? 'text' : 'password'} 
                                        id="password" 
                                        name="password" 
                                        required 
                                        placeholder="Create a password" 
                                        autoComplete="off" 
                                        value={user.password} 
                                        onChange={handleInputChange} 
                                    />
                                    <button 
                                        type="button"
                                        className="toggle-password"
                                        onClick={() => setShowPassword(s => !s)}
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                                                <line x1="1" y1="1" x2="23" y2="23"/>
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                                <circle cx="12" cy="12" r="3"/>
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            <button type="submit" className="btn btn-submit">Create account</button>
                        </form>

                        <p className="login-link">Already have an account? <a href="/login">Login</a></p>
                    </div>
                </div>
            </div>
        </section>
    )
}