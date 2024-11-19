import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/App.css'; // Import custom styles

const HomePage: React.FC = () => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <div className="container my-auto">
                <div className="row justify-content-center">
                    <div className="col-md-8 text-center">
                        <h1>Welcome to weRecover</h1>
                        <p>Your journey to recovery starts here.</p>
                        <div className="mt-4">
                            <Link to="/register" className="btn btn-primary m-2">
                                Register
                            </Link>
                            <Link to="/login" className="btn btn-secondary m-2">
                                Login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default HomePage;
