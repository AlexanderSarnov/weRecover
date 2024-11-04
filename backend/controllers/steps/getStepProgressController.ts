import { Request, Response } from 'express';
import pool from '../../config/dbConfig';

export const getStepProgress = async (req: Request, res: Response) => {
    const { step_id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM step_progress WHERE step_id = $1', [step_id]);
        res.json(result.rows);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};
