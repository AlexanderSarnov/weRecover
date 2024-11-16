"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const stepController_1 = require("../controllers/stepController"); // Import the combined controller
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.get('/', authMiddleware_1.authenticateToken, stepController_1.getSteps); // Get all steps
router.get('/:step_id', authMiddleware_1.authenticateToken, stepController_1.getStepDetails); // Get step details
router.get('/:step_id/progress', authMiddleware_1.authenticateToken, stepController_1.getStepProgress); // Get step progress
router.put('/:step_id/progress', authMiddleware_1.authenticateToken, stepController_1.handleStepProgress); // Add or update step progress
router.get('/progress/all', authMiddleware_1.authenticateToken, stepController_1.getAllStepsProgress); // Get all steps progress for the authenticated user
exports.default = router;
