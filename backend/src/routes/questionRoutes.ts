import express from 'express';
import {
    addQuestion,
    getQuestionsForStep,
    addAnswer,
    getAnswers,
    updateAnswer,
    removeQuestion,
    muteQuestion, // Import the muteQuestion controller
} from '../controllers/questionController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/:step_id/questions', authenticateToken, addQuestion); // Add a question to a step
router.get('/:step_id/questions', authenticateToken, getQuestionsForStep); // Get all questions for a specific step
router.post('/:question_id/answers', authenticateToken, addAnswer); // Add an answer to a question
router.put('/:question_id/answers/:answer_id', authenticateToken, updateAnswer); // Update an existing answer for a question
router.get('/:question_id/answers', authenticateToken, getAnswers); // Get all answers for a specific question
router.delete('/:step_id/questions/:question_id', authenticateToken, removeQuestion); // Remove a question
router.delete('/:step_id/questions/:question_id/mute', authenticateToken, muteQuestion); // Mute a question

export default router;
