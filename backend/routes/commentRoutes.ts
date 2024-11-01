import express from 'express';
import { getCommentsByTopic, addComment, updateComment, deleteComment } from '../controllers/commentController';
const router = express.Router();
router.get('/:topicId', getCommentsByTopic);
router.post('/', addComment);
router.put('/:commentId', updateComment);
router.delete('/:commentId', deleteComment);
export default router;
