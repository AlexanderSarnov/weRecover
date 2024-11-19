import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import QuestionItem from './QuestionItem';
import Header from './Header'; // Import Header
import Footer from './Footer'; // Import Footer
import API_BASE_URL from '../apiConfig';
import '../styles/StepDetail.css'; // Create a new CSS file for StepDetail

interface Question {
    question_id: number;
    question_text: string;
    answers: Answer[];
}

interface Answer {
    answer_id: number;
    question_id: number;
    user_id: number;
    answer_text: string;
}

const StepDetail: React.FC = () => {
    const { step_id } = useParams<{ step_id: string }>();
    const [questions, setQuestions] = useState<Question[]>([]);
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage

    const fetchQuestions = () => {
        if (token) {
            fetch(`${API_BASE_URL}/questions/${step_id}/questions`, {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log('Fetched questions:', data); // Debug the fetched data
                    setQuestions(data);
                })
                .catch((error) => console.error('Error fetching questions:', error));
        } else {
            console.error('No token found');
        }
    };

    useEffect(() => {
        fetchQuestions();
    }, [step_id, token]);

    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <div className="container my-auto step-detail-container">
                <div className="row justify-content-center">
                    <div className="col-md-10 text-center">
                        <h1>Step Details</h1>
                        <div className="questions-list">
                            {questions.map((question) => (
                                <div key={question.question_id} className="card question-card">
                                    <div className="card-body">
                                        <QuestionItem question={question} onRefresh={fetchQuestions} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default StepDetail;
