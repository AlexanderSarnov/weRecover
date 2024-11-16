import { Request, Response } from 'express';
import pool from '../config/dbConfig';

interface CustomRequest extends Request {
    user?: any;
}

// Get All Steps Progress
export const getAllStepsProgress = async (req: CustomRequest, res: Response) => {
    const userId = req.user?.id; // Ensure the user ID is correctly extracted

    try {
        const result = await pool.query('SELECT * FROM step_progress WHERE user_id = $1', [userId]);
        const progress = result.rows;

        if (progress.length === 0) {
            res.status(404).json({ message: 'No progress found for the user' });
            return;
        }

        res.json(progress);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};

// Get Step Details
export const getStepDetails = async (req: CustomRequest, res: Response): Promise<void> => {
    const stepId = req.params.step_id;

    try {
        // Fetch step details
        const stepResult = await pool.query('SELECT * FROM steps WHERE step_id = $1', [stepId]);
        const step = stepResult.rows[0];

        if (!step) {
            res.status(404).json({ message: 'Step not found' });
            return;
        }

        // Fetch related questions
        const questionsResult = await pool.query('SELECT * FROM questions WHERE step_id = $1', [stepId]);
        const questions = questionsResult.rows;

        // Fetch step status
        const statusResult = await pool.query('SELECT status FROM step_progress WHERE step_id = $1 AND user_id = $2', [
            stepId,
            req.user.id,
        ]);
        const status = statusResult.rows[0]?.status || 'Not Started';

        res.status(200).json({ step, questions, status });
    } catch (err) {
        console.error('Error retrieving step details', err);
        res.status(500).json({ message: 'Error retrieving step details' });
    }
};

// Get Step Progress
export const getStepProgress = async (req: CustomRequest, res: Response) => {
    const { step_id } = req.params;
    const userId = req.user?.userId; // Ensure the user ID is correctly extracted

    console.log('Fetching progress for step_id:', step_id, 'and user_id:', userId); // Log the step_id and user_id

    try {
        const result = await pool.query('SELECT * FROM step_progress WHERE step_id = $1 AND user_id = $2', [
            step_id,
            userId,
        ]);
        const progress = result.rows;

        if (progress.length === 0) {
            res.status(404).json({ message: 'Progress not found' });
            return;
        }

        res.json(progress);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};


// Get Steps
export const getSteps = async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT * FROM steps');
        res.json(result.rows);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};

// Handle Step Progress
export const handleStepProgress = async (req: CustomRequest, res: Response) => {
    const { step_id } = req.params;
    const userId = req.user?.userId; // Ensure the user ID is correctly extracted
    const { status } = req.body;

    try {
        // Check if progress already exists
        const checkResult = await pool.query('SELECT * FROM step_progress WHERE user_id = $1 AND step_id = $2', [
            userId,
            step_id,
        ]);
        const existingProgress = checkResult.rows[0];

        if (existingProgress) {
            // Update existing progress
            const updateResult = await pool.query(
                'UPDATE step_progress SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE progress_id = $2 RETURNING *',
                [status, existingProgress.progress_id]
            );
            const updatedProgress = updateResult.rows[0];
            res.status(200).json(updatedProgress);
        } else {
            // Add new progress
            const insertResult = await pool.query(
                'INSERT INTO step_progress (user_id, step_id, status) VALUES ($1, $2, $3) RETURNING *',
                [userId, step_id, status]
            );
            const newProgress = insertResult.rows[0];
            res.status(201).json(newProgress);
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};

