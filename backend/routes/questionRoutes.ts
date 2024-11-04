import express from 'express';
import { addQuestion, getQuestions, addAnswer, getAnswers } from '../controllers/questionController';

const router = express.Router();

router.post('/steps/:step_id/questions', addQuestion);
router.get('/steps/:step_id/questions', getQuestions);
router.post('/questions/:question_id/answers', addAnswer);
router.get('/questions/:question_id/answers', getAnswers);

export default router;
