import { Request, Response } from 'express';
import pool from '../config/dbConfig';

// Create a new recovery step
export const createStep = async (req: Request, res: Response) => {
    const { userId, stepName, description, date, time } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO steps (user_id, step_name, description, date, time) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [userId, stepName, description, date, time]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating step:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get all recovery steps for a user with pagination
export const getSteps = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { page = 1, limit = 10 } = req.query; // Default to page 1 and limit 10
    const offset = (parseInt(page as string) - 1) * parseInt(limit as string);

    try {
        const result = await pool.query(
            'SELECT * FROM steps WHERE user_id = $1 ORDER BY date DESC, time DESC LIMIT $2 OFFSET $3',
            [userId, parseInt(limit as string), offset]
        );
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching steps:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update a recovery step
export const updateStep = async (req: Request, res: Response) => {
    const { stepId } = req.params;
    const { stepName, description, date, time } = req.body;

    try {
        const result = await pool.query(
            'UPDATE steps SET step_name = $1, description = $2, date = $3, time = $4, updated_at = CURRENT_TIMESTAMP WHERE step_id = $5 RETURNING *',
            [stepName, description, date, time, stepId]
        );
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error updating step:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete a recovery step
export const deleteStep = async (req: Request, res: Response) => {
    const { stepId } = req.params;
    try {
        await pool.query('DELETE FROM steps WHERE step_id = $1', [stepId]);
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting step:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
