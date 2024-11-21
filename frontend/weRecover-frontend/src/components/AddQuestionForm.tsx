import React, { useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../apiConfig';
import '../styles/AddQuestionForm.css'; // Import the separate styling file

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

    return (
        <form onSubmit={handleSubmit} className="add-question-form">
            <input
                type="text"
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                placeholder="Enter your question"
                required
            />
            <button type="submit">Add Question</button>
        </form>
    );
};

export default AddQuestionForm;
