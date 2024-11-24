import React, { useState } from 'react';
import { handleSpeak, startRecording } from '../utils/speechUtils'; // Import utility functions
import '../styles/SpeechToTextAndSynthesize.css';

const SpeechToTextAndSynthesize: React.FC = () => {
    const [text, setText] = useState<string>('');
    const [audioUrl, setAudioUrl] = useState<string>('');
    const [recorder, setRecorder] = useState<(() => void) | null>(null); // Add state for the recorder
    const [isRecording, setIsRecording] = useState<boolean>(false); // Add state for recording status

    const handleStartRecording = async () => {
        const stop = await startRecording(setText);
        if (stop) {
            setRecorder(() => stop);
            setIsRecording(true);
        }
    };

    const handleStopRecording = () => {
        if (recorder) {
            recorder();
            setRecorder(null);
            setIsRecording(false);
        }
    };

    return (
        <div className="speech-to-text-synthesize-container">
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type or see transcribed text here"
                className="form-control"
            />
            <button onClick={() => handleSpeak(text, setAudioUrl)} className="btn btn-primary m-2">
                Speak
            </button>
            <button
                className="btn btn-secondary m-2"
                onMouseDown={isRecording ? handleStopRecording : handleStartRecording}>
                <i className={`bi ${isRecording ? 'bi-stop-circle' : 'bi-mic'}`}></i>{' '}
                {isRecording ? 'Stop Recording' : 'Record'}
            </button>
            {audioUrl && <audio src={audioUrl} controls className="mt-3" />}
        </div>
    );
};

export default SpeechToTextAndSynthesize;
