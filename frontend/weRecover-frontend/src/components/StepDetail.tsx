import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import QuestionItem from './QuestionItem';

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

const StepDetail = () => {
    const { step_id } = useParams<{ step_id: string }>();
    const [questions, setQuestions] = useState<Question[]>([]);
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage

    const fetchQuestions = () => {
        if (token) {
            fetch(`http://localhost:3000/api/questions/${step_id}/questions`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
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
        <div className="step-detail">
            {questions.map((question) => (
                <QuestionItem key={question.question_id} question={question} onRefresh={fetchQuestions} />
            ))}
        </div>
    );
};

export default StepDetail;
