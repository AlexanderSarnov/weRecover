import axios from 'axios';
import API_BASE_URL from '../apiConfig';

// Declare webkitSpeechRecognition as a global variable
declare var webkitSpeechRecognition: any;

export const handleSpeak = async (text: string, setAudioUrl: (url: string) => void) => {
    const token = localStorage.getItem('token');

    if (!token) {
        console.error('No token found');
        return;
    }

    try {
        const response = await axios.post(
            `${API_BASE_URL}/questions/synthesize`,
            { text },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                responseType: 'blob',
            }
        );
        const url = URL.createObjectURL(response.data);
        setAudioUrl(url);
    } catch (error) {
        console.error('Error synthesizing text:', error);
    }
};

export const startRecording = async (setTranscription: (text: string) => void) => {
    if (!('webkitSpeechRecognition' in window)) {
        alert('Web Speech API is not supported in this browser.');
        return;
    }

    const recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    let finalTranscript = ''; // Store the final transcript

    recognition.onstart = () => {
        console.log('Speech recognition started.');
    };

    recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
    };

    recognition.onend = () => {
        console.log('Speech recognition ended.');
        setTranscription(finalTranscript); // Set the final transcription
    };

    recognition.onresult = (event: any) => {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                finalTranscript += event.results[i][0].transcript;
            } else {
                interimTranscript += event.results[i][0].transcript;
            }
        }
        setTranscription(finalTranscript + interimTranscript); // Update the interim transcription
    };

    recognition.start();

    // Return a function to stop recording
    return () => recognition.stop();
};
