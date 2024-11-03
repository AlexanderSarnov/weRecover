import express, { Request, Response } from 'express';
import { registerUser, loginUser } from '../controllers/userController';

const router = express.Router();

// User registration route
router.post('/register', (req: Request, res: Response) => registerUser(req, res));

// User login route
router.post('/login', (req: Request, res: Response) => loginUser(req, res));

export default router;
