import { useState } from 'react';
import AnswerModal from './AnswerModal';

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

const QuestionItem = ({ question, onRefresh }: { question: Question; onRefresh: () => void }) => {
    const [showModal, setShowModal] = useState(false);
    const [editAnswer, setEditAnswer] = useState<Answer | null>(null);

    const handleAddAnswer = () => {
        setEditAnswer(null);
        setShowModal(true);
    };

    const handleEditAnswer = (answer: Answer) => {
        setEditAnswer(answer);
        setShowModal(true);
    };

    // Filter out any null answers
    const validAnswers = question.answers.filter((answer) => answer !== null);

    return (
        <div className="question-item">
            <h4>{question.question_text}</h4>
            <ul>
                {validAnswers.map((answer) => (
                    <li key={answer.answer_id}>
                        {answer.answer_text}
                        <button onClick={() => handleEditAnswer(answer)} className="btn btn-secondary">
                            Edit
                        </button>
                    </li>
                ))}
            </ul>
            <button onClick={handleAddAnswer} className="btn btn-primary">
                Add Answer
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
        </div>
    );
};

export default QuestionItem;
