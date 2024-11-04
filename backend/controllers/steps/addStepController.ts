import { Request, Response } from 'express';
import pool from '../../config/dbConfig';

export const addStep = async (req: Request, res: Response) => {
    const { step_number, step_name, description } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO steps (step_number, step_name, description) VALUES ($1, $2, $3) RETURNING *',
            [step_number, step_name, description]
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
