import React from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min'; // Import the full bundle with Popper.js included
import './styles/App.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap Icons
import App from './App';

createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
