import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AddQuestionForm from './AddQuestionForm';
import QuestionItem from './QuestionItem';
import Header from './Header';
import Footer from './Footer';
import API_BASE_URL from '../apiConfig';
import '../styles/StepDetail.css';

interface Answer {
    answer_id: number;
    question_id: number;
    user_id: number;
    answer_text: string;
}

interface Question {
    question_id: number;
    question_text: string;
    is_public: boolean;
    answers: Answer[];
}

const StepDetail: React.FC = () => {
    const { step_id } = useParams<{ step_id: string }>();
    const [questions, setQuestions] = useState<Question[]>([]);
    const token = localStorage.getItem('token') as string;

    const fetchQuestions = () => {
        if (token) {
            fetch(`${API_BASE_URL}/questions/${step_id}/questions`, {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then((response) => response.json())
                .then((data) => setQuestions(data))
                .catch((error) => console.error('Error fetching questions:', error));
        } else {
            console.error('No token found');
        }
    };

    useEffect(() => {
        fetchQuestions();
    }, [step_id, token]);

    const handleQuestionAdded = (newQuestion: Question) => {
        setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <div className="container my-auto step-detail-container">
                <div className="row justify-content-center">
                    <div className="col-md-10 text-center">
                        <h1>Step Details</h1>
                        <AddQuestionForm stepId={Number(step_id)} token={token} onAdd={handleQuestionAdded} />
                        <div className="questions-list">
                            {questions.map((question) => (
                                <div key={question.question_id} className="card question-card">
                                    <div className="card-body">
                                        <QuestionItem
                                            question={question}
                                            stepId={Number(step_id)}
                                            onRefresh={fetchQuestions}
                                        />
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
