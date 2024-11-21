import { useState } from 'react';
import AnswerModal from './AnswerModal';
import axios from 'axios';
import API_BASE_URL from '../apiConfig';

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

    const handleMute = async () => {
        if (token) {
            try {
                await axios.delete(`${API_BASE_URL}/questions/${stepId}/questions/${question.question_id}/mute`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                onRefresh();
            } catch (error) {
                console.error('Error muting question:', error);
            }
        } else {
            console.error('No token found');
        }
    };

    const handleDelete = async () => {
        if (token) {
            try {
                await axios.delete(`${API_BASE_URL}/questions/${stepId}/questions/${question.question_id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                onRefresh(); // Refresh questions after deletion
            } catch (error) {
                console.error('Error deleting question:', error);
            }
        } else {
            console.error('No token found');
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
                                Edit
                            </button>
                            <button onClick={() => handleDeleteAnswer(answer.answer_id)} className="btn btn-danger">
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <button onClick={handleAddAnswer} className="btn btn-primary">
                Add Answer
            </button>
            {question.is_public ? (
                <button onClick={handleMute} className="btn btn-warning">
                    Mute
                </button>
            ) : (
                <button onClick={handleDelete} className="btn btn-danger">
                    Delete
                </button>
            )}
            {showModal && (
                <AnswerModal
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    questionId={question.question_id}
                    answer={editAnswer}
                    onRefresh={onRefresh}
                />
            )}
        </div>
    );
};

export default QuestionItem;
