import React from 'react';
import StepList from '../components/StepList';
import Header from '../components/Header';
import '../styles/StepsPage.css'; // Updated import path

const StepsPage: React.FC = () => {
    return (
        <div>
            <Header />
            <div className="steps-page-container">
                <div className="steps-page-welcome">
                    <h1>Welcome to Your Recovery Journey</h1>
                    <p>Your path to recovery starts here. Explore the steps and progress at your own pace.</p>
                </div>
                <StepList />
            </div>
        </div>
    );
};

export default StepsPage;
