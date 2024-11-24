import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { handleSpeak, startRecording } from '../utils/speechUtils';
import '../styles/AnswerModal.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from 'axios';
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
    const token = localStorage.getItem('token');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (token) {
            try {
                const endpoint = answer
                    ? `${API_BASE_URL}/questions/${questionId}/answers/${answer.answer_id}`
                    : `${API_BASE_URL}/questions/${questionId}/answers`;

                const method = answer ? 'put' : 'post';

                await axios({
                    method,
                    url: endpoint,
                    data: { answer_text: answerText },
                    headers: { Authorization: `Bearer ${token}` },
                });

                onHide();
                onRefresh();
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

    const handleCloseAudio = () => {
        setAudioUrl('');
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
                            className="textarea-large"
                            value={answerText}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setAnswerText(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                height: '200px',
                                minWidth: '400px',
                                padding: '10px',
                                borderRadius: '5px',
                                border: '1px solid #ced4da',
                                fontSize: '16px',
                                boxSizing: 'border-box',
                            }}
                        />
                    </Form.Group>
                    <div className="button-center">
                        <Button
                            className="btn btn-secondary button-margin"
                            onClick={isRecording ? handleStopRecording : handleStartRecording}>
                            <i className={`bi ${isRecording ? 'bi-stop-circle' : 'bi-mic'}`}></i>
                            {isRecording ? 'Stop Recording' : 'Record Answer'}
                        </Button>
                        <Button
                            variant="info"
                            onClick={() => handleSpeak(answerText, setAudioUrl)}
                            className="button-margin">
                            <i className="bi bi-volume-up"></i> Listen
                        </Button>
                        <Button variant="primary" type="submit" className="button-margin">
                            {answer ? 'Save Changes' : 'Add Answer'}
                        </Button>
                    </div>
                </Form>
                {audioUrl && (
                    <div className="audio-container">
                        <audio src={audioUrl} controls className="button-margin" />
                        <button onClick={handleCloseAudio} className="close-button">
                            <i className="bi bi-x"></i>
                        </button>
                    </div>
                )}
            </Modal.Body>
        </Modal>
    );
};

export default AnswerModal;
