import React, { useState } from 'react';
import axios from 'axios';
import { startRecording } from '../utils/speechUtils'; // Import the startRecording utility function
import API_BASE_URL from '../apiConfig';
import '../styles/AddQuestionForm.css'; // Import the separate styling file
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
    answers: Answer[];
}

interface AddQuestionFormProps {
    stepId: number;
    token: string;
    onAdd: (newQuestion: Question) => void;
}

const AddQuestionForm: React.FC<AddQuestionFormProps> = ({ stepId, token, onAdd }) => {
    const [questionText, setQuestionText] = useState<string>('');
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [stopRecording, setStopRecording] = useState<(() => void) | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${API_BASE_URL}/questions/${stepId}/questions`,
                {
                    question_text: questionText,
                    is_public: false, // Ensure user-specific questions
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setQuestionText('');
            onAdd(response.data); // Trigger callback to refresh questions
        } catch (error) {
            console.error('Error adding question:', error);
        }
    };

    const handleStartRecording = async () => {
        const stop = await startRecording(setQuestionText);
        setStopRecording(() => stop);
        setIsRecording(true);
    };

    const handleStopRecording = () => {
        if (stopRecording) {
            stopRecording();
            setStopRecording(null);
            setIsRecording(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="add-question-form">
            <input
                type="text"
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                placeholder="Enter your question"
                required
            />
            <div className="button-container">
                {' '}
                {/* Flex container for button alignment */}
                <button type="submit">Add Question</button>
                <button
                    type="button"
                    onClick={isRecording ? handleStopRecording : handleStartRecording}
                    className="btn btn-secondary btn-record">
                    <i className={`bi ${isRecording ? 'bi-stop-circle' : 'bi-mic'}`}></i>{' '}
                    {isRecording ? 'Stop Recording' : 'Record Question'}
                </button>
            </div>
        </form>
    );
};

export default AddQuestionForm;
