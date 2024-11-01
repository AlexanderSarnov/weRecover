import { Request, Response } from 'express';
import pool from '../config/dbConfig';

// Get all comments for a topic
export const getCommentsByTopic = async (req: Request, res: Response) => {
    const { topicId } = req.params;
    try {
        const result = await pool.query('SELECT * FROM comments WHERE topic_id = $1', [topicId]);
        res.json(result.rows);
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'Unknown error occurred' });
        }
    }
};

// Add a new comment
export const addComment = async (req: Request, res: Response) => {
    const { userId, topicId, commentText } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO comments (user_id, topic_id, comment_text) VALUES ($1, $2, $3) RETURNING *',
            [userId, topicId, commentText]
        );
        res.json(result.rows[0]);
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'Unknown error occurred' });
        }
    }
};

// Update a comment
export const updateComment = async (req: Request, res: Response) => {
    const { commentId } = req.params;
    const { commentText } = req.body;
    try {
        const result = await pool.query(
            'UPDATE comments SET comment_text = $1, updated_at = CURRENT_TIMESTAMP WHERE comment_id = $2 RETURNING *',
            [commentText, commentId]
        );
        res.json(result.rows[0]);
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'Unknown error occurred' });
        }
    }
};
// Delete a comment
export const deleteComment = async (req: Request, res: Response) => {
    const { commentId } = req.params;
    try {
        await pool.query('DELETE FROM comments WHERE comment_id = $1', [commentId]);
        res.json({ message: 'Comment deleted successfully' });
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'Unknown error occurred' });
        }
    }
};
