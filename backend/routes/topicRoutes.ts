import { Router } from 'express';
import { populateTopics, getTopics } from '../controllers/topicController';

const router = Router();

// Route to populate daily topics
router.post('/topics/populate', populateTopics);

// Route to get all daily topics
router.get('/topics', getTopics);

export default router