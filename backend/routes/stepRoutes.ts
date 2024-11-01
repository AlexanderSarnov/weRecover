import { Router } from 'express';
import { createStep, getSteps, updateStep, deleteStep } from '../controllers/stepController';

const router = Router();

// Route to create a new recovery step
router.post('/steps', createStep);

// Route to get all recovery steps for a user with pagination
router.get('/steps/:userId', getSteps);

// Route to update a recovery step
router.put('/steps/:stepId', updateStep);

// Route to delete a recovery step
router.delete('/steps/:stepId', deleteStep);

export default router;
