import React from 'react';
import StepList from '../components/StepList'; // Adjust the path as needed
import Header from '../components/Header'; // Import the Header component

const Dashboard: React.FC = () => {
    return (
        <div>
            <Header /> {/* Include the Header component */}
            <div className="container">
                <h1>Dashboard</h1>
                <p>Welcome to your dashboard!</p>
                <StepList /> {/* Include the StepList component */}
            </div>
        </div>
    );
};

export default Dashboard;
