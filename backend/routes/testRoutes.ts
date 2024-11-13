import express from 'express';
import { getTestQuestions } from '../controllers/questionController';
import { authenticateToken } from '../middleware/authMiddleware'; // Import the middleware

const router = express.Router();

router.get('/test-questions/:step_id', authenticateToken, getTestQuestions); // Add the middleware to the route

export default router;
