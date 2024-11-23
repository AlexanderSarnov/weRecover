import { SpeechClient, protos } from '@google-cloud/speech';
import dotenv from 'dotenv';

dotenv.config();

const client = new SpeechClient({
    keyFilename: process.env.GOOGLE_CLOUD_SPEECH_TO_TEXT_API_KEY,
});

export async function transcribeAudio(audioBuffer: Buffer): Promise<string> {
    const audio = {
        content: audioBuffer.toString('base64'),
    };

    const config: protos.google.cloud.speech.v1.IRecognitionConfig = {
        encoding: protos.google.cloud.speech.v1.RecognitionConfig.AudioEncoding.LINEAR16,
        sampleRateHertz: 16000,
        languageCode: 'en-US',
    };

    const request: protos.google.cloud.speech.v1.IRecognizeRequest = {
        audio: audio,
        config: config,
    };

    try {
        const [response] = await client.recognize(request);
        const results = response.results;

        if (!results || results.length === 0) {
            throw new Error('No transcription results found.');
        }

        const transcription = results
            .map(
                (result: protos.google.cloud.speech.v1.ISpeechRecognitionResult) =>
                    result.alternatives?.[0].transcript || ''
            )
            .join('\n');
        return transcription;
    } catch (error) {
        console.error('ERROR:', error);
        throw error;
    }
}
