import dotenv from 'dotenv';
import textToSpeech, { protos } from '@google-cloud/text-to-speech';

dotenv.config();

const client = new textToSpeech.TextToSpeechClient({
    keyFilename: process.env.GCLOUD_KEY_FILE,
});


export async function synthesizeSpeech(text: string): Promise<Buffer> {
    const request: protos.google.cloud.texttospeech.v1.ISynthesizeSpeechRequest = {
        input: { text },
        voice: {
            languageCode: 'en-US',
            ssmlGender: protos.google.cloud.texttospeech.v1.SsmlVoiceGender.NEUTRAL,
        },
        audioConfig: {
            audioEncoding: protos.google.cloud.texttospeech.v1.AudioEncoding.MP3,
        },
    };

    try {
        const [response] = await client.synthesizeSpeech(request);
        if (!response.audioContent) {
            throw new Error('No audio content found.');
        }
        return response.audioContent as Buffer;
    } catch (error) {
        console.error('ERROR:', error);
        throw error;
    }
}
