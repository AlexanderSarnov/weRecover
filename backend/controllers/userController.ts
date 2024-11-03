import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../config/dbConfig';

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    console.log('loginUser function hit');
    const { email, password } = req.body;

    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = result.rows[0];

        if (!user || !(await bcrypt.compare(password, user.password))) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }

        const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

        res.status(200).json({ token, user });
    } catch (err) {
        console.error('Error logging in user', err);
        res.status(500).json({ message: 'Error logging in user' });
    }
};

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    console.log('registerUser function hit');
    const { username, email, password } = req.body;

    try {
        console.log('Hashing password');
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Password hashed:', hashedPassword);

        console.log('Inserting user into database');
        const result = await pool.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
            [username, email, hashedPassword]
        );
        const newUser = result.rows[0];
        console.log('User inserted:', newUser);

        console.log('Generating token');
        const token = jwt.sign({ userId: newUser.user_id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

        res.status(201).json({ token, user: newUser });
    } catch (err) {
        console.error('Error registering user', err);
        res.status(500).json({ message: 'Error registering user' });
    }
};
