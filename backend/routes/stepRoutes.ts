import express from 'express';
import {
    getSteps,
    getStepDetails,
    getStepProgress,
    handleStepProgress,
    getAllStepsProgress,
} from '../controllers/stepController'; // Import the combined controller
import { authenticateToken } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', authenticateToken, getSteps); // Get all steps
router.get('/:step_id', authenticateToken, getStepDetails); // Get step details
router.get('/:step_id/progress', authenticateToken, getStepProgress); // Get step progress
router.put('/:step_id/progress', authenticateToken, handleStepProgress); // Add or update step progress
router.get('/progress/all', authenticateToken, getAllStepsProgress); // Get all steps progress for the authenticated user

export default router;
