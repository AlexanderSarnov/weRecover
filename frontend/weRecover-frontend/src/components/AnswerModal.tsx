import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import API_BASE_URL from '../apiConfig';

interface AnswerModalProps {
    show: boolean;
    onHide: () => void;
    questionId: number;
    answer: Answer | null;
    onRefresh: () => void; // Add onRefresh prop
}

interface Answer {
    answer_id?: number;
    question_id: number;
    user_id: number;
    answer_text: string;
}

const AnswerModal = ({ show, onHide, questionId, answer, onRefresh }: AnswerModalProps) => {
    const [answerText, setAnswerText] = useState(answer ? answer.answer_text : '');
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (token) {
            try {
                const endpoint = answer
                    ? `${API_BASE_URL}/questions/${questionId}/answers/${answer.answer_id}` // Correct endpoint for updating an answer
                    : `${API_BASE_URL}/questions/${questionId}/answers`; // Correct endpoint for adding an answer

                const method = answer ? 'put' : 'post'; // Correct HTTP methods

                await axios({
                    method,
                    url: endpoint,
                    data: { answer_text: answerText },
                    headers: { Authorization: `Bearer ${token}` },
                });

                onHide();
                onRefresh(); // Call onRefresh after successful save
            } catch (err) {
                console.error('Error saving answer:', err);
            }
        } else {
            console.error('No token found');
        }
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{answer ? 'Edit Answer' : 'Add Answer'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="answerText">
                        <Form.Label>Answer</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={answerText}
                            onChange={(e) => setAnswerText(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        {answer ? 'Save Changes' : 'Add Answer'}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AnswerModal;
