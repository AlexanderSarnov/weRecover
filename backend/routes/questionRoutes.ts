import express from 'express';
import { addQuestion, getQuestions, addAnswer, getAnswers } from '../controllers/questionController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/steps/:step_id/questions', authenticateToken, addQuestion); // Add a question to a step
router.get('/steps/:step_id/questions', authenticateToken, getQuestions); // Get all questions for a specific step
router.post('/questions/:question_id/answers', authenticateToken, addAnswer); // Add an answer to a question
router.get('/questions/:question_id/answers', authenticateToken, getAnswers); // Get all answers for a specific question

export default router;
