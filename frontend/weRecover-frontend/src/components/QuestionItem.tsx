import { useState } from 'react';
import AnswerModal from './AnswerModal';
import axios from 'axios';
import API_BASE_URL from '../apiConfig';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap Icons

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
    answers?: Answer[]; // Make answers optional
}

interface QuestionItemProps {
    question: Question;
    stepId: number;
    onRefresh: () => void;
}

const QuestionItem: React.FC<QuestionItemProps> = ({ question, stepId, onRefresh }) => {
    const [showModal, setShowModal] = useState(false);
    const [editAnswer, setEditAnswer] = useState<Answer | null>(null);
    const [audioUrl, setAudioUrl] = useState<string>('');
    const token = localStorage.getItem('token');

    const handleAddAnswer = () => {
        setEditAnswer(null);
        setShowModal(true);
    };

    const handleEditAnswer = (answer: Answer) => {
        setEditAnswer(answer);
        setShowModal(true);
    };

    const handleDeleteAnswer = async (answerId: number) => {
        if (token) {
            try {
                await axios.delete(`${API_BASE_URL}/questions/${question.question_id}/answers/${answerId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                onRefresh(); // Refresh questions after deletion
            } catch (error) {
                console.error('Error deleting answer:', error);
            }
        } else {
            console.error('No token found');
        }
    };

    const handleRemoveQuestion = async () => {
        if (token) {
            try {
                await axios.delete(`${API_BASE_URL}/questions/${stepId}/questions/${question.question_id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                onRefresh(); // Refresh questions after deletion
            } catch (error) {
                console.error('Error removing question:', error);
            }
        } else {
            console.error('No token found');
        }
    };

    const handleSpeak = async (text: string) => {
        const token = localStorage.getItem('token'); // Retrieve the token from localStorage

        try {
            const response = await axios.post(
                `${API_BASE_URL}/questions/synthesize`,
                { text },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include the token in the headers
                    },
                    responseType: 'blob', // Important to get the blob response
                }
            );
            const url = URL.createObjectURL(response.data);
            setAudioUrl(url);
        } catch (error) {
            console.error('Error synthesizing text:', error);
        }
    };

    // Use optional chaining to avoid accessing undefined property
    const validAnswers = question.answers?.filter((answer) => answer !== null) || [];

    return (
        <div className="question-item">
            <h4>{question.question_text}</h4>
            <ul>
                {validAnswers.map((answer) => (
                    <li key={answer.answer_id}>
                        {answer.answer_text}
                        <div>
                            <button onClick={() => handleEditAnswer(answer)} className="btn btn-secondary">
                                <i className="bi bi-pencil-square"></i> Edit
                            </button>
                            <button onClick={() => handleDeleteAnswer(answer.answer_id)} className="btn btn-danger">
                                <i className="bi bi-trash"></i> Delete
                            </button>
                            <button onClick={() => handleSpeak(answer.answer_text)} className="btn btn-info">
                                <i className="bi bi-volume-up"></i> Listen
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <button onClick={handleAddAnswer} className="btn btn-primary">
                <i className="bi bi-plus-circle"></i> Add Answer
            </button>
            <button onClick={handleRemoveQuestion} className="btn btn-danger">
                <i className="bi bi-x-circle"></i> Remove Question
            </button>
            {showModal && (
                <AnswerModal
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    questionId={question.question_id}
                    answer={editAnswer}
                    onRefresh={onRefresh}
                />
            )}
            {audioUrl && <audio src={audioUrl} controls />}
        </div>
    );
};

export default QuestionItem;
