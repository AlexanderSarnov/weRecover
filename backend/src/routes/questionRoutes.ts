import { Router } from 'express';
import {
    addQuestion,
    getQuestionsForStep,
    addAnswer,
    getAnswers,
    updateAnswer,
    removeAnswer,
    removeQuestion,
    muteQuestion,
} from '../controllers/questionController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.post('/:step_id/questions', authenticateToken, addQuestion);
router.get('/:step_id/questions', authenticateToken, getQuestionsForStep);
router.post('/:question_id/answers', authenticateToken, addAnswer);
router.put('/:question_id/answers/:answer_id', authenticateToken, updateAnswer);
router.get('/:question_id/answers', authenticateToken, getAnswers);
router.delete('/:step_id/questions/:question_id', authenticateToken, removeQuestion);
router.delete('/:question_id/answers/:answer_id', authenticateToken, removeAnswer); // Delete an answer
router.delete('/:step_id/questions/:question_id/mute', authenticateToken, muteQuestion);

export default router;
