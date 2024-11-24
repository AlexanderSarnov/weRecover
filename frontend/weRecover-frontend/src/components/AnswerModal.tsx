import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { handleSpeak, startRecording } from '../utils/speechUtils'; // Import utility functions
import '../styles/AnswerModal.css'; // Import the CSS file for the modal styling
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap Icons
import axios from 'axios'; // Import axios
import API_BASE_URL from '../apiConfig';

interface AnswerModalProps {
    show: boolean;
    onHide: () => void;
    questionId: number;
    answer: Answer | null;
    onRefresh: () => void;
}

interface Answer {
    answer_id?: number;
    question_id: number;
    user_id: number;
    answer_text: string;
}

const AnswerModal = ({ show, onHide, questionId, answer, onRefresh }: AnswerModalProps) => {
    const [answerText, setAnswerText] = useState(answer ? answer.answer_text : '');
    const [audioUrl, setAudioUrl] = useState<string>('');
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [stopRecording, setStopRecording] = useState<(() => void) | null>(null);
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (token) {
            try {
                const endpoint = answer
                    ? `${API_BASE_URL}/questions/${questionId}/answers/${answer.answer_id}` // Use the base URL
                    : `${API_BASE_URL}/questions/${questionId}/answers`; // Use the base URL

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

    const handleStartRecording = async () => {
        const stop = await startRecording(setAnswerText);
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
                            className="textarea-large" // Apply the custom class
                            value={answerText}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setAnswerText(e.target.value)} // Specify event type
                            required
                        />
                    </Form.Group>
                    <div className="button-center">
                        {' '}
                        {/* Center the save button */}
                        <Button variant="primary" type="submit">
                            {answer ? 'Save Changes' : 'Add Answer'}
                        </Button>
                    </div>
                </Form>
                <Button variant="info" onClick={() => handleSpeak(answerText, setAudioUrl)} className="button-margin">
                    <i className="bi bi-volume-up"></i> Listen
                </Button>
                {audioUrl && <audio src={audioUrl} controls className="button-margin" />}

                <Button
                    className="btn btn-secondary button-margin"
                    onClick={isRecording ? handleStopRecording : handleStartRecording}>
                    <i className={`bi ${isRecording ? 'bi-stop-circle' : 'bi-mic'}`}></i>{' '}
                    {isRecording ? 'Stop Recording' : 'Record Answer'}
                </Button>
            </Modal.Body>
        </Modal>
    );
};

export default AnswerModal;
