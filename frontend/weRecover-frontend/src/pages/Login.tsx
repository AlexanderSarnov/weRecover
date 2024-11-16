import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // Added Link import
import Header from '../components/Header';
import Footer from '../components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'; // Import custom styles
import API_BASE_URL from '../apiConfig';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('${API_BASE_URL}/auth/login', {
                email,
                password,
            });
            console.log('Login successful:', response.data);

            // Store JWT token in local storage
            localStorage.setItem('token', response.data.token);

            // Redirect to the dashboard
            navigate('/dashboard');
        } catch (err: any) {
            console.error('Error during login:', err.response ? err.response.data : err.message);
        }
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <div className="container my-auto">
                <div className="row justify-content-center">
                    <div className="col-md-8 text-center">
                        <h1>Login</h1>
                        <form onSubmit={handleLogin}>
                            <div className="form-group">
                                <label htmlFor="email">Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary m-2">
                                Login
                            </button>
                        </form>
                        <div className="mt-3">
                            <Link to="/register" className="btn btn-secondary">
                                Register
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Login;
