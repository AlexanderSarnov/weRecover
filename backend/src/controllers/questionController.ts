import { Request, Response } from 'express';
import pool from '../config/dbConfig';
import { transcribeAudio } from '../utils/speechToText';
import { synthesizeSpeech } from '../utils/textToSpeech';

interface CustomRequest extends Request {
    user?: {
        user_id: string;
    };
}

// Get all questions for a specific step, including user-specific questions and their answers
export const getQuestionsForStep = async (req: CustomRequest, res: Response) => {
    const { step_id } = req.params;
    const user_id = req.user?.user_id;
    try {
        const result = await pool.query(
            `SELECT q.*, json_agg(a.*) AS answers FROM questions q LEFT JOIN answers a ON q.question_id = a.question_id AND a.user_id = $2 WHERE q.step_id = $1 AND (q.is_flagged = FALSE OR q.user_id = $2) AND (q.is_public = TRUE OR q.user_id = $2) AND q.question_id NOT IN (SELECT question_id FROM question_mutes WHERE user_id = $2) GROUP BY q.question_id ORDER BY q.question_id;`,
            [step_id, user_id]
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Error querying the database', error);
        res.status(500).json({ message: 'Error querying the database' });
    }
};

// Add a new question to a specific step
export const addQuestion = async (req: CustomRequest, res: Response) => {
    const { step_id } = req.params;
    const { question_text, is_public } = req.body; // Include is_public in the request body
    const user_id = req.user?.user_id;
    const is_custom = true;

    try {
        const newQuestion = await pool.query(
            'INSERT INTO questions (step_id, user_id, question_text, is_custom, is_public) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [step_id, user_id, question_text, is_custom, is_public]
        );
        res.json(newQuestion.rows[0]);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};

// Get all non-flagged questions for a specific step
export const getQuestions = async (req: CustomRequest, res: Response) => {
    const { step_id } = req.params;
    try {
        const questions = await pool.query('SELECT * FROM questions WHERE step_id = $1 AND is_flagged = FALSE', [
            step_id,
        ]);
        res.json(questions.rows);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};

// Add a new answer to a specific question
export const addAnswer = async (req: CustomRequest, res: Response) => {
    const { question_id } = req.params;
    const { answer_text } = req.body;
    const user_id = req.user?.user_id; // Extract the user ID from the authenticated user

    try {
        const newAnswer = await pool.query(
            'INSERT INTO answers (question_id, user_id, answer_text) VALUES ($1, $2, $3) RETURNING *',
            [question_id, user_id, answer_text]
        );
        res.json(newAnswer.rows[0]);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};

// Get answers for a specific question, related to the current user
export const getAnswers = async (req: CustomRequest, res: Response) => {
    const { question_id } = req.params;
    const user_id = req.user?.user_id; // Extract the user ID from the authenticated user

    try {
        const answers = await pool.query('SELECT * FROM answers WHERE question_id = $1 AND user_id = $2', [
            question_id,
            user_id,
        ]);
        res.json(answers.rows);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};

// Update an existing answer for a specific question
export const updateAnswer = async (req: CustomRequest, res: Response): Promise<void> => {
    const { question_id, answer_id } = req.params;
    const { answer_text } = req.body;
    const user_id = req.user?.user_id; // Extract the user ID from the authenticated user

    try {
        const result = await pool.query(
            'UPDATE answers SET answer_text = $1 WHERE question_id = $2 AND answer_id = $3 AND user_id = $4 RETURNING *',
            [answer_text, question_id, answer_id, user_id]
        );
        if (result.rowCount === 0) {
            res.status(404).json({ message: 'Answer not found' });
        } else {
            res.json(result.rows[0]);
        }
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};

// Mute a question
export const muteQuestion = async (req: CustomRequest, res: Response): Promise<void> => {
    const { question_id } = req.params;
    const user_id = req.user?.user_id;
    try {
        await pool.query('INSERT INTO question_mutes (question_id, user_id) VALUES ($1, $2)', [question_id, user_id]);
        res.status(200).json({ message: 'Question muted successfully' });
    } catch (error) {
        console.error('Error muting question:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Remove a question
export const removeQuestion = async (req: CustomRequest, res: Response): Promise<void> => {
    const { step_id, question_id } = req.params;
    const user_id = req.user?.user_id;
    try {
        const result = await pool.query('SELECT * FROM questions WHERE question_id = $1 AND step_id = $2', [
            question_id,
            step_id,
        ]);
        if (result.rowCount === 0) {
            res.status(404).json({ message: 'Question not found' });
            return;
        }
        const question = result.rows[0];
        if (question.user_id === user_id) {
            // Delete personal question}
            await pool.query('DELETE FROM questions WHERE question_id = $1', [question_id]);
            res.status(200).json({ message: 'Question deleted successfully' });
        } else {
            // Mute public question for the user}
            await pool.query('INSERT INTO question_mutes (question_id, user_id) VALUES ($1, $2)', [
                question_id,
                user_id,
            ]);
            res.status(200).json({ message: 'Question muted for user successfully' });
        }
    } catch (error) {
        console.error('Error removing question:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Remove answer
export const removeAnswer = async (req: Request, res: Response): Promise<void> => {
    const { answer_id } = req.params;
    try {
        const result = await pool.query('DELETE FROM answers WHERE answer_id = $1 RETURNING *', [answer_id]);
        if (result.rowCount === 0) {
            res.status(404).json({ error: 'Answer not found' });
            return;
        }
        res.json({ message: 'Answer deleted successfully' });
    } catch (error) {
        console.error('Error deleting answer:', error);
        res.status(500).json({ error: 'Error deleting answer' });
    }
};

// Transcribe speech to text
export const transcribe = async (req: CustomRequest, res: Response) => {
    try {
        const audioBuffer = req.file?.buffer; // Ensure buffer is accessed safely
        if (!audioBuffer) throw new Error("No audio file provided");

        const transcription = await transcribeAudio(audioBuffer);
        res.json({ transcription });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};


// Synthesize text to speech
export const synthesize = async (req: CustomRequest, res: Response) => {
    try {
        const { text } = req.body;
        const audioContent = await synthesizeSpeech(text);
        res.setHeader('Content-Type', 'audio/mp3');
        res.send(audioContent);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};



// Test function to get all questions for a specific step
export const getTestQuestions = async (req: Request, res: Response) => {
    const { step_id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM questions WHERE step_id = $1', [step_id]);
        res.json(result.rows);
    } catch (error) {
        console.error('Error querying the database', error);
        res.status(500).json({ message: 'Error querying the database' });
    }
};
