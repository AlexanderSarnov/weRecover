import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API_BASE_URL from '../apiConfig';
import '../styles/StepList.css'; // Updated import path

interface Step {
    step_id: number;
    step_number: number;
    step_name: string;
    description: string;
}

const StepList = () => {
    const [steps, setSteps] = useState<Step[]>([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (token) {
            fetch(`${API_BASE_URL}/steps`, {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then((response) => response.json())
                .then((data) => setSteps(data))
                .catch((error) => console.error('Error fetching steps:', error));
        } else {
            console.error('No token found');
        }
    }, [token]);

    return (
        <div className="step-list">
            {steps.map((step) => (
                <div key={step.step_id} className="step-card">
                    <div className="step-content">
                        <h3>
                            Step {step.step_number}: {step.step_name}
                        </h3>
                        <p>{step.description}</p>
                        <Link to={`/steps/${step.step_id}`} className="btn btn-primary">
                            View Details
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StepList;
