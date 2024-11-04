import { Request, Response } from 'express';
import pool from '../../config/dbConfig';

export const addStepProgress = async (req: Request, res: Response) => {
    const { step_id } = req.params;
    const { user_id, status } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO step_progress (user_id, step_id, status) VALUES ($1, $2, $3) RETURNING *',
            [user_id, step_id, status]
        );
        res.json(result.rows[0]);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};
