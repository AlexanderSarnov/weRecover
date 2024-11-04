import { Request, Response } from 'express';
import pool from '../../config/dbConfig';

export const updateStep = async (req: Request, res: Response) => {
    const { step_id } = req.params;
    const { step_number, step_name, description } = req.body;
    try {
        const result = await pool.query(
            'UPDATE steps SET step_number = $1, step_name = $2, description = $3 WHERE step_id = $4 RETURNING *',
            [step_number, step_name, description, step_id]
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
