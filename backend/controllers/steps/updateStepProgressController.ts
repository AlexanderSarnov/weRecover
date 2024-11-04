import { Request, Response } from 'express';
import pool from '../../config/dbConfig';

export const updateStepProgress = async (req: Request, res: Response) => {
    const { step_id, progress_id } = req.params;
    const { status } = req.body;
    try {
        const result = await pool.query(
            'UPDATE step_progress SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE progress_id = $2 AND step_id = $3 RETURNING *',
            [status, progress_id, step_id]
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
