import { useState, useEffect } from 'react';

interface Step {
    step_id: number;
    step_number: number;
    step_name: string;
    description: string;
}

const StepList = () => {
    const [steps, setSteps] = useState<Step[]>([]);
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage

    useEffect(() => {
        if (token) {
            console.log('Token:', token); // Log the token for debugging

            // Fetch steps data from the API with the token
            fetch('http://localhost:3000/api/steps', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((response) => {
                    console.log('Response status:', response.status); // Log the response status
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log('Fetched steps data:', data); // Log the fetched data
                    if (Array.isArray(data)) {
                        setSteps(data);
                    } else {
                        throw new Error('Data is not an array');
                    }
                })
                .catch((error) => console.error('Error fetching steps:', error));
        } else {
            console.error('No token found');
        }
    }, [token]);

    return (
        <div className="step-list">
            {steps.map((step) => (
                <div key={step.step_id} className="step-item">
                    <h3>
                        Step {step.step_number}: {step.step_name}
                    </h3>
                    <p>{step.description}</p>
                </div>
            ))}
        </div>
    );
};

export default StepList;
