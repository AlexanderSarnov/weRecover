import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

interface Step {
    step_id: number;
    step_number: number;
    step_name: string;
    description: string;
}

const StepList = () => {
    const [steps, setSteps] = useState<Step[]>([]);
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            fetch('http://localhost:3000/api/steps', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((response) => response.json())
                .then((data) => setSteps(data))
                .catch((error) => console.error('Error fetching steps:', error));
        } else {
            console.error('No token found');
        }
    }, [token]);

    const handleStepClick = (step_id: number) => {
        navigate(`/step/${step_id}`);
    };

    return (
        <div className="step-list">
            {steps.map((step) => (
                <div key={step.step_id} className="step-item">
                    <h3>
                        Step {step.step_number}: {step.step_name}
                    </h3>
                    <p>{step.description}</p>
                    <Link to={`/steps/${step.step_id}`}>View Details</Link> {/* Correct Link */}
                </div>
            ))}
        </div>
    );
};

export default StepList;
