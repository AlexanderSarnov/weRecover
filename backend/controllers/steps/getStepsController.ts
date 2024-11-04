import { Request, Response } from 'express';
import pool from '../../config/dbConfig';

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
