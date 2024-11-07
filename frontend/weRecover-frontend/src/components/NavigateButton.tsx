import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavigateButton: React.FC = () => {
    const navigate = useNavigate();

    const handleNavigateToDashboard = () => {
        const timestamp = new Date().getTime();
        navigate(`/dashboard?cache_buster=${timestamp}`);
    };

    return <button onClick={handleNavigateToDashboard}>Go to Dashboard</button>;
};

export default NavigateButton;
