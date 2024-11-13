import { Request, Response } from 'express';
import pool from '../config/dbConfig';

// Function to get all questions for a specific step
export const getQuestionsForStep = async (req: Request, res: Response) => {
    const { step_id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM questions WHERE step_id = $1', [step_id]);
        res.json(result.rows);
    } catch (error) {
        console.error('Error querying the database', error);
        res.status(500).json({ message: 'Error querying the database' });
    }
};

export const addQuestion = async (req: Request, res: Response) => {
    const { step_id } = req.params;
    const { question_text, user_id, is_custom } = req.body;
    try {
        const newQuestion = await pool.query(
            'INSERT INTO questions (step_id, user_id, question_text, is_custom) VALUES ($1, $2, $3, $4) RETURNING *',
            [step_id, user_id, question_text, is_custom]
        );
        res.json(newQuestion.rows[0]);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};

export const getQuestions = async (req: Request, res: Response) => {
    const { step_id } = req.params;
    try {
        const questions = await pool.query('SELECT * FROM questions WHERE step_id = $1 AND is_flagged = FALSE', [
            step_id,
        ]);
        res.json(questions.rows);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};

export const addAnswer = async (req: Request, res: Response) => {
    const { question_id } = req.params;
    const { user_id, answer_text } = req.body;
    try {
        const newAnswer = await pool.query(
            'INSERT INTO answers (question_id, user_id, answer_text) VALUES ($1, $2, $3) RETURNING *',
            [question_id, user_id, answer_text]
        );
        res.json(newAnswer.rows[0]);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};

export const getAnswers = async (req: Request, res: Response) => {
    const { question_id } = req.params;
    try {
        const answers = await pool.query('SELECT * FROM answers WHERE question_id = $1', [question_id]);
        res.json(answers.rows);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};
