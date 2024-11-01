import pool from '../config/dbConfig';

export const getUserById = async (userId: number) => {
    const result = await pool.query('SELECT * FROM users WHERE user_id = $1', [userId]);
    return result.rows[0];
};
