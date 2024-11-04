import express from 'express';
import { getSteps } from '../controllers/steps/getStepsController';
import { addStep } from '../controllers/steps/addStepController';
import { updateStep } from '../controllers/steps/updateStepController';
import { deleteStep } from '../controllers/steps/deleteStepController';
import { getStepProgress } from '../controllers/steps/getStepProgressController';
import { addStepProgress } from '../controllers/steps/addStepProgressController';
import { updateStepProgress } from '../controllers/steps/updateStepProgressController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', authenticateToken, getSteps);
router.post('/', authenticateToken, addStep);
router.put('/:step_id', authenticateToken, updateStep);
router.delete('/:step_id', authenticateToken, deleteStep);
router.get('/:step_id/progress', authenticateToken, getStepProgress);
router.post('/:step_id/progress', authenticateToken, addStepProgress);
router.put('/:step_id/progress/:progress_id', authenticateToken, updateStepProgress);

export default router;
