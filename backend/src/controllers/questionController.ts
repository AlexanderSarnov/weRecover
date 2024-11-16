import { Request, Response } from 'express';
import pool from '../config/dbConfig';

interface CustomRequest extends Request {
    user?: {
        user_id: string;
    };
}

// Get all questions for a specific step, including user-specific questions and their answers
export const getQuestionsForStep = async (req: CustomRequest, res: Response) => {
    const { step_id } = req.params;
    const user_id = req.user?.user_id; // Extract the user ID from the authenticated user
    try {
        const result = await pool.query(
            ` SELECT q.*, json_agg(a.*) AS answers FROM questions q LEFT JOIN answers a ON q.question_id = a.question_id AND a.user_id = $2 WHERE q.step_id = $1 AND (q.is_flagged = FALSE OR q.user_id = $2) GROUP BY q.question_id ORDER BY q.question_id; `,
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
    const { question_text } = req.body;
    const user_id = req.user?.user_id; // Extract the user ID from the authenticated user
    const is_custom = true; // Ensure the question is marked as custom

    try {
        const newQuestion = await pool.query(
            'INSERT INTO questions (step_id, user_id, question_text, is_custom) VALUES ($1, $2, $3, $4) RETURNING *',
            [step_id, user_id, question_text, is_custom]
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
