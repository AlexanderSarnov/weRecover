import React from 'react';
import StepList from '../components/StepList'; // Adjust the path as needed

const Dashboard: React.FC = () => {
    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome to your dashboard!</p>
            <StepList /> {/* Include the StepList component */}
        </div>
    );
};

export default Dashboard;
