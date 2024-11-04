import { Request, Response } from 'express';
import pool from '../../config/dbConfig';

export const deleteStep = async (req: Request, res: Response) => {
    const { step_id } = req.params;
    try {
        await pool.query('DELETE FROM steps WHERE step_id = $1', [step_id]);
        res.status(204).send();
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};
